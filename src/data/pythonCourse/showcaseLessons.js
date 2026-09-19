/**
 * Showcase Lessons for ATP Python Journey Classroom
 * KTU B.Tech 2024 Scheme • UCEST105 Algorithmic Thinking with Python
 *
 * Implements the 4 showcase lessons requested:
 * 1. m1-problem-solving-intro (12 full pedagogical steps)
 * 2. m1-first-python (Meet Python, predict output, live Pyodide, guided error teaching)
 * 3. m3-range-stop (range(stop) visual sequence, targeted feedback, loop trace, coding challenges)
 * 4. m3-factorial-recursion (Factorial recursion visualizer, call stack unwinding, base cases)
 */

export const SHOWCASE_LESSONS = {
  // =========================================================================
  // 1. SHOWCASE LESSON: m1-problem-solving-intro ("What is Problem Solving?")
  // =========================================================================
  'm1-problem-solving-intro': {
    id: 'm1-problem-solving-intro',
    moduleNumber: 1,
    levelNumber: 0,
    lessonOrder: 1,
    title: 'What is Problem Solving?',
    estimatedMinutes: 7,
    skillTags: ['problem-solving', 'algorithmic-thinking', 'ktu-co1'],
    isFreePreview: true,
    active: true,
    objectives: [
      'Understand the fundamental definition of a computational problem',
      'Distinguish between well-defined and ill-defined problems',
      'Deconstruct real-world problems into initial states, operations, and goal states',
      'Explore core KTU problem-solving strategies: Heuristics, Means-Ends Analysis, and Working Backward'
    ],
    sections: [
      // STEP 1: ATP Teacher introduction
      {
        id: 'step-1-teacher-intro',
        type: 'atp-teacher',
        title: 'ATP Teacher',
        topic: 'Orientation & Core Philosophy',
        quote: 'A computer is a remarkably fast idiot. It has no intuition, no feelings, and no spontaneous wisdom.',
        content: [
          'Welcome to ATP Python Journey! Before we write our very first line of Python code, we must confront one fundamental truth about computing:',
          'Python does NOT solve problems for you. You solve the problem. Python simply executes your solution at the speed of electricity.',
          'If your underlying reasoning is flawed or incomplete, the fastest computer in the world will only produce wrong answers at lightning speed. In this first class, we will train how to think like a computer scientist before we ever touch syntax.'
        ],
        note: 'In KTU B.Tech Course UCEST105, Unit 1 begins with algorithmic problem formulation, not Python syntax.'
      },

      // STEP 2: What is a problem?
      {
        id: 'step-2-concept-problem',
        type: 'concept-card',
        icon: '🎯',
        title: 'What Exactly is a "Problem"?',
        content: [
          'In computer science and algorithmic thinking, a problem is defined as an obstacle between a present state and a desired goal state.',
          'Every solvable computational problem consists of three distinct components:',
          '1. Initial State: The given data, inputs, or current starting situation.',
          '2. Operations (Transitions): The set of permissible actions or calculations you are allowed to perform.',
          '3. Goal State: The desired outcome, output, or completed condition.',
          'Solving a problem means discovering a repeatable sequence of valid operations that transforms the Initial State into the Goal State.'
        ]
      },

      // STEP 3: Well-defined vs ill-defined example
      {
        id: 'step-3-worked-example-defined',
        type: 'worked-example',
        title: 'Well-Defined vs. Ill-Defined Problems',
        problem: 'Can a computer solve any problem we describe to it?',
        steps: [
          'Problem A (Well-Defined): "Given an item price of ₹450 and an 18% GST rate, calculate the final bill amount." -> Clear inputs (₹450, 18%), exact operation (450 * 1.18), single verifiable output (₹531). Computers excel here.',
          'Problem B (Ill-Defined): "Build an app that makes college students happy." -> Ill-defined. What does happiness mean? What are the exact inputs? How do you test if the goal was achieved? There is no unambiguous stopping condition.',
          'The Golden Rule of Computing: A computer can NEVER solve an ill-defined problem until a human engineer clarifies and converts it into a well-defined specification.'
        ],
        finalAnswer: 'Algorithmic thinking is the art of translating vague human needs into well-defined mathematical steps.'
      },

      // STEP 4: Student classification question
      {
        id: 'step-4-mcq-classification',
        type: 'multiple-choice',
        question: 'Which of the following describes a WELL-DEFINED problem suitable for an algorithmic solution?',
        options: [
          'Write a poem that captures the spirit of engineering college life.',
          'Given a list of 5 integers, determine and display the largest number in the list.',
          'Create a user-friendly mobile application that everyone loves.',
          'Help the student become more productive during exam week.'
        ],
        correctAnswer: 1,
        optionFeedback: [
          'Poetry is subjective. There is no mathematical verification test for whether a poem "captures the spirit".',
          'Exact inputs (5 integers), explicit rule (comparison), and clear verifiable goal (the maximum value).',
          '"Everyone loves" is vague and unquantifiable—this is an ill-defined subjective statement.',
          '"More productive" has no concrete boundary or initial/goal state definitions.'
        ],
        explanation: 'Option B is well-defined because the input is strictly specified (5 integers), the transformation rules are deterministic (numerical comparison), and the goal state is unambiguous.'
      },

      // STEP 5: Explanation of Algorithmic Thinking
      {
        id: 'step-5-teacher-explanation',
        type: 'atp-teacher',
        title: 'ATP Teacher',
        topic: 'The Architecture of an Algorithm',
        content: [
          'Notice what makes Option B solvable: you can test it. If the input is [12, 45, 3, 89, 21], you can verify whether 89 was found.',
          'Before you start coding in Python, always write down your algorithm. An algorithm is simply a step-by-step, finite, unambiguous set of instructions to solve a well-defined problem.',
          'Notice the three words: Finite (it must terminate), Step-by-Step (ordered sequence), and Unambiguous (each step has exactly one interpretation).'
        ],
        note: 'Never begin typing code into an editor until you can explain the algorithm in plain language.'
      },

      // STEP 6: Real-life problem-solving scenario
      {
        id: 'step-6-atm-scenario',
        type: 'worked-example',
        title: 'Real-Life Scenario: The ATM Cash Dispenser',
        problem: 'An ATM must dispense ₹3,800 using the minimum total number of currency notes available: ₹500, ₹200, and ₹100.',
        steps: [
          'Initial State: Target amount = ₹3,800. Available currency denominations: ₹500, ₹200, ₹100.',
          'Step 1 (Largest denomination first): How many ₹500 notes fit into ₹3,800? 3800 // 500 = 7 notes (₹3,500). Remaining amount = ₹300.',
          'Step 2 (Next denomination): How many ₹200 notes fit into ₹300? 300 // 200 = 1 note (₹200). Remaining amount = ₹100.',
          'Step 3 (Smallest denomination): How many ₹100 notes fit into ₹100? 100 // 100 = 1 note (₹100). Remaining amount = ₹0.',
          'Goal State: Dispense 7 of ₹500 + 1 of ₹200 + 1 of ₹100. Total = 9 notes.'
        ],
        finalAnswer: '9 notes dispensed. Notice how this greedy strategy guarantees minimum notes!'
      },

      // STEP 7: Strategy introduction
      {
        id: 'step-7-concept-strategies',
        type: 'concept-card',
        icon: '🧭',
        title: 'Four Core Problem-Solving Strategies (KTU Syllabus)',
        content: [
          'In engineering problem-solving, different problems require different mental toolkits:',
          '1. Trial & Error: Trying candidates one by one until a solution is found. Effective only for tiny search spaces (e.g., finding a 2-digit padlock code); disastrous for large problems.',
          '2. Heuristics: Practical "rules of thumb" or mental shortcuts. They do not guarantee a mathematically optimal answer, but find a great solution quickly (e.g., choosing the shortest queue at a supermarket).',
          '3. Means-Ends Analysis: Comparing your Current State to your Goal State, identifying the biggest difference, and setting up intermediate sub-goals to bridge that gap.',
          '4. Working Backward: Starting from the desired final output and reversing each permissible operation backwards to discover the necessary initial input.'
        ]
      },

      // STEP 8: Short interactive activity (Reorder stages of problem-solving)
      {
        id: 'step-8-reorder-stages',
        type: 'algorithm-reorder',
        title: 'Interactive Activity: The 6 Stages of Computational Problem Solving',
        instruction: 'Drag and reorder these stages into the correct professional engineering sequence from start to finish:',
        correctOrder: [
          'Understand the problem requirements and constraints',
          'Formulate a mathematical or conceptual model',
          'Develop a step-by-step algorithm',
          'Write the program code in Python',
          'Test with boundary cases and debug errors',
          'Evaluate performance and maintain documentation'
        ],
        explanation: 'Notice that writing code is Step 4! Novice programmers jump straight to writing code before understanding the problem, which leads to hours of painful debugging.'
      },

      // STEP 9: Quick practice
      {
        id: 'step-9-mcq-working-backward',
        type: 'multiple-choice',
        question: 'A robot is navigating a maze. The navigation system starts at the target destination exit and traces valid unblocked corridors backward to discover the shortest route from the robot\'s current position. Which strategy is being utilized?',
        options: [
          'Trial and Error',
          'Working Backward (Backtracking)',
          'Random Walk',
          'Brute Force Enumeration'
        ],
        correctAnswer: 1,
        optionFeedback: [
          'Trial and error would wander aimlessly without starting at the target.',
          'Working backward explicitly begins with the goal state and steps in reverse.',
          'Random walk has no objective or reverse path tracking.',
          'Brute force checks every possibility without purposeful goal-to-start navigation.'
        ],
        explanation: 'Working backward is ideal when the goal state is singular and well-known, allowing you to prune millions of dead-end starting branches.'
      },

      // STEP 10: Checkpoint
      {
        id: 'step-10-checkpoint-quiz',
        type: 'checkpoint',
        passingScore: 75,
        questions: [
          {
            id: 'cp-q1',
            question: 'What are the three essential components of every well-defined computational problem?',
            options: [
              'Hardware, Operating System, and Browser',
              'Initial State, Permissible Operations, and Goal State',
              'Loop, Variable, and Function',
              'Trial, Error, and Heuristic'
            ],
            correctAnswer: 1,
            explanation: 'Every well-defined problem has an Initial State (input), Permissible Operations (logic), and a Goal State (output).'
          },
          {
            id: 'cp-q2',
            question: 'Why can computers NOT solve ill-defined problems directly?',
            options: [
              'Computers run out of battery on large problems.',
              'Ill-defined problems lack unambiguous criteria for what constitutes a valid solution.',
              'Python only supports numbers, not words.',
              'Computers do not have enough RAM.'
            ],
            correctAnswer: 1,
            explanation: 'A computer cannot verify success without explicit criteria. Humans must formalize the problem first.'
          },
          {
            id: 'cp-q3',
            question: 'Means-Ends Analysis is best characterized by which of the following actions?',
            options: [
              'Guessing values until one happens to work.',
              'Breaking the distance between current state and goal state into achievable sub-goals.',
              'Writing code in assembly language.',
              'Testing every permutation from 1 to infinity.'
            ],
            correctAnswer: 1,
            explanation: 'Means-ends analysis reduces the difference between the current state and the goal state by setting sub-goals.'
          }
        ]
      },

      // STEP 11: Quick Recap
      {
        id: 'step-11-quick-recap',
        type: 'quick-recap',
        title: 'Quick Recap: What is Problem Solving?',
        keyIdea: 'Computers only execute unambiguous instructions. You are the problem solver; Python is your execution engine.',
        example: 'ATM cash dispensing: converting a ₹3,800 goal into 7 of ₹500, 1 of ₹200, and 1 of ₹100 notes.',
        watchOut: 'Never jump straight to writing Python code before defining your initial state, operations, and goal state on paper.',
        recallQuestion: 'What are the three mandatory components of any well-defined computational problem?',
        recallAnswer: 'Initial State, Permissible Operations (Transitions), and Goal State.'
      },

      // STEP 12: Next Class recommendation
      {
        id: 'step-12-next-class',
        type: 'atp-teacher',
        title: 'ATP Teacher',
        topic: 'Class Complete • Next Recommended Class',
        content: [
          'Congratulations! You have completed your foundational orientation in Algorithmic Thinking.',
          'In our next class, we take your structured thoughts and speak directly to the Python interpreter for the very first time:',
          'Next Class: "Your First Python Program" (m1-first-python) • Estimated time: 7 min',
          'Press the "Next Class →" button below to continue your journey.'
        ]
      }
    ]
  },

  // =========================================================================
  // 2. SHOWCASE LESSON: m1-first-python ("Your First Python Program")
  // =========================================================================
  'm1-first-python': {
    id: 'm1-first-python',
    moduleNumber: 1,
    levelNumber: 1,
    lessonOrder: 1,
    title: 'Your First Python Program',
    estimatedMinutes: 7,
    skillTags: ['python-basics', 'print', 'syntax', 'free-preview'],
    isFreePreview: true,
    active: true,
    objectives: [
      'Understand how Python communicates with the screen using print()',
      'Predict output of string literals accurately',
      'Execute code and experiment in the live local Python environment',
      'Diagnose and correct the most common beginner SyntaxError'
    ],
    sections: [
      // STEP 1: ATP Teacher
      {
        id: 'step-1-teacher-meet',
        type: 'atp-teacher',
        title: 'ATP Teacher',
        topic: 'Making Python Speak',
        content: [
          'Today you are going to make Python display your very first message.',
          'In computer programming, sending information to the screen is called "Output". Python provides a built-in command specifically designed for this purpose called print().',
          'Notice the structure: print is the function name, and parentheses () enclose whatever message you want Python to announce.'
        ]
      },

      // STEP 2: Concept Card
      {
        id: 'step-2-concept-print',
        type: 'concept-card',
        icon: '🖨️',
        title: 'The Anatomy of print()',
        content: [
          'print("Hello, ATP!")',
          'Let\'s dissect this single line of code:',
          '• print: The name of the built-in Python function (must always be lowercase).',
          '• Parentheses ( ): Tells Python to invoke (run) the function with the given arguments.',
          '• Quotation Marks " ": Tells Python that the content inside is literal text (called a String), not a variable or a Python keyword.',
          'Rule: Any characters wrapped inside quotes are displayed exactly as typed!'
        ]
      },

      // STEP 3: Predict the Output
      {
        id: 'step-3-predict-output',
        type: 'predict-output',
        instruction: 'Before running this code, examine it closely. What exact output will Python display on the screen?',
        code: 'print("Hello, ATP!")',
        expectedOutput: 'Hello, ATP!',
        explanation: 'Python displays the exact text inside the quotes, but drops the quotation marks when printing to the console!'
      },

      // STEP 4: Live Sandbox (RUN CODE)
      {
        id: 'step-4-sandbox-run',
        type: 'code-practice',
        instruction: 'Here is your first live Python code sandbox running right inside your browser via Pyodide. Click "Run Code" to execute it.',
        starterCode: 'print("Hello, ATP!")',
        expectedOutput: ['Hello, ATP!'],
        hint: 'Click "Run Code" to verify that Python prints: Hello, ATP!'
      },

      // STEP 5: Guided Modification (TRY & CHECK MY WORK)
      {
        id: 'step-5-modify-check',
        type: 'code-practice',
        instruction: 'Now modify the code so that Python displays: "Welcome to Python!" (without the quotes). When ready, click "Check My Work" to verify your answer.',
        starterCode: 'print("Hello, ATP!")',
        expectedOutput: ['Welcome to Python!'],
        hint: 'Change "Hello, ATP!" to "Welcome to Python!" inside the parentheses.'
      },

      // STEP 6: Deliberate Syntax Error Example & Teaching
      {
        id: 'step-6-syntax-error-guide',
        type: 'atp-teacher',
        title: 'ATP Teacher',
        topic: 'Mastering the SyntaxError',
        content: [
          'In human language, if you say "helo world", a human still understands you.',
          'Python is different. Python requires mathematical precision. Look at what happens if you forget to close your quotation mark:',
          'print("Hello, ATP!)',
          'Python will immediately stop and report:',
          'SyntaxError: unterminated string literal',
          'A SyntaxError means Python could not parse the grammar of your line. It saw an opening quote, but the line ended before finding the matching closing quote!'
        ],
        note: 'Errors are not failures. In programming, error messages are diagnostic hints telling you exactly where the grammar broke down.'
      },

      // STEP 7: Checkpoint Question
      {
        id: 'step-7-mcq-syntax',
        type: 'multiple-choice',
        question: 'Which of the following lines of code is 100% syntactically valid in Python 3?',
        options: [
          'PRINT("Hello, World!")',
          'print "Hello, World!"',
          'print("Hello, World!")',
          'print(Hello, World!)'
        ],
        correctAnswer: 2,
        optionFeedback: [
          'Python is strictly case-sensitive! PRINT is not the same as print.',
          'In Python 3, parentheses are mandatory for print functions.',
          'Spot on! Lowercase print with parentheses and quotes around the string.',
          'Missing quotation marks. Python will treat Hello as an undefined variable name.'
        ],
        explanation: 'In Python, functions are case-sensitive and require parentheses around arguments. Literal text must always be enclosed in quotes.'
      },

      // STEP 8: Quick Recap
      {
        id: 'step-8-quick-recap',
        type: 'quick-recap',
        title: 'Quick Recap: Your First Python Program',
        keyIdea: 'Use print("message") to output text and values to the terminal screen.',
        example: 'print("Hello, ATP!") → Hello, ATP!',
        watchOut: 'Python is case-sensitive (print != PRINT) and requires matching quotes around text.',
        recallQuestion: 'What error does Python raise when you forget to close a quotation mark on a text string?',
        recallAnswer: 'SyntaxError: unterminated string literal.'
      },

      // STEP 9: Next Class Recommendation
      {
        id: 'step-9-next-class',
        type: 'atp-teacher',
        title: 'ATP Teacher',
        topic: 'Class Complete • Next Recommended Class',
        content: [
          'Brilliant work! You have executed Python and successfully diagnosed your first potential error.',
          'Next Class: "Remembering Things with Variables" (m1-variables-intro) • Estimated time: 8 min',
          'In the next class, we discover how Python allocates computer memory to store and update values.'
        ]
      }
    ]
  },

  // =========================================================================
  // 3. SHOWCASE LESSON: m3-range-stop ("range(stop)")
  // =========================================================================
  'm3-range-stop': {
    id: 'm3-range-stop',
    moduleNumber: 3,
    levelNumber: 9,
    lessonOrder: 1,
    title: 'range(stop)',
    estimatedMinutes: 7,
    skillTags: ['loops', 'for-loops', 'range', 'ktuscheme-m3'],
    isFreePreview: false,
    active: true,
    objectives: [
      'Master the stop-value behavior of Python\'s range() generator',
      'Recognize that range(stop) starts at 0 and excludes the stop integer',
      'Step through for-loop iterations using the visual execution trace',
      'Write for loops with custom range boundaries'
    ],
    sections: [
      // STEP 1: ATP Teacher
      {
        id: 'step-1-range-intro',
        type: 'atp-teacher',
        title: 'ATP Teacher',
        topic: 'Automating Repetition with range()',
        quote: 'Before we write code, look at these numbers: 0, 1, 2, 3, 4. Python can generate these values with range(5).',
        content: [
          'In programming, we constantly need sequences of numbers—to count, to index through lists, or to repeat an action a specific number of times.',
          'Instead of typing [0, 1, 2, 3, 4] manually, Python gives us a built-in sequence generator called range().',
          'When we pass a single number to range(stop), Python generates integers starting from 0.'
        ]
      },

      // STEP 2: The Crucial Range Rule
      {
        id: 'step-2-concept-stop-rule',
        type: 'concept-card',
        icon: '🔢',
        title: 'The Golden Rule of range(stop)',
        content: [
          'range(stop) produces integers starting at 0, incrementing by 1, and STOPPING BEFORE stop.',
          'Let\'s see this clearly:',
          '• range(5) generates: 0, 1, 2, 3, 4 (Total of 5 numbers)',
          '• The stop value itself is NEVER included in the sequence!',
          'Think of stop as the strict boundary fence: Python approaches the fence, but never touches it.'
        ]
      },

      // STEP 3: Student Question with Targeted Feedback
      {
        id: 'step-3-mcq-range-predict',
        type: 'multiple-choice',
        question: 'Before I explain further, what values do you think range(3) produces?',
        options: [
          '0, 1, 2, 3',
          '0, 1, 2',
          '1, 2, 3',
          '1, 2'
        ],
        correctAnswer: 1,
        optionFeedback: [
          'Almost! Remember that range(3) stops BEFORE 3. So Python produces: 0, 1, 2. Try once more.',
          'Exactly! range(3) starts at 0 and stops before 3, giving 3 values: 0, 1, 2.',
          'Notice that Python defaults to starting at 0, not 1.',
          'Python starts at 0, not 1, so the sequence has 3 numbers: 0, 1, 2.'
        ],
        wrongFeedback: {
          0: 'Almost. Remember that range(3) stops before 3. So Python produces: 0, 1, 2. Try once more.'
        },
        explanation: 'range(3) starts at index 0 and stops strictly before 3, yielding the three values: 0, 1, 2.'
      },

      // STEP 4: Loop Visualizer Trace
      {
        id: 'step-4-loop-trace',
        type: 'loop-visualizer',
        title: 'Loop Execution Trace: for i in range(5): print(i)',
        steps: [
          { variables: { i: 0, 'range(5)': '[0, 1, 2, 3, 4]' }, output: '0' },
          { variables: { i: 1, 'range(5)': '[0, 1, 2, 3, 4]' }, output: '0\n1' },
          { variables: { i: 2, 'range(5)': '[0, 1, 2, 3, 4]' }, output: '0\n1\n2' },
          { variables: { i: 3, 'range(5)': '[0, 1, 2, 3, 4]' }, output: '0\n1\n2\n3' },
          { variables: { i: 4, 'range(5)': '[0, 1, 2, 3, 4]' }, output: '0\n1\n2\n3\n4' }
        ]
      },

      // STEP 5: Live Code Editor (Run Code)
      {
        id: 'step-5-code-practice-run',
        type: 'code-practice',
        instruction: 'Click "Run Code" below to observe Python iterating through range(5) one number per line in real time.',
        starterCode: 'for i in range(5):\n    print(i)',
        expectedOutput: ['0\n1\n2\n3\n4']
      },

      // STEP 6: Guided Practice (Change range(5) to range(8))
      {
        id: 'step-6-practice-range-8',
        type: 'code-practice',
        instruction: 'Modify the loop to use range(8) so that it prints numbers from 0 up to 7. Then click "Check My Work".',
        starterCode: 'for i in range(5):\n    print(i)',
        expectedOutput: ['0\n1\n2\n3\n4\n5\n6\n7'],
        hint: 'Replace range(5) with range(8).'
      },

      // STEP 7: Challenge Exercise (Print 0 to 9)
      {
        id: 'step-7-challenge-0-to-9',
        type: 'code-practice',
        instruction: 'Challenge: Write a for loop from scratch that prints numbers 0 through 9 (inclusive), each on its own line.',
        starterCode: '# Write your loop below:\n',
        expectedOutput: ['0\n1\n2\n3\n4\n5\n6\n7\n8\n9'],
        hint: 'To stop at 9, your stop value must be 10! for i in range(10):'
      },

      // STEP 8: Checkpoint Quiz
      {
        id: 'step-8-checkpoint',
        type: 'checkpoint',
        passingScore: 70,
        questions: [
          {
            id: 'q1',
            question: 'How many total times will a loop with range(12) execute?',
            options: ['11 times', '12 times', '13 times', 'Infinite times'],
            correctAnswer: 1,
            explanation: 'range(12) generates 0 through 11, which is exactly 12 numbers in total.'
          },
          {
            id: 'q2',
            question: 'What is the last number printed by for x in range(100): print(x)?',
            options: ['100', '99', '101', '0'],
            correctAnswer: 1,
            explanation: 'range(100) stops strictly before 100, so the final value is 99.'
          }
        ]
      },

      // STEP 9: Quick Recap
      {
        id: 'step-9-recap',
        type: 'quick-recap',
        title: 'Quick Recap: range(stop)',
        keyIdea: 'range(stop) starts at 0, increments by 1, and stops before reaching the stop value.',
        example: 'range(4) → 0, 1, 2, 3 (Total of 4 iterations)',
        watchOut: 'The stop value itself (e.g. 4) is never included in the generated sequence.',
        recallQuestion: 'What are the exact values generated by range(2)?',
        recallAnswer: '0 and 1.'
      },

      // STEP 10: Next Class
      {
        id: 'step-10-next-class',
        type: 'atp-teacher',
        title: 'ATP Teacher',
        topic: 'Class Complete • Next Recommended Class',
        content: [
          'Excellent progress! You now understand the stop boundary of Python loops.',
          'What if we don\'t want to start at 0? What if we want to count from 5 to 10?',
          'Next Class: "range(start, stop)" (m3-range-start-stop) • Estimated time: 7 min',
          'Press the "Next Class →" button below to continue.'
        ]
      }
    ]
  },

  // =========================================================================
  // 4. SHOWCASE LESSON: m3-factorial-recursion ("Factorial")
  // =========================================================================
  'm3-factorial-recursion': {
    id: 'm3-factorial-recursion',
    moduleNumber: 3,
    levelNumber: 17,
    lessonOrder: 5,
    title: 'Factorial with Recursion',
    estimatedMinutes: 8,
    skillTags: ['recursion', 'call-stack', 'factorial', 'functions'],
    isFreePreview: false,
    active: true,
    objectives: [
      'Understand the mathematical basis of recursive definitions (n! = n * (n-1)!)',
      'Identify the two mandatory components of every recursive algorithm: Base Case & Recursive Case',
      'Visualize the Call Stack during the CALLING ↓ and RETURNING ↑ phases',
      'Implement recursive factorial in Python and prevent RecursionError'
    ],
    sections: [
      // STEP 1: ATP Teacher Introduction
      {
        id: 'step-1-teacher-recursion',
        type: 'atp-teacher',
        title: 'ATP Teacher',
        topic: 'Functions Calling Themselves',
        quote: 'To understand recursion, you must first understand recursion.',
        content: [
          'Welcome to one of the most elegant and intellectually satisfying concepts in computer science: Recursion.',
          'A recursive function is simply a function that calls itself to solve a smaller sub-instance of the exact same problem.',
          'Instead of thinking in terms of loops, recursive thinking mirrors pure mathematical definitions.'
        ],
        note: 'Recursion is heavily tested in KTU UCEST105 Module 3 final university examinations.'
      },

      // STEP 2: Mathematical Foundation & Two Rules
      {
        id: 'step-2-concept-factorial-math',
        type: 'concept-card',
        icon: '📐',
        title: 'The Mathematical Definition of Factorial (n!)',
        content: [
          'The factorial of a non-negative integer n is the product of all positive integers less than or equal to n:',
          '4! = 4 × 3 × 2 × 1 = 24',
          'Notice something fascinating: 4! is actually 4 × (3!).',
          'And 3! is actually 3 × (2!).',
          'Every single recursive algorithm MUST possess two non-negotiable parts:',
          '1. Base Case: The terminating condition that stops recursion without making another call (e.g., 1! = 1 or 0! = 1).',
          '2. Recursive Case: The reduction step where the function calls itself with a strictly smaller input (n * factorial(n - 1)).'
        ]
      },

      // STEP 3: Recursion Visualizer (Call Stack Calling and Returning)
      {
        id: 'step-3-recursion-visualizer',
        type: 'recursion-visualizer',
        preset: 'factorial',
        title: 'Factorial Call Stack Visualization: factorial(4)'
      },

      // STEP 4: Comprehension Check
      {
        id: 'step-4-mcq-base-case',
        type: 'multiple-choice',
        question: 'What catastrophic outcome occurs if a programmer forgets to write a Base Case in a recursive function?',
        options: [
          'The function will return 0 automatically.',
          'The function converts itself into a for loop.',
          'The function calls itself indefinitely until Python crashes with a RecursionError (Stack Overflow).',
          'The computer restarts.'
        ],
        correctAnswer: 2,
        optionFeedback: [
          'Python cannot infer when to stop without your explicit base case.',
          'Python never automatically converts recursion to loops.',
          'Exactly! Frames pile up on the call stack until memory is exhausted, triggering RecursionError: maximum recursion depth exceeded.',
          'The Python interpreter catches the overflow safely with RecursionError.'
        ],
        explanation: 'Every recursive call consumes a frame on the call stack. Without a base case to halt and return, stack memory runs out, raising RecursionError.'
      },

      // STEP 5: Live Code Practice
      {
        id: 'step-5-code-factorial',
        type: 'code-practice',
        instruction: 'Complete the recursive factorial function below so that factorial(5) correctly computes and prints 120. Test with "Run Code" and then "Check My Work".',
        starterCode: 'def factorial(n):\n    # Base case: if n is 1 or less, return 1\n    if n <= 1:\n        return 1\n    # Recursive case: n * factorial(n - 1)\n    return n * factorial(n - 1)\n\nprint(factorial(5))',
        expectedOutput: ['120'],
        hint: 'Base case returns 1 when n <= 1. Recursive case returns n * factorial(n - 1).'
      },

      // STEP 6: Checkpoint
      {
        id: 'step-6-checkpoint',
        type: 'checkpoint',
        passingScore: 75,
        questions: [
          {
            id: 'q1',
            question: 'During which phase of recursion are the multiplication operations actually calculated for factorial?',
            options: [
              'During the CALLING phase when arguments are passed down',
              'During the RETURNING (unwinding) phase when base values bubble back up',
              'Before the function is defined',
              'Only after the program exits'
            ],
            correctAnswer: 1,
            explanation: 'In factorial, n * fact(n-1) cannot multiply until fact(n-1) returns its computed number during the unwinding phase.'
          },
          {
            id: 'q2',
            question: 'What is the value of factorial(0) by standard mathematical and programming convention?',
            options: ['0', '1', '-1', 'Undefined'],
            correctAnswer: 1,
            explanation: '0! is mathematically defined as 1 (the empty product).'
          }
        ]
      },

      // STEP 7: Quick Recap
      {
        id: 'step-7-quick-recap',
        type: 'quick-recap',
        title: 'Quick Recap: Factorial with Recursion',
        keyIdea: 'A recursive function breaks a problem down into smaller instances of itself until hitting the base case, then unwinds the call stack.',
        example: 'factorial(4) → 4 × factorial(3) → 4 × 6 = 24',
        watchOut: 'Never omit the base case (if n <= 1: return 1), or Python will raise RecursionError: maximum recursion depth exceeded.',
        recallQuestion: 'What are the two mandatory components of every recursive algorithm?',
        recallAnswer: '1. Base Case (stopping condition) and 2. Recursive Case (progress towards base case).'
      },

      // STEP 8: Next Class
      {
        id: 'step-8-next-class',
        type: 'atp-teacher',
        title: 'ATP Teacher',
        topic: 'Class Complete • Next Recommended Class',
        content: [
          'Magnificent mastery of the recursive call stack!',
          'Next Class: "Fibonacci Recursion" (m3-fibonacci-recursion) • Estimated time: 8 min',
          'In our next class, we explore binary tree recursion where a function calls itself TWICE per step.'
        ]
      }
    ]
  }
};
