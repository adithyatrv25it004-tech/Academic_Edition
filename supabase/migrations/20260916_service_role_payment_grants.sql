-- ==============================================================================
-- ATP REVISION VAULT: SERVICE_ROLE PERMISSIONS FOR PAYMENTS & ENTITLEMENTS
-- ==============================================================================
-- Grants minimum required DML permissions to service_role on payment and entitlement tables,
-- allowing Edge Functions using SUPABASE_SERVICE_ROLE_KEY to record orders and unlock access.

-- 1. Orders table permissions
GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLE public.orders
TO service_role;

-- 2. Entitlements table permissions
GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLE public.entitlements
TO service_role;

-- 3. Products table permissions
GRANT SELECT
ON TABLE public.products
TO service_role;

-- 4. Orders identity sequence permissions
GRANT USAGE, SELECT
ON SEQUENCE public.orders_id_seq
TO service_role;
