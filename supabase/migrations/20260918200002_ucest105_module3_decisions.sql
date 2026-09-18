-- SQL Migration: 20260918200002_ucest105_module3.sql
-- Module 3: Selection, Iteration, Sequences, NumPy, Functions, Decomposition, and Recursion
-- Full teaching content with interactive visualizers, code practice, and checkpoints.

INSERT INTO public.python_course_lessons (id, module_number, level_number, lesson_order, title, estimated_minutes, skill_tags, is_free_preview, active, content)
VALUES
-- Level 8: Decisions
(
  'm3-boolean-decisions', 3, 8, 1, 'Why Programs Need Decisions', 6, ARRAY['decision'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Making Choices in Code",
        "content": "Up until now, our code ran line by line from top to bottom (Sequential Flow). But real life requires decisions!\n\nFor example:\n- IF score >= 40 THEN pass, ELSE fail.\n- IF battery < 15% THEN show warning.\n\nIn Python, decisions allow programs to branch and execute different blocks of code based on conditions."
      }
    },
    {
      "id": "c1",
      "type": "concept-card",
      "content": {
        "title": "Control Flow: Selection",
        "icon": "🔀",
        "content": "Selection is the control structure where the computer evaluates a condition (True or False) and decides which path to follow."
      }
    },
    {
      "id": "p1",
      "type": "predict-output",
      "content": {
        "question": "What is the result of evaluating if a number 10 is greater than 5?",
        "options": ["True", "False", "Error", "None"],
        "correctAnswer": 0,
        "explanation": "10 > 5 is mathematically correct, so Python evaluates it to True."
      }
    }
  ]'::jsonb
),
(
  'm3-boolean-conditions', 3, 8, 2, 'Boolean Conditions', 6, ARRAY['decision'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Boolean Type and Comparison Operators",
        "content": "A Boolean value is either True or False.\n\nPython comparison operators:\n- == (Equal to)\n- != (Not equal to)\n- > (Greater than)\n- < (Less than)\n- >= (Greater than or equal to)\n- <= (Less than or equal to)\n\nNote: Double equals == compares values. Single equals = assigns a value!"
      }
    },
    {
      "id": "w1",
      "type": "worked-example",
      "content": {
        "title": "Checking Conditions",
        "code": "age = 18\nis_adult = age >= 18\nprint(is_adult)  # Output: True\n\nprint(5 == 5)   # True\nprint(5 != 5)   # False",
        "explanation": "Comparison expressions produce Boolean values True or False."
      }
    },
    {
      "id": "ex1",
      "type": "fill-code",
      "content": {
        "instruction": "Fill in the operator to check if total is equal to 100:",
        "codeTemplate": "total = 100\nprint(total ___ 100)",
        "blankAnswer": "==",
        "explanation": "Use == to test equality."
      }
    }
  ]'::jsonb
),
(
  'm3-if', 3, 8, 3, 'Meet if', 5, ARRAY['decision'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "The if Statement Structure",
        "content": "An `if` statement executes a block of code ONLY if its condition is True.\n\nSyntax:\nif condition:\n    # indented code block\n\nIndentation (4 spaces) is MANDATORY in Python!"
      }
    },
    {
      "id": "cp1",
      "type": "code-practice",
      "content": {
        "instruction": "Write an if statement to print 'Positive' if x is greater than 0.",
        "starterCode": "x = 15\n# Write your if statement below\n",
        "solutionCode": "x = 15\nif x > 0:\n    print('Positive')",
        "testCases": [
          { "input": "", "expectedOutput": "Positive" }
        ]
      }
    }
  ]'::jsonb
),
(
  'm3-if-else', 3, 8, 4, 'if-else', 5, ARRAY['decision'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Two-Way Branching with if-else",
        "content": "When a condition is False, the `else` block runs.\n\nExample:\nif num % 2 == 0:\n    print('Even')\nelse:\n    print('Odd')"
      }
    },
    {
      "id": "cp1",
      "type": "code-practice",
      "content": {
        "instruction": "Complete the program to print 'Pass' if marks >= 40, otherwise print 'Fail'.",
        "starterCode": "marks = 35\nif marks >= 40:\n    print('Pass')\nelse:\n    print('Fail')",
        "solutionCode": "marks = 35\nif marks >= 40:\n    print('Pass')\nelse:\n    print('Fail')",
        "testCases": [
          { "input": "", "expectedOutput": "Fail" }
        ]
      }
    }
  ]'::jsonb
),
(
  'm3-if-elif-else', 3, 8, 5, 'elif', 6, ARRAY['decision'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Multi-Way Branching with elif",
        "content": "Use `elif` (short for else if) when you have multiple mutually exclusive conditions.\n\nExample:\nif marks >= 90:\n    print('Grade S')\nelif marks >= 80:\n    print('Grade A')\nelif marks >= 70:\n    print('Grade B')\nelse:\n    print('Grade F')"
      }
    },
    {
      "id": "mc1",
      "type": "multiple-choice",
      "content": {
        "question": "If marks = 85, which branch executes first?",
        "options": ["if marks >= 90", "elif marks >= 80", "else", "All branches"],
        "correctAnswer": 1,
        "explanation": "85 < 90 so if fails. 85 >= 80 is True, so 'elif marks >= 80' runs and subsequent branches are skipped."
      }
    }
  ]'::jsonb
),
(
  'm3-combined-conditions', 3, 8, 6, 'Combining Conditions', 7, ARRAY['decision', 'operator'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Logical Operators: and, or, not",
        "content": "Combine multiple conditions:\n- `and`: True if BOTH conditions are True.\n- `or`: True if AT LEAST ONE condition is True.\n- `not`: Inverts True to False and vice versa."
      }
    },
    {
      "id": "w1",
      "type": "worked-example",
      "content": {
        "title": "Validating Triangle Sides",
        "code": "a, b, c = 3, 4, 5\nif (a + b > c) and (a + c > b) and (b + c > a):\n    print('Valid Triangle')\nelse:\n    print('Invalid')",
        "explanation": "A triangle is valid if the sum of any two sides is strictly greater than the third."
      }
    }
  ]'::jsonb
),
(
  'm3-decision-checkpoint', 3, 8, 7, 'Decisions Checkpoint', 8, ARRAY['decision'], false, true,
  '[
    {
      "id": "quiz1",
      "type": "checkpoint-quiz",
      "content": {
        "passingScore": 70,
        "questions": [
          {
            "id": "q1",
            "question": "Which operator tests for value equality in Python?",
            "options": ["=", "==", "===", "is"],
            "correctAnswer": 1,
            "explanation": "== tests equality."
          },
          {
            "id": "q2",
            "question": "What is printed by: if 5 > 10: print('A') else: print('B')?",
            "options": ["A", "B", "SyntaxError", "Nothing"],
            "correctAnswer": 1,
            "explanation": "5 > 10 is False, so the else branch prints B."
          },
          {
            "id": "q3",
            "question": "Which logical operator returns True only when both conditions are True?",
            "options": ["or", "not", "and", "xor"],
            "correctAnswer": 2,
            "explanation": "The 'and' operator requires both conditions to be True."
          }
        ]
      }
    }
  ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  module_number = EXCLUDED.module_number,
  level_number = EXCLUDED.level_number,
  lesson_order = EXCLUDED.lesson_order,
  title = EXCLUDED.title,
  estimated_minutes = EXCLUDED.estimated_minutes,
  skill_tags = EXCLUDED.skill_tags,
  is_free_preview = EXCLUDED.is_free_preview,
  active = EXCLUDED.active,
  content = EXCLUDED.content;
