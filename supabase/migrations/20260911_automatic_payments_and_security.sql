-- ==============================================================================
-- ATP REVISION VAULT: AUTOMATIC PAYMENTS, ENTITLEMENTS, DEVICES & STORAGE SECURITY
-- ==============================================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL, -- in INR (e.g. 49)
  currency TEXT NOT NULL DEFAULT 'INR',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed ATP Complete Revision Pack
INSERT INTO public.products (id, name, price, currency, description)
VALUES (
  'atp_complete',
  'ATP Complete Revision Pack',
  49,
  'INR',
  'Complete revision companion: Simplified Notes, PYQ Vault, Last-Minute Sheets, Important Questions, and Quick Recall.'
)
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description;

-- Enable RLS on products (anyone can view products, only admin can modify)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view products" ON public.products;
CREATE POLICY "Public can view products"
  ON public.products FOR SELECT
  USING (true);


-- 2. ORDERS TABLE (Razorpay Order Tracking)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES public.products(id),
  gateway_order_id TEXT UNIQUE NOT NULL, -- Razorpay order_id (order_...)
  gateway_payment_id TEXT, -- Razorpay payment_id (pay_...)
  amount INTEGER NOT NULL DEFAULT 49, -- Amount in INR
  amount_paise INTEGER NOT NULL DEFAULT 4900, -- Amount in paise
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'created', -- 'created', 'paid', 'failed', 'refunded'
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_gateway_order_id ON public.orders(gateway_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can view their own orders
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);


-- 3. ENTITLEMENTS TABLE (Trusted Server-Side Access State)
CREATE TABLE IF NOT EXISTS public.entitlements (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  payment_id TEXT, -- Gateway payment reference
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'revoked', 'expired'
  activated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_entitlements_user_product ON public.entitlements(user_id, product_id, status);

ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;

-- Users can view their own entitlements
DROP POLICY IF EXISTS "Users can view their own entitlements" ON public.entitlements;
CREATE POLICY "Users can view their own entitlements"
  ON public.entitlements FOR SELECT
  USING (auth.uid() = user_id);

-- Mutations are strictly restricted to service_role (Edge Functions)


-- 4. DEVICES TABLE (Single-Device Binding System)
CREATE TABLE IF NOT EXISTS public.devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_token_hash TEXT NOT NULL, -- SHA-256 hash of random client token
  device_name TEXT,
  activated_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(user_id, device_token_hash)
);

CREATE INDEX IF NOT EXISTS idx_devices_user ON public.devices(user_id);
CREATE INDEX IF NOT EXISTS idx_devices_user_active ON public.devices(user_id, is_active);

ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own devices" ON public.devices;
CREATE POLICY "Users can view their own devices"
  ON public.devices FOR SELECT
  USING (auth.uid() = user_id);


-- 5. DEVICE TRANSFER REQUESTS TABLE (Controlled Re-activation Flow)
CREATE TABLE IF NOT EXISTS public.device_transfer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  old_device_id UUID REFERENCES public.devices(id),
  new_device_token_hash TEXT NOT NULL,
  new_device_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  reason TEXT,
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_device_transfers_user ON public.device_transfer_requests(user_id);

ALTER TABLE public.device_transfer_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view and request transfers" ON public.device_transfer_requests;
CREATE POLICY "Users can view and request transfers"
  ON public.device_transfer_requests FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- 6. MATERIALS TABLE (Study Resource Metadata & Storage Mapping)
CREATE TABLE IF NOT EXISTS public.materials (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'notes', 'pyq', 'revision', 'important', 'recall'
  storage_path TEXT NOT NULL, -- Path inside private 'study-materials' bucket
  module_number TEXT NOT NULL,
  summary TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Initial Material Definitions
INSERT INTO public.materials (id, title, category, storage_path, module_number, summary, sort_order)
VALUES
  ('notes_complete', 'Simplified Concept Notes (Complete)', 'notes', 'notes/atp_simplified_notes.pdf', '01', 'Complete conceptual foundations across all 14 syllabus chapters.', 1),
  ('pyq_vault', 'Previous Year Questions (Solved Bank)', 'pyq', 'pyq/atp_pyq_solved_bank.pdf', '02', '50+ solved exam questions categorised by 2, 5 and 10 mark weightage.', 2),
  ('last_minute', 'Last-Minute Revision Sheets (24-Hour Sprint)', 'revision', 'revision/atp_last_minute_sprint.pdf', '03', 'Condensed summary sheets and golden rules for the night before.', 3),
  ('important_q', 'Important Questions (Priority Matrix)', 'important', 'important/atp_priority_matrix.pdf', '04', 'Curated high-probability topics and repeated examination patterns.', 4),
  ('quick_recall', 'Quick Recall Material (Final Morning Triggers)', 'recall', 'recall/atp_quick_recall_deck.pdf', '05', 'Fast formula decks and definitions for rapid morning review.', 5)
ON CONFLICT (id) DO UPDATE
SET title = EXCLUDED.title, storage_path = EXCLUDED.storage_path, summary = EXCLUDED.summary;

ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

-- Only users with an active entitlement for atp_complete can view materials
DROP POLICY IF EXISTS "Active entitlement holders can view materials" ON public.materials;
CREATE POLICY "Active entitlement holders can view materials"
  ON public.materials FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.entitlements
      WHERE entitlements.user_id = auth.uid()
        AND entitlements.product_id = 'atp_complete'
        AND entitlements.status = 'active'
    )
  );


-- 7. STORAGE BUCKET CONFIGURATION (Private study-materials Bucket)
-- Ensure the private bucket exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'study-materials',
  'study-materials',
  false, -- STRICTLY PRIVATE
  52428800, -- 50MB limit per file
  ARRAY['application/pdf', 'application/octet-stream']
)
ON CONFLICT (id) DO UPDATE
SET public = false;

-- Storage RLS: Deny public reads. Service role generates signed URLs.
-- If direct storage queries are made by authenticated clients:
DROP POLICY IF EXISTS "Entitled users can read study-materials objects" ON storage.objects;
CREATE POLICY "Entitled users can read study-materials objects"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'study-materials'
    AND EXISTS (
      SELECT 1 FROM public.entitlements
      WHERE entitlements.user_id = auth.uid()
        AND entitlements.product_id = 'atp_complete'
        AND entitlements.status = 'active'
    )
  );

-- Helper function: Check if current user has active entitlement
CREATE OR REPLACE FUNCTION public.has_active_entitlement(p_product_id TEXT DEFAULT 'atp_complete')
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.entitlements
    WHERE user_id = auth.uid()
      AND product_id = p_product_id
      AND status = 'active'
  );
$$;
