-- Upsert Module 3 Core Lessons
INSERT INTO public.python_course_lessons (id, is_free_preview, is_premium, content)
VALUES
(
  'm3-meet-for-loop',
  false,
  true,
  '{
    "version": 1,
    "intro": {
      "title": "Meet the for Loop",
      "eyebrow": "MODULE 3 · LEVEL 9",
      "description": "Learn how to repeat actions efficiently.",
      "estimatedMinutes": 8
    },
    "skillTags": ["for-loop"],
    "objectives": [
      "Understand why loops are necessary.",
      "See a for loop in action."
    ],
    "sections": [
      {
        "id": "intro-1",
        "type": "explanation",
        "content": "Imagine you wanted to print the numbers 1 to 5. You could write `print(1)`, `print(2)`, etc. But what if you wanted to print up to 1,000?\n\nA `for` loop lets you repeat a block of code easily."
      },
      {
        "id": "visualizer-1",
        "type": "loop-visualizer",
        "content": {
          "config": {
            "variable": "i",
            "steps": [
              { "iteration": 1, "variables": { "i": 0 }, "output": "0" },
              { "iteration": 2, "variables": { "i": 1 }, "output": "0\n1" },
              { "iteration": 3, "variables": { "i": 2 }, "output": "0\n1\n2" },
              { "iteration": 4, "variables": { "i": 3 }, "output": "0\n1\n2\n3" },
              { "iteration": 5, "variables": { "i": 4 }, "output": "0\n1\n2\n3\n4" }
            ]
          }
        }
      },
      {
        "id": "practice-1",
        "type": "code-practice",
        "content": {
          "instruction": "Write a for loop that prints the numbers from 0 to 2 using range(3).",
          "prefill": "for i in range(3):\n    ",
          "expectedOutput": ["0\n1\n2"]
        }
      }
    ],
    "quickRecap": {
      "keyIdea": "Loops run the same block of code multiple times.",
      "example": "for i in range(3): print(i)",
      "remember": "Python uses indentation (spaces) to know which lines are inside the loop."
    },
    "checkpoint": {
      "passingScore": 100,
      "questions": [
        {
          "id": "q1",
          "question": "If you write `for i in range(5):`, how many times does the loop run?",
          "options": ["4", "5", "6", "It runs forever"],
          "correctAnswer": 1,
          "explanation": "range(5) generates 5 numbers (0, 1, 2, 3, 4), so the loop runs exactly 5 times."
        }
      ]
    }
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  content = EXCLUDED.content,
  is_free_preview = EXCLUDED.is_free_preview,
  is_premium = EXCLUDED.is_premium;
