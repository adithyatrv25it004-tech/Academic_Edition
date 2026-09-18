-- ==============================================================================
-- ATP REVISION VAULT: DEVICES SCHEMA COMPATIBILITY & SERVICE_ROLE GRANTS
-- ==============================================================================

-- 1. Add missing device_name and last_seen_at columns to public.devices
ALTER TABLE public.devices
ADD COLUMN IF NOT EXISTS device_name text;

ALTER TABLE public.devices
ADD COLUMN IF NOT EXISTS last_seen_at timestamptz;

-- 2. Grant DML privileges on devices, device_challenges, and study_sessions to service_role
GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLE public.devices
TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLE public.device_challenges
TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLE public.study_sessions
TO service_role;
