-- SQL Migration: 20260918200005_ucest105_module3_functions_recursion.sql
-- Module 3: Functions, Decomposition, Modularization & Recursion

INSERT INTO public.python_course_lessons (id, module_number, level_number, lesson_order, title, estimated_minutes, skill_tags, is_free_preview, active, content)
VALUES
-- Level 15: Functions
(
  'm3-why-functions', 3, 15, 1, 'Why Functions?', 5, ARRAY['function'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Code Reusability & Organization",
        "content": "A function is a reusable block of code that performs a specific task.\n\nBenefits:\n- DRY (Don''t Repeat Yourself)\n- Easier debugging and testing\n- Modular design"
      }
    }
  ]'::jsonb
),
(
  'm3-defining-functions', 3, 15, 2, 'Defining a Function', 6, ARRAY['function'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "The def Keyword",
        "content": "Syntax:\ndef greet():\n    print('Hello World!')\n\nDefining a function creates the blueprint, but does NOT execute it until called."
      }
    }
  ]'::jsonb
),
(
  'm3-calling-functions', 3, 15, 3, 'Calling a Function', 5, ARRAY['function'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Function Invocation",
        "content": "To execute a function, write its name followed by parentheses: `greet()`."
      }
    }
  ]'::jsonb
),
(
  'm3-parameters', 3, 15, 4, 'Parameters and Arguments', 7, ARRAY['function'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Passing Data into Functions",
        "content": "Parameters act as placeholders inside the function definition. Arguments are the actual values passed during a call.\n\ndef greet_person(name):\n    print('Hello ' + name)\n\ngreet_person('Arun')"
      }
    }
  ]'::jsonb
),
(
  'm3-return', 3, 15, 5, 'return Values', 7, ARRAY['function'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Sending Results Back",
        "content": "The `return` statement sends a computed value back to the caller.\n\ndef add(a, b):\n    return a + b\n\nresult = add(5, 3) # result is 8"
      }
    }
  ]'::jsonb
),
(
  'm3-multiple-returns', 3, 15, 6, 'Multiple Return Values', 6, ARRAY['function'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Returning Tuples",
        "content": "Python functions can return multiple values separated by commas, which returns a tuple.\n\ndef min_max(lst):\n    return min(lst), max(lst)\n\nlow, high = min_max([4, 1, 9, 2]) # low=1, high=9"
      }
    },
    {
      "id": "w1",
      "type": "worked-example",
      "content": {
        "title": "Unpacking Multiple Returns",
        "code": "def get_dimensions():\n    width = 1920\n    height = 1080\n    return width, height\n\nw, h = get_dimensions()\nprint(w, h) # 1920 1080",
        "explanation": "Multiple comma-separated values in return statement are automatically packed as a tuple."
      }
    }
  ]'::jsonb
),
(
  'm3-function-practice', 3, 15, 7, 'Function Practice', 10, ARRAY['function'], false, true,
  '[
    {
      "id": "cp1",
      "type": "code-practice",
      "content": {
        "instruction": "Define a function is_even(n) that returns True if n is even, else False. Call it with 6 and print result.",
        "starterCode": "def is_even(n):\n    return n % 2 == 0\n\nprint(is_even(6))",
        "solutionCode": "def is_even(n):\n    return n % 2 == 0\n\nprint(is_even(6))",
        "testCases": [
          { "input": "", "expectedOutput": "True" }
        ]
      }
    }
  ]'::jsonb
),
(
  'm3-function-checkpoint', 3, 15, 8, 'Functions Checkpoint', 8, ARRAY['function'], false, true,
  '[
    {
      "id": "quiz1",
      "type": "checkpoint-quiz",
      "content": {
        "passingScore": 70,
        "questions": [
          {
            "id": "q1",
            "question": "What keyword is used to send a value back from a function?",
            "options": ["output", "send", "return", "yield"],
            "correctAnswer": 2,
            "explanation": "return sends a value back."
          }
        ]
      }
    }
  ]'::jsonb
),

-- Level 16: Decomposition & Modularization
(
  'm3-decomposition', 3, 16, 1, 'Break It Down', 8, ARRAY['decomposition', 'modularization'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Problem Decomposition",
        "content": "Decomposition means breaking down a complex problem into smaller, manageable sub-problems.\n\nInstead of solving one giant hard task, solve 3 smaller easy tasks!"
      }
    }
  ]'::jsonb
),
(
  'm3-modularization', 3, 16, 2, 'Modularization', 8, ARRAY['modularization', 'function'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Designing Modules",
        "content": "Modularization organizes code into separate self-contained modules (functions or files) that handle distinct responsibilities."
      }
    }
  ]'::jsonb
),
(
  'm3-merge-sort', 3, 16, 3, 'Merge Sort as Decomposition', 10, ARRAY['decomposition'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Decomposing Sorting with Merge Sort",
        "content": "Merge Sort is a classic example of problem decomposition:\n1. Divide: Split the unsorted list into two halves.\n2. Conquer: Recursively sort each half.\n3. Combine: Merge the two sorted halves into one sorted list."
      }
    },
    {
      "id": "vis1",
      "type": "merge-sort-visualizer",
      "content": {}
    }
  ]'::jsonb
),
(
  'm3-top-three-integers', 3, 16, 4, 'Top Three Integers', 12, ARRAY['decomposition', 'function'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Official Guided Exercise: Return Top Three Integers",
        "content": "Problem: Given a list of n integers (where n >= 3), return the three largest integers.\n\nDecomposition Steps:\n1. Accept list of numbers.\n2. Sort the list in descending order (or maintain top 3 variables).\n3. Extract and return the first 3 elements."
      }
    },
    {
      "id": "cp1",
      "type": "code-practice",
      "content": {
        "instruction": "Complete the function top_three(lst) to return a tuple of the 3 largest numbers in descending order.",
        "starterCode": "def top_three(lst):\n    # Sort descending and return first 3 elements\n    sorted_lst = sorted(lst, reverse=True)\n    return sorted_lst[0], sorted_lst[1], sorted_lst[2]\n\nprint(top_three([12, 45, 2, 99, 56]))",
        "solutionCode": "def top_three(lst):\n    sorted_lst = sorted(lst, reverse=True)\n    return sorted_lst[0], sorted_lst[1], sorted_lst[2]\n\nprint(top_three([12, 45, 2, 99, 56]))",
        "testCases": [
          { "input": "", "expectedOutput": "(99, 56, 45)" }
        ]
      }
    }
  ]'::jsonb
),
(
  'm3-decomposition-checkpoint', 3, 16, 5, 'Decomposition Checkpoint', 8, ARRAY['decomposition', 'modularization'], false, true,
  '[
    {
      "id": "quiz1",
      "type": "checkpoint-quiz",
      "content": {
        "passingScore": 70,
        "questions": [
          {
            "id": "q1",
            "question": "What is decomposition in algorithmic thinking?",
            "options": ["Breaking a problem into smaller sub-problems", "Writing code without testing", "Compiling Python to C", "Converting loops to while"],
            "correctAnswer": 0,
            "explanation": "Decomposition breaks complex problems into simpler sub-problems."
          }
        ]
      }
    }
  ]'::jsonb
),

-- Level 17: Recursion
(
  'm3-what-is-recursion', 3, 17, 1, 'What is Recursion?', 6, ARRAY['recursion'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Functions Calling Themselves",
        "content": "Recursion occurs when a function calls itself directly or indirectly to solve a smaller instance of the same problem."
      }
    }
  ]'::jsonb
),
(
  'm3-recursion-reasons', 3, 17, 2, 'Why Recursion?', 6, ARRAY['recursion'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "When to Use Recursion",
        "content": "Recursion naturally mirrors mathematical definitions (like factorial, Fibonacci, trees, and divide-and-conquer algorithms)."
      }
    }
  ]'::jsonb
),
(
  'm3-base-case', 3, 17, 3, 'Base Case and Recursive Case', 6, ARRAY['recursion'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "The Two Mandatory Parts of Recursion",
        "content": "1. Base Case: The terminating condition that stops recursion (does NOT make a recursive call).\n2. Recursive Case: The step where the function calls itself with a smaller input."
      }
    }
  ]'::jsonb
),
(
  'm3-call-stack', 3, 17, 4, 'Call Stack and Unwinding', 8, ARRAY['recursion'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Understanding the Call Stack",
        "content": "Each recursive call pushes a frame onto the call stack. When a base case is reached, the stack unwinds, returning results back up the chain."
      }
    },
    {
      "id": "vis1",
      "type": "recursion-visualizer",
      "content": {
        "preset": "factorial"
      }
    }
  ]'::jsonb
),
(
  'm3-factorial-recursion', 3, 17, 5, 'Factorial', 8, ARRAY['recursion'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Recursive Factorial",
        "content": "Definition: n! = n * (n-1)!\nBase Case: 1! = 1 or 0! = 1."
      }
    },
    {
      "id": "cp1",
      "type": "code-practice",
      "content": {
        "instruction": "Complete recursive factorial function for n=5.",
        "starterCode": "def fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)\n\nprint(fact(5))",
        "solutionCode": "def fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)\n\nprint(fact(5))",
        "testCases": [
          { "input": "", "expectedOutput": "120" }
        ]
      }
    }
  ]'::jsonb
),
(
  'm3-fibonacci-recursion', 3, 17, 6, 'Fibonacci', 8, ARRAY['recursion'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Recursive Fibonacci",
        "content": "fib(n) = fib(n-1) + fib(n-2)\nBase cases: fib(0) = 0, fib(1) = 1."
      }
    },
    {
      "id": "vis1",
      "type": "recursion-visualizer",
      "content": {
        "preset": "fibonacci"
      }
    }
  ]'::jsonb
),
(
  'm3-gcd-recursion', 3, 17, 7, 'GCD of Two Positive Integers', 8, ARRAY['recursion'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Euclidean Algorithm for GCD",
        "content": "gcd(a, b) = a if b == 0 else gcd(b, a % b)."
      }
    },
    {
      "id": "vis1",
      "type": "recursion-visualizer",
      "content": {
        "preset": "gcd"
      }
    }
  ]'::jsonb
),
(
  'm3-recursive-addition', 3, 17, 8, 'Recursive Addition', 8, ARRAY['recursion'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Adding Two Positive Integers Recursively",
        "content": "add(a, b) = a if b == 0 else 1 + add(a, b - 1)."
      }
    },
    {
      "id": "vis1",
      "type": "recursion-visualizer",
      "content": {
        "preset": "recursive_addition"
      }
    }
  ]'::jsonb
),
(
  'm3-sum-of-digits', 3, 17, 9, 'Sum of Digits', 8, ARRAY['recursion'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Recursive Sum of Digits",
        "content": "sum_digits(n) = 0 if n == 0 else (n % 10) + sum_digits(n // 10)."
      }
    },
    {
      "id": "vis1",
      "type": "recursion-visualizer",
      "content": {
        "preset": "sum_of_digits"
      }
    }
  ]'::jsonb
),
(
  'm3-recursive-sum-range', 3, 17, 10, 'Recursive Sum 0..n', 8, ARRAY['recursion'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Summing 0 to n Recursively",
        "content": "rec_sum(n) = 0 if n == 0 else n + rec_sum(n - 1)."
      }
    }
  ]'::jsonb
),
(
  'm3-recursive-product', 3, 17, 11, 'Recursive Product of a List', 8, ARRAY['recursion'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Multiplying List Elements Recursively",
        "content": "rec_prod(lst) = 1 if len(lst) == 0 else lst[0] * rec_prod(lst[1:])."
      }
    }
  ]'::jsonb
),
(
  'm3-recursion-practice', 3, 17, 12, 'Recursive Practice', 10, ARRAY['recursion'], false, true,
  '[
    {
      "id": "cp1",
      "type": "code-practice",
      "content": {
        "instruction": "Write a recursive function rec_sum(n) to sum numbers from 1 to n. Test with n=5.",
        "starterCode": "def rec_sum(n):\n    if n <= 0:\n        return 0\n    return n + rec_sum(n - 1)\n\nprint(rec_sum(5))",
        "solutionCode": "def rec_sum(n):\n    if n <= 0:\n        return 0\n    return n + rec_sum(n - 1)\n\nprint(rec_sum(5))",
        "testCases": [
          { "input": "", "expectedOutput": "15" }
        ]
      }
    }
  ]'::jsonb
),
(
  'm3-recursion-checkpoint', 3, 17, 13, 'Recursion Checkpoint', 10, ARRAY['recursion'], false, true,
  '[
    {
      "id": "quiz1",
      "type": "checkpoint-quiz",
      "content": {
        "passingScore": 70,
        "questions": [
          {
            "id": "q1",
            "question": "What happens if a recursive function lacks a base case?",
            "options": ["It finishes immediately", "RecursionError (maximum recursion depth exceeded)", "SyntaxError", "Returns 0"],
            "correctAnswer": 1,
            "explanation": "Without a base case, calls repeat endlessly until stack overflow (RecursionError)."
          },
          {
            "id": "q2",
            "question": "Which data structure manages function call frames during recursion?",
            "options": ["Queue", "Call Stack", "Array", "Dictionary"],
            "correctAnswer": 1,
            "explanation": "The call stack tracks active function calls."
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
