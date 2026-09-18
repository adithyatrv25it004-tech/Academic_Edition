-- Upsert Module 2 Lessons for UCEST105 Syllabus
INSERT INTO public.python_course_lessons (id, module_number, level_number, lesson_order, title, estimated_minutes, skill_tags, is_free_preview, active, content)
VALUES
(
  'm2-algorithm-pseudocode',
  2, 1, 1, 'Algorithms & Pseudocode', 12, ARRAY['Algorithms', 'Pseudocode'], false, true,
  '[
    {
      "id": "intro-1",
      "type": "teacher-explanation",
      "content": {
        "title": "What is an Algorithm?",
        "content": "An algorithm is a step-by-step procedure to solve a problem. Think of it like a recipe. If you follow the steps exactly, you will bake the cake.\\n\\nBut how do we write it down? Code is too strict. English is too loose. We use **Pseudocode**."
      }
    },
    {
      "id": "concept-1",
      "type": "concept-card",
      "content": {
        "title": "Why Pseudocode?",
        "icon": "📝",
        "content": "Pseudocode uses structural conventions of a normal programming language, but is intended for human reading rather than machine reading. It helps programmers plan the logic before worrying about Python syntax errors."
      }
    },
    {
      "id": "practice-1",
      "type": "pseudocode-builder",
      "content": {
        "availableBlocks": [
          { "id": "b1", "text": "PRINT interest" },
          { "id": "b2", "text": "READ principal, rate, time" },
          { "id": "b3", "text": "SET interest = (principal * rate * time) / 100" }
        ],
        "correctOrder": [
          { "id": "b2", "indent": 0 },
          { "id": "b3", "indent": 0 },
          { "id": "b1", "indent": 0 }
        ]
      }
    }
  ]'::jsonb
),
(
  'm2-control-structures',
  2, 2, 1, 'Control Structures', 15, ARRAY['Logic', 'Selection', 'Repetition'], false, true,
  '[
    {
      "id": "intro-1",
      "type": "teacher-explanation",
      "content": {
        "title": "Directing the Flow",
        "content": "Algorithms flow from top to bottom. But sometimes we need to skip steps or repeat them. We use three basic control structures:\\n\\n1. **Sequence** (do this, then that)\\n2. **Selection** (if this is true, do this, else do that)\\n3. **Repetition** (do this many times)"
      }
    },
    {
      "id": "concept-1",
      "type": "concept-card",
      "content": {
        "title": "Selection Types",
        "icon": "🔀",
        "content": "**If-Else**: Checks a condition. IF it''s raining, take an umbrella. ELSE, wear sunglasses.\\n**Case Structure**: Used when there are many specific conditions (e.g. Grades: S, A, B, C)."
      }
    },
    {
      "id": "concept-2",
      "type": "concept-card",
      "content": {
        "title": "Repetition Types",
        "icon": "🔁",
        "content": "**For loop**: Repeat a specific number of times.\\n**While loop**: Repeat as long as a condition is true.\\n**Repeat-Until**: Repeat until a condition becomes true."
      }
    },
    {
      "id": "practice-1",
      "type": "multiple-choice",
      "content": {
        "question": "Which repetition structure would you use if you know exactly how many times you want to run the loop (e.g. 10 times)?",
        "options": ["While loop", "For loop", "Repeat-Until", "If-Else"],
        "correctAnswer": 1,
        "explanation": "A ''for'' loop is designed for situations where the number of iterations is known."
      }
    }
  ]'::jsonb
),
(
  'm2-flowcharts',
  2, 3, 1, 'Flowcharts & Symbols', 15, ARRAY['Flowcharts'], false, true,
  '[
    {
      "id": "intro-1",
      "type": "teacher-explanation",
      "content": {
        "title": "Drawing Logic",
        "content": "A flowchart is a visual representation of an algorithm. Different shapes mean different things."
      }
    },
    {
      "id": "concept-1",
      "type": "concept-card",
      "content": {
        "title": "Required Symbols",
        "icon": "📐",
        "content": "**Oval**: Start/End\\n**Rectangle**: Process / Calculation\\n**Parallelogram**: Input / Output\\n**Diamond**: Decision (Yes/No)\\n**Hexagon**: For-loop initialization\\n**Circle/Shield**: Connectors"
      }
    },
    {
      "id": "practice-1",
      "type": "flowchart-builder",
      "content": {
        "availableBlocks": [
          { "id": "f1", "shape": "START_END", "text": "START" },
          { "id": "f2", "shape": "INPUT_OUTPUT", "text": "READ a, b" },
          { "id": "f3", "shape": "PROCESS", "text": "c = a + b" },
          { "id": "f4", "shape": "INPUT_OUTPUT", "text": "PRINT c" },
          { "id": "f5", "shape": "START_END", "text": "STOP" }
        ],
        "correctOrder": ["f1", "f2", "f3", "f4", "f5"]
      }
    }
  ]'::jsonb
),
(
  'm2-sample-problems',
  2, 4, 1, 'Algorithm Practice', 25, ARRAY['Algorithms', 'Pseudocode', 'Python Basics'], false, true,
  '[
    {
      "id": "intro-1",
      "type": "teacher-explanation",
      "content": {
        "title": "KTU Official Problems",
        "content": "Let''s solve some of the standard problems required in the syllabus. We will trace the logic and write the Python code."
      }
    },
    {
      "id": "example-1",
      "type": "worked-example",
      "content": {
        "title": "Problem 1: Larger of two numbers",
        "problem": "Given two numbers a and b, find the largest.",
        "steps": [
          "READ a, b",
          "IF a > b THEN PRINT a is larger",
          "ELSE PRINT b is larger"
        ]
      }
    },
    {
      "id": "practice-1",
      "type": "code-practice",
      "content": {
        "instruction": "Write the Python code to find the larger of a and b. Assume a = 10 and b = 20. Print the larger number.",
        "prefill": "a = 10\nb = 20\n# Write if-else below\n",
        "expectedOutput": ["20"]
      }
    },
    {
      "id": "practice-2",
      "type": "multiple-choice",
      "content": {
        "question": "If we wanted to find the smallest of three numbers (a, b, c), what is the first logical check?",
        "options": [
          "if a < b and a < c",
          "if a > b",
          "if c < a",
          "if a == b"
        ],
        "correctAnswer": 0,
        "explanation": "To check if ''a'' is the smallest of all three, it must be less than ''b'' AND less than ''c''."
      }
    }
  ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  content = EXCLUDED.content,
  is_free_preview = EXCLUDED.is_free_preview,
  module_number = EXCLUDED.module_number,
  level_number = EXCLUDED.level_number,
  lesson_order = EXCLUDED.lesson_order,
  title = EXCLUDED.title,
  active = EXCLUDED.active;
