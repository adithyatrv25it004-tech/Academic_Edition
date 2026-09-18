-- Upsert Module 1 Lessons for UCEST105 Syllabus
INSERT INTO public.python_course_lessons (id, module_number, level_number, lesson_order, title, estimated_minutes, skill_tags, is_free_preview, active, content)
VALUES
(
  'm1-problem-solving-intro',
  1, 1, 1, 'Problem Solving Strategies', 10, ARRAY['Problem Solving'], true, true,
  '[
    {
      "id": "intro-1",
      "type": "teacher-explanation",
      "content": {
        "title": "Welcome to ATP Python Journey!",
        "content": "Before we touch Python, we must understand *thinking*. A computer is just a fast calculator. It doesn''t solve problems—*you* do.\\n\\nA strategy is a plan of action to achieve a goal. Let''s look at common problem-solving strategies."
      }
    },
    {
      "id": "concept-1",
      "type": "concept-card",
      "content": {
        "title": "Trial and Error",
        "icon": "🔄",
        "content": "Trying possible solutions sequentially until one works. Good for simple problems (e.g. guessing a 3-digit lock), but terrible for complex ones."
      }
    },
    {
      "id": "concept-2",
      "type": "concept-card",
      "content": {
        "title": "Heuristics & Means-Ends Analysis",
        "icon": "🧠",
        "content": "Heuristics are ''rules of thumb'' that generally work but aren''t guaranteed. Means-Ends Analysis involves breaking a problem down into smaller sub-problems to reduce the difference between the current state and the goal state."
      }
    },
    {
      "id": "concept-3",
      "type": "concept-card",
      "content": {
        "title": "Working Backward (Backtracking)",
        "icon": "🔙",
        "content": "Starting at the goal and working backwards to the initial state. Excellent for mazes or finding the shortest path home."
      }
    },
    {
      "id": "practice-1",
      "type": "multiple-choice",
      "content": {
        "question": "Which strategy would you use to solve a maze by starting at the exit?",
        "options": ["Trial and Error", "Heuristics", "Working Backward", "Means-Ends Analysis"],
        "correctAnswer": 2,
        "explanation": "Starting at the goal and moving to the start is the definition of Working Backward."
      }
    }
  ]'::jsonb
),
(
  'm1-problem-solving-process',
  1, 2, 1, 'The Problem Solving Process', 12, ARRAY['Algorithms'], false, true,
  '[
    {
      "id": "intro-1",
      "type": "teacher-explanation",
      "content": {
        "title": "How do we talk to computers?",
        "content": "A computer is a model of computation. It blindly follows instructions. To make it solve our problem, we must follow a strict process:\\n\\n1. Understand the problem\\n2. Formulate a model\\n3. Develop an algorithm\\n4. Write the program\\n5. Test the program\\n6. Evaluate the solution"
      }
    },
    {
      "id": "concept-1",
      "type": "concept-card",
      "content": {
        "title": "Well-Defined vs Ill-Defined Problems",
        "icon": "🎯",
        "content": "**Well-Defined**: Clear starting state, clear goal, clear rules. (e.g. Tower of Hanoi)\\n**Ill-Defined**: Unclear goal or missing information. (e.g. ''Make a good game'').\\nComputers need well-defined problems."
      }
    },
    {
      "id": "practice-1",
      "type": "algorithm-reorder",
      "content": {
        "blocks": [
          {"id": "b4", "text": "Write the program"},
          {"id": "b1", "text": "Understand the problem"},
          {"id": "b5", "text": "Test the program"},
          {"id": "b3", "text": "Develop an algorithm"},
          {"id": "b6", "text": "Evaluate the solution"},
          {"id": "b2", "text": "Formulate a model"}
        ],
        "correctOrder": ["b1", "b2", "b3", "b4", "b5", "b6"]
      }
    }
  ]'::jsonb
),
(
  'm1-first-python',
  1, 3, 1, 'Your First Python Program', 10, ARRAY['Python Basics'], true, true,
  '[
    {
      "id": "intro-1",
      "type": "teacher-explanation",
      "content": {
        "title": "Time to Code!",
        "content": "Python is a language that tells the computer what to do. The simplest command is `print()`, which displays text on the screen."
      }
    },
    {
      "id": "concept-1",
      "type": "concept-card",
      "content": {
        "title": "The print() function",
        "icon": "🖨️",
        "content": "The word `print` is the instruction. We put the message inside parentheses `()` and quotes `\"\"`.\\nExample: `print(\"Hello World\")`"
      }
    },
    {
      "id": "practice-1",
      "type": "code-practice",
      "content": {
        "instruction": "Try it yourself! Change the message to say hello to the world.",
        "prefill": "print(\"Hello, Python!\")",
        "expectedOutput": ["Hello, World!", "hello world", "Hello world!"]
      }
    },
    {
      "id": "predict-1",
      "type": "predict-output",
      "content": {
        "instruction": "What will this code print?",
        "code": "print(\"ATP\")\nprint(\"Rocks\")",
        "expectedOutput": "ATP\nRocks",
        "explanation": "Each print statement automatically moves to a new line."
      }
    }
  ]'::jsonb
),
(
  'm1-variables',
  1, 4, 1, 'Variables & Numeric Types', 12, ARRAY['Variables', 'Data Types'], false, true,
  '[
    {
      "id": "intro-1",
      "type": "teacher-explanation",
      "content": {
        "title": "Variables are Labels",
        "content": "A variable is like a sticky note attached to a piece of data. Instead of remembering the number 18, you can create a variable named `age` and set it to 18.\\n\\nIn Python, you create a variable using the `=` sign. Name on left, value on right."
      }
    },
    {
      "id": "trace-1",
      "type": "variable-trace",
      "content": {
        "config": {
          "title": "Numeric Data Types",
          "steps": [
            { "code": "age = 18", "variables": { "age": 18 }, "description": "This is an integer (int) - a whole number." },
            { "code": "pi = 3.14", "variables": { "age": 18, "pi": 3.14 }, "description": "This is a floating-point number (float) - a decimal." },
            { "code": "c = 2 + 3j", "variables": { "age": 18, "pi": 3.14, "c": "2+3j" }, "description": "This is a complex number (complex) - used in advanced math." }
          ]
        }
      }
    },
    {
      "id": "practice-1",
      "type": "fill-code",
      "content": {
        "instruction": "Create a variable named `score` and set it to 100.",
        "parts": [
          { "id": "p1", "answer": "score" },
          " = ",
          { "id": "p2", "answer": "100" }
        ],
        "explanation": "Perfect! You assigned the integer 100 to the variable score."
      }
    }
  ]'::jsonb
),
(
  'm1-strings-io',
  1, 5, 1, 'Strings, Input & Output', 10, ARRAY['Strings', 'Input'], false, true,
  '[
    {
      "id": "intro-1",
      "type": "teacher-explanation",
      "content": {
        "title": "Talking back to the computer",
        "content": "A String is text. It must be wrapped in quotes. \\n\\nWe''ve used `print()` for output. Now let''s use `input()` to get information *from* the user."
      }
    },
    {
      "id": "example-1",
      "type": "worked-example",
      "content": {
        "title": "Greeting the user",
        "problem": "Write a program that asks for the user''s name and says hello to them.",
        "steps": [
          "Ask the user for their name using input() and store it in a variable.",
          "Use print() to combine ''Hello '' and the variable."
        ],
        "finalAnswer": "name = input(\"What is your name? \")\nprint(\"Hello \" + name)"
      }
    },
    {
      "id": "practice-1",
      "type": "code-practice",
      "content": {
        "instruction": "Write a program that asks for a favorite color and prints it out. (Use \"blue\" as the input to pass the check).",
        "prefill": "color = \"blue\"\n# Write print statement below\n",
        "expectedOutput": ["blue", "Your favorite color is blue"]
      }
    }
  ]'::jsonb
),
(
  'm1-operators-math',
  1, 6, 1, 'Operators & Math Module', 15, ARRAY['Operators', 'Math'], false, true,
  '[
    {
      "id": "intro-1",
      "type": "teacher-explanation",
      "content": {
        "title": "Doing Math in Python",
        "content": "Python is a powerful calculator.\\n\\n`+` Add\\n`-` Subtract\\n`*` Multiply\\n`/` Divide (returns float)\\n`//` Integer Divide (drops decimal)\\n`%` Modulo (remainder)\\n`**` Exponent (power)\\n\\nOperator precedence follows PEMDAS."
      }
    },
    {
      "id": "concept-1",
      "type": "concept-card",
      "content": {
        "title": "The Math Module",
        "icon": "📐",
        "content": "For advanced math (like square roots or trigonometry), Python has a standard library module called `math`. You must `import math` to use it."
      }
    },
    {
      "id": "practice-1",
      "type": "code-practice",
      "content": {
        "instruction": "Import the math module and print the square root of 16 using math.sqrt().",
        "prefill": "# Import math here\n\n# Print the square root of 16\n",
        "expectedOutput": ["4.0"]
      }
    },
    {
      "id": "practice-2",
      "type": "multiple-choice",
      "content": {
        "question": "What is the result of 10 % 3?",
        "options": ["3.33", "3", "1", "10"],
        "correctAnswer": 2,
        "explanation": "The modulo operator (%) returns the remainder of a division. 10 divided by 3 is 3 with a remainder of 1."
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
