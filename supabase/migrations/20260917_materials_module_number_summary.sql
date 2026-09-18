-- Add module_number and summary to materials
ALTER TABLE public.materials
ADD COLUMN IF NOT EXISTS module_number integer,
ADD COLUMN IF NOT EXISTS summary text;

-- Set module_number = 1 for existing active material id = 3
UPDATE public.materials
SET module_number = 1
WHERE id = 3;
