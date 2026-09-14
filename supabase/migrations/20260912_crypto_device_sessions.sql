-- ==============================================================================
-- ATP REVISION VAULT: CRYPTOGRAPHIC DEVICE BINDING & STUDY SESSIONS
-- Migration: 20260912_crypto_device_sessions.sql
-- Compatible with the current Study_Packs database
-- ==============================================================================

BEGIN;

-- ==============================================================================
-- 1. UPGRADE DEVICES TABLE
-- ==============================================================================

-- Current legacy schema:
-- user_id UUID PRIMARY KEY
-- device_token TEXT NOT NULL
-- activated_at TIMESTAMPTZ
--
-- New cryptographic system requires:
-- id
-- public_key
-- status
-- device_token_hash
--
-- Multiple historical/revoked devices must also be possible, so user_id can
-- no longer be the primary key.

ALTER TABLE public.devices
  ADD COLUMN IF NOT EXISTS id UUID DEFAULT gen_random_uuid();

UPDATE public.devices
SET id = gen_random_uuid()
WHERE id IS NULL;

ALTER TABLE public.devices
  ALTER COLUMN id SET DEFAULT gen_random_uuid();

ALTER TABLE public.devices
  ALTER COLUMN id SET NOT NULL;


-- ------------------------------------------------------------------------------
-- Replace legacy PRIMARY KEY(user_id) with PRIMARY KEY(id)
-- ------------------------------------------------------------------------------

DO $$
DECLARE
  current_pk_column TEXT;
BEGIN

  SELECT a.attname
  INTO current_pk_column
  FROM pg_constraint c
  JOIN unnest(c.conkey) WITH ORDINALITY AS cols(attnum, ordinality)
    ON TRUE
  JOIN pg_attribute a
    ON a.attrelid = c.conrelid
   AND a.attnum = cols.attnum
  WHERE c.conrelid = 'public.devices'::regclass
    AND c.contype = 'p'
  ORDER BY cols.ordinality
  LIMIT 1;

  IF current_pk_column = 'user_id' THEN
    ALTER TABLE public.devices
      DROP CONSTRAINT devices_pkey;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.devices'::regclass
      AND contype = 'p'
  ) THEN
    ALTER TABLE public.devices
      ADD CONSTRAINT devices_pkey PRIMARY KEY (id);
  END IF;

END
$$;


-- ------------------------------------------------------------------------------
-- WebCrypto public key
-- ------------------------------------------------------------------------------

ALTER TABLE public.devices
  ADD COLUMN IF NOT EXISTS public_key TEXT;


-- ------------------------------------------------------------------------------
-- Device status
-- ------------------------------------------------------------------------------

ALTER TABLE public.devices
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active';


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.devices'::regclass
      AND conname = 'devices_status_check'
  ) THEN

    ALTER TABLE public.devices
      ADD CONSTRAINT devices_status_check
      CHECK (status IN ('active', 'revoked'));

  END IF;
END
$$;


-- ------------------------------------------------------------------------------
-- Legacy token compatibility
-- ------------------------------------------------------------------------------

ALTER TABLE public.devices
  ADD COLUMN IF NOT EXISTS device_token_hash TEXT;


-- Old table has device_token TEXT NOT NULL.
-- New cryptographic registrations may not use it, so it must become nullable.

ALTER TABLE public.devices
  ALTER COLUMN device_token DROP NOT NULL;


-- ------------------------------------------------------------------------------
-- One ACTIVE device per account
--
-- Revoked historical devices may remain in the table, but only one row for a
-- user can have status='active'.
-- ------------------------------------------------------------------------------

CREATE UNIQUE INDEX IF NOT EXISTS uq_devices_one_active_per_user
  ON public.devices(user_id)
  WHERE status = 'active';


CREATE INDEX IF NOT EXISTS idx_devices_user_status
  ON public.devices(user_id, status);


-- ==============================================================================
-- DEVICE RLS
-- ==============================================================================

ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;


-- Remove legacy policies from the older device-token implementation.

DROP POLICY IF EXISTS "Users can view their own devices"
  ON public.devices;

DROP POLICY IF EXISTS "Users can view own device"
  ON public.devices;

DROP POLICY IF EXISTS "Entitled users can register first device"
  ON public.devices;

DROP POLICY IF EXISTS "No direct device mutations from client"
  ON public.devices;


-- Authenticated users may inspect their own registered devices.
-- Registration / transfer / revocation is handled by Edge Functions.

CREATE POLICY "Users can view their own devices"
  ON public.devices
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);


-- ==============================================================================
-- 2. DEVICE CHALLENGES
--
-- A short-lived random challenge is created server-side.
-- Browser signs it using its non-exportable WebCrypto private key.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.device_challenges (

  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  device_id UUID NOT NULL
    REFERENCES public.devices(id)
    ON DELETE CASCADE,

  challenge TEXT NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  expires_at TIMESTAMPTZ NOT NULL
    DEFAULT (NOW() + INTERVAL '30 seconds'),

  used_at TIMESTAMPTZ

);


CREATE INDEX IF NOT EXISTS idx_challenges_user_device
  ON public.device_challenges(user_id, device_id);

CREATE INDEX IF NOT EXISTS idx_challenges_expiry
  ON public.device_challenges(expires_at);


ALTER TABLE public.device_challenges ENABLE ROW LEVEL SECURITY;


DROP POLICY IF EXISTS "Users can read their own challenges"
  ON public.device_challenges;


CREATE POLICY "Users can read their own challenges"
  ON public.device_challenges
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);


-- INSERT / UPDATE / DELETE intentionally have no authenticated policy.
-- Edge Functions use the service role.


-- ==============================================================================
-- 3. STUDY SESSIONS
--
-- Successful device challenge verification creates a temporary study session.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.study_sessions (

  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  device_id UUID NOT NULL
    REFERENCES public.devices(id)
    ON DELETE CASCADE,

  session_token TEXT NOT NULL UNIQUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  expires_at TIMESTAMPTZ NOT NULL
    DEFAULT (NOW() + INTERVAL '4 hours'),

  revoked_at TIMESTAMPTZ

);


CREATE INDEX IF NOT EXISTS idx_sessions_user
  ON public.study_sessions(user_id);

CREATE INDEX IF NOT EXISTS idx_sessions_token
  ON public.study_sessions(session_token);

CREATE INDEX IF NOT EXISTS idx_sessions_device
  ON public.study_sessions(device_id);

CREATE INDEX IF NOT EXISTS idx_sessions_active_user
  ON public.study_sessions(user_id, expires_at)
  WHERE revoked_at IS NULL;


ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;


DROP POLICY IF EXISTS "Users can view their own study sessions"
  ON public.study_sessions;


CREATE POLICY "Users can view their own study sessions"
  ON public.study_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);


-- INSERT / UPDATE / DELETE intentionally have no authenticated policy.


-- ==============================================================================
-- 4. DEVICE TRANSFER REQUESTS
--
-- The earlier database does not currently contain this table, so create it
-- before adding approved_at.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.device_transfer_requests (

  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),

  requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  resolved_at TIMESTAMPTZ,

  approved_at TIMESTAMPTZ

);


ALTER TABLE public.device_transfer_requests
  ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;


UPDATE public.device_transfer_requests
SET approved_at = resolved_at
WHERE status = 'approved'
  AND approved_at IS NULL;


CREATE INDEX IF NOT EXISTS idx_transfers_user_approved
  ON public.device_transfer_requests(user_id, approved_at DESC NULLS LAST);

CREATE INDEX IF NOT EXISTS idx_transfers_user_status
  ON public.device_transfer_requests(user_id, status);


ALTER TABLE public.device_transfer_requests ENABLE ROW LEVEL SECURITY;


DROP POLICY IF EXISTS "Users can view their own device transfer requests"
  ON public.device_transfer_requests;


CREATE POLICY "Users can view their own device transfer requests"
  ON public.device_transfer_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);


-- Transfer creation/approval/rejection should happen through Edge Functions.


-- ==============================================================================
-- 5. PRIVATE STORAGE ACCESS
--
-- Requirements:
--   1. authenticated user
--   2. active ATP entitlement
--   3. active, non-expired study session
-- ==============================================================================

DROP POLICY IF EXISTS "Entitled users can read study-materials objects"
  ON storage.objects;


CREATE POLICY "Entitled users can read study-materials objects"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (

    bucket_id = 'study-materials'

    AND EXISTS (

      SELECT 1
      FROM public.entitlements e

      WHERE e.user_id = auth.uid()

        AND e.product_id = 'atp_complete'

        AND e.status = 'active'

    )

    AND EXISTS (

      SELECT 1
      FROM public.study_sessions ss

      WHERE ss.user_id = auth.uid()

        AND ss.revoked_at IS NULL

        AND ss.expires_at > NOW()

    )

  );


-- ==============================================================================
-- 6. HELPER: ACTIVE DEVICE
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.has_active_device(
  p_user_id UUID DEFAULT auth.uid()
)

RETURNS BOOLEAN

LANGUAGE sql

STABLE

SECURITY DEFINER

SET search_path = public

AS $$

  SELECT EXISTS (

    SELECT 1

    FROM public.devices

    WHERE user_id = p_user_id

      AND status = 'active'

  );

$$;


-- ==============================================================================
-- 7. HELPER: ACTIVE STUDY SESSION
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.has_active_session(
  p_user_id UUID DEFAULT auth.uid()
)

RETURNS BOOLEAN

LANGUAGE sql

STABLE

SECURITY DEFINER

SET search_path = public

AS $$

  SELECT EXISTS (

    SELECT 1

    FROM public.study_sessions

    WHERE user_id = p_user_id

      AND revoked_at IS NULL

      AND expires_at > NOW()

  );

$$;


-- ==============================================================================
-- 8. CLEANUP EXPIRED DEVICE CHALLENGES
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.cleanup_expired_challenges()

RETURNS INTEGER

LANGUAGE plpgsql

SECURITY DEFINER

SET search_path = public

AS $$

DECLARE

  deleted_count INTEGER;

BEGIN

  DELETE FROM public.device_challenges

  WHERE expires_at < NOW() - INTERVAL '5 minutes';

  GET DIAGNOSTICS deleted_count = ROW_COUNT;

  RETURN deleted_count;

END;

$$;


-- Only trusted server-side code should run the cleanup function.

REVOKE ALL
  ON FUNCTION public.cleanup_expired_challenges()
  FROM PUBLIC;

GRANT EXECUTE
  ON FUNCTION public.cleanup_expired_challenges()
  TO service_role;


-- ==============================================================================
-- COMPLETE
-- ==============================================================================

COMMIT;