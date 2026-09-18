-- Migration: Python Learning Progress & Free Materials Flag

-- 1. Create progress tracking table
CREATE TABLE IF NOT EXISTS public.python_learning_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id text NOT NULL,
  status text NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  best_score integer DEFAULT 0,
  attempts integer DEFAULT 0,
  last_opened_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Enable RLS for progress
ALTER TABLE public.python_learning_progress ENABLE ROW LEVEL SECURITY;

-- Progress Policies
CREATE POLICY "Users can view own progress" 
ON public.python_learning_progress FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" 
ON public.python_learning_progress FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" 
ON public.python_learning_progress FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- 2. Add is_free flag to materials
ALTER TABLE public.materials ADD COLUMN IF NOT EXISTS is_free boolean DEFAULT false;

-- Grant permissions for new table to authenticated users and service_role
GRANT SELECT, INSERT, UPDATE ON TABLE public.python_learning_progress TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.python_learning_progress TO service_role;
