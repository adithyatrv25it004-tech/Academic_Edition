-- Upsert Module 1 & 2 Lessons
INSERT INTO public.python_course_lessons (id, is_free_preview, is_premium, content)
VALUES
(
  'm1-first-python',
  true,
  false,
  '{
    "version": 1,
    "intro": {
      "title": "Your First Python Program",
      "eyebrow": "MODULE 1 · LEVEL 1",
      "description": "Write and run your first real Python code right in your browser.",
      "estimatedMinutes": 7
    },
    "skillTags": ["python", "input-output"],
    "objectives": [
      "Understand what the print function does.",
      "Write your first working Python program."
    ],
    "sections": [
      {
        "id": "intro-1",
        "type": "explanation",
        "content": "Python is a language that tells the computer what to do. One of the simplest and most common things we do is tell the computer to display a message on the screen.\n\nWe do this using the `print()` command. The word `print` is the instruction, and we put the message we want inside parentheses `()` and quotes `\"\"`."
      },
      {
        "id": "practice-1",
        "type": "code-practice",
        "content": {
          "instruction": "Try it yourself! Run the code below to see what happens, then change the message to say hello to your own name.",
          "prefill": "print(\"Hello, Python!\")",
          "expectedOutput": ["Hello, Python!", "Hello, adith!", "Hello, World!"]
        }
      },
      {
        "id": "checkpoint",
        "type": "checkpoint-quiz",
        "content": {
          "passingScore": 100,
          "questions": [
            {
              "id": "q1",
              "question": "What is the correct way to output the word 'Welcome' in Python?",
              "options": [
                "print(Welcome)",
                "print \"Welcome\"",
                "print(\"Welcome\")",
                "output(\"Welcome\")"
              ],
              "correctAnswer": 2,
              "explanation": "In Python, you must use print() with parentheses, and text must be enclosed in quotes."
            }
          ]
        }
      }
    ],
    "quickRecap": {
      "keyIdea": "Use `print(\"Message\")` to display text.",
      "example": "print(\"Hello\")",
      "remember": "Don''t forget the quotes around your text!"
    },
    "checkpoint": {
      "passingScore": 100,
      "questions": [
        {
          "id": "q1",
          "question": "What is the correct way to output the word 'Welcome' in Python?",
          "options": [
            "print(Welcome)",
            "print \"Welcome\"",
            "print(\"Welcome\")",
            "output(\"Welcome\")"
          ],
          "correctAnswer": 2,
          "explanation": "In Python, you must use print() with parentheses, and text must be enclosed in quotes."
        }
      ]
    }
  }'::jsonb
),
(
  'm1-variables',
  false,
  true,
  '{
    "version": 1,
    "intro": {
      "title": "Variables are Labels",
      "eyebrow": "MODULE 1 · LEVEL 2",
      "description": "Learn how Python remembers information by giving it a name.",
      "estimatedMinutes": 6
    },
    "skillTags": ["variables"],
    "objectives": [
      "Understand that variables store data.",
      "Learn how to assign a value to a variable."
    ],
    "sections": [
      {
        "id": "intro-1",
        "type": "explanation",
        "content": "A variable is like a sticky note or a label that you attach to a piece of data. Instead of remembering the number 18 everywhere in your program, you can create a variable named `age` and set it to 18.\n\nIn Python, you create a variable using the equals sign `=`. The name goes on the left, and the value goes on the right."
      },
      {
        "id": "trace-1",
        "type": "variable-trace",
        "content": {
          "config": {
            "title": "Creating a Variable",
            "steps": [
              { "code": "age = 18", "variables": { "age": 18 }, "description": "The label ''age'' is attached to the value 18." },
              { "code": "name = \"Anu\"", "variables": { "age": 18, "name": "\"Anu\"" }, "description": "Variables can hold numbers or text (strings)." }
            ]
          }
        }
      },
      {
        "id": "practice-1",
        "type": "code-practice",
        "content": {
          "instruction": "Create a variable named `score` and set it to 100. Then use `print(score)` to display it.",
          "prefill": "# Create your variable here\n\n\n# Print it here\n",
          "expectedOutput": ["100"]
        }
      }
    ],
    "checkpoint": {
      "passingScore": 100,
      "questions": [
        {
          "id": "q1",
          "question": "Which of these correctly creates a variable named `lives` and sets it to 3?",
          "options": [
            "3 = lives",
            "lives = 3",
            "lives == 3",
            "let lives = 3"
          ],
          "correctAnswer": 1,
          "explanation": "In Python, the variable name must be on the left, followed by a single = sign, and the value on the right."
        }
      ]
    }
  }'::jsonb
),
(
  'm2-pseudocode-builder',
  false,
  true,
  '{
    "version": 1,
    "intro": {
      "title": "Pseudocode Builder",
      "eyebrow": "MODULE 2 · LEVEL 5",
      "description": "Practice assembling logic step-by-step using pseudocode.",
      "estimatedMinutes": 12
    },
    "skillTags": ["pseudocode"],
    "objectives": [
      "Convert a problem description into structured steps.",
      "Understand the logical sequence of an algorithm."
    ],
    "sections": [
      {
        "id": "intro-1",
        "type": "explanation",
        "content": "Pseudocode is a way of describing an algorithm using simple English words that look a bit like code. It doesn''t follow strict syntax rules, but it must be logically sound.\n\nLet''s practice building the pseudocode to find the simple interest."
      },
      {
        "id": "pseudo-1",
        "type": "pseudocode-builder",
        "content": {
          "availableBlocks": [
            { "id": "b1", "text": "PRINT interest" },
            { "id": "b2", "text": "READ principal, rate, time" },
            { "id": "b3", "text": "SET interest = (principal * rate * time) / 100" }
          ],
          "correctOrder": ["b2", "b3", "b1"]
        }
      }
    ],
    "checkpoint": {
      "passingScore": 100,
      "questions": [
        {
          "id": "q1",
          "question": "In pseudocode, what does READ usually signify?",
          "options": [
            "Outputting data to the screen",
            "Getting input from the user",
            "Opening a file",
            "Stopping the program"
          ],
          "correctAnswer": 1,
          "explanation": "READ or INPUT usually signifies getting data from the user or an external source."
        }
      ]
    }
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  content = EXCLUDED.content,
  is_free_preview = EXCLUDED.is_free_preview,
  is_premium = EXCLUDED.is_premium;
