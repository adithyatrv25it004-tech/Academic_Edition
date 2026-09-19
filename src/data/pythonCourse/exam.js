// APJ Abdul Kalam Technological University — B.Tech 2024 Scheme
// S1 UCEST105 — Algorithmic Thinking with Python
// End Semester Examination (ESE) Official Pattern:
// Total Marks: 60 | Duration: 2 Hours 30 Minutes
// PART A: 8 questions (2 from each module), 3 marks each = 24 Marks (Compulsory)
// PART B: 2 questions offered from each module (Q9/Q10, Q11/Q12, Q13/Q14, Q15/Q16), 9 marks each (Answer 1 from each module = 4 x 9 = 36 Marks)

export const ESE_EXAM_QUESTIONS = {
  partA: [
    {
      id: 'pa-m1-1',
      module: 1,
      marks: 3,
      question: 'Define problem-solving heuristics and contrast them with trial-and-error.',
      modelPoints: [
        'Heuristics are rule-of-thumb strategies that provide practical, efficient solutions without guaranteed optimality.',
        'Trial-and-error systematically or randomly tests candidates until a working solution is stumbled upon.',
        'Heuristics dramatically narrow search space based on prior domain insight, whereas trial-and-error is exhaustive and uninformed.'
      ],
      keywords: ['heuristics', 'rule-of-thumb', 'trial-and-error', 'search space', 'domain insight']
    },
    {
      id: 'pa-m1-2',
      module: 1,
      marks: 3,
      question: 'Explain operator precedence in Python with an example evaluating 5 + 3 * 2.',
      modelPoints: [
        'Multiplication (*) has higher precedence than addition (+).',
        '3 * 2 is evaluated first to yield 6.',
        '5 + 6 produces 11. Parentheses can be used to override this precedence: (5 + 3) * 2 = 16.'
      ],
      keywords: ['precedence', 'multiplication', 'addition', '11', 'parentheses']
    },
    {
      id: 'pa-m2-1',
      module: 2,
      marks: 3,
      question: 'Differentiate between case structure in pseudocode and if-else structure.',
      modelPoints: [
        'if-else handles binary or multi-branch sequential conditional tests evaluated from top to bottom.',
        'case structure selects among distinct discrete values or constants of a single selector expression.',
        'case improves clarity and avoids deeply nested if-else ladders when branching on specific fixed states.'
      ],
      keywords: ['case structure', 'if-else', 'pseudocode', 'discrete values', 'selector expression']
    },
    {
      id: 'pa-m2-2',
      module: 2,
      marks: 3,
      question: 'Draw/describe the standard flowchart symbols for Decision and Process.',
      modelPoints: [
        'Decision symbol: Diamond (rhombus) containing a boolean condition, with exiting arrows for True/False branches.',
        'Process symbol: Rectangle containing arithmetic computations, assignments, or data transformations.',
        'Both symbols are connected using oriented flow-lines.'
      ],
      keywords: ['diamond', 'rectangle', 'decision', 'process', 'flow-lines']
    },
    {
      id: 'pa-m3-1',
      module: 3,
      marks: 3,
      question: 'Explain multiple return values in Python functions with a syntax example.',
      modelPoints: [
        'Python functions can return multiple values separated by commas.',
        'Python automatically bundles comma-separated values into a single tuple.',
        'Example: `def get_stats(): return 10, 20` -> `val1, val2 = get_stats()` (tuple unpacking).'
      ],
      keywords: ['multiple returns', 'tuple', 'comma-separated', 'unpacking']
    },
    {
      id: 'pa-m3-2',
      module: 3,
      marks: 3,
      question: 'What is a base case in recursion and why is it essential?',
      modelPoints: [
        'The base case is the non-recursive terminating condition that returns a direct result.',
        'It stops further recursive calls and initiates stack unwinding.',
        'Without a base case, recursion proceeds infinitely, causing a stack overflow (RecursionError in Python).'
      ],
      keywords: ['base case', 'terminating condition', 'stack unwinding', 'RecursionError', 'infinite recursion']
    },
    {
      id: 'pa-m4-1',
      module: 4,
      marks: 3,
      question: 'Compare Greedy Approach and Dynamic Programming.',
      modelPoints: [
        'Greedy makes immediate, irrevocable locally optimal choices at each step without reconsidering.',
        'Dynamic Programming solves and records solutions to overlapping subproblems to guarantee global optimality.',
        'Greedy is typically faster but does not always find the optimal solution, whereas DP guarantees optimal solutions for overlapping subproblems.'
      ],
      keywords: ['greedy', 'dynamic programming', 'local choice', 'overlapping subproblems', 'memoization']
    },
    {
      id: 'pa-m4-2',
      module: 4,
      marks: 3,
      question: 'Explain the expected result of the hat-check problem.',
      modelPoints: [
        'In the hat-check problem, N people check their hats, and the hats are returned completely at random.',
        'By linearity of expectation, each person has a 1/N chance of receiving their own hat.',
        'Summing across all N people: N * (1/N) = 1. The expected number of people who receive their own hat is exactly 1, regardless of N.'
      ],
      keywords: ['hat-check', 'expected value', '1', 'linearity of expectation', 'random permutation']
    }
  ],
  partB: [
    // MODULE 1: Answer Q9 OR Q10
    {
      module: 1,
      options: [
        {
          id: 'pb-q9',
          questionNumber: 'Q9',
          marks: 9,
          title: 'Problem-Solving Process & Math Module',
          question: '(a) Detail the 6 steps of the programming problem-solving process. [5 Marks]\n(b) Write a Python program using the math module to calculate the area and circumference of a circle given radius r = 7. [4 Marks]',
          subdivisions: [
            { sub: '(a)', marks: 5, topic: '6 Steps of Problem Solving' },
            { sub: '(b)', marks: 4, topic: 'Python Math Program' }
          ],
          modelPoints: [
            'Step 1: Understand the Problem (inputs, outputs, constraints).',
            'Step 2: Formulate a Model (mathematical or conceptual representation).',
            'Step 3: Develop an Algorithm (unambiguous, step-by-step logic).',
            'Step 4: Write the Program (implementation in Python).',
            'Step 5: Test the Program (edge cases, sample inputs).',
            'Step 6: Evaluate the Solution (efficiency and accuracy).',
            'Python Code: import math; r = 7; area = math.pi * (r ** 2); circ = 2 * math.pi * r; print(f"Area: {area:.2f}, Circ: {circ:.2f}")'
          ],
          keywords: ['Understand', 'Model', 'Algorithm', 'Program', 'Test', 'Evaluate', 'math.pi', 'radius']
        },
        {
          id: 'pb-q10',
          questionNumber: 'Q10',
          marks: 9,
          title: 'Problem-Solving Strategies & Expression Evaluation',
          question: '(a) Compare Heuristics, Trial-and-Error, and Means-Ends Analysis with real-world engineering examples. [5 Marks]\n(b) Explain Python operator precedence rules and trace the evaluation of 10 + 20 * 2 // 5 - 3. [4 Marks]',
          subdivisions: [
            { sub: '(a)', marks: 5, topic: 'Strategy Comparison & Examples' },
            { sub: '(b)', marks: 4, topic: 'Precedence Tracing' }
          ],
          modelPoints: [
            'Trial-and-Error: Testing padlock combinations or brute force attempts until success.',
            'Heuristics: Rules of thumb, e.g. looking for matching corner puzzle pieces first.',
            'Means-Ends Analysis: Identifying difference between current state and goal state, applying subgoals to reduce the gap (e.g. GPS navigation route planning).',
            'Precedence: Multiplication (*) and Floor Division (//) have equal precedence (higher than + and -) and evaluate left-to-right.',
            'Trace: 20 * 2 = 40 -> 40 // 5 = 8 -> 10 + 8 = 18 -> 18 - 3 = 15. Final result is 15.'
          ],
          keywords: ['Means-Ends Analysis', 'subgoals', 'Heuristics', 'Precedence', 'Left-to-right', '15']
        }
      ]
    },

    // MODULE 2: Answer Q11 OR Q12
    {
      module: 2,
      options: [
        {
          id: 'pb-q11',
          questionNumber: 'Q11',
          marks: 9,
          title: 'Pseudocode Constructs & Smallest of Three Numbers',
          question: '(a) Explain the fundamental constructs of pseudocode (Sequence, Selection, Repetition) with standard syntax conventions. [5 Marks]\n(b) Write an algorithm and complete pseudocode to find the smallest of three given numbers. [4 Marks]',
          subdivisions: [
            { sub: '(a)', marks: 5, topic: 'Pseudocode Constructs' },
            { sub: '(b)', marks: 4, topic: 'Smallest of Three Logic' }
          ],
          modelPoints: [
            'Sequence: Sequential execution of instructions line-by-line.',
            'Selection: IF-THEN-ELSE and CASE constructs for conditional paths.',
            'Repetition: FOR, WHILE, and REPEAT-UNTIL loops for iteration.',
            'Algorithm for Smallest: Read a, b, c. If a <= b and a <= c, smallest = a. Elseif b <= a and b <= c, smallest = b. Else smallest = c. Output smallest.',
            'Pseudocode: INPUT a, b, c; IF a <= b AND a <= c THEN min = a ELSEIF b <= c THEN min = b ELSE min = c ENDIF; OUTPUT min'
          ],
          keywords: ['Sequence', 'Selection', 'Repetition', 'smallest', 'IF-THEN-ELSE', 'REPEAT-UNTIL']
        },
        {
          id: 'pb-q12',
          questionNumber: 'Q12',
          marks: 9,
          title: 'Flowchart Symbols & KTU Grading Case Structure',
          question: '(a) Draw and describe standard flowchart symbols including Decision, Process, Loop Hexagon, and Connectors. [5 Marks]\n(b) Develop pseudocode to determine the letter grade earned by a student based on the official KTU grade scale using a case-style structure. [4 Marks]',
          subdivisions: [
            { sub: '(a)', marks: 5, topic: 'Flowchart Standard Symbols' },
            { sub: '(b)', marks: 4, topic: 'KTU Grade Case Pseudocode' }
          ],
          modelPoints: [
            'Decision: Diamond shape with boolean test and True/False branches.',
            'Process: Rectangle for computations and assignments.',
            'Loop Hexagon: Preparation/iteration symbol for counting loops.',
            'Connectors: Circle for on-page connector, pentagon/home-plate shape for off-page connector.',
            'KTU Grade Case Pseudocode: EVALUATE marks; CASE >= 90: grade = "S"; CASE >= 85: grade = "A+"; CASE >= 80: grade = "A"; CASE >= 70: grade = "B"; CASE < 40: grade = "F"; ENDCASE; OUTPUT grade'
          ],
          keywords: ['Diamond', 'Rectangle', 'Hexagon', 'Connector', 'KTU grade', 'CASE structure']
        }
      ]
    },

    // MODULE 3: Answer Q13 OR Q14
    {
      module: 3,
      options: [
        {
          id: 'pb-q13',
          questionNumber: 'Q13',
          marks: 9,
          title: 'Recursion Call Stack & Euclidean GCD Algorithm',
          question: '(a) Define recursion. Explain call stack allocation and unwinding with a frame diagram for factorial(3). [5 Marks]\n(b) Write a recursive Python function to calculate the GCD of two positive integers using the Euclidean method. [4 Marks]',
          subdivisions: [
            { sub: '(a)', marks: 5, topic: 'Recursion & Call Stack' },
            { sub: '(b)', marks: 4, topic: 'Recursive GCD Python Function' }
          ],
          modelPoints: [
            'Recursion: A technique where a function calls itself directly or indirectly to solve smaller instances of the same problem.',
            'Stack Frames: Each recursive invocation pushes a new stack frame containing local variables and return address.',
            'Unwinding: When base case is hit, stack frames are popped in LIFO order, propagating return values back down.',
            'Factorial(3) trace: push fact(3) -> push fact(2) -> push fact(1) (returns 1) -> fact(2) unwinds 2*1=2 -> fact(3) unwinds 3*2=6.',
            'Python GCD: `def gcd(a, b): return a if b == 0 else gcd(b, a % b)`'
          ],
          keywords: ['Recursion', 'Stack frame', 'LIFO', 'Unwinding', 'Euclidean', 'gcd(b, a % b)']
        },
        {
          id: 'pb-q14',
          questionNumber: 'Q14',
          marks: 9,
          title: 'NumPy Arrays & Top Three Integers Decomposition',
          question: '(a) Write a Python program using NumPy to create an array, append an element, and remove an element. [4 Marks]\n(b) Write a modular Python program that decomposes the problem of finding and returning the top three distinct largest integers from a list of n >= 3 integers. [5 Marks]',
          subdivisions: [
            { sub: '(a)', marks: 4, topic: 'NumPy Operations' },
            { sub: '(b)', marks: 5, topic: 'Top Three Integers Decomposition' }
          ],
          modelPoints: [
            'NumPy Code: `import numpy as np; arr = np.array([10, 20, 30]); arr = np.append(arr, 40); arr = np.delete(arr, 0); print(arr)`',
            'Modular Decomposition: Breaking the problem into helper functions: validate_input(), extract_unique_sorted(), get_top_three().',
            'Code: `def get_top_three(lst): unique_sorted = sorted(list(set(lst)), reverse=True); return unique_sorted[:3]`'
          ],
          keywords: ['numpy', 'np.append', 'np.delete', 'modularization', 'top three', 'decomposition']
        }
      ]
    },

    // MODULE 4: Answer Q15 OR Q16
    {
      module: 4,
      options: [
        {
          id: 'pb-q15',
          questionNumber: 'Q15',
          marks: 9,
          title: 'Divide & Conquer Paradigm & Merge Sort',
          question: '(a) Explain the Divide, Solve, and Combine steps of the Divide and Conquer strategy. [4 Marks]\n(b) Illustrate the step-by-step trace of Merge Sort on the unsorted list [8, 3, 6, 2], showing all split and merge phases. [5 Marks]',
          subdivisions: [
            { sub: '(a)', marks: 4, topic: 'Divide and Conquer Steps' },
            { sub: '(b)', marks: 5, topic: 'Merge Sort Trace on [8, 3, 6, 2]' }
          ],
          modelPoints: [
            'Divide: Split original problem into independent smaller subproblems.',
            'Conquer/Solve: Solve subproblems recursively (base case when subproblem size is 1).',
            'Combine: Merge the subproblem solutions into the final solution.',
            'Trace Original: [8, 3, 6, 2]',
            'Split 1: [8, 3] and [6, 2]',
            'Split 2: [8], [3], [6], [2]',
            'Merge 1: [3, 8] and [2, 6]',
            'Final Merge: [2, 3, 6, 8]'
          ],
          keywords: ['Divide', 'Solve', 'Combine', 'Merge Sort', 'Split', 'Merge', '[2, 3, 6, 8]']
        },
        {
          id: 'pb-q16',
          questionNumber: 'Q16',
          marks: 9,
          title: 'Dynamic Programming vs Greedy & Randomized Approach',
          question: '(a) Differentiate between Dynamic Programming and Greedy approach in terms of choice property and subproblem handling. [5 Marks]\n(b) Explain the Coupon Collector problem (jeans promotion) and explain how randomness is utilized in computational strategies. [4 Marks]',
          subdivisions: [
            { sub: '(a)', marks: 5, topic: 'DP vs Greedy Comparison' },
            { sub: '(b)', marks: 4, topic: 'Coupon Collector & Randomized Strategy' }
          ],
          modelPoints: [
            'DP: Solves all overlapping subproblems, stores results in a table/array (memoization/tabulation), and combines optimal sub-solutions.',
            'Greedy: Makes the greedy choice (locally best option) at each step without ever reconsidering or looking ahead.',
            'Coupon Collector Problem: A clothing company inserts one coupon from a set of n types into each pair of jeans. Collecting all n unique coupons wins a free pair.',
            'Analysis: As more coupons are collected, finding new uncollected types becomes progressively harder, requiring on average n * (1 + 1/2 + ... + 1/n) purchases.',
            'Randomized algorithms intentionally use random choices to simplify algorithms or break symmetric worst-case scenarios.'
          ],
          keywords: ['Dynamic Programming', 'Greedy', 'Overlapping subproblems', 'Coupon Collector', 'harmonic series', 'Randomized']
        }
      ]
    }
  ]
};
