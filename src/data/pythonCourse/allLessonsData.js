/**
 * Pre-compiled curriculum lessons for KTU UCEST105
 * Extracted from official migrations to support 100% offline & preview mode
 * without relying on external Supabase Edge Functions.
 */
export const ALL_LESSONS_DATA = {
  "m1-problem-solving-intro": {
    "id": "m1-problem-solving-intro",
    "module_number": 1,
    "level_number": 1,
    "lesson_order": 1,
    "title": "Problem Solving Strategies",
    "estimated_minutes": 10,
    "is_free_preview": true,
    "active": true,
    "content": [
      {
        "id": "intro-1",
        "type": "teacher-explanation",
        "content": {
          "title": "Welcome to ATP Python Journey!",
          "content": "Before we touch Python, we must understand *thinking*. A computer is just a fast calculator. It doesn't solve problems—*you* do.\\n\\nA strategy is a plan of action to achieve a goal. Let's look at common problem-solving strategies."
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
          "content": "Heuristics are 'rules of thumb' that generally work but aren't guaranteed. Means-Ends Analysis involves breaking a problem down into smaller sub-problems to reduce the difference between the current state and the goal state."
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
          "options": [
            "Trial and Error",
            "Heuristics",
            "Working Backward",
            "Means-Ends Analysis"
          ],
          "correctAnswer": 2,
          "explanation": "Starting at the goal and moving to the start is the definition of Working Backward."
        }
      }
    ]
  },
  "m1-first-python": {
    "id": "m1-first-python",
    "module_number": 1,
    "level_number": 3,
    "lesson_order": 1,
    "title": "Your First Python Program",
    "estimated_minutes": 10,
    "is_free_preview": true,
    "active": true,
    "content": [
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
          "expectedOutput": [
            "Hello, World!",
            "hello world",
            "Hello world!"
          ]
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
    ]
  },
  "m1-variables-intro": {
    "id": "m1-variables-intro",
    "module_number": 1,
    "level_number": 2,
    "lesson_order": 1,
    "title": "Remembering Things with Variables",
    "estimated_minutes": 10,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "type": "text",
        "content": "Think of a variable as a labeled box in the computer's memory. You put data inside the box, and you write a name on the outside so you can find it later."
      },
      {
        "type": "visualizer",
        "visualizerId": "VariableTrace",
        "config": {
          "steps": [
            {
              "code": "age = 18",
              "state": {
                "age": 18
              }
            },
            {
              "code": "age = age + 1",
              "state": {
                "age": 19
              }
            },
            {
              "code": "print(age)",
              "state": {
                "age": 19
              },
              "output": "19"
            }
          ]
        }
      },
      {
        "type": "code_practice",
        "instruction": "Create a variable named `score` and give it the value 50. Then print it.",
        "prefill": "# Write your code below\\n\\n",
        "expectedOutput": [
          "50"
        ]
      }
    ]
  },
  "m1-variables": {
    "id": "m1-variables",
    "module_number": 1,
    "level_number": 4,
    "lesson_order": 1,
    "title": "Variables & Numeric Types",
    "estimated_minutes": 12,
    "is_free_preview": false,
    "active": true,
    "content": [
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
              {
                "code": "age = 18",
                "variables": {
                  "age": 18
                },
                "description": "This is an integer (int) - a whole number."
              },
              {
                "code": "pi = 3.14",
                "variables": {
                  "age": 18,
                  "pi": 3.14
                },
                "description": "This is a floating-point number (float) - a decimal."
              },
              {
                "code": "c = 2 + 3j",
                "variables": {
                  "age": 18,
                  "pi": 3.14,
                  "c": "2+3j"
                },
                "description": "This is a complex number (complex) - used in advanced math."
              }
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
            {
              "id": "p1",
              "answer": "score"
            },
            " = ",
            {
              "id": "p2",
              "answer": "100"
            }
          ],
          "explanation": "Perfect! You assigned the integer 100 to the variable score."
        }
      }
    ]
  },
  "m2-pseudocode-builder": {
    "id": "m2-pseudocode-builder",
    "is_free_preview": false,
    "active": true,
    "content": {
      "version": 1,
      "intro": {
        "title": "Pseudocode Builder",
        "eyebrow": "MODULE 2 · LEVEL 5",
        "description": "Practice assembling logic step-by-step using pseudocode.",
        "estimatedMinutes": 12
      },
      "skillTags": [
        "pseudocode"
      ],
      "objectives": [
        "Convert a problem description into structured steps.",
        "Understand the logical sequence of an algorithm."
      ],
      "sections": [
        {
          "id": "intro-1",
          "type": "explanation",
          "content": "Pseudocode is a way of describing an algorithm using simple English words that look a bit like code. It doesn't follow strict syntax rules, but it must be logically sound.\n\nLet's practice building the pseudocode to find the simple interest."
        },
        {
          "id": "pseudo-1",
          "type": "pseudocode-builder",
          "content": {
            "availableBlocks": [
              {
                "id": "b1",
                "text": "PRINT interest"
              },
              {
                "id": "b2",
                "text": "READ principal, rate, time"
              },
              {
                "id": "b3",
                "text": "SET interest = (principal * rate * time) / 100"
              }
            ],
            "correctOrder": [
              "b2",
              "b3",
              "b1"
            ]
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
    }
  },
  "m3-meet-for-loop": {
    "id": "m3-meet-for-loop",
    "module_number": 3,
    "level_number": 9,
    "lesson_order": 2,
    "title": "Meet the for Loop",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Structure of a for Loop",
          "content": "A `for` loop iterates over a sequence (such as numbers generated by `range()`).\n\nSyntax:\nfor i in range(5):\n    print(i)\n\nThis prints 0, 1, 2, 3, 4."
        }
      },
      {
        "id": "vis1",
        "type": "loop-visualizer",
        "content": {
          "steps": [
            {
              "variables": {
                "i": 0
              },
              "output": "0"
            },
            {
              "variables": {
                "i": 1
              },
              "output": "0\n1"
            },
            {
              "variables": {
                "i": 2
              },
              "output": "0\n1\n2"
            },
            {
              "variables": {
                "i": 3
              },
              "output": "0\n1\n2\n3"
            },
            {
              "variables": {
                "i": 4
              },
              "output": "0\n1\n2\n3\n4"
            }
          ]
        }
      }
    ]
  },
  "m1-problem-solving-process": {
    "id": "m1-problem-solving-process",
    "module_number": 1,
    "level_number": 2,
    "lesson_order": 1,
    "title": "The Problem Solving Process",
    "estimated_minutes": 12,
    "is_free_preview": false,
    "active": true,
    "content": [
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
          "content": "**Well-Defined**: Clear starting state, clear goal, clear rules. (e.g. Tower of Hanoi)\\n**Ill-Defined**: Unclear goal or missing information. (e.g. 'Make a good game').\\nComputers need well-defined problems."
        }
      },
      {
        "id": "practice-1",
        "type": "algorithm-reorder",
        "content": {
          "blocks": [
            {
              "id": "b4",
              "text": "Write the program"
            },
            {
              "id": "b1",
              "text": "Understand the problem"
            },
            {
              "id": "b5",
              "text": "Test the program"
            },
            {
              "id": "b3",
              "text": "Develop an algorithm"
            },
            {
              "id": "b6",
              "text": "Evaluate the solution"
            },
            {
              "id": "b2",
              "text": "Formulate a model"
            }
          ],
          "correctOrder": [
            "b1",
            "b2",
            "b3",
            "b4",
            "b5",
            "b6"
          ]
        }
      }
    ]
  },
  "m1-strings-io": {
    "id": "m1-strings-io",
    "module_number": 1,
    "level_number": 5,
    "lesson_order": 1,
    "title": "Strings, Input & Output",
    "estimated_minutes": 10,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "intro-1",
        "type": "teacher-explanation",
        "content": {
          "title": "Talking back to the computer",
          "content": "A String is text. It must be wrapped in quotes. \\n\\nWe've used `print()` for output. Now let's use `input()` to get information *from* the user."
        }
      },
      {
        "id": "example-1",
        "type": "worked-example",
        "content": {
          "title": "Greeting the user",
          "problem": "Write a program that asks for the user's name and says hello to them.",
          "steps": [
            "Ask the user for their name using input() and store it in a variable.",
            "Use print() to combine 'Hello ' and the variable."
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
          "expectedOutput": [
            "blue",
            "Your favorite color is blue"
          ]
        }
      }
    ]
  },
  "m1-operators-math": {
    "id": "m1-operators-math",
    "module_number": 1,
    "level_number": 6,
    "lesson_order": 1,
    "title": "Operators & Math Module",
    "estimated_minutes": 15,
    "is_free_preview": false,
    "active": true,
    "content": [
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
          "expectedOutput": [
            "4.0"
          ]
        }
      },
      {
        "id": "practice-2",
        "type": "multiple-choice",
        "content": {
          "question": "What is the result of 10 % 3?",
          "options": [
            "3.33",
            "3",
            "1",
            "10"
          ],
          "correctAnswer": 2,
          "explanation": "The modulo operator (%) returns the remainder of a division. 10 divided by 3 is 3 with a remainder of 1."
        }
      }
    ]
  },
  "m2-algorithm-pseudocode": {
    "id": "m2-algorithm-pseudocode",
    "module_number": 2,
    "level_number": 1,
    "lesson_order": 1,
    "title": "Algorithms & Pseudocode",
    "estimated_minutes": 12,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "intro-1",
        "type": "teacher-explanation",
        "content": {
          "title": "What is an Algorithm?",
          "content": "An algorithm is a step-by-step procedure to solve a problem. Think of it like a recipe. If you follow the steps exactly, you will bake the cake.\\n\\nBut how do we write it down? Code is too strict. English is too loose. We use **Pseudocode**."
        }
      },
      {
        "id": "concept-1",
        "type": "concept-card",
        "content": {
          "title": "Why Pseudocode?",
          "icon": "📝",
          "content": "Pseudocode uses structural conventions of a normal programming language, but is intended for human reading rather than machine reading. It helps programmers plan the logic before worrying about Python syntax errors."
        }
      },
      {
        "id": "practice-1",
        "type": "pseudocode-builder",
        "content": {
          "availableBlocks": [
            {
              "id": "b1",
              "text": "PRINT interest"
            },
            {
              "id": "b2",
              "text": "READ principal, rate, time"
            },
            {
              "id": "b3",
              "text": "SET interest = (principal * rate * time) / 100"
            }
          ],
          "correctOrder": [
            {
              "id": "b2",
              "indent": 0
            },
            {
              "id": "b3",
              "indent": 0
            },
            {
              "id": "b1",
              "indent": 0
            }
          ]
        }
      }
    ]
  },
  "m2-control-structures": {
    "id": "m2-control-structures",
    "module_number": 2,
    "level_number": 2,
    "lesson_order": 1,
    "title": "Control Structures",
    "estimated_minutes": 15,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "intro-1",
        "type": "teacher-explanation",
        "content": {
          "title": "Directing the Flow",
          "content": "Algorithms flow from top to bottom. But sometimes we need to skip steps or repeat them. We use three basic control structures:\\n\\n1. **Sequence** (do this, then that)\\n2. **Selection** (if this is true, do this, else do that)\\n3. **Repetition** (do this many times)"
        }
      },
      {
        "id": "concept-1",
        "type": "concept-card",
        "content": {
          "title": "Selection Types",
          "icon": "🔀",
          "content": "**If-Else**: Checks a condition. IF it's raining, take an umbrella. ELSE, wear sunglasses.\\n**Case Structure**: Used when there are many specific conditions (e.g. Grades: S, A, B, C)."
        }
      },
      {
        "id": "concept-2",
        "type": "concept-card",
        "content": {
          "title": "Repetition Types",
          "icon": "🔁",
          "content": "**For loop**: Repeat a specific number of times.\\n**While loop**: Repeat as long as a condition is true.\\n**Repeat-Until**: Repeat until a condition becomes true."
        }
      },
      {
        "id": "practice-1",
        "type": "multiple-choice",
        "content": {
          "question": "Which repetition structure would you use if you know exactly how many times you want to run the loop (e.g. 10 times)?",
          "options": [
            "While loop",
            "For loop",
            "Repeat-Until",
            "If-Else"
          ],
          "correctAnswer": 1,
          "explanation": "A 'for' loop is designed for situations where the number of iterations is known."
        }
      }
    ]
  },
  "m2-flowcharts": {
    "id": "m2-flowcharts",
    "module_number": 2,
    "level_number": 3,
    "lesson_order": 1,
    "title": "Flowcharts & Symbols",
    "estimated_minutes": 15,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "intro-1",
        "type": "teacher-explanation",
        "content": {
          "title": "Drawing Logic",
          "content": "A flowchart is a visual representation of an algorithm. Different shapes mean different things."
        }
      },
      {
        "id": "concept-1",
        "type": "concept-card",
        "content": {
          "title": "Required Symbols",
          "icon": "📐",
          "content": "**Oval**: Start/End\\n**Rectangle**: Process / Calculation\\n**Parallelogram**: Input / Output\\n**Diamond**: Decision (Yes/No)\\n**Hexagon**: For-loop initialization\\n**Circle/Shield**: Connectors"
        }
      },
      {
        "id": "practice-1",
        "type": "flowchart-builder",
        "content": {
          "availableBlocks": [
            {
              "id": "f1",
              "shape": "START_END",
              "text": "START"
            },
            {
              "id": "f2",
              "shape": "INPUT_OUTPUT",
              "text": "READ a, b"
            },
            {
              "id": "f3",
              "shape": "PROCESS",
              "text": "c = a + b"
            },
            {
              "id": "f4",
              "shape": "INPUT_OUTPUT",
              "text": "PRINT c"
            },
            {
              "id": "f5",
              "shape": "START_END",
              "text": "STOP"
            }
          ],
          "correctOrder": [
            "f1",
            "f2",
            "f3",
            "f4",
            "f5"
          ]
        }
      }
    ]
  },
  "m2-sample-problems": {
    "id": "m2-sample-problems",
    "module_number": 2,
    "level_number": 4,
    "lesson_order": 1,
    "title": "Algorithm Practice",
    "estimated_minutes": 25,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "intro-1",
        "type": "teacher-explanation",
        "content": {
          "title": "KTU Official Problems",
          "content": "Let's solve some of the standard problems required in the syllabus. We will trace the logic and write the Python code."
        }
      },
      {
        "id": "example-1",
        "type": "worked-example",
        "content": {
          "title": "Problem 1: Larger of two numbers",
          "problem": "Given two numbers a and b, find the largest.",
          "steps": [
            "READ a, b",
            "IF a > b THEN PRINT a is larger",
            "ELSE PRINT b is larger"
          ]
        }
      },
      {
        "id": "practice-1",
        "type": "code-practice",
        "content": {
          "instruction": "Write the Python code to find the larger of a and b. Assume a = 10 and b = 20. Print the larger number.",
          "prefill": "a = 10\nb = 20\n# Write if-else below\n",
          "expectedOutput": [
            "20"
          ]
        }
      },
      {
        "id": "practice-2",
        "type": "multiple-choice",
        "content": {
          "question": "If we wanted to find the smallest of three numbers (a, b, c), what is the first logical check?",
          "options": [
            "if a < b and a < c",
            "if a > b",
            "if c < a",
            "if a == b"
          ],
          "correctAnswer": 0,
          "explanation": "To check if 'a' is the smallest of all three, it must be less than 'b' AND less than 'c'."
        }
      }
    ]
  },
  "m3-boolean-decisions": {
    "id": "m3-boolean-decisions",
    "module_number": 3,
    "level_number": 8,
    "lesson_order": 1,
    "title": "Why Programs Need Decisions",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
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
          "options": [
            "True",
            "False",
            "Error",
            "None"
          ],
          "correctAnswer": 0,
          "explanation": "10 > 5 is mathematically correct, so Python evaluates it to True."
        }
      }
    ]
  },
  "m3-boolean-conditions": {
    "id": "m3-boolean-conditions",
    "module_number": 3,
    "level_number": 8,
    "lesson_order": 2,
    "title": "Boolean Conditions",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
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
    ]
  },
  "m3-if": {
    "id": "m3-if",
    "module_number": 3,
    "level_number": 8,
    "lesson_order": 3,
    "title": "Meet if",
    "estimated_minutes": 5,
    "is_free_preview": false,
    "active": true,
    "content": [
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
            {
              "input": "",
              "expectedOutput": "Positive"
            }
          ]
        }
      }
    ]
  },
  "m3-if-else": {
    "id": "m3-if-else",
    "module_number": 3,
    "level_number": 8,
    "lesson_order": 4,
    "title": "if-else",
    "estimated_minutes": 5,
    "is_free_preview": false,
    "active": true,
    "content": [
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
            {
              "input": "",
              "expectedOutput": "Fail"
            }
          ]
        }
      }
    ]
  },
  "m3-if-elif-else": {
    "id": "m3-if-elif-else",
    "module_number": 3,
    "level_number": 8,
    "lesson_order": 5,
    "title": "elif",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
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
          "options": [
            "if marks >= 90",
            "elif marks >= 80",
            "else",
            "All branches"
          ],
          "correctAnswer": 1,
          "explanation": "85 < 90 so if fails. 85 >= 80 is True, so 'elif marks >= 80' runs and subsequent branches are skipped."
        }
      }
    ]
  },
  "m3-combined-conditions": {
    "id": "m3-combined-conditions",
    "module_number": 3,
    "level_number": 8,
    "lesson_order": 6,
    "title": "Combining Conditions",
    "estimated_minutes": 7,
    "is_free_preview": false,
    "active": true,
    "content": [
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
    ]
  },
  "m3-decision-checkpoint": {
    "id": "m3-decision-checkpoint",
    "module_number": 3,
    "level_number": 8,
    "lesson_order": 7,
    "title": "Decisions Checkpoint",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "quiz1",
        "type": "checkpoint-quiz",
        "content": {
          "passingScore": 70,
          "questions": [
            {
              "id": "q1",
              "question": "Which operator tests for value equality in Python?",
              "options": [
                "=",
                "==",
                "===",
                "is"
              ],
              "correctAnswer": 1,
              "explanation": "== tests equality."
            },
            {
              "id": "q2",
              "question": "What is printed by: if 5 > 10: print('A') else: print('B')?",
              "options": [
                "A",
                "B",
                "SyntaxError",
                "Nothing"
              ],
              "correctAnswer": 1,
              "explanation": "5 > 10 is False, so the else branch prints B."
            },
            {
              "id": "q3",
              "question": "Which logical operator returns True only when both conditions are True?",
              "options": [
                "or",
                "not",
                "and",
                "xor"
              ],
              "correctAnswer": 2,
              "explanation": "The 'and' operator requires both conditions to be True."
            }
          ]
        }
      }
    ]
  },
  "m3-why-loops": {
    "id": "m3-why-loops",
    "module_number": 3,
    "level_number": 9,
    "lesson_order": 1,
    "title": "Why Repetition Exists",
    "estimated_minutes": 5,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Automating Repetition",
          "content": "Imagine printing numbers from 1 to 1000. Writing 1000 print statements is tedious and error-prone.\n\nLoops allow us to execute a block of code repeatedly with different values of a loop variable."
        }
      }
    ]
  },
  "m3-range-stop": {
    "id": "m3-range-stop",
    "module_number": 3,
    "level_number": 9,
    "lesson_order": 3,
    "title": "range(stop)",
    "estimated_minutes": 7,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Understanding range(stop)",
          "content": "`range(n)` generates integers from 0 up to (n - 1).\n\nKey Rule: `range(stop)` stops BEFORE reaching the stop value!"
        }
      },
      {
        "id": "po1",
        "type": "predict-output",
        "content": {
          "question": "What is the last number printed by `for i in range(4): print(i)`?",
          "options": [
            "4",
            "3",
            "5",
            "0"
          ],
          "correctAnswer": 1,
          "explanation": "range(4) yields 0, 1, 2, 3. The stop value 4 is excluded."
        }
      }
    ]
  },
  "m3-range-start-stop": {
    "id": "m3-range-start-stop",
    "module_number": 3,
    "level_number": 9,
    "lesson_order": 4,
    "title": "range(start, stop)",
    "estimated_minutes": 7,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Setting a Custom Start Value",
          "content": "`range(start, stop)` starts at `start` and stops at `stop - 1`.\n\nExample:\nfor i in range(1, 6):\n    print(i) # prints 1, 2, 3, 4, 5"
        }
      },
      {
        "id": "cp1",
        "type": "code-practice",
        "content": {
          "instruction": "Write a loop to print numbers from 10 to 15 (inclusive).",
          "starterCode": "for i in range(10, 16):\n    print(i)",
          "solutionCode": "for i in range(10, 16):\n    print(i)",
          "testCases": [
            {
              "input": "",
              "expectedOutput": "10\n11\n12\n13\n14\n15"
            }
          ]
        }
      }
    ]
  },
  "m3-range-step": {
    "id": "m3-range-step",
    "module_number": 3,
    "level_number": 9,
    "lesson_order": 5,
    "title": "range(start, stop, step)",
    "estimated_minutes": 7,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Stepping Through Sequences",
          "content": "`range(start, stop, step)` increments by `step` on each iteration.\n\nExample:\nfor i in range(2, 11, 2):\n    print(i) # prints 2, 4, 6, 8, 10"
        }
      }
    ]
  },
  "m3-negative-steps": {
    "id": "m3-negative-steps",
    "module_number": 3,
    "level_number": 9,
    "lesson_order": 6,
    "title": "Negative Steps",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Counting Down with Negative Step",
          "content": "To count backwards, use a negative step value.\n\nExample (Syllabus problem: 50 down to 1):\nfor i in range(50, 0, -1):\n    print(i)"
        }
      }
    ]
  },
  "m3-counters-accumulators": {
    "id": "m3-counters-accumulators",
    "module_number": 3,
    "level_number": 9,
    "lesson_order": 7,
    "title": "Counters and Accumulators",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Accumulating Results",
          "content": "An accumulator variable stores a running total.\n\nExample (Sum of first N numbers):\ntotal = 0\nfor i in range(1, 6):\n    total += i\nprint(total) # 15"
        }
      },
      {
        "id": "vis1",
        "type": "loop-visualizer",
        "content": {
          "steps": [
            {
              "variables": {
                "i": 1,
                "total": 1
              },
              "output": "total = 1"
            },
            {
              "variables": {
                "i": 2,
                "total": 3
              },
              "output": "total = 3"
            },
            {
              "variables": {
                "i": 3,
                "total": 6
              },
              "output": "total = 6"
            },
            {
              "variables": {
                "i": 4,
                "total": 10
              },
              "output": "total = 10"
            },
            {
              "variables": {
                "i": 5,
                "total": 15
              },
              "output": "total = 15"
            }
          ]
        }
      }
    ]
  },
  "m3-nested-loop-intro": {
    "id": "m3-nested-loop-intro",
    "module_number": 3,
    "level_number": 9,
    "lesson_order": 8,
    "title": "Nested Loop Introduction",
    "estimated_minutes": 7,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Loops Inside Loops",
          "content": "A nested loop is a loop inside another loop. The inner loop completes ALL its iterations for EACH single iteration of the outer loop.\n\nUsed for patterns, grids, and 2D matrices."
        }
      }
    ]
  },
  "m3-for-loop-practice": {
    "id": "m3-for-loop-practice",
    "module_number": 3,
    "level_number": 9,
    "lesson_order": 9,
    "title": "For Loop Practice",
    "estimated_minutes": 10,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "cp1",
        "type": "code-practice",
        "content": {
          "instruction": "Write a program using a for loop to calculate the factorial of 5 (5 * 4 * 3 * 2 * 1 = 120).",
          "starterCode": "fact = 1\nfor i in range(1, 6):\n    fact *= i\nprint(fact)",
          "solutionCode": "fact = 1\nfor i in range(1, 6):\n    fact *= i\nprint(fact)",
          "testCases": [
            {
              "input": "",
              "expectedOutput": "120"
            }
          ]
        }
      }
    ]
  },
  "m3-for-loop-checkpoint": {
    "id": "m3-for-loop-checkpoint",
    "module_number": 3,
    "level_number": 9,
    "lesson_order": 10,
    "title": "For-Loop Checkpoint",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "quiz1",
        "type": "checkpoint-quiz",
        "content": {
          "passingScore": 70,
          "questions": [
            {
              "id": "q1",
              "question": "What is the output of len(list(range(2, 10, 2)))?",
              "options": [
                "4",
                "5",
                "8",
                "3"
              ],
              "correctAnswer": 0,
              "explanation": "range(2, 10, 2) produces [2, 4, 6, 8], which has length 4."
            },
            {
              "id": "q2",
              "question": "Which range expression generates numbers from 5 down to 1?",
              "options": [
                "range(5, 0, -1)",
                "range(5, 1, -1)",
                "range(5, 0, 1)",
                "range(1, 5)"
              ],
              "correctAnswer": 0,
              "explanation": "range(5, 0, -1) starts at 5 and stops at 1."
            }
          ]
        }
      }
    ]
  },
  "m3-why-while": {
    "id": "m3-why-while",
    "module_number": 3,
    "level_number": 10,
    "lesson_order": 1,
    "title": "Meet while",
    "estimated_minutes": 5,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Condition-Driven Repetition",
          "content": "A `while` loop repeats as long as a Boolean condition remains True.\n\nUse `while` when you don't know in advance how many times the loop should run."
        }
      }
    ]
  },
  "m3-while-init-condition-update": {
    "id": "m3-while-init-condition-update",
    "module_number": 3,
    "level_number": 10,
    "lesson_order": 2,
    "title": "Initialization, Condition and Update",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "The 3 Essentials of a while Loop",
          "content": "1. Initialization: Set loop counter before loop starts.\n2. Condition check: Evaluated before each iteration.\n3. Update: Modify loop variable inside the loop body so condition eventually becomes False!"
        }
      }
    ]
  },
  "m3-loop-termination": {
    "id": "m3-loop-termination",
    "module_number": 3,
    "level_number": 10,
    "lesson_order": 3,
    "title": "Loop Termination",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "When Loops Stop",
          "content": "A while loop terminates when its condition becomes False."
        }
      }
    ]
  },
  "m3-infinite-loops": {
    "id": "m3-infinite-loops",
    "module_number": 3,
    "level_number": 10,
    "lesson_order": 4,
    "title": "Avoiding Infinite Loops",
    "estimated_minutes": 5,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Danger of Infinite Loops",
          "content": "If the condition never becomes False (e.g., forgetting `count += 1`), the loop runs forever until program memory or time limits explode."
        }
      }
    ]
  },
  "m3-while-problems": {
    "id": "m3-while-problems",
    "module_number": 3,
    "level_number": 10,
    "lesson_order": 5,
    "title": "Guided While Problems",
    "estimated_minutes": 9,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "cp1",
        "type": "code-practice",
        "content": {
          "instruction": "Use a while loop to print numbers 1, 2, 3, 4.",
          "starterCode": "n = 1\nwhile n <= 4:\n    print(n)\n    n += 1",
          "solutionCode": "n = 1\nwhile n <= 4:\n    print(n)\n    n += 1",
          "testCases": [
            {
              "input": "",
              "expectedOutput": "1\n2\n3\n4"
            }
          ]
        }
      }
    ]
  },
  "m3-sum-digits": {
    "id": "m3-sum-digits",
    "module_number": 3,
    "level_number": 10,
    "lesson_order": 6,
    "title": "Sum of Digits",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Digit Processing with % and //",
          "content": "Extract last digit using `num % 10` and remove last digit using `num // 10`.\n\nExample:\nnum = 126\ntotal = 0\nwhile num > 0:\n    total += num % 10\n    num //= 10\nprint(total) # 6 + 2 + 1 = 9"
        }
      }
    ]
  },
  "m3-while-checkpoint": {
    "id": "m3-while-checkpoint",
    "module_number": 3,
    "level_number": 10,
    "lesson_order": 7,
    "title": "While Loop Checkpoint",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "quiz1",
        "type": "checkpoint-quiz",
        "content": {
          "passingScore": 70,
          "questions": [
            {
              "id": "q1",
              "question": "What happens if a while loop condition is initially False?",
              "options": [
                "Runs once",
                "Body never executes",
                "Infinite loop",
                "Syntax error"
              ],
              "correctAnswer": 1,
              "explanation": "Condition is checked before entry, so body is skipped."
            }
          ]
        }
      }
    ]
  },
  "m3-string-creation": {
    "id": "m3-string-creation",
    "module_number": 3,
    "level_number": 11,
    "lesson_order": 1,
    "title": "Creating Strings",
    "estimated_minutes": 5,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Text in Python",
          "content": "A string is a sequence of characters enclosed in single quotes `'hello'` or double quotes `\"hello\"`."
        }
      }
    ]
  },
  "m3-string-indexing": {
    "id": "m3-string-indexing",
    "module_number": 3,
    "level_number": 11,
    "lesson_order": 2,
    "title": "Indexing and Slicing",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Accessing Characters",
          "content": "Indexing uses zero-based positions: `s[0]` is the first character.\n\nSlicing: `s[start:stop]` extracts substring from `start` up to `stop - 1`.\n\nExample:\ns = 'PYTHON'\nprint(s[0])    # 'P'\nprint(s[0:3])  # 'PYT'"
        }
      }
    ]
  },
  "m3-string-concatenation": {
    "id": "m3-string-concatenation",
    "module_number": 3,
    "level_number": 11,
    "lesson_order": 3,
    "title": "Concatenation and Comparison",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Joining and Comparing Strings",
          "content": "Use `+` to concatenate: `'Py' + 'thon' -> 'Python'`.\n\nComparison uses lexicographical (alphabetical/ASCII) order."
        }
      }
    ]
  },
  "m3-string-traversal": {
    "id": "m3-string-traversal",
    "module_number": 3,
    "level_number": 11,
    "lesson_order": 4,
    "title": "String Traversal",
    "estimated_minutes": 7,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Iterating Over Characters",
          "content": "Loop over characters directly:\nfor char in 'HELLO':\n    print(char)"
        }
      }
    ]
  },
  "m3-string-methods": {
    "id": "m3-string-methods",
    "module_number": 3,
    "level_number": 11,
    "lesson_order": 5,
    "title": "Useful String Methods",
    "estimated_minutes": 7,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Built-in Methods",
          "content": "- `.upper()` / `.lower()`\n- `.isdigit()`\n- `.startswith()` / `.endswith()`\n- `len(s)`"
        }
      }
    ]
  },
  "m3-string-validation": {
    "id": "m3-string-validation",
    "module_number": 3,
    "level_number": 11,
    "lesson_order": 6,
    "title": "Validation Concepts",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Preparing for Mobile Number Validation",
          "content": "To validate a 10-digit mobile number starting with 7, 8, or 9:\n1. `len(phone) == 10`\n2. `phone.isdigit()`\n3. `phone[0] in ['7', '8', '9']`"
        }
      }
    ]
  },
  "m3-string-practice": {
    "id": "m3-string-practice",
    "module_number": 3,
    "level_number": 11,
    "lesson_order": 7,
    "title": "String Practice",
    "estimated_minutes": 10,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "cp1",
        "type": "code-practice",
        "content": {
          "instruction": "Write code to check if a string 'radar' is equal to its reverse (palindrome). Print 'Palindrome' or 'Not Palindrome'.",
          "starterCode": "s = 'radar'\nif s == s[::-1]:\n    print('Palindrome')\nelse:\n    print('Not Palindrome')",
          "solutionCode": "s = 'radar'\nif s == s[::-1]:\n    print('Palindrome')\nelse:\n    print('Not Palindrome')",
          "testCases": [
            {
              "input": "",
              "expectedOutput": "Palindrome"
            }
          ]
        }
      }
    ]
  },
  "m3-what-is-list": {
    "id": "m3-what-is-list",
    "module_number": 3,
    "level_number": 12,
    "lesson_order": 1,
    "title": "What is a List?",
    "estimated_minutes": 5,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Ordered Mutable Collections",
          "content": "A list is an ordered, mutable sequence of items enclosed in square brackets `[10, 20, 30]`."
        }
      }
    ]
  },
  "m3-creating-lists": {
    "id": "m3-creating-lists",
    "module_number": 3,
    "level_number": 12,
    "lesson_order": 2,
    "title": "Creating Lists",
    "estimated_minutes": 5,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "List Syntax",
          "content": "nums = [1, 2, 3]\nempty = []"
        }
      }
    ]
  },
  "m3-list-accessing": {
    "id": "m3-list-accessing",
    "module_number": 3,
    "level_number": 12,
    "lesson_order": 3,
    "title": "Accessing and Updating",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Indexing & Modification",
          "content": "nums = [10, 20, 30]\nnums[0] = 99 # list is mutable!\nprint(nums) # [99, 20, 30]"
        }
      }
    ]
  },
  "m3-list-append-remove": {
    "id": "m3-list-append-remove",
    "module_number": 3,
    "level_number": 12,
    "lesson_order": 4,
    "title": "append and remove",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Adding & Removing Elements",
          "content": "- `list.append(x)`: Adds `x` to end of list.\n- `list.remove(x)`: Removes first occurrence of `x`."
        }
      }
    ]
  },
  "m3-list-traversal": {
    "id": "m3-list-traversal",
    "module_number": 3,
    "level_number": 12,
    "lesson_order": 5,
    "title": "Traversing Lists",
    "estimated_minutes": 7,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Looping Through a List",
          "content": "for item in [10, 20, 30]:\n    print(item)"
        }
      }
    ]
  },
  "m3-list-searching": {
    "id": "m3-list-searching",
    "module_number": 3,
    "level_number": 12,
    "lesson_order": 6,
    "title": "Searching and Min/Max",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Finding Largest and Smallest",
          "content": "Use `max(lst)` and `min(lst)` or manual comparison loops."
        }
      }
    ]
  },
  "m3-list-problems": {
    "id": "m3-list-problems",
    "module_number": 3,
    "level_number": 12,
    "lesson_order": 7,
    "title": "Simple List Problems",
    "estimated_minutes": 10,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "cp1",
        "type": "code-practice",
        "content": {
          "instruction": "Print the largest value in [4, 15, 2, 8].",
          "starterCode": "numbers = [4, 15, 2, 8]\nprint(max(numbers))",
          "solutionCode": "numbers = [4, 15, 2, 8]\nprint(max(numbers))",
          "testCases": [
            {
              "input": "",
              "expectedOutput": "15"
            }
          ]
        }
      }
    ]
  },
  "m3-list-checkpoint": {
    "id": "m3-list-checkpoint",
    "module_number": 3,
    "level_number": 12,
    "lesson_order": 8,
    "title": "Lists Checkpoint",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "quiz1",
        "type": "checkpoint-quiz",
        "content": {
          "passingScore": 70,
          "questions": [
            {
              "id": "q1",
              "question": "Which method adds an element to the end of a list?",
              "options": [
                "append()",
                "add()",
                "insert()",
                "push()"
              ],
              "correctAnswer": 0,
              "explanation": "append() adds an item to the end of a list."
            }
          ]
        }
      }
    ]
  },
  "m3-tuples": {
    "id": "m3-tuples",
    "module_number": 3,
    "level_number": 13,
    "lesson_order": 1,
    "title": "Tuples",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Immutable Sequences",
          "content": "A tuple is enclosed in parentheses `(1, 2, 3)`. Unlike lists, tuples are IMMUTABLE (cannot be changed after creation)."
        }
      }
    ]
  },
  "m3-sets": {
    "id": "m3-sets",
    "module_number": 3,
    "level_number": 13,
    "lesson_order": 2,
    "title": "Sets",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Unordered Unique Collections",
          "content": "A set is enclosed in curly braces `{1, 2, 3}`. Sets automatically eliminate duplicates!"
        }
      }
    ]
  },
  "m3-dictionaries-intro": {
    "id": "m3-dictionaries-intro",
    "module_number": 3,
    "level_number": 13,
    "lesson_order": 3,
    "title": "Dictionaries",
    "estimated_minutes": 10,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Key-Value Mappings",
          "content": "A dictionary maps unique keys to values: `student = {'name': 'Arun', 'marks': 95}`.\n\nAccess value by key: `student['marks']`."
        }
      }
    ]
  },
  "m3-collections-checkpoint": {
    "id": "m3-collections-checkpoint",
    "module_number": 3,
    "level_number": 13,
    "lesson_order": 4,
    "title": "Strings and Collections Checkpoint",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "quiz1",
        "type": "checkpoint-quiz",
        "content": {
          "passingScore": 70,
          "questions": [
            {
              "id": "q1",
              "question": "Which data structure is immutable?",
              "options": [
                "List",
                "Tuple",
                "Dictionary",
                "Set"
              ],
              "correctAnswer": 1,
              "explanation": "Tuples cannot be altered after creation."
            }
          ]
        }
      }
    ]
  },
  "m3-numpy-why-arrays": {
    "id": "m3-numpy-why-arrays",
    "module_number": 3,
    "level_number": 14,
    "lesson_order": 1,
    "title": "Why Arrays?",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "NumPy for Numerical Computing",
          "content": "NumPy arrays store homogeneous numerical data efficiently in memory and perform fast element-wise operations."
        }
      }
    ]
  },
  "m3-numpy-import": {
    "id": "m3-numpy-import",
    "module_number": 3,
    "level_number": 14,
    "lesson_order": 2,
    "title": "Import and Create Arrays",
    "estimated_minutes": 7,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Creating NumPy Arrays",
          "content": "import numpy as np\narr = np.array([1, 2, 3, 4, 5])\nprint(arr)"
        }
      }
    ]
  },
  "m3-numpy-access": {
    "id": "m3-numpy-access",
    "module_number": 3,
    "level_number": 14,
    "lesson_order": 3,
    "title": "Access and Modify Arrays",
    "estimated_minutes": 7,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Array Operations",
          "content": "arr = np.array([10, 20, 30])\nprint(arr[0]) # 10\narr[0] = 99"
        }
      }
    ]
  },
  "m3-numpy-practice": {
    "id": "m3-numpy-practice",
    "module_number": 3,
    "level_number": 14,
    "lesson_order": 4,
    "title": "NumPy Practice",
    "estimated_minutes": 10,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "cp1",
        "type": "code-practice",
        "content": {
          "instruction": "Import numpy as np, create array [1, 2, 3], multiply by 2 and print the array.",
          "starterCode": "import numpy as np\narr = np.array([1, 2, 3])\nprint(arr * 2)",
          "solutionCode": "import numpy as np\narr = np.array([1, 2, 3])\nprint(arr * 2)",
          "testCases": [
            {
              "input": "",
              "expectedOutput": "[2 4 6]"
            }
          ]
        }
      }
    ]
  },
  "m3-why-functions": {
    "id": "m3-why-functions",
    "module_number": 3,
    "level_number": 15,
    "lesson_order": 1,
    "title": "Why Functions?",
    "estimated_minutes": 5,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Code Reusability & Organization",
          "content": "A function is a reusable block of code that performs a specific task.\n\nBenefits:\n- DRY (Don't Repeat Yourself)\n- Easier debugging and testing\n- Modular design"
        }
      }
    ]
  },
  "m3-defining-functions": {
    "id": "m3-defining-functions",
    "module_number": 3,
    "level_number": 15,
    "lesson_order": 2,
    "title": "Defining a Function",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "The def Keyword",
          "content": "Syntax:\ndef greet():\n    print('Hello World!')\n\nDefining a function creates the blueprint, but does NOT execute it until called."
        }
      }
    ]
  },
  "m3-calling-functions": {
    "id": "m3-calling-functions",
    "module_number": 3,
    "level_number": 15,
    "lesson_order": 3,
    "title": "Calling a Function",
    "estimated_minutes": 5,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Function Invocation",
          "content": "To execute a function, write its name followed by parentheses: `greet()`."
        }
      }
    ]
  },
  "m3-parameters": {
    "id": "m3-parameters",
    "module_number": 3,
    "level_number": 15,
    "lesson_order": 4,
    "title": "Parameters and Arguments",
    "estimated_minutes": 7,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Passing Data into Functions",
          "content": "Parameters act as placeholders inside the function definition. Arguments are the actual values passed during a call.\n\ndef greet_person(name):\n    print('Hello ' + name)\n\ngreet_person('Arun')"
        }
      }
    ]
  },
  "m3-return": {
    "id": "m3-return",
    "module_number": 3,
    "level_number": 15,
    "lesson_order": 5,
    "title": "return Values",
    "estimated_minutes": 7,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Sending Results Back",
          "content": "The `return` statement sends a computed value back to the caller.\n\ndef add(a, b):\n    return a + b\n\nresult = add(5, 3) # result is 8"
        }
      }
    ]
  },
  "m3-multiple-returns": {
    "id": "m3-multiple-returns",
    "module_number": 3,
    "level_number": 15,
    "lesson_order": 6,
    "title": "Multiple Return Values",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
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
    ]
  },
  "m3-function-practice": {
    "id": "m3-function-practice",
    "module_number": 3,
    "level_number": 15,
    "lesson_order": 7,
    "title": "Function Practice",
    "estimated_minutes": 10,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "cp1",
        "type": "code-practice",
        "content": {
          "instruction": "Define a function is_even(n) that returns True if n is even, else False. Call it with 6 and print result.",
          "starterCode": "def is_even(n):\n    return n % 2 == 0\n\nprint(is_even(6))",
          "solutionCode": "def is_even(n):\n    return n % 2 == 0\n\nprint(is_even(6))",
          "testCases": [
            {
              "input": "",
              "expectedOutput": "True"
            }
          ]
        }
      }
    ]
  },
  "m3-function-checkpoint": {
    "id": "m3-function-checkpoint",
    "module_number": 3,
    "level_number": 15,
    "lesson_order": 8,
    "title": "Functions Checkpoint",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "quiz1",
        "type": "checkpoint-quiz",
        "content": {
          "passingScore": 70,
          "questions": [
            {
              "id": "q1",
              "question": "What keyword is used to send a value back from a function?",
              "options": [
                "output",
                "send",
                "return",
                "yield"
              ],
              "correctAnswer": 2,
              "explanation": "return sends a value back."
            }
          ]
        }
      }
    ]
  },
  "m3-decomposition": {
    "id": "m3-decomposition",
    "module_number": 3,
    "level_number": 16,
    "lesson_order": 1,
    "title": "Break It Down",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Problem Decomposition",
          "content": "Decomposition means breaking down a complex problem into smaller, manageable sub-problems.\n\nInstead of solving one giant hard task, solve 3 smaller easy tasks!"
        }
      }
    ]
  },
  "m3-modularization": {
    "id": "m3-modularization",
    "module_number": 3,
    "level_number": 16,
    "lesson_order": 2,
    "title": "Modularization",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Designing Modules",
          "content": "Modularization organizes code into separate self-contained modules (functions or files) that handle distinct responsibilities."
        }
      }
    ]
  },
  "m3-merge-sort": {
    "id": "m3-merge-sort",
    "module_number": 3,
    "level_number": 16,
    "lesson_order": 3,
    "title": "Merge Sort as Decomposition",
    "estimated_minutes": 10,
    "is_free_preview": false,
    "active": true,
    "content": [
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
    ]
  },
  "m3-top-three-integers": {
    "id": "m3-top-three-integers",
    "module_number": 3,
    "level_number": 16,
    "lesson_order": 4,
    "title": "Top Three Integers",
    "estimated_minutes": 12,
    "is_free_preview": false,
    "active": true,
    "content": [
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
            {
              "input": "",
              "expectedOutput": "(99, 56, 45)"
            }
          ]
        }
      }
    ]
  },
  "m3-decomposition-checkpoint": {
    "id": "m3-decomposition-checkpoint",
    "module_number": 3,
    "level_number": 16,
    "lesson_order": 5,
    "title": "Decomposition Checkpoint",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "quiz1",
        "type": "checkpoint-quiz",
        "content": {
          "passingScore": 70,
          "questions": [
            {
              "id": "q1",
              "question": "What is decomposition in algorithmic thinking?",
              "options": [
                "Breaking a problem into smaller sub-problems",
                "Writing code without testing",
                "Compiling Python to C",
                "Converting loops to while"
              ],
              "correctAnswer": 0,
              "explanation": "Decomposition breaks complex problems into simpler sub-problems."
            }
          ]
        }
      }
    ]
  },
  "m3-what-is-recursion": {
    "id": "m3-what-is-recursion",
    "module_number": 3,
    "level_number": 17,
    "lesson_order": 1,
    "title": "What is Recursion?",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Functions Calling Themselves",
          "content": "Recursion occurs when a function calls itself directly or indirectly to solve a smaller instance of the same problem."
        }
      }
    ]
  },
  "m3-recursion-reasons": {
    "id": "m3-recursion-reasons",
    "module_number": 3,
    "level_number": 17,
    "lesson_order": 2,
    "title": "Why Recursion?",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "When to Use Recursion",
          "content": "Recursion naturally mirrors mathematical definitions (like factorial, Fibonacci, trees, and divide-and-conquer algorithms)."
        }
      }
    ]
  },
  "m3-base-case": {
    "id": "m3-base-case",
    "module_number": 3,
    "level_number": 17,
    "lesson_order": 3,
    "title": "Base Case and Recursive Case",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "The Two Mandatory Parts of Recursion",
          "content": "1. Base Case: The terminating condition that stops recursion (does NOT make a recursive call).\n2. Recursive Case: The step where the function calls itself with a smaller input."
        }
      }
    ]
  },
  "m3-call-stack": {
    "id": "m3-call-stack",
    "module_number": 3,
    "level_number": 17,
    "lesson_order": 4,
    "title": "Call Stack and Unwinding",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
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
    ]
  },
  "m3-factorial-recursion": {
    "id": "m3-factorial-recursion",
    "module_number": 3,
    "level_number": 17,
    "lesson_order": 5,
    "title": "Factorial",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
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
            {
              "input": "",
              "expectedOutput": "120"
            }
          ]
        }
      }
    ]
  },
  "m3-fibonacci-recursion": {
    "id": "m3-fibonacci-recursion",
    "module_number": 3,
    "level_number": 17,
    "lesson_order": 6,
    "title": "Fibonacci",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
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
    ]
  },
  "m3-gcd-recursion": {
    "id": "m3-gcd-recursion",
    "module_number": 3,
    "level_number": 17,
    "lesson_order": 7,
    "title": "GCD of Two Positive Integers",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
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
    ]
  },
  "m3-recursive-addition": {
    "id": "m3-recursive-addition",
    "module_number": 3,
    "level_number": 17,
    "lesson_order": 8,
    "title": "Recursive Addition",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
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
    ]
  },
  "m3-sum-of-digits": {
    "id": "m3-sum-of-digits",
    "module_number": 3,
    "level_number": 17,
    "lesson_order": 9,
    "title": "Sum of Digits",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
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
    ]
  },
  "m3-recursive-sum-range": {
    "id": "m3-recursive-sum-range",
    "module_number": 3,
    "level_number": 17,
    "lesson_order": 10,
    "title": "Recursive Sum 0..n",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Summing 0 to n Recursively",
          "content": "rec_sum(n) = 0 if n == 0 else n + rec_sum(n - 1)."
        }
      }
    ]
  },
  "m3-recursive-product": {
    "id": "m3-recursive-product",
    "module_number": 3,
    "level_number": 17,
    "lesson_order": 11,
    "title": "Recursive Product of a List",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Multiplying List Elements Recursively",
          "content": "rec_prod(lst) = 1 if len(lst) == 0 else lst[0] * rec_prod(lst[1:])."
        }
      }
    ]
  },
  "m3-recursion-practice": {
    "id": "m3-recursion-practice",
    "module_number": 3,
    "level_number": 17,
    "lesson_order": 12,
    "title": "Recursive Practice",
    "estimated_minutes": 10,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "cp1",
        "type": "code-practice",
        "content": {
          "instruction": "Write a recursive function rec_sum(n) to sum numbers from 1 to n. Test with n=5.",
          "starterCode": "def rec_sum(n):\n    if n <= 0:\n        return 0\n    return n + rec_sum(n - 1)\n\nprint(rec_sum(5))",
          "solutionCode": "def rec_sum(n):\n    if n <= 0:\n        return 0\n    return n + rec_sum(n - 1)\n\nprint(rec_sum(5))",
          "testCases": [
            {
              "input": "",
              "expectedOutput": "15"
            }
          ]
        }
      }
    ]
  },
  "m3-recursion-checkpoint": {
    "id": "m3-recursion-checkpoint",
    "module_number": 3,
    "level_number": 17,
    "lesson_order": 13,
    "title": "Recursion Checkpoint",
    "estimated_minutes": 10,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "quiz1",
        "type": "checkpoint-quiz",
        "content": {
          "passingScore": 70,
          "questions": [
            {
              "id": "q1",
              "question": "What happens if a recursive function lacks a base case?",
              "options": [
                "It finishes immediately",
                "RecursionError (maximum recursion depth exceeded)",
                "SyntaxError",
                "Returns 0"
              ],
              "correctAnswer": 1,
              "explanation": "Without a base case, calls repeat endlessly until stack overflow (RecursionError)."
            },
            {
              "id": "q2",
              "question": "Which data structure manages function call frames during recursion?",
              "options": [
                "Queue",
                "Call Stack",
                "Array",
                "Dictionary"
              ],
              "correctAnswer": 1,
              "explanation": "The call stack tracks active function calls."
            }
          ]
        }
      }
    ]
  },
  "m4-what-is-brute-force": {
    "id": "m4-what-is-brute-force",
    "module_number": 4,
    "level_number": 18,
    "lesson_order": 1,
    "title": "What Is Brute Force?",
    "estimated_minutes": 5,
    "is_free_preview": false,
    "active": true,
    "content": [
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
    ]
  },
  "m4-trying-every-possibility": {
    "id": "m4-trying-every-possibility",
    "module_number": 4,
    "level_number": 18,
    "lesson_order": 2,
    "title": "Trying Every Possibility",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
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
          "options": [
            "It uses complex heuristics",
            "It systematically tests all potential candidates",
            "It divides the problem into halves",
            "It makes random choices"
          ],
          "correctAnswer": 1,
          "explanation": "Brute force checks every possibility systematically."
        }
      }
    ]
  },
  "m4-padlock-example": {
    "id": "m4-padlock-example",
    "module_number": 4,
    "level_number": 18,
    "lesson_order": 3,
    "title": "Padlock Example",
    "estimated_minutes": 7,
    "is_free_preview": false,
    "active": true,
    "content": [
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
    ]
  },
  "m4-password-guessing": {
    "id": "m4-password-guessing",
    "module_number": 4,
    "level_number": 18,
    "lesson_order": 4,
    "title": "Password Guessing Concept",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Conceptual Example: Password Guessing",
          "content": "In computer science, testing all combinations of characters (e.g. 'aaa', 'aab', 'aac'...) is a classic conceptual example of brute-force search.\n\nBecause character spaces grow exponentially, brute-force becomes extremely slow for long passwords!"
        }
      }
    ]
  },
  "m4-brute-force-limitations": {
    "id": "m4-brute-force-limitations",
    "module_number": 4,
    "level_number": 18,
    "lesson_order": 5,
    "title": "Strengths & Limitations",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "When to Use Brute Force",
          "content": "Strengths:\n- Simple to design and implement.\n- Guaranteed to find a solution if one exists.\n\nLimitations:\n- Inefficient for large search spaces (combinatorial explosion).\n- Not practical when N is very large."
        }
      }
    ]
  },
  "m4-brute-force-checkpoint": {
    "id": "m4-brute-force-checkpoint",
    "module_number": 4,
    "level_number": 18,
    "lesson_order": 6,
    "title": "Brute Force Checkpoint",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "quiz1",
        "type": "checkpoint-quiz",
        "content": {
          "passingScore": 70,
          "questions": [
            {
              "id": "q1",
              "question": "Which of the following is a key advantage of brute force?",
              "options": [
                "Always executes in O(1) time",
                "Guaranteed to find the solution if search space is finite",
                "Requires zero memory",
                "Uses randomized guesses"
              ],
              "correctAnswer": 1,
              "explanation": "Because it checks all options, it is guaranteed to find a valid solution if one exists."
            }
          ]
        }
      }
    ]
  },
  "m4-divide-conquer-concept": {
    "id": "m4-divide-conquer-concept",
    "module_number": 4,
    "level_number": 19,
    "lesson_order": 1,
    "title": "Divide, Solve and Combine",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "The Three Phases of Divide & Conquer",
          "content": "1. DIVIDE: Break the problem into smaller, independent subproblems of the same type.\n2. CONQUER: Solve the smaller subproblems (recursively or directly when small enough).\n3. COMBINE: Merge the subproblem solutions into a final solution for the original problem."
        }
      }
    ]
  },
  "m4-merge-sort-dnc": {
    "id": "m4-merge-sort-dnc",
    "module_number": 4,
    "level_number": 19,
    "lesson_order": 2,
    "title": "Merge Sort",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
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
    ]
  },
  "m4-dnc-advantages-disadvantages": {
    "id": "m4-dnc-advantages-disadvantages",
    "module_number": 4,
    "level_number": 19,
    "lesson_order": 3,
    "title": "Advantages and Disadvantages",
    "estimated_minutes": 7,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Evaluating Divide & Conquer",
          "content": "Advantages:\n- Solves difficult problems by breaking them down.\n- High efficiency for algorithms like Merge Sort.\n\nDisadvantages:\n- Overhead from recursive call stack.\n- Merging steps may require additional temporary storage memory."
        }
      }
    ]
  },
  "m4-divide-conquer-checkpoint": {
    "id": "m4-divide-conquer-checkpoint",
    "module_number": 4,
    "level_number": 19,
    "lesson_order": 4,
    "title": "Divide & Conquer Checkpoint",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "quiz1",
        "type": "checkpoint-quiz",
        "content": {
          "passingScore": 70,
          "questions": [
            {
              "id": "q1",
              "question": "What are the three steps of the Divide & Conquer approach?",
              "options": [
                "Try, Error, Repeat",
                "Divide, Conquer, Combine",
                "Input, Process, Output",
                "Initialize, Condition, Update"
              ],
              "correctAnswer": 1,
              "explanation": "Divide, Conquer (solve), and Combine is the standard D&C tri-fold strategy."
            }
          ]
        }
      }
    ]
  },
  "m4-dynamic-programming-concept": {
    "id": "m4-dynamic-programming-concept",
    "module_number": 4,
    "level_number": 20,
    "lesson_order": 1,
    "title": "Storing & Reusing Results",
    "estimated_minutes": 7,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Overlapping Subproblems & Memoization",
          "content": "Dynamic Programming (DP) is used when a problem can be broken down into OVERLAPPING subproblems.\n\nInstead of re-solving the same subproblem again and again, DP stores solved subproblem answers in memory (memoization or tabulation) and reuses them."
        }
      }
    ]
  },
  "m4-dp-fibonacci": {
    "id": "m4-dp-fibonacci",
    "module_number": 4,
    "level_number": 20,
    "lesson_order": 2,
    "title": "Fibonacci with DP",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
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
    ]
  },
  "m4-recursion-vs-dp": {
    "id": "m4-recursion-vs-dp",
    "module_number": 4,
    "level_number": 20,
    "lesson_order": 3,
    "title": "Recursion vs Dynamic Programming",
    "estimated_minutes": 7,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Comparing Recursion and DP",
          "content": "Recursion:\n- Self-calling top-down structure.\n- Recomputes identical subproblems if not memoized.\n\nDynamic Programming:\n- Stores intermediate subproblem answers.\n- Converts exponential recursive work into linear O(N) or polynomial execution!"
        }
      }
    ]
  },
  "m4-dynamic-programming-checkpoint": {
    "id": "m4-dynamic-programming-checkpoint",
    "module_number": 4,
    "level_number": 20,
    "lesson_order": 4,
    "title": "Dynamic Programming Checkpoint",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "quiz1",
        "type": "checkpoint-quiz",
        "content": {
          "passingScore": 70,
          "questions": [
            {
              "id": "q1",
              "question": "What key property makes a problem suitable for Dynamic Programming?",
              "options": [
                "Random subproblems",
                "Overlapping subproblems",
                "No base case",
                "Single linear statement"
              ],
              "correctAnswer": 1,
              "explanation": "DP excels when identical subproblems repeat multiple times."
            }
          ]
        }
      }
    ]
  },
  "m4-greedy-concept": {
    "id": "m4-greedy-concept",
    "module_number": 4,
    "level_number": 21,
    "lesson_order": 1,
    "title": "Making Local Choices",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Local Optimal Choice",
          "content": "A Greedy algorithm builds a solution step by step by making the locally optimal choice at each step, hoping it leads to a globally optimal solution."
        }
      }
    ]
  },
  "m4-greedy-task-completion": {
    "id": "m4-greedy-task-completion",
    "module_number": 4,
    "level_number": 21,
    "lesson_order": 2,
    "title": "Task Completion Example",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
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
    ]
  },
  "m4-greedy-motivations-characteristics": {
    "id": "m4-greedy-motivations-characteristics",
    "module_number": 4,
    "level_number": 21,
    "lesson_order": 3,
    "title": "Motivations & Characteristics",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Characteristics of Greedy Methods",
          "content": "- Fast and straightforward.\n- Never backtracks or reconsiders past decisions.\n- Works optimally for specific problem structures (like task scheduling by shortest duration), but may fail for general problems."
        }
      }
    ]
  },
  "m4-greedy-vs-dp": {
    "id": "m4-greedy-vs-dp",
    "module_number": 4,
    "level_number": 21,
    "lesson_order": 4,
    "title": "Greedy vs Dynamic Programming",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Greedy vs DP Comparison",
          "content": "Greedy:\n- Makes immediate local decision without evaluating all subproblems.\n- Does not backtrack.\n\nDynamic Programming:\n- Evaluates subproblems and combines answers to guarantee global optimum."
        }
      }
    ]
  },
  "m4-greedy-checkpoint": {
    "id": "m4-greedy-checkpoint",
    "module_number": 4,
    "level_number": 21,
    "lesson_order": 5,
    "title": "Greedy Approach Checkpoint",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "quiz1",
        "type": "checkpoint-quiz",
        "content": {
          "passingScore": 70,
          "questions": [
            {
              "id": "q1",
              "question": "To maximize task count in limited time, which task should a greedy approach select first?",
              "options": [
                "The longest task",
                "The shortest task",
                "A random task",
                "The first task in list"
              ],
              "correctAnswer": 1,
              "explanation": "Selecting shortest tasks first leaves maximum time remaining for subsequent tasks."
            }
          ]
        }
      }
    ]
  },
  "m4-randomized-concept": {
    "id": "m4-randomized-concept",
    "module_number": 4,
    "level_number": 22,
    "lesson_order": 1,
    "title": "Randomness in Strategy",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "t1",
        "type": "teacher-explanation",
        "content": {
          "title": "Algorithms with Random Choices",
          "content": "A Randomized algorithm uses random numbers to make decisions during execution.\n\nInstead of deterministic fixed behavior, outcomes vary per run, but average/expected behavior can be predicted mathematically."
        }
      }
    ]
  },
  "m4-coupon-collector": {
    "id": "m4-coupon-collector",
    "module_number": 4,
    "level_number": 22,
    "lesson_order": 2,
    "title": "Coupon Collector Example",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
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
    ]
  },
  "m4-hat-check-problem": {
    "id": "m4-hat-check-problem",
    "module_number": 4,
    "level_number": 22,
    "lesson_order": 3,
    "title": "Hat-Check Example",
    "estimated_minutes": 8,
    "is_free_preview": false,
    "active": true,
    "content": [
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
    ]
  },
  "m4-randomized-checkpoint": {
    "id": "m4-randomized-checkpoint",
    "module_number": 4,
    "level_number": 22,
    "lesson_order": 4,
    "title": "Randomized Checkpoint",
    "estimated_minutes": 6,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "quiz1",
        "type": "checkpoint-quiz",
        "content": {
          "passingScore": 70,
          "questions": [
            {
              "id": "q1",
              "question": "In the hat-check problem with N people receiving randomly shuffled hats, what is the expected number of correct hat matches?",
              "options": [
                "0",
                "1",
                "N / 2",
                "N"
              ],
              "correctAnswer": 1,
              "explanation": "Regardless of N, the expected number of people who receive their own hat is 1."
            }
          ]
        }
      }
    ]
  },
  "m4-approach-comparison": {
    "id": "m4-approach-comparison",
    "module_number": 4,
    "level_number": 23,
    "lesson_order": 1,
    "title": "Which Approach Would You Choose?",
    "estimated_minutes": 10,
    "is_free_preview": false,
    "active": true,
    "content": [
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
          "options": [
            "Brute Force",
            "Divide & Conquer",
            "Dynamic Programming",
            "Greedy"
          ],
          "correctAnswer": 2,
          "explanation": "Dynamic Programming reuses stored subproblem answers."
        }
      }
    ]
  },
  "m4-module4-cumulative-checkpoint": {
    "id": "m4-module4-cumulative-checkpoint",
    "module_number": 4,
    "level_number": 23,
    "lesson_order": 2,
    "title": "Module 4 Cumulative Checkpoint",
    "estimated_minutes": 12,
    "is_free_preview": false,
    "active": true,
    "content": [
      {
        "id": "quiz1",
        "type": "checkpoint-quiz",
        "content": {
          "passingScore": 70,
          "questions": [
            {
              "id": "q1",
              "question": "Which strategy does Merge Sort use?",
              "options": [
                "Brute Force",
                "Divide & Conquer",
                "Greedy",
                "Randomized"
              ],
              "correctAnswer": 1,
              "explanation": "Merge Sort splits arrays into halves (Divide) and merges them (Combine)."
            },
            {
              "id": "q2",
              "question": "Which strategy makes immediate local choices without reconsidering?",
              "options": [
                "Dynamic Programming",
                "Greedy",
                "Brute Force",
                "Divide & Conquer"
              ],
              "correctAnswer": 1,
              "explanation": "Greedy algorithms make step-by-step local choices."
            },
            {
              "id": "q3",
              "question": "Testing all 10,000 combinations on a padlock is an example of:",
              "options": [
                "Brute Force",
                "Greedy",
                "Randomized",
                "Dynamic Programming"
              ],
              "correctAnswer": 0,
              "explanation": "Systematically testing all combinations is Brute Force."
            }
          ]
        }
      }
    ]
  }
};
