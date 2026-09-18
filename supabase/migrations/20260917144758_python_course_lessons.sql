CREATE TABLE public.python_course_lessons (
    id text primary key,
    module_number integer not null,
    level_number integer not null,
    lesson_order integer not null,
    title text not null,
    estimated_minutes integer not null,
    skill_tags text[],
    is_free_preview boolean default false,
    active boolean default true,
    content jsonb not null
);

-- Enable RLS (Service role bypasses RLS)
ALTER TABLE public.python_course_lessons ENABLE ROW LEVEL SECURITY;

-- No public RLS policies because this table is accessed securely via edge functions or Postgres functions.

-- Insert Module 1 lessons
INSERT INTO public.python_course_lessons (id, module_number, level_number, lesson_order, title, estimated_minutes, skill_tags, is_free_preview, active, content)
VALUES
('m1-problem-solving-intro', 1, 0, 1, 'What is Problem Solving?', 5, ARRAY['Problem Solving'], true, true, 
  '[{"type": "text", "content": "Welcome to ATP! Before we touch Python, we must understand *thinking*. A computer is just a fast calculator. It doesn''t solve problems—*you* do. The computer just follows your steps."}, {"type": "try", "question": "Who actually solves the problem when you write a program?", "options": ["The Computer", "The Programmer", "Python"], "correctAnswer": 1, "explanation": "You (the programmer) solve the problem by creating an algorithm. The computer merely executes it."}]'::jsonb),

('m1-first-python', 1, 1, 1, 'Your First Python Program', 8, ARRAY['Python Basics'], false, true, 
  '[{"type": "text", "content": "Let''s make the computer talk. In Python, we use the `print()` function to display text on the screen. Anything you want to print goes inside the parentheses. If it''s text, wrap it in quotes!"}, {"type": "code_practice", "instruction": "Use print() to say hello to the world.", "prefill": "print(''_____'')", "expectedOutput": ["hello world", "Hello World", "Hello, World!", "hello, world"]}]'::jsonb),

('m1-variables-intro', 1, 2, 1, 'Remembering Things with Variables', 10, ARRAY['Python Basics'], false, true, 
  '[{"type": "text", "content": "Think of a variable as a labeled box in the computer''s memory. You put data inside the box, and you write a name on the outside so you can find it later."}, {"type": "visualizer", "visualizerId": "VariableTrace", "config": {"steps": [{"code": "age = 18", "state": {"age": 18}}, {"code": "age = age + 1", "state": {"age": 19}}, {"code": "print(age)", "state": {"age": 19}, "output": "19"}]}}, {"type": "code_practice", "instruction": "Create a variable named `score` and give it the value 50. Then print it.", "prefill": "# Write your code below\\n\\n", "expectedOutput": ["50"]}]'::jsonb);
