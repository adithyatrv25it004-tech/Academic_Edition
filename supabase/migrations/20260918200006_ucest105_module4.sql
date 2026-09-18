-- SQL Migration: 20260918200006_ucest105_module4.sql
-- Module 4: Computational Approaches to Problem-Solving
-- Full teaching content for Brute Force, Divide & Conquer, Dynamic Programming, Greedy, and Randomized approaches.

INSERT INTO public.python_course_lessons (id, module_number, level_number, lesson_order, title, estimated_minutes, skill_tags, is_free_preview, active, content)
VALUES
-- Level 18: Brute Force Approach
(
  'm4-what-is-brute-force', 4, 18, 1, 'What Is Brute Force?', 5, ARRAY['brute-force'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Exhaustive Search Strategy",
        "content": "The Brute-Force approach systematically checks every possible candidate solution until the correct solution is found or the search space is exhausted.\n\nIt does not try to guess intelligently—it simply relies on sheer computing power."
      }
    },
    {
      "id": "c1",
      "type": "concept-card",
      "content": {
        "title": "Brute Force Principle",
        "icon": "🔨",
        "content": "Try option 1 -> Try option 2 -> Try option 3 -> ... -> Found solution!"
      }
    }
  ]'::jsonb
),
(
  'm4-trying-every-possibility', 4, 18, 2, 'Trying Every Possibility', 6, ARRAY['brute-force'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Systematic Search Space",
        "content": "For a brute-force approach to work, the problem domain must have a finite, enumerable set of possibilities.\n\nExample:\nFinding a key in a ring of 10 keys by trying key 1, key 2, key 3..."
      }
    },
    {
      "id": "mc1",
      "type": "multiple-choice",
      "content": {
        "question": "What is the defining characteristic of a brute-force approach?",
        "options": ["It uses complex heuristics", "It systematically tests all potential candidates", "It divides the problem into halves", "It makes random choices"],
        "correctAnswer": 1,
        "explanation": "Brute force checks every possibility systematically."
      }
    }
  ]'::jsonb
),
(
  'm4-padlock-example', 4, 18, 3, 'Padlock Example', 7, ARRAY['brute-force'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "The 4-Digit Combination Lock",
        "content": "A 4-digit combination padlock has 10,000 possible codes (0000 to 9999).\n\nA brute-force strategy starts at 0000, then tries 0001, 0002, 0003, and so on until the shackle opens."
      }
    },
    {
      "id": "vis1",
      "type": "brute-force-visualizer",
      "content": {
        "target": "0427"
      }
    }
  ]'::jsonb
),
(
  'm4-password-guessing', 4, 18, 4, 'Password Guessing Concept', 6, ARRAY['brute-force'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Conceptual Example: Password Guessing",
        "content": "In computer science, testing all combinations of characters (e.g. 'aaa', 'aab', 'aac'...) is a classic conceptual example of brute-force search.\n\nBecause character spaces grow exponentially, brute-force becomes extremely slow for long passwords!"
      }
    }
  ]'::jsonb
),
(
  'm4-brute-force-limitations', 4, 18, 5, 'Strengths & Limitations', 6, ARRAY['brute-force'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "When to Use Brute Force",
        "content": "Strengths:\n- Simple to design and implement.\n- Guaranteed to find a solution if one exists.\n\nLimitations:\n- Inefficient for large search spaces (combinatorial explosion).\n- Not practical when N is very large."
      }
    }
  ]'::jsonb
),
(
  'm4-brute-force-checkpoint', 4, 18, 6, 'Brute Force Checkpoint', 6, ARRAY['brute-force'], false, true,
  '[
    {
      "id": "quiz1",
      "type": "checkpoint-quiz",
      "content": {
        "passingScore": 70,
        "questions": [
          {
            "id": "q1",
            "question": "Which of the following is a key advantage of brute force?",
            "options": ["Always executes in O(1) time", "Guaranteed to find the solution if search space is finite", "Requires zero memory", "Uses randomized guesses"],
            "correctAnswer": 1,
            "explanation": "Because it checks all options, it is guaranteed to find a valid solution if one exists."
          }
        ]
      }
    }
  ]'::jsonb
),

-- Level 19: Divide and Conquer Approach
(
  'm4-divide-conquer-concept', 4, 19, 1, 'Divide, Solve and Combine', 6, ARRAY['divide-conquer'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "The Three Phases of Divide & Conquer",
        "content": "1. DIVIDE: Break the problem into smaller, independent subproblems of the same type.\n2. CONQUER: Solve the smaller subproblems (recursively or directly when small enough).\n3. COMBINE: Merge the subproblem solutions into a final solution for the original problem."
      }
    }
  ]'::jsonb
),
(
  'm4-merge-sort-dnc', 4, 19, 2, 'Merge Sort', 8, ARRAY['divide-conquer', 'merge-sort'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Official Syllabus Example: Merge Sort",
        "content": "Merge Sort is a textbook Divide-and-Conquer algorithm:\n- Split array in half until 1-element arrays remain.\n- Merge adjacent sorted sub-arrays step by step."
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
  'm4-dnc-advantages-disadvantages', 4, 19, 3, 'Advantages and Disadvantages', 7, ARRAY['divide-conquer'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Evaluating Divide & Conquer",
        "content": "Advantages:\n- Solves difficult problems by breaking them down.\n- High efficiency for algorithms like Merge Sort.\n\nDisadvantages:\n- Overhead from recursive call stack.\n- Merging steps may require additional temporary storage memory."
      }
    }
  ]'::jsonb
),
(
  'm4-divide-conquer-checkpoint', 4, 19, 4, 'Divide & Conquer Checkpoint', 6, ARRAY['divide-conquer'], false, true,
  '[
    {
      "id": "quiz1",
      "type": "checkpoint-quiz",
      "content": {
        "passingScore": 70,
        "questions": [
          {
            "id": "q1",
            "question": "What are the three steps of the Divide & Conquer approach?",
            "options": ["Try, Error, Repeat", "Divide, Conquer, Combine", "Input, Process, Output", "Initialize, Condition, Update"],
            "correctAnswer": 1,
            "explanation": "Divide, Conquer (solve), and Combine is the standard D&C tri-fold strategy."
          }
        ]
      }
    }
  ]'::jsonb
),

-- Level 20: Dynamic Programming Approach
(
  'm4-dynamic-programming-concept', 4, 20, 1, 'Storing & Reusing Results', 7, ARRAY['dynamic-programming'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Overlapping Subproblems & Memoization",
        "content": "Dynamic Programming (DP) is used when a problem can be broken down into OVERLAPPING subproblems.\n\nInstead of re-solving the same subproblem again and again, DP stores solved subproblem answers in memory (memoization or tabulation) and reuses them."
      }
    }
  ]'::jsonb
),
(
  'm4-dp-fibonacci', 4, 20, 2, 'Fibonacci with DP', 8, ARRAY['dynamic-programming'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Official Example: DP Fibonacci",
        "content": "Plain recursion recomputes fib(3) and fib(2) multiple times. DP solves fib(0), fib(1), fib(2), fib(3)... sequentially and reuses values instantly!"
      }
    },
    {
      "id": "vis1",
      "type": "dynamic-programming-visualizer",
      "content": {}
    }
  ]'::jsonb
),
(
  'm4-recursion-vs-dp', 4, 20, 3, 'Recursion vs Dynamic Programming', 7, ARRAY['dynamic-programming', 'recursion'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Comparing Recursion and DP",
        "content": "Recursion:\n- Self-calling top-down structure.\n- Recomputes identical subproblems if not memoized.\n\nDynamic Programming:\n- Stores intermediate subproblem answers.\n- Converts exponential recursive work into linear O(N) or polynomial execution!"
      }
    }
  ]'::jsonb
),
(
  'm4-dynamic-programming-checkpoint', 4, 20, 4, 'Dynamic Programming Checkpoint', 6, ARRAY['dynamic-programming'], false, true,
  '[
    {
      "id": "quiz1",
      "type": "checkpoint-quiz",
      "content": {
        "passingScore": 70,
        "questions": [
          {
            "id": "q1",
            "question": "What key property makes a problem suitable for Dynamic Programming?",
            "options": ["Random subproblems", "Overlapping subproblems", "No base case", "Single linear statement"],
            "correctAnswer": 1,
            "explanation": "DP excels when identical subproblems repeat multiple times."
          }
        ]
      }
    }
  ]'::jsonb
),

-- Level 21: Greedy Algorithm Approach
(
  'm4-greedy-concept', 4, 21, 1, 'Making Local Choices', 6, ARRAY['greedy'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Local Optimal Choice",
        "content": "A Greedy algorithm builds a solution step by step by making the locally optimal choice at each step, hoping it leads to a globally optimal solution."
      }
    }
  ]'::jsonb
),
(
  'm4-greedy-task-completion', 4, 21, 2, 'Task Completion Example', 8, ARRAY['greedy'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Official Example: Maximum Tasks in Limited Time",
        "content": "Given tasks with completion times and a limited total time (e.g. 6 min), how do we maximize the count of completed tasks?\n\nGreedy Strategy: Always pick the task with the SHORTEST duration first!"
      }
    },
    {
      "id": "vis1",
      "type": "greedy-task-visualizer",
      "content": {}
    }
  ]'::jsonb
),
(
  'm4-greedy-motivations-characteristics', 4, 21, 3, 'Motivations & Characteristics', 6, ARRAY['greedy'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Characteristics of Greedy Methods",
        "content": "- Fast and straightforward.\n- Never backtracks or reconsiders past decisions.\n- Works optimally for specific problem structures (like task scheduling by shortest duration), but may fail for general problems."
      }
    }
  ]'::jsonb
),
(
  'm4-greedy-vs-dp', 4, 21, 4, 'Greedy vs Dynamic Programming', 6, ARRAY['greedy', 'dynamic-programming'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Greedy vs DP Comparison",
        "content": "Greedy:\n- Makes immediate local decision without evaluating all subproblems.\n- Does not backtrack.\n\nDynamic Programming:\n- Evaluates subproblems and combines answers to guarantee global optimum."
      }
    }
  ]'::jsonb
),
(
  'm4-greedy-checkpoint', 4, 21, 5, 'Greedy Approach Checkpoint', 6, ARRAY['greedy'], false, true,
  '[
    {
      "id": "quiz1",
      "type": "checkpoint-quiz",
      "content": {
        "passingScore": 70,
        "questions": [
          {
            "id": "q1",
            "question": "To maximize task count in limited time, which task should a greedy approach select first?",
            "options": ["The longest task", "The shortest task", "A random task", "The first task in list"],
            "correctAnswer": 1,
            "explanation": "Selecting shortest tasks first leaves maximum time remaining for subsequent tasks."
          }
        ]
      }
    }
  ]'::jsonb
),

-- Level 22: Randomized Approach
(
  'm4-randomized-concept', 4, 22, 1, 'Randomness in Strategy', 6, ARRAY['randomized'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Algorithms with Random Choices",
        "content": "A Randomized algorithm uses random numbers to make decisions during execution.\n\nInstead of deterministic fixed behavior, outcomes vary per run, but average/expected behavior can be predicted mathematically."
      }
    }
  ]'::jsonb
),
(
  'm4-coupon-collector', 4, 22, 2, 'Coupon Collector Example', 8, ARRAY['randomized'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Official Example: Coupon Collector Problem",
        "content": "Each pair of jeans purchased contains 1 random coupon out of N=4 unique types. How many purchases are needed to collect all N unique coupons?"
      }
    },
    {
      "id": "vis1",
      "type": "coupon-simulation",
      "content": {}
    }
  ]'::jsonb
),
(
  'm4-hat-check-problem', 4, 22, 3, 'Hat-Check Example', 8, ARRAY['randomized'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Official Example: Hat-Check Problem",
        "content": "N people leave their hats at a cloakroom, and hats are returned randomly. How many people are expected to get their own hat back?"
      }
    },
    {
      "id": "vis1",
      "type": "hat-check-simulation",
      "content": {}
    }
  ]'::jsonb
),
(
  'm4-randomized-checkpoint', 4, 22, 4, 'Randomized Checkpoint', 6, ARRAY['randomized'], false, true,
  '[
    {
      "id": "quiz1",
      "type": "checkpoint-quiz",
      "content": {
        "passingScore": 70,
        "questions": [
          {
            "id": "q1",
            "question": "In the hat-check problem with N people receiving randomly shuffled hats, what is the expected number of correct hat matches?",
            "options": ["0", "1", "N / 2", "N"],
            "correctAnswer": 1,
            "explanation": "Regardless of N, the expected number of people who receive their own hat is 1."
          }
        ]
      }
    }
  ]'::jsonb
),

-- Level 23: Comparison & Final Checkpoint
(
  'm4-approach-comparison', 4, 23, 1, 'Which Approach Would You Choose?', 10, ARRAY['problem-solving'], false, true,
  '[
    {
      "id": "t1",
      "type": "teacher-explanation",
      "content": {
        "title": "Summary Comparison of All 5 Approaches",
        "content": "- Brute Force: Try every single combination.\n- Divide & Conquer: Split into independent halves, solve, combine.\n- Dynamic Programming: Store overlapping subproblem answers.\n- Greedy: Pick current shortest/best local choice.\n- Randomized: Use random decisions to sample or solve."
      }
    },
    {
      "id": "mc1",
      "type": "multiple-choice",
      "content": {
        "question": "Which approach is best described by 'storing solutions to overlapping subproblems to avoid repeating work'?",
        "options": ["Brute Force", "Divide & Conquer", "Dynamic Programming", "Greedy"],
        "correctAnswer": 2,
        "explanation": "Dynamic Programming reuses stored subproblem answers."
      }
    }
  ]'::jsonb
),
(
  'm4-module4-cumulative-checkpoint', 4, 23, 2, 'Module 4 Cumulative Checkpoint', 12, ARRAY['problem-solving'], false, true,
  '[
    {
      "id": "quiz1",
      "type": "checkpoint-quiz",
      "content": {
        "passingScore": 70,
        "questions": [
          {
            "id": "q1",
            "question": "Which strategy does Merge Sort use?",
            "options": ["Brute Force", "Divide & Conquer", "Greedy", "Randomized"],
            "correctAnswer": 1,
            "explanation": "Merge Sort splits arrays into halves (Divide) and merges them (Combine)."
          },
          {
            "id": "q2",
            "question": "Which strategy makes immediate local choices without reconsidering?",
            "options": ["Dynamic Programming", "Greedy", "Brute Force", "Divide & Conquer"],
            "correctAnswer": 1,
            "explanation": "Greedy algorithms make step-by-step local choices."
          },
          {
            "id": "q3",
            "question": "Testing all 10,000 combinations on a padlock is an example of:",
            "options": ["Brute Force", "Greedy", "Randomized", "Dynamic Programming"],
            "correctAnswer": 0,
            "explanation": "Systematically testing all combinations is Brute Force."
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
