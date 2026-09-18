-- SQL Migration: 20260918200004_ucest105_module3_collections_numpy.sql
-- Module 3: Sequences, Collections (Strings, Lists, Tuples, Sets, Dictionaries) and NumPy Arrays

INSERT INTO public.python_course_lessons (id, module_number, level_number, lesson_order, title, estimated_minutes, skill_tags, is_free_preview, active, content)
VALUES
-- Level 11: Strings
(
  'm3-string-creation', 3, 11, 1, 'Creating Strings', 5, ARRAY['string'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Text in Python",
        "content": "A string is a sequence of characters enclosed in single quotes `'hello'` or double quotes `\"hello\"`."
      }
    }
  ]'::jsonb
),
(
  'm3-string-indexing', 3, 11, 2, 'Indexing and Slicing', 6, ARRAY['string'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Accessing Characters",
        "content": "Indexing uses zero-based positions: `s[0]` is the first character.\n\nSlicing: `s[start:stop]` extracts substring from `start` up to `stop - 1`.\n\nExample:\ns = 'PYTHON'\nprint(s[0])    # 'P'\nprint(s[0:3])  # 'PYT'"
      }
    }
  ]'::jsonb
),
(
  'm3-string-concatenation', 3, 11, 3, 'Concatenation and Comparison', 6, ARRAY['string'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Joining and Comparing Strings",
        "content": "Use `+` to concatenate: `'Py' + 'thon' -> 'Python'`.\n\nComparison uses lexicographical (alphabetical/ASCII) order."
      }
    }
  ]'::jsonb
),
(
  'm3-string-traversal', 3, 11, 4, 'String Traversal', 7, ARRAY['string', 'for-loop'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Iterating Over Characters",
        "content": "Loop over characters directly:\nfor char in 'HELLO':\n    print(char)"
      }
    }
  ]'::jsonb
),
(
  'm3-string-methods', 3, 11, 5, 'Useful String Methods', 7, ARRAY['string'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Built-in Methods",
        "content": "- `.upper()` / `.lower()`\n- `.isdigit()`\n- `.startswith()` / `.endswith()`\n- `len(s)`"
      }
    }
  ]'::jsonb
),
(
  'm3-string-validation', 3, 11, 6, 'Validation Concepts', 6, ARRAY['string'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Preparing for Mobile Number Validation",
        "content": "To validate a 10-digit mobile number starting with 7, 8, or 9:\n1. `len(phone) == 10`\n2. `phone.isdigit()`\n3. `phone[0] in ['7', '8', '9']`"
      }
    }
  ]'::jsonb
),
(
  'm3-string-practice', 3, 11, 7, 'String Practice', 10, ARRAY['string'], false, true,
  '[
    {
      "id": "cp1",
      "type": "code-practice",
      "content": {
        "instruction": "Write code to check if a string 'radar' is equal to its reverse (palindrome). Print 'Palindrome' or 'Not Palindrome'.",
        "starterCode": "s = 'radar'\nif s == s[::-1]:\n    print('Palindrome')\nelse:\n    print('Not Palindrome')",
        "solutionCode": "s = 'radar'\nif s == s[::-1]:\n    print('Palindrome')\nelse:\n    print('Not Palindrome')",
        "testCases": [
          { "input": "", "expectedOutput": "Palindrome" }
        ]
      }
    }
  ]'::jsonb
),

-- Level 12: Lists
(
  'm3-what-is-list', 3, 12, 1, 'What is a List?', 5, ARRAY['list'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Ordered Mutable Collections",
        "content": "A list is an ordered, mutable sequence of items enclosed in square brackets `[10, 20, 30]`."
      }
    }
  ]'::jsonb
),
(
  'm3-creating-lists', 3, 12, 2, 'Creating Lists', 5, ARRAY['list'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "List Syntax",
        "content": "nums = [1, 2, 3]\nempty = []"
      }
    }
  ]'::jsonb
),
(
  'm3-list-accessing', 3, 12, 3, 'Accessing and Updating', 6, ARRAY['list'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Indexing & Modification",
        "content": "nums = [10, 20, 30]\nnums[0] = 99 # list is mutable!\nprint(nums) # [99, 20, 30]"
      }
    }
  ]'::jsonb
),
(
  'm3-list-append-remove', 3, 12, 4, 'append and remove', 6, ARRAY['list'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Adding & Removing Elements",
        "content": "- `list.append(x)`: Adds `x` to end of list.\n- `list.remove(x)`: Removes first occurrence of `x`."
      }
    }
  ]'::jsonb
),
(
  'm3-list-traversal', 3, 12, 5, 'Traversing Lists', 7, ARRAY['list', 'for-loop'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Looping Through a List",
        "content": "for item in [10, 20, 30]:\n    print(item)"
      }
    }
  ]'::jsonb
),
(
  'm3-list-searching', 3, 12, 6, 'Searching and Min/Max', 8, ARRAY['list'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Finding Largest and Smallest",
        "content": "Use `max(lst)` and `min(lst)` or manual comparison loops."
      }
    }
  ]'::jsonb
),
(
  'm3-list-problems', 3, 12, 7, 'Simple List Problems', 10, ARRAY['list'], false, true,
  '[
    {
      "id": "cp1",
      "type": "code-practice",
      "content": {
        "instruction": "Print the largest value in [4, 15, 2, 8].",
        "starterCode": "numbers = [4, 15, 2, 8]\nprint(max(numbers))",
        "solutionCode": "numbers = [4, 15, 2, 8]\nprint(max(numbers))",
        "testCases": [
          { "input": "", "expectedOutput": "15" }
        ]
      }
    }
  ]'::jsonb
),
(
  'm3-list-checkpoint', 3, 12, 8, 'Lists Checkpoint', 8, ARRAY['list'], false, true,
  '[
    {
      "id": "quiz1",
      "type": "checkpoint-quiz",
      "content": {
        "passingScore": 70,
        "questions": [
          {
            "id": "q1",
            "question": "Which method adds an element to the end of a list?",
            "options": ["append()", "add()", "insert()", "push()"],
            "correctAnswer": 0,
            "explanation": "append() adds an item to the end of a list."
          }
        ]
      }
    }
  ]'::jsonb
),

-- Level 13: Tuples, Sets, Dictionaries
(
  'm3-tuples', 3, 13, 1, 'Tuples', 6, ARRAY['tuple'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Immutable Sequences",
        "content": "A tuple is enclosed in parentheses `(1, 2, 3)`. Unlike lists, tuples are IMMUTABLE (cannot be changed after creation)."
      }
    }
  ]'::jsonb
),
(
  'm3-sets', 3, 13, 2, 'Sets', 6, ARRAY['set'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Unordered Unique Collections",
        "content": "A set is enclosed in curly braces `{1, 2, 3}`. Sets automatically eliminate duplicates!"
      }
    }
  ]'::jsonb
),
(
  'm3-dictionaries-intro', 3, 13, 3, 'Dictionaries', 10, ARRAY['dictionary'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Key-Value Mappings",
        "content": "A dictionary maps unique keys to values: `student = {'name': 'Arun', 'marks': 95}`.\n\nAccess value by key: `student['marks']`."
      }
    }
  ]'::jsonb
),
(
  'm3-collections-checkpoint', 3, 13, 4, 'Strings and Collections Checkpoint', 8, ARRAY['string', 'list', 'tuple', 'set', 'dictionary'], false, true,
  '[
    {
      "id": "quiz1",
      "type": "checkpoint-quiz",
      "content": {
        "passingScore": 70,
        "questions": [
          {
            "id": "q1",
            "question": "Which data structure is immutable?",
            "options": ["List", "Tuple", "Dictionary", "Set"],
            "correctAnswer": 1,
            "explanation": "Tuples cannot be altered after creation."
          }
        ]
      }
    }
  ]'::jsonb
),

-- Level 14: NumPy
(
  'm3-numpy-why-arrays', 3, 14, 1, 'Why Arrays?', 6, ARRAY['numpy'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "NumPy for Numerical Computing",
        "content": "NumPy arrays store homogeneous numerical data efficiently in memory and perform fast element-wise operations."
      }
    }
  ]'::jsonb
),
(
  'm3-numpy-import', 3, 14, 2, 'Import and Create Arrays', 7, ARRAY['numpy'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Creating NumPy Arrays",
        "content": "import numpy as np\narr = np.array([1, 2, 3, 4, 5])\nprint(arr)"
      }
    }
  ]'::jsonb
),
(
  'm3-numpy-access', 3, 14, 3, 'Access and Modify Arrays', 7, ARRAY['numpy'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Array Operations",
        "content": "arr = np.array([10, 20, 30])\nprint(arr[0]) # 10\narr[0] = 99"
      }
    }
  ]'::jsonb
),
(
  'm3-numpy-practice', 3, 14, 4, 'NumPy Practice', 10, ARRAY['numpy'], false, true,
  '[
    {
      "id": "cp1",
      "type": "code-practice",
      "content": {
        "instruction": "Import numpy as np, create array [1, 2, 3], multiply by 2 and print the array.",
        "starterCode": "import numpy as np\narr = np.array([1, 2, 3])\nprint(arr * 2)",
        "solutionCode": "import numpy as np\narr = np.array([1, 2, 3])\nprint(arr * 2)",
        "testCases": [
          { "input": "", "expectedOutput": "[2 4 6]" }
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
