-- ==============================================================================
-- ATP REVISION VAULT: AUTHENTICATED SELECT GRANT ON ENTITLEMENTS
-- ==============================================================================
-- Allows logged-in users to read their own entitlement records subject to RLS.
-- RLS policy "Users can view own entitlements" ensures users can ONLY see rows where auth.uid() = user_id.

GRANT SELECT
ON TABLE public.entitlements
TO authenticated;
