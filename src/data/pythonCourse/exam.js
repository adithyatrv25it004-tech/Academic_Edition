export const ESE_EXAM_QUESTIONS = {
  partA: [
    {
      id: 'pa-m1-1',
      module: 1,
      marks: 3,
      question: 'Define problem-solving heuristics and contrast them with trial-and-error.',
      modelPoints: [
        'Heuristics are rule-of-thumb strategies that offer practical solutions but do not guarantee success.',
        'Trial-and-error sequentially tests candidates until one works without underlying domain strategy.',
        'Heuristics dramatically narrow search space compared to exhaustive trial-and-error.'
      ],
      keywords: ['heuristics', 'rule-of-thumb', 'trial-and-error', 'search space']
    },
    {
      id: 'pa-m1-2',
      module: 1,
      marks: 3,
      question: 'Explain operator precedence in Python with an example evaluating 5 + 3 * 2.',
      modelPoints: [
        'Multiplication (*) has higher precedence than addition (+).',
        '3 * 2 is evaluated first to 6.',
        '5 + 6 produces 11.'
      ],
      keywords: ['precedence', 'multiplication', 'addition', '11']
    },
    {
      id: 'pa-m2-1',
      module: 2,
      marks: 3,
      question: 'Differentiate between case structure in pseudocode and if-else structure.',
      modelPoints: [
        'if-else handles binary or multi-branch conditions sequentially.',
        'case structure selects among distinct matching values of a single expression.',
        'case enhances readability when matching discrete constant values.'
      ],
      keywords: ['case', 'if-else', 'pseudocode', 'discrete values']
    },
    {
      id: 'pa-m2-2',
      module: 2,
      marks: 3,
      question: 'Draw/describe the standard flowchart symbols for Decision and Process.',
      modelPoints: [
        'Decision symbol: Diamond shape with condition inside, branches for True/False.',
        'Process symbol: Rectangle shape containing arithmetic operations or variable assignments.'
      ],
      keywords: ['diamond', 'rectangle', 'decision', 'process']
    },
    {
      id: 'pa-m3-1',
      module: 3,
      marks: 3,
      question: 'Explain multiple return values in Python functions.',
      modelPoints: [
        'Python functions can return multiple values separated by commas.',
        'The values are automatically returned as a single tuple.',
        'Caller can unpack them into separate variables: `x, y = get_coords()`.'
      ],
      keywords: ['multiple returns', 'tuple', 'comma', 'unpacking']
    },
    {
      id: 'pa-m3-2',
      module: 3,
      marks: 3,
      question: 'What is a base case in recursion and why is it essential?',
      modelPoints: [
        'Base case is the terminating condition that returns a result without making further recursive calls.',
        'Without a base case, recursive calls continue endlessly, causing stack overflow (RecursionError).'
      ],
      keywords: ['base case', 'terminating condition', 'stack overflow', 'RecursionError']
    },
    {
      id: 'pa-m4-1',
      module: 4,
      marks: 3,
      question: 'Compare Greedy Approach and Dynamic Programming.',
      modelPoints: [
        'Greedy makes immediate step-by-step local choices without backtracking.',
        'Dynamic Programming solves and stores overlapping subproblems to build a globally optimal solution.'
      ],
      keywords: ['greedy', 'dynamic programming', 'local choice', 'overlapping subproblems']
    },
    {
      id: 'pa-m4-2',
      module: 4,
      marks: 3,
      question: 'Explain the expected result of the hat-check problem.',
      modelPoints: [
        'N people leave hats and receive them back randomly shuffled.',
        'The expected number of people receiving their own hat is exactly 1, regardless of N.'
      ],
      keywords: ['hat-check', 'expected value', '1', 'random assignment']
    }
  ],
  partB: [
    {
      id: 'pb-m1',
      module: 1,
      marks: 9,
      title: 'Module 1 Descriptive Problem',
      question: '(a) Explain the 6 steps of the problem-solving process. (b) Write a Python program using math module to calculate the area of a circle.',
      modelPoints: [
        'Part (a) 6 Steps: Understand problem, Formulate model, Develop algorithm, Write program, Test program, Evaluate solution.',
        'Part (b) Code: import math; radius = 5; area = math.pi * radius**2; print(area)'
      ],
      keywords: ['math.pi', 'problem-solving process', 'area', 'radius']
    },
    {
      id: 'pb-m2',
      module: 2,
      marks: 9,
      title: 'Module 2 Descriptive Problem',
      question: 'Develop an algorithm, pseudocode, and Python program to calculate KTU letter grade based on marks (S >= 90, A >= 80, B >= 70, F < 70).',
      modelPoints: [
        'Algorithm: Read marks -> check threshold -> assign grade -> print grade.',
        'Pseudocode: IF marks >= 90 THEN grade = S ... ELSE grade = F',
        'Python Code: if marks >= 90: print("S") elif marks >= 80: print("A") ...'
      ],
      keywords: ['KTU grade', 'elif', 'pseudocode', 'if-else']
    },
    {
      id: 'pb-m3',
      module: 3,
      marks: 9,
      title: 'Module 3 Descriptive Problem',
      question: '(a) Write a recursive Python function to compute the GCD of two positive integers using Euclidean method. (b) Explain call stack unwinding.',
      modelPoints: [
        'Part (a): def gcd(a, b): return a if b == 0 else gcd(b, a % b)',
        'Part (b): Pushing frames on call stack during recursive calls, popping & unwinding values on base case return.'
      ],
      keywords: ['Euclidean', 'gcd', 'call stack', 'unwinding']
    },
    {
      id: 'pb-m4',
      module: 4,
      marks: 9,
      title: 'Module 4 Descriptive Problem',
      question: 'Explain Divide & Conquer paradigm using Merge Sort on array [8, 3, 6, 2]. Describe Original, Split, Split Again, Merge, and Final stages.',
      modelPoints: [
        'Original: [8, 3, 6, 2]',
        'Split: [8, 3] and [6, 2]',
        'Split Again: [8], [3], [6], [2]',
        'Merge: [3, 8] and [2, 6]',
        'Final: [2, 3, 6, 8]'
      ],
      keywords: ['Merge Sort', 'Split', 'Merge', 'Divide and Conquer']
    }
  ]
};
