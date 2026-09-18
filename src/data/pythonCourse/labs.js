export const PRACTICAL_LABS = [
  {
    id: 'lab-1',
    labNumber: 1,
    title: 'Basics of Python Programming',
    aim: 'Demonstrate print statements, variables, basic syntax, user input, and simple arithmetic expressions.',
    conceptRecap: 'Python is a high-level interpreted language. `print()` displays output to console, `input()` accepts string input from the user.',
    algorithm: [
      '1. Read user input for student name and age.',
      '2. Convert age to integer.',
      '3. Print greeting message with name and calculated birth year (2026 - age).'
    ],
    starterCode: `# Lab 1: Basics of Python Programming\nname = "Arun"\nage = 19\nbirth_year = 2026 - age\nprint("Hello", name)\nprint("Birth Year:", birth_year)`,
    solutionCode: `name = "Arun"\nage = 19\nbirth_year = 2026 - age\nprint("Hello", name)\nprint("Birth Year:", birth_year)`,
    testCases: [
      { input: '', expectedOutput: 'Hello Arun\nBirth Year: 2007' }
    ],
    vivaQuestions: [
      {
        question: 'What is the default return data type of input() in Python?',
        options: ['Integer', 'String', 'Float', 'Boolean'],
        correctAnswer: 1,
        explanation: 'input() always returns a string, regardless of what the user types.'
      },
      {
        question: 'Which built-in function outputs text to the standard console?',
        options: ['echo()', 'write()', 'print()', 'output()'],
        correctAnswer: 2,
        explanation: 'print() is the standard Python output function.'
      }
    ]
  },
  {
    id: 'lab-2',
    labNumber: 2,
    title: 'Fundamental Data Types',
    aim: 'Demonstrate fundamental Python data types: int, float, complex, bool, and str.',
    conceptRecap: 'Python features dynamically-typed primitive data types including integers, floating-point numbers, complex numbers (a + bj), booleans (True/False), and strings.',
    algorithm: [
      '1. Initialize variables of types int, float, complex, bool, and str.',
      '2. Print each variable along with its type using type().'
    ],
    starterCode: `# Lab 2: Fundamental Data Types\na = 10\nb = 3.14\nc = 2 + 3j\nd = True\ne = "KTU"\n\nprint(type(a))\nprint(type(b))\nprint(type(c))\nprint(type(d))\nprint(type(e))`,
    solutionCode: `a = 10\nb = 3.14\nc = 2 + 3j\nd = True\ne = "KTU"\n\nprint(type(a))\nprint(type(b))\nprint(type(c))\nprint(type(d))\nprint(type(e))`,
    testCases: [
      { input: '', expectedOutput: "<class 'int'>\n<class 'float'>\n<class 'complex'>\n<class 'bool'>\n<class 'str'>" }
    ],
    vivaQuestions: [
      {
        question: 'How are complex numbers represented in Python?',
        options: ['a + bi', 'a + bj', 'complex(a, i)', 'a ++ b'],
        correctAnswer: 1,
        explanation: 'Python uses j or J to represent the imaginary unit in complex numbers.'
      }
    ]
  },
  {
    id: 'lab-3',
    labNumber: 3,
    title: 'Arithmetic Operations',
    aim: 'Perform arithmetic operations: +, -, *, /, //, %, **.',
    conceptRecap: 'Python supports standard addition (+), subtraction (-), multiplication (*), floating-point division (/), integer floor division (//), modulus remainder (%), and exponentiation (**).',
    algorithm: [
      '1. Read two numbers x and y.',
      '2. Calculate and print sum, difference, product, division, floor division, remainder, and power.'
    ],
    starterCode: `# Lab 3: Arithmetic Operations\nx, y = 15, 4\nprint(x + y)\nprint(x - y)\nprint(x * y)\nprint(x / y)\nprint(x // y)\nprint(x % y)\nprint(x ** y)`,
    solutionCode: `x, y = 15, 4\nprint(x + y)\nprint(x - y)\nprint(x * y)\nprint(x / y)\nprint(x // y)\nprint(x % y)\nprint(x ** y)`,
    testCases: [
      { input: '', expectedOutput: '19\n11\n60\n3.75\n3\n3\n50625' }
    ],
    vivaQuestions: [
      {
        question: 'What is the difference between / and // in Python?',
        options: ['/ is integer division, // is float division', '/ returns float result, // returns floor integer result', 'They are identical', '/ is modulo operator'],
        correctAnswer: 1,
        explanation: '/ always produces a float, whereas // rounds down to the nearest integer.'
      }
    ]
  },
  {
    id: 'lab-4',
    labNumber: 4,
    title: 'Strings Operations',
    aim: 'Create, concatenate, print, and slice strings.',
    conceptRecap: 'Strings are immutable sequences of characters. Slicing syntax `string[start:stop:step]` extracts substrings.',
    algorithm: [
      '1. Create string s = "Algorithmic Thinking".',
      '2. Concatenate with " with Python".',
      '3. Extract substring "Algorithmic" using slicing.'
    ],
    starterCode: `# Lab 4: String Operations\ns1 = "Algorithmic Thinking"\ns2 = " with Python"\nfull = s1 + s2\nprint(full)\nprint(s1[0:11])`,
    solutionCode: `s1 = "Algorithmic Thinking"\ns2 = " with Python"\nfull = s1 + s2\nprint(full)\nprint(s1[0:11])`,
    testCases: [
      { input: '', expectedOutput: 'Algorithmic Thinking with Python\nAlgorithmic' }
    ],
    vivaQuestions: [
      {
        question: 'Are Python strings mutable or immutable?',
        options: ['Mutable', 'Immutable', 'Depends on length', 'Dynamic'],
        correctAnswer: 1,
        explanation: 'Strings cannot be modified in-place after creation.'
      }
    ]
  },
  {
    id: 'lab-5',
    labNumber: 5,
    title: 'Time and Date Formatting',
    aim: 'Format current date and time using Python datetime standard library.',
    conceptRecap: 'The `datetime` module provides classes for manipulating dates and times with `strftime()` formatting directives.',
    algorithm: [
      '1. Import datetime module.',
      '2. Get current time or construct datetime object.',
      '3. Format output as standard date string.'
    ],
    starterCode: `# Lab 5: Time & Date Formatting\nfrom datetime import datetime\ndt = datetime(2026, 9, 18, 14, 30, 0)\nprint(dt.strftime("%A, %B %d, %Y %H:%M:%S"))`,
    solutionCode: `from datetime import datetime\ndt = datetime(2026, 9, 18, 14, 30, 0)\nprint(dt.strftime("%A, %B %d, %Y %H:%M:%S"))`,
    testCases: [
      { input: '', expectedOutput: 'Friday, September 18, 2026 14:30:00' }
    ],
    vivaQuestions: [
      {
        question: 'Which strftime directive formats full weekday name (e.g. Friday)?',
        options: ['%w', '%A', '%a', '%W'],
        correctAnswer: 1,
        explanation: '%A expands to the full weekday name.'
      }
    ]
  },
  {
    id: 'lab-6',
    labNumber: 6,
    title: 'NumPy Array Operations',
    aim: 'Create, append, and remove elements using NumPy.',
    conceptRecap: 'NumPy provides `np.array()`, `np.append()`, and `np.delete()` for array manipulation.',
    algorithm: [
      '1. Import numpy as np.',
      '2. Create array [10, 20, 30].',
      '3. Append 40 to array.',
      '4. Delete element at index 0 and print final array.'
    ],
    starterCode: `# Lab 6: NumPy Array Operations\nimport numpy as np\narr = np.array([10, 20, 30])\narr = np.append(arr, 40)\narr = np.delete(arr, 0)\nprint(arr)`,
    solutionCode: `import numpy as np\narr = np.array([10, 20, 30])\narr = np.append(arr, 40)\narr = np.delete(arr, 0)\nprint(arr)`,
    testCases: [
      { input: '', expectedOutput: '[20 30 40]' }
    ],
    vivaQuestions: [
      {
        question: 'What does np.append(arr, value) return?',
        options: ['Modifies arr in-place and returns None', 'Returns a new array with value appended', 'Appends value to list', 'Deletes array'],
        correctAnswer: 1,
        explanation: 'np.append returns a copy of the array with values appended.'
      }
    ]
  },
  {
    id: 'lab-7',
    labNumber: 7,
    title: 'Largest of Three Numbers',
    aim: 'Find the largest of three given numbers using nested or combined decision logic.',
    conceptRecap: 'Use `if-elif-else` conditions with `>=` to compare 3 numbers.',
    algorithm: [
      '1. Read a, b, c.',
      '2. If a >= b and a >= c: largest = a.',
      '3. Elif b >= a and b >= c: largest = b.',
      '4. Else: largest = c.',
      '5. Print largest.'
    ],
    starterCode: `# Lab 7: Largest of Three Numbers\na, b, c = 25, 42, 18\nif a >= b and a >= c:\n    largest = a\nelif b >= a and b >= c:\n    largest = b\nelse:\n    largest = c\nprint("Largest:", largest)`,
    solutionCode: `a, b, c = 25, 42, 18\nif a >= b and a >= c:\n    largest = a\nelif b >= a and b >= c:\n    largest = b\nelse:\n    largest = c\nprint("Largest:", largest)`,
    testCases: [
      { input: '', expectedOutput: 'Largest: 42' }
    ],
    vivaQuestions: [
      {
        question: 'Why do we use >= instead of > when finding largest of three numbers?',
        options: ['To handle equal number values correctly', 'To speed up execution', 'Because > is invalid', 'To prevent zero division'],
        correctAnswer: 0,
        explanation: '>= handles edge cases where two or three numbers are equal.'
      }
    ]
  },
  {
    id: 'lab-8',
    labNumber: 8,
    title: 'Celsius to Fahrenheit Conversion',
    aim: 'Convert temperature between Celsius and Fahrenheit.',
    conceptRecap: 'Formula: F = (C * 9/5) + 32, C = (F - 32) * 5/9.',
    algorithm: [
      '1. Define celsius temperature.',
      '2. Calculate fahrenheit = (celsius * 9/5) + 32.',
      '3. Print formatted result.'
    ],
    starterCode: `# Lab 8: Celsius to Fahrenheit\ncelsius = 37.0\nfahrenheit = (celsius * 9 / 5) + 32\nprint(f"{celsius}°C = {fahrenheit}°F")`,
    solutionCode: `celsius = 37.0\nfahrenheit = (celsius * 9 / 5) + 32\nprint(f"{celsius}°C = {fahrenheit}°F")`,
    testCases: [
      { input: '', expectedOutput: '37.0°C = 98.6°F' }
    ],
    vivaQuestions: [
      {
        question: 'What is the freezing point of water in Celsius and Fahrenheit?',
        options: ['0°C and 32°F', '100°C and 212°F', '0°C and 0°F', '-40°C and -40°F'],
        correctAnswer: 0,
        explanation: 'Water freezes at 0°C (32°F) and boils at 100°C (212°F).'
      }
    ]
  },
  {
    id: 'lab-9',
    labNumber: 9,
    title: 'Star Pattern using Nested Loops',
    aim: 'Print a right-angled triangle star pattern using nested for loops.',
    conceptRecap: 'Outer loop controls rows, inner loop controls column counts per row.',
    algorithm: [
      '1. Set n = 4 rows.',
      '2. Outer loop i from 1 to n.',
      '3. Inner loop j from 1 to i: print "* "',
      '4. Print newline after each row.'
    ],
    starterCode: `# Lab 9: Star Pattern\nn = 4\nfor i in range(1, n + 1):\n    print("* " * i)`,
    solutionCode: `n = 4\nfor i in range(1, n + 1):\n    print("* " * i)`,
    testCases: [
      { input: '', expectedOutput: '* \n* * \n* * * \n* * * * ' }
    ],
    vivaQuestions: [
      {
        question: 'What does the string multiplication "* " * 3 produce in Python?',
        options: ['"* * * "', 'Error', '3', '"***"'],
        correctAnswer: 0,
        explanation: 'String multiplication repeats the string N times.'
      }
    ]
  },
  {
    id: 'lab-10',
    labNumber: 10,
    title: 'Prime Numbers Less Than 20',
    aim: 'Generate and display all prime numbers strictly less than 20.',
    conceptRecap: 'A prime number is a natural number > 1 that has no positive divisors other than 1 and itself.',
    algorithm: [
      '1. Loop num from 2 to 19.',
      '2. For each num, check if num % i == 0 for i in range(2, num).',
      '3. If no divisor is found, print num.'
    ],
    starterCode: `# Lab 10: Prime Numbers < 20\nprimes = []\nfor num in range(2, 20):\n    is_prime = True\n    for i in range(2, num):\n        if num % i == 0:\n            is_prime = False\n            break\n    if is_prime:\n        primes.append(num)\nprint(primes)`,
    solutionCode: `primes = []\nfor num in range(2, 20):\n    is_prime = True\n    for i in range(2, num):\n        if num % i == 0:\n            is_prime = False\n            break\n    if is_prime:\n        primes.append(num)\nprint(primes)`,
    testCases: [
      { input: '', expectedOutput: '[2, 3, 5, 7, 11, 13, 17, 19]' }
    ],
    vivaQuestions: [
      {
        question: 'Is 1 considered a prime number?',
        options: ['Yes', 'No', 'Sometimes', 'Only in Python'],
        correctAnswer: 1,
        explanation: 'By definition, prime numbers must be strictly greater than 1.'
      }
    ]
  },
  {
    id: 'lab-11',
    labNumber: 11,
    title: 'Factorial Using Recursion',
    aim: 'Compute factorial of a positive integer using a recursive function.',
    conceptRecap: 'Factorial: n! = n * (n-1)! with base case 1! = 1.',
    algorithm: [
      '1. Define recursive function fact(n).',
      '2. Base case: if n <= 1 return 1.',
      '3. Recursive case: return n * fact(n - 1).'
    ],
    starterCode: `# Lab 11: Recursive Factorial\ndef fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)\n\nprint(fact(6))`,
    solutionCode: `def fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)\n\nprint(fact(6))`,
    testCases: [
      { input: '', expectedOutput: '720' }
    ],
    vivaQuestions: [
      {
        question: 'What is the purpose of a base case in a recursive function?',
        options: ['To speed up computation', 'To terminate recursive calls and prevent infinite stack growth', 'To print output', 'To define parameters'],
        correctAnswer: 1,
        explanation: 'The base case provides the termination condition.'
      }
    ]
  },
  {
    id: 'lab-12',
    labNumber: 12,
    title: 'Recursive Addition of Two Integers',
    aim: 'Perform addition of two positive integers recursively without using the + operator.',
    conceptRecap: 'Recursive addition: add(a, b) = a if b == 0 else 1 + add(a, b - 1).',
    algorithm: [
      '1. Define add(a, b).',
      '2. Base case: if b == 0 return a.',
      '3. Recursive case: return 1 + add(a, b - 1).'
    ],
    starterCode: `# Lab 12: Recursive Addition\ndef add(a, b):\n    if b == 0:\n        return a\n    return 1 + add(a, b - 1)\n\nprint(add(7, 5))`,
    solutionCode: `def add(a, b):\n    if b == 0:\n        return a\n    return 1 + add(a, b - 1)\n\nprint(add(7, 5))`,
    testCases: [
      { input: '', expectedOutput: '12' }
    ],
    vivaQuestions: [
      {
        question: 'How does recursive addition achieve addition without + ?',
        options: ['By decrementing b towards base case b=0 and adding 1 on unwinding', 'By calling sum()', 'By converting to strings', 'Using bitwise shifting'],
        correctAnswer: 0,
        explanation: 'It repeatedly reduces b by 1 and increments result by 1 on return.'
      }
    ]
  },
  {
    id: 'lab-13',
    labNumber: 13,
    title: 'Recursive Multiplication',
    aim: 'Multiply two positive integers recursively without using the * operator.',
    conceptRecap: 'Recursive multiplication: multiply(a, b) = 0 if b == 0 else a + multiply(a, b - 1).',
    algorithm: [
      '1. Define multiply(a, b).',
      '2. Base case: if b == 0 return 0.',
      '3. Recursive case: return a + multiply(a, b - 1).'
    ],
    starterCode: `# Lab 13: Recursive Multiplication\ndef multiply(a, b):\n    if b == 0:\n        return 0\n    return a + multiply(a, b - 1)\n\nprint(multiply(6, 4))`,
    solutionCode: `def multiply(a, b):\n    if b == 0:\n        return 0\n    return a + multiply(a, b - 1)\n\nprint(multiply(6, 4))`,
    testCases: [
      { input: '', expectedOutput: '24' }
    ],
    vivaQuestions: [
      {
        question: 'Multiplication is conceptually equivalent to which repeated operation?',
        options: ['Repeated subtraction', 'Repeated addition', 'Repeated division', 'Exponentiation'],
        correctAnswer: 1,
        explanation: 'Multiplication a * b is adding a to itself b times.'
      }
    ]
  },
  {
    id: 'lab-14',
    labNumber: 14,
    title: 'Recursive GCD of Two Integers',
    aim: 'Find Greatest Common Divisor (GCD) using the Euclidean recursive algorithm.',
    conceptRecap: 'Euclidean Algorithm: gcd(a, b) = a if b == 0 else gcd(b, a % b).',
    algorithm: [
      '1. Define gcd(a, b).',
      '2. Base case: if b == 0 return a.',
      '3. Recursive case: return gcd(b, a % b).'
    ],
    starterCode: `# Lab 14: Recursive GCD\ndef gcd(a, b):\n    if b == 0:\n        return a\n    return gcd(b, a % b)\n\nprint(gcd(48, 18))`,
    solutionCode: `def gcd(a, b):\n    if b == 0:\n        return a\n    return gcd(b, a % b)\n\nprint(gcd(48, 18))`,
    testCases: [
      { input: '', expectedOutput: '6' }
    ],
    vivaQuestions: [
      {
        question: 'What mathematical property powers the Euclidean GCD algorithm?',
        options: ['gcd(a, b) = gcd(b, a % b)', 'gcd(a, b) = a * b', 'gcd(a, b) = a - b', 'gcd(a, b) = a / b'],
        correctAnswer: 0,
        explanation: 'The GCD of two numbers also divides their remainder.'
      }
    ]
  },
  {
    id: 'lab-15',
    labNumber: 15,
    title: 'Right Triangle Checker',
    aim: 'Check whether three given side lengths form a right-angled triangle using functions.',
    conceptRecap: 'Pythagorean Theorem: c^2 = a^2 + b^2 where c is the largest side.',
    algorithm: [
      '1. Define is_right_triangle(s1, s2, s3).',
      '2. Sort sides so c is max(s1, s2, s3).',
      '3. Check if c^2 == a^2 + b^2.',
      '4. Return True or False.'
    ],
    starterCode: `# Lab 15: Right Triangle Checker\ndef is_right_triangle(s1, s2, s3):\n    sides = sorted([s1, s2, s3])\n    return sides[2]**2 == sides[0]**2 + sides[1]**2\n\nprint(is_right_triangle(3, 4, 5))\nprint(is_right_triangle(5, 6, 7))`,
    solutionCode: `def is_right_triangle(s1, s2, s3):\n    sides = sorted([s1, s2, s3])\n    return sides[2]**2 == sides[0]**2 + sides[1]**2\n\nprint(is_right_triangle(3, 4, 5))\nprint(is_right_triangle(5, 6, 7))`,
    testCases: [
      { input: '', expectedOutput: 'True\nFalse' }
    ],
    vivaQuestions: [
      {
        question: 'Why must we sort the side lengths first before testing Pythagorean Theorem?',
        options: ['To ensure the hypotenuse (largest side) is tested as c', 'Because sorted() is required by Python', 'To avoid float errors', 'To calculate area'],
        correctAnswer: 0,
        explanation: 'The Pythagorean theorem requires c to be the largest side (hypotenuse).'
      }
    ]
  },
  {
    id: 'lab-16',
    labNumber: 16,
    title: 'Fibonacci Module Import',
    aim: 'Create a custom fibonacci module and import it into a main program.',
    conceptRecap: 'A Python module is a file containing Python definitions and statements. Pyodide Virtual FS allows importing custom local files.',
    algorithm: [
      '1. Create fibonacci_module.py defining fib(n).',
      '2. Import fibonacci_module in main program.',
      '3. Call fibonacci_module.fib(n).'
    ],
    isMultiFile: true,
    virtualFiles: {
      'fibonacci_module.py': `def get_fibonacci(n):\n    if n <= 0:\n        return 0\n    elif n == 1:\n        return 1\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b`
    },
    starterCode: `# Lab 16: Main Program importing custom module\nimport fibonacci_module\n\nval = fibonacci_module.get_fibonacci(10)\nprint("10th Fibonacci:", val)`,
    solutionCode: `import fibonacci_module\n\nval = fibonacci_module.get_fibonacci(10)\nprint("10th Fibonacci:", val)`,
    testCases: [
      { input: '', expectedOutput: '10th Fibonacci: 55' }
    ],
    vivaQuestions: [
      {
        question: 'What file extension is used for custom Python modules?',
        options: ['.py', '.mod', '.pyc', '.dll'],
        correctAnswer: 0,
        explanation: 'Python module files have a .py extension.'
      }
    ]
  },
  {
    id: 'lab-17',
    labNumber: 17,
    title: 'Import Specific Function from Module',
    aim: 'Import a specific function from a custom module using the `from module import function` syntax.',
    conceptRecap: 'Using `from module import function` imports only the specified name directly into the current namespace.',
    algorithm: [
      '1. Create math_utils.py with square(x) and cube(x).',
      '2. In main program, use `from math_utils import cube`.',
      '3. Call `cube(4)` directly.'
    ],
    isMultiFile: true,
    virtualFiles: {
      'math_utils.py': `def square(x):\n    return x * x\n\ndef cube(x):\n    return x * x * x`
    },
    starterCode: `# Lab 17: Specific Function Import\nfrom math_utils import cube\n\nresult = cube(4)\nprint("Cube of 4 is:", result)`,
    solutionCode: `from math_utils import cube\n\nresult = cube(4)\nprint("Cube of 4 is:", result)`,
    testCases: [
      { input: '', expectedOutput: 'Cube of 4 is: 64' }
    ],
    vivaQuestions: [
      {
        question: 'When using `from math_utils import cube`, do you prefix the function with module name when calling it?',
        options: ['Yes (math_utils.cube(4))', 'No (call cube(4) directly)', 'Only if imported twice', 'It causes SyntaxError'],
        correctAnswer: 1,
        explanation: 'from ... import imports the function name directly into current namespace.'
      }
    ]
  },
  {
    id: 'lab-18',
    labNumber: 18,
    title: 'Mobile Number Validator',
    aim: 'Validate mobile numbers using functions (10 digits starting with 7, 8, or 9).',
    conceptRecap: 'Strings methods `.isdigit()` and length check `len(s) == 10` validate 10-digit mobile numbers starting with 7, 8, or 9.',
    algorithm: [
      '1. Define validate_mobile(phone).',
      '2. Check len(phone) == 10.',
      '3. Check phone.isdigit().',
      '4. Check phone[0] in ["7", "8", "9"].',
      '5. Return True if all pass, else False.'
    ],
    starterCode: `# Lab 18: Mobile Number Validator\ndef validate_mobile(phone):\n    phone_str = str(phone)\n    return len(phone_str) == 10 and phone_str.isdigit() and phone_str[0] in ['7', '8', '9']\n\nprint(validate_mobile("9876543210"))\nprint(validate_mobile("5876543210"))\nprint(validate_mobile("987654"))`,
    solutionCode: `def validate_mobile(phone):\n    phone_str = str(phone)\n    return len(phone_str) == 10 and phone_str.isdigit() and phone_str[0] in ['7', '8', '9']\n\nprint(validate_mobile("9876543210"))\nprint(validate_mobile("5876543210"))\nprint(validate_mobile("987654"))`,
    testCases: [
      { input: '', expectedOutput: 'True\nFalse\nFalse' }
    ],
    vivaQuestions: [
      {
        question: 'Which string method verifies that all characters in a string are numeric digits?',
        options: ['isnumeric() / isdigit()', 'isnumber()', 'isalpha()', 'valid_num()'],
        correctAnswer: 0,
        explanation: 'isdigit() checks that all characters are digits.'
      }
    ]
  }
];

export const getLab = (id) => PRACTICAL_LABS.find((l) => l.id === id || String(l.labNumber) === String(id));
