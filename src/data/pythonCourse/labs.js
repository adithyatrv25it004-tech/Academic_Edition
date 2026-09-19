// UCEST105 Algorithmic Thinking with Python — 18 Official Practical Laboratory Experiments
// APJ Abdul Kalam Technological University — B.Tech 2024 Scheme
// Every lab contains: Aim, Concept Recap, Algorithm, Guided Starter Code,
// Test Cases, Progressive Hints, Reference Solution, Solution Explanation,
// Expected Output, Result, Common Mistakes, Viva Voce Questions & Answers, and Rubric.

export const PRACTICAL_LABS = [
  {
    id: 'lab-1',
    labNumber: 1,
    title: 'Basics of Python Programming',
    aim: 'Demonstrate basic Python programming including print statements, variables, string output, and basic arithmetic expressions.',
    conceptRecap: 'Python is an interpreted, high-level language. The print() function prints output to console with automatic space separation or custom formatting.',
    algorithm: [
      '1. Initialize variable name with a student name string.',
      '2. Initialize variable age with an integer value.',
      '3. Calculate birth_year by subtracting age from 2026.',
      '4. Display greeting message and calculated birth year using print().'
    ],
    starterCode: `# Lab 1: Basics of Python Programming
# TODO: Define student name and age
name = "Arun"
age = 19

# TODO: Calculate birth year assuming current year is 2026
birth_year = 2026 - age

# TODO: Print greeting and birth year exactly as required
print("Hello", name)
print("Birth Year:", birth_year)
`,
    solutionCode: `name = "Arun"
age = 19
birth_year = 2026 - age
print("Hello", name)
print("Birth Year:", birth_year)`,
    solutionExplanation: 'The program initializes two variables: name (string) and age (integer). It then calculates birth_year by subtracting age from 2026. The print() function displays "Hello Arun" followed by "Birth Year: 2007" on separate lines.',
    expectedOutput: `Hello Arun
Birth Year: 2007`,
    result: 'The program demonstrating basic Python variables, arithmetic expressions, and formatted console output was successfully executed and verified.',
    hints: [
      'Remember that print("Hello", name) automatically inserts a single space between arguments.',
      'Subtract age directly from 2026 to obtain birth_year: birth_year = 2026 - age.',
      'Ensure the output strings match the exact capitalization: "Hello" and "Birth Year:".'
    ],
    commonMistakes: [
      'Using unquoted variable names inside print() when attempting to print literal text.',
      'Concatenating an integer directly with a string using + without converting it: e.g. "Year: " + birth_year raises TypeError. Use comma separation instead in print().'
    ],
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
      },
      {
        question: 'How are single-line comments written in Python?',
        options: ['// comment', '/* comment */', '# comment', '<!-- comment -->'],
        correctAnswer: 2,
        explanation: 'In Python, the hash symbol (#) marks the start of a single-line comment.'
      }
    ]
  },
  {
    id: 'lab-2',
    labNumber: 2,
    title: 'Fundamental Data Types',
    aim: 'Demonstrate fundamental Python data types: int, float, complex, bool, and str.',
    conceptRecap: 'Python is dynamically typed. Built-in primitive types include int (arbitrary precision integers), float (IEEE 754 floating point), complex (a + bj), bool (True/False), and str (immutable Unicode sequences).',
    algorithm: [
      '1. Assign integer value 10 to variable a.',
      '2. Assign float value 3.14 to variable b.',
      '3. Assign complex value 2 + 3j to variable c.',
      '4. Assign boolean value True to variable d.',
      '5. Assign string value "KTU" to variable e.',
      '6. Print type of each variable using type() function.'
    ],
    starterCode: `# Lab 2: Fundamental Data Types
# TODO: Initialize variables of types int, float, complex, bool, and str
a = 10
b = 3.14
c = 2 + 3j
d = True
e = "KTU"

# TODO: Display the type of each variable using type()
print(type(a))
print(type(b))
print(type(c))
print(type(d))
print(type(e))
`,
    solutionCode: `a = 10
b = 3.14
c = 2 + 3j
d = True
e = "KTU"

print(type(a))
print(type(b))
print(type(c))
print(type(d))
print(type(e))`,
    solutionExplanation: 'Variables a, b, c, d, and e are assigned values of distinct primitive types. The built-in type() function inspects each variable and outputs its class descriptor: <class "int">, <class "float">, <class "complex">, <class "bool">, and <class "str">.',
    expectedOutput: `<class 'int'>
<class 'float'>
<class 'complex'>
<class 'bool'>
<class 'str'>`,
    result: 'The program demonstrating fundamental Python data types and their run-time types was successfully executed and verified.',
    hints: [
      'In Python, the imaginary part of a complex number is denoted by j or J (e.g. 2 + 3j), not i.',
      'Boolean literals True and False must have their first letter capitalized.',
      'type(x) returns the type class object for any Python object x.'
    ],
    commonMistakes: [
      'Writing 2 + 3i instead of 2 + 3j: Python uses j for the imaginary unit, so 3i produces a SyntaxError.',
      'Writing true or false with lowercase letters: In Python, bool literals are capitalized (True, False).'
    ],
    testCases: [
      { input: '', expectedOutput: "<class 'int'>\n<class 'float'>\n<class 'complex'>\n<class 'bool'>\n<class 'str'>" }
    ],
    vivaQuestions: [
      {
        question: 'How are complex numbers represented in Python?',
        options: ['a + bi', 'a + bj', 'complex(a, i)', 'a ++ b'],
        correctAnswer: 1,
        explanation: 'Python uses j or J to represent the imaginary unit in complex numbers.'
      },
      {
        question: 'What is the boolean evaluation of bool(0) in Python?',
        options: ['True', 'False', 'None', 'Error'],
        correctAnswer: 1,
        explanation: 'In Python, zero (0, 0.0, 0j), empty sequences, and None evaluate to False in a boolean context.'
      },
      {
        question: 'Is Python statically typed or dynamically typed?',
        options: ['Statically typed', 'Dynamically typed', 'Untyped', 'Compiled only'],
        correctAnswer: 1,
        explanation: 'Python is dynamically typed; variable types are determined and bound at runtime.'
      }
    ]
  },
  {
    id: 'lab-3',
    labNumber: 3,
    title: 'Arithmetic Operations',
    aim: 'Perform arithmetic operations: +, -, *, /, //, %, ** on numeric operands.',
    conceptRecap: 'Python provides operators for addition (+), subtraction (-), multiplication (*), float division (/), integer floor division (//), remainder/modulo (%), and exponentiation (**).',
    algorithm: [
      '1. Assign two integers x = 15 and y = 4.',
      '2. Compute and print sum: x + y.',
      '3. Compute and print difference: x - y.',
      '4. Compute and print product: x * y.',
      '5. Compute and print true division: x / y.',
      '6. Compute and print floor division: x // y.',
      '7. Compute and print remainder: x % y.',
      '8. Compute and print power: x ** y.'
    ],
    starterCode: `# Lab 3: Arithmetic Operations
x, y = 15, 4

# TODO: Print the results of each arithmetic operation in order
print(x + y)
print(x - y)
print(x * y)
print(x / y)
print(x // y)
print(x % y)
print(x ** y)
`,
    solutionCode: `x, y = 15, 4
print(x + y)
print(x - y)
print(x * y)
print(x / y)
print(x // y)
print(x % y)
print(x ** y)`,
    solutionExplanation: 'Calculates all standard Python arithmetic operations on 15 and 4: 15+4=19, 15-4=11, 15*4=60, 15/4=3.75 (float), 15//4=3 (floor integer division), 15%4=3 (remainder), and 15**4=50625 (power).',
    expectedOutput: `19
11
60
3.75
3
3
50625`,
    result: 'All seven standard Python arithmetic operations were computed and verified successfully.',
    hints: [
      '/ always yields a float in Python 3 (15 / 4 = 3.75).',
      '// discards the fractional part and rounds down (15 // 4 = 3).',
      '** is the exponentiation operator (15 ** 4 = 15 * 15 * 15 * 15 = 50625).'
    ],
    commonMistakes: [
      'Confusing ^ with exponentiation: In Python, ^ is the bitwise XOR operator, not power! Power is **.',
      'Expecting / to perform integer division as in C/Java: In Python 3, / always produces a float.'
    ],
    testCases: [
      { input: '', expectedOutput: '19\n11\n60\n3.75\n3\n3\n50625' }
    ],
    vivaQuestions: [
      {
        question: 'What is the difference between / and // in Python?',
        options: ['/ is integer division, // is float division', '/ returns float result, // returns floor integer result', 'They are identical', '/ is modulo operator'],
        correctAnswer: 1,
        explanation: '/ always produces a float, whereas // rounds down to the nearest integer.'
      },
      {
        question: 'What does the ** operator perform in Python?',
        options: ['Multiplication twice', 'Pointers', 'Exponentiation / Power', 'Logical AND'],
        correctAnswer: 2,
        explanation: '** raises the left operand to the power of the right operand.'
      },
      {
        question: 'What is the result of 7 % 3 in Python?',
        options: ['1', '2', '2.33', '0'],
        correctAnswer: 0,
        explanation: '7 divided by 3 has quotient 2 with remainder 1.'
      }
    ]
  },
  {
    id: 'lab-4',
    labNumber: 4,
    title: 'String Operations',
    aim: 'Create, concatenate, print, and slice strings in Python.',
    conceptRecap: 'Python strings are immutable sequences. The + operator concatenates strings. Slicing with [start:stop] extracts substrings up to but not including stop.',
    algorithm: [
      '1. Create string s1 = "Algorithmic Thinking".',
      '2. Create string s2 = " with Python".',
      '3. Concatenate s1 and s2 to produce full string.',
      '4. Print full concatenated string.',
      '5. Extract substring "Algorithmic" from s1 using slice [0:11].',
      '6. Print extracted substring.'
    ],
    starterCode: `# Lab 4: String Operations
s1 = "Algorithmic Thinking"
s2 = " with Python"

# TODO: Concatenate strings
full = s1 + s2
print(full)

# TODO: Slice first 11 characters to get "Algorithmic"
print(s1[0:11])
`,
    solutionCode: `s1 = "Algorithmic Thinking"
s2 = " with Python"
full = s1 + s2
print(full)
print(s1[0:11])`,
    solutionExplanation: 'The + operator concatenates s1 and s2 into "Algorithmic Thinking with Python". Slicing s1[0:11] extracts indices 0 through 10 (the 11 characters forming "Algorithmic").',
    expectedOutput: `Algorithmic Thinking with Python
Algorithmic`,
    result: 'String creation, concatenation, printing, and slicing were executed and verified successfully.',
    hints: [
      'In Python slice s[start:stop], the stop index is excluded: s1[0:11] takes index 0 up to 10.',
      'String concatenation uses +: s1 + s2 joins the strings without modifying s1 or s2.',
      'Length of s1[0:11] is exactly 11 - 0 = 11 characters.'
    ],
    commonMistakes: [
      'Off-by-one error in slicing: using s1[0:10] only gives 10 characters ("Algorithmi"), missing the final "c".',
      'Trying to mutate a string in-place: s1[0] = "a" raises TypeError because strings are immutable.'
    ],
    testCases: [
      { input: '', expectedOutput: 'Algorithmic Thinking with Python\nAlgorithmic' }
    ],
    vivaQuestions: [
      {
        question: 'Are Python strings mutable or immutable?',
        options: ['Mutable', 'Immutable', 'Depends on length', 'Dynamic'],
        correctAnswer: 1,
        explanation: 'Strings cannot be modified in-place after creation.'
      },
      {
        question: 'What does s[-1] return for a non-empty string s?',
        options: ['First character', 'Last character', 'Length of s', 'Error'],
        correctAnswer: 1,
        explanation: 'Negative indexing counts backwards from the end, with -1 representing the last character.'
      },
      {
        question: 'What is the slice step in s[::2]?',
        options: ['Take every character', 'Take every 2nd character', 'Stop at index 2', 'Reverse string'],
        correctAnswer: 1,
        explanation: 'The third parameter in slice notation [start:stop:step] defines the step interval.'
      }
    ]
  },
  {
    id: 'lab-5',
    labNumber: 5,
    title: 'Time and Date Formatting',
    aim: 'Format date and time in various formats using the Python datetime standard library.',
    conceptRecap: 'The standard library datetime module provides datetime objects and the strftime() method with format codes (%A: weekday, %B: month, %d: day, %Y: 4-digit year, %H: hour, %M: minute, %S: second).',
    algorithm: [
      '1. Import datetime class from datetime module.',
      '2. Instantiate a datetime object with year=2026, month=9, day=18, hour=14, minute=30, second=0.',
      '3. Use strftime() with format string "%A, %B %d, %Y %H:%M:%S".',
      '4. Print formatted date string.'
    ],
    starterCode: `# Lab 5: Time and Date Formatting
from datetime import datetime

# TODO: Construct datetime object for Friday Sep 18 2026, 14:30:00
dt = datetime(2026, 9, 18, 14, 30, 0)

# TODO: Format using strftime directive
print(dt.strftime("%A, %B %d, %Y %H:%M:%S"))
`,
    solutionCode: `from datetime import datetime
dt = datetime(2026, 9, 18, 14, 30, 0)
print(dt.strftime("%A, %B %d, %Y %H:%M:%S"))`,
    solutionExplanation: 'Imports datetime from standard library, creates a specific datetime point (2026-09-18 14:30:00), and formats it into the human-readable string "Friday, September 18, 2026 14:30:00" using standard strftime directives.',
    expectedOutput: `Friday, September 18, 2026 14:30:00`,
    result: 'Date and time formatting using the Python datetime module and strftime directives was verified successfully.',
    hints: [
      '%A represents full weekday name (e.g. Friday), while %a represents abbreviated weekday (Fri).',
      '%B represents full month name (e.g. September), while %b represents abbreviated month (Sep).',
      '%Y represents full four-digit year (e.g. 2026).'
    ],
    commonMistakes: [
      'Confusing %m (month as 01-12) with %M (minute as 00-59).',
      'Confusing %y (two-digit year like 26) with %Y (four-digit year like 2026).'
    ],
    testCases: [
      { input: '', expectedOutput: 'Friday, September 18, 2026 14:30:00' }
    ],
    vivaQuestions: [
      {
        question: 'Which strftime directive formats the full weekday name (e.g. Friday)?',
        options: ['%w', '%A', '%a', '%W'],
        correctAnswer: 1,
        explanation: '%A expands to the full weekday name, whereas %a expands to the abbreviated name.'
      },
      {
        question: 'What is the difference between %Y and %y in strftime?',
        options: ['%Y is 4-digit year, %y is 2-digit year', '%Y is 2-digit year, %y is 4-digit year', 'They are identical', '%Y is month'],
        correctAnswer: 0,
        explanation: '%Y generates the 4-digit year (e.g., 2026) and %y generates the 2-digit year (e.g., 26).'
      }
    ]
  },
  {
    id: 'lab-6',
    labNumber: 6,
    title: 'NumPy Array Operations',
    aim: 'Create, append, and remove elements using NumPy arrays in Python.',
    conceptRecap: 'NumPy arrays are homogeneous, contiguous memory buffers. Unlike Python lists, np.append() and np.delete() return a new copy with modified elements without altering the original array in-place.',
    algorithm: [
      '1. Import numpy as np.',
      '2. Create 1D array arr with values [10, 20, 30].',
      '3. Append 40 to arr using np.append(arr, 40).',
      '4. Delete element at index 0 using np.delete(arr, 0).',
      '5. Print resulting array.'
    ],
    starterCode: `# Lab 6: NumPy Array Operations
import numpy as np

# TODO: Create array [10, 20, 30]
arr = np.array([10, 20, 30])

# TODO: Append 40 to array
arr = np.append(arr, 40)

# TODO: Remove element at index 0
arr = np.delete(arr, 0)

# TODO: Print final array
print(arr)
`,
    solutionCode: `import numpy as np
arr = np.array([10, 20, 30])
arr = np.append(arr, 40)
arr = np.delete(arr, 0)
print(arr)`,
    solutionExplanation: 'Creates initial NumPy array [10, 20, 30]. np.append(arr, 40) creates a new array [10, 20, 30, 40]. np.delete(arr, 0) removes the item at index 0 (10), resulting in [20, 30, 40]. When printed, NumPy formats it without commas: [20 30 40].',
    expectedOutput: `[20 30 40]`,
    result: 'Creation, appending, and element removal on NumPy arrays were demonstrated and verified successfully.',
    hints: [
      'np.append(arr, val) does NOT modify arr in place! You must reassign: arr = np.append(arr, val).',
      'Similarly, np.delete(arr, index) returns a new array. Reassign: arr = np.delete(arr, index).',
      'NumPy array output prints space-separated values inside brackets: [20 30 40].'
    ],
    commonMistakes: [
      'Assuming np.append modifies the array in-place like list.append(). In NumPy, you must assign the return value.',
      'Passing element value to np.delete instead of index: np.delete(arr, 0) deletes index 0, not value 0.'
    ],
    testCases: [
      { input: '', expectedOutput: '[20 30 40]' }
    ],
    vivaQuestions: [
      {
        question: 'What does np.append(arr, value) return?',
        options: ['Modifies arr in-place and returns None', 'Returns a new array with value appended', 'Appends value to list', 'Deletes array'],
        correctAnswer: 1,
        explanation: 'np.append returns a copy of the array with values appended.'
      },
      {
        question: 'Why are NumPy arrays faster than standard Python lists?',
        options: ['They are stored in contiguous memory and homogeneous in type', 'They use recursion', 'They do not support math', 'They are compiled in Java'],
        correctAnswer: 0,
        explanation: 'Homogeneous data types and contiguous C-level memory storage enable high vectorized performance.'
      }
    ]
  },
  {
    id: 'lab-7',
    labNumber: 7,
    title: 'Largest of Three Numbers',
    aim: 'Find the largest of three given numbers using conditional statements in Python.',
    conceptRecap: 'The if-elif-else construct evaluates conditions sequentially. Using the logical operator "and" allows compound conditions to compare multiple variables simultaneously.',
    algorithm: [
      '1. Read or initialize three numbers a = 25, b = 42, c = 18.',
      '2. If a >= b and a >= c, then largest is a.',
      '3. Elif b >= a and b >= c, then largest is b.',
      '4. Else, largest is c.',
      '5. Print "Largest:" followed by the largest value.'
    ],
    starterCode: `# Lab 7: Largest of Three Numbers
a, b, c = 25, 42, 18

# TODO: Compare numbers using if-elif-else
if a >= b and a >= c:
    largest = a
elif b >= a and b >= c:
    largest = b
else:
    largest = c

print("Largest:", largest)
`,
    solutionCode: `a, b, c = 25, 42, 18
if a >= b and a >= c:
    largest = a
elif b >= a and b >= c:
    largest = b
else:
    largest = c
print("Largest:", largest)`,
    solutionExplanation: 'Tests a against both b and c using "and". Since 25 < 42, the first condition is False. The elif condition tests whether b (42) >= a (25) and b (42) >= c (18). Both are True, so largest is assigned 42.',
    expectedOutput: `Largest: 42`,
    result: 'The program finding the largest of three numbers using conditional logic was executed and verified.',
    hints: [
      'Use >= rather than > so that equal numbers are handled cleanly without incorrect fallback.',
      'The "and" operator requires both sub-expressions to be True for the branch to execute.',
      'The final print should output "Largest: 42".'
    ],
    commonMistakes: [
      'Writing if a >= b and c: instead of if a >= b and a >= c:. In Python, "and c" checks if c is truthy (non-zero), not if a >= c!',
      'Using multiple independent if statements instead of if-elif-else, which can cause overwriting.'
    ],
    testCases: [
      { input: '', expectedOutput: 'Largest: 42' }
    ],
    vivaQuestions: [
      {
        question: 'Why do we use >= instead of > when finding largest of three numbers?',
        options: ['To handle equal number values correctly', 'To speed up execution', 'Because > is invalid', 'To prevent zero division'],
        correctAnswer: 0,
        explanation: '>= handles edge cases where two or three numbers are equal.'
      },
      {
        question: 'How does Python evaluate compound boolean condition `X and Y` if X is False?',
        options: ['Evaluates Y anyway', 'Short-circuits and immediately evaluates to False without evaluating Y', 'Raises error', 'Returns None'],
        correctAnswer: 1,
        explanation: 'Python uses short-circuit evaluation: if the left operand of `and` is False, the result is known immediately.'
      }
    ]
  },
  {
    id: 'lab-8',
    labNumber: 8,
    title: 'Celsius to Fahrenheit Conversion',
    aim: 'Convert temperature between Celsius and Fahrenheit using the standard formula c / 5 = (f - 32) / 9.',
    conceptRecap: 'The relation between Celsius (C) and Fahrenheit (F) is given by C / 5 = (F - 32) / 9. Rearranging for F gives F = (C * 9 / 5) + 32.',
    algorithm: [
      '1. Initialize celsius = 37.0.',
      '2. Calculate fahrenheit using formula (celsius * 9 / 5) + 32.',
      '3. Print result formatted as "{celsius}°C = {fahrenheit}°F".'
    ],
    starterCode: `# Lab 8: Celsius to Fahrenheit
celsius = 37.0

# TODO: Apply formula F = (C * 9 / 5) + 32
fahrenheit = (celsius * 9 / 5) + 32

# TODO: Display formatted conversion
print(f"{celsius}°C = {fahrenheit}°F")
`,
    solutionCode: `celsius = 37.0
fahrenheit = (celsius * 9 / 5) + 32
print(f"{celsius}°C = {fahrenheit}°F")`,
    solutionExplanation: 'Uses the official temperature conversion formula. For Celsius 37.0°C (normal human body temperature), 37.0 * 9 / 5 = 66.6, and 66.6 + 32 = 98.6. An f-string formats the exact output: "37.0°C = 98.6°F".',
    expectedOutput: `37.0°C = 98.6°F`,
    result: 'Temperature conversion between Celsius and Fahrenheit was implemented and verified successfully.',
    hints: [
      'Apply parentheses properly: (celsius * 9 / 5) + 32.',
      'Remember the degree symbol ° can be printed directly in Python strings: f"{celsius}°C = {fahrenheit}°F".'
    ],
    commonMistakes: [
      'Incorrect operator precedence: celsius * 9 / (5 + 32) would evaluate to celsius * 9 / 37, which is completely wrong.',
      'Applying the inverse formula (F - 32) * 5 / 9 when converting Celsius to Fahrenheit.'
    ],
    testCases: [
      { input: '', expectedOutput: '37.0°C = 98.6°F' }
    ],
    vivaQuestions: [
      {
        question: 'What is the freezing point of water in Celsius and Fahrenheit?',
        options: ['0°C and 32°F', '100°C and 212°F', '0°C and 0°F', '-40°C and -40°F'],
        correctAnswer: 0,
        explanation: 'Water freezes at 0°C (32°F) and boils at 100°C (212°F).'
      },
      {
        question: 'At what temperature are Celsius and Fahrenheit numerically equal?',
        options: ['0', '-40', '100', '32'],
        correctAnswer: 1,
        explanation: 'At -40 degrees, -40°C = -40°F.'
      }
    ]
  },
  {
    id: 'lab-9',
    labNumber: 9,
    title: 'Star Pattern using Nested Loops',
    aim: 'Print a right-angled triangle star pattern using nested for loops in Python.',
    conceptRecap: 'Nested loops consist of an outer loop controlling row count and an inner loop controlling columns or character repetitions per row.',
    algorithm: [
      '1. Set number of rows n = 4.',
      '2. Loop i from 1 to n (outer loop for rows).',
      '3. In each row i, print string "* " repeated i times.',
      '4. Output each row on a new line.'
    ],
    starterCode: `# Lab 9: Star Pattern using Nested Loops
n = 4

# TODO: Loop from 1 to n and print i stars per line
for i in range(1, n + 1):
    print("* " * i)
`,
    solutionCode: `n = 4
for i in range(1, n + 1):
    print("* " * i)`,
    solutionExplanation: 'The outer loop runs i from 1 to 4 inclusive using range(1, n + 1). In each iteration, Python string multiplication ("* " * i) creates i pairs of star and space: Row 1 prints "* ", Row 2 prints "* * ", Row 3 prints "* * * ", and Row 4 prints "* * * * ".',
    expectedOutput: `* 
* * 
* * * 
* * * * `,
    result: 'The star pattern right-angled triangle was printed successfully using iteration.',
    hints: [
      'range(1, n + 1) generates values 1, 2, 3, 4 when n is 4.',
      'String repetition "* " * i repeats the string "* " i times.',
      'Ensure each star is followed by a space: "* ".'
    ],
    commonMistakes: [
      'Using range(n): which runs from 0 to n-1. In the first iteration i=0, printing 0 stars yields an empty blank line.',
      'Omitting the space inside "* ", producing "****" instead of "* * * * ".'
    ],
    testCases: [
      { input: '', expectedOutput: '* \n* * \n* * * \n* * * * ' }
    ],
    vivaQuestions: [
      {
        question: 'What does the string multiplication "* " * 3 produce in Python?',
        options: ['"* * * "', 'Error', '3', '"***"'],
        correctAnswer: 0,
        explanation: 'String multiplication repeats the string N times.'
      },
      {
        question: 'How many total stars are printed in an n-row triangle pattern?',
        options: ['n^2', 'n * (n + 1) / 2', 'n!', '2 * n'],
        correctAnswer: 1,
        explanation: 'The sum of 1 + 2 + ... + n is n * (n + 1) / 2.'
      }
    ]
  },
  {
    id: 'lab-10',
    labNumber: 10,
    title: 'Prime Numbers Less Than 20',
    aim: 'Generate and display all prime numbers strictly less than 20.',
    conceptRecap: 'A prime number is an integer greater than 1 whose only divisors are 1 and itself. A number is prime if it has no remainder when divided by any integer from 2 up to num - 1.',
    algorithm: [
      '1. Initialize an empty list primes = [].',
      '2. Loop num from 2 to 19 (range(2, 20)).',
      '3. Set flag is_prime = True.',
      '4. Loop divisor i from 2 up to num - 1.',
      '5. If num % i == 0, set is_prime = False and break.',
      '6. If is_prime remains True, append num to primes.',
      '7. Print primes list.'
    ],
    starterCode: `# Lab 10: Prime Numbers < 20
primes = []

# TODO: Test each number from 2 to 19
for num in range(2, 20):
    is_prime = True
    for i in range(2, num):
        if num % i == 0:
            is_prime = False
            break
    if is_prime:
        primes.append(num)

print(primes)
`,
    solutionCode: `primes = []
for num in range(2, 20):
    is_prime = True
    for i in range(2, num):
        if num % i == 0:
            is_prime = False
            break
    if is_prime:
        primes.append(num)
print(primes)`,
    solutionExplanation: 'Tests each integer from 2 to 19 for primality. An inner loop checks if any candidate divisor from 2 to num - 1 evenly divides num. If a divisor is found, is_prime is set to False. Otherwise, the number is prime and appended to primes list.',
    expectedOutput: `[2, 3, 5, 7, 11, 13, 17, 19]`,
    result: 'All prime numbers strictly less than 20 were determined and displayed.',
    hints: [
      '1 is not a prime number, so start checking from 2.',
      'The range to test is range(2, 20), which tests up to 19.',
      'Use break inside the inner loop once a divisor is found to save unnecessary checks.'
    ],
    commonMistakes: [
      'Starting from 1: 1 is neither prime nor composite, including it is a common syllabus error.',
      'Not using break when a divisor is found, continuing to test even after finding num is composite.'
    ],
    testCases: [
      { input: '', expectedOutput: '[2, 3, 5, 7, 11, 13, 17, 19]' }
    ],
    vivaQuestions: [
      {
        question: 'Is 1 considered a prime number?',
        options: ['Yes', 'No', 'Sometimes', 'Only in Python'],
        correctAnswer: 1,
        explanation: 'By definition, prime numbers must be strictly greater than 1.'
      },
      {
        question: 'What is the only even prime number?',
        options: ['0', '2', '4', 'None'],
        correctAnswer: 1,
        explanation: '2 is the smallest prime number and the only even prime number.'
      }
    ]
  },
  {
    id: 'lab-11',
    labNumber: 11,
    title: 'Factorial Using Recursion',
    aim: 'Compute the factorial of a positive integer using a recursive function.',
    conceptRecap: 'The factorial of n (written n!) is defined recursively as: fact(n) = 1 if n <= 1, else n * fact(n - 1). The base case terminates recursive calls and allows the stack to unwind.',
    algorithm: [
      '1. Define recursive function fact(n).',
      '2. Base case: If n <= 1, return 1.',
      '3. Recursive case: Return n * fact(n - 1).',
      '4. Call fact(6) and print result.'
    ],
    starterCode: `# Lab 11: Recursive Factorial
# TODO: Define recursive function fact(n)
def fact(n):
    if n <= 1:
        return 1
    return n * fact(n - 1)

# TODO: Compute factorial of 6 and print
print(fact(6))
`,
    solutionCode: `def fact(n):
    if n <= 1:
        return 1
    return n * fact(n - 1)

print(fact(6))`,
    solutionExplanation: 'fact(6) calls fact(5), which calls fact(4), fact(3), fact(2), and fact(1). At fact(1), the base case triggers returning 1. During unwinding, the returns multiply: 1 -> 2*1=2 -> 3*2=6 -> 4*6=24 -> 5*24=120 -> 6*120=720.',
    expectedOutput: `720`,
    result: 'Factorial of a positive integer was computed recursively and verified.',
    hints: [
      'The base case is if n <= 1: return 1.',
      'The recursive step must decrement n: return n * fact(n - 1).',
      'fact(6) = 6 * 5 * 4 * 3 * 2 * 1 = 720.'
    ],
    commonMistakes: [
      'Forgetting the base case: results in infinite recursion and a RecursionError: maximum recursion depth exceeded.',
      'Writing return n * fact(n) instead of fact(n - 1), which never approaches the base case.'
    ],
    testCases: [
      { input: '', expectedOutput: '720' }
    ],
    vivaQuestions: [
      {
        question: 'What is the purpose of a base case in a recursive function?',
        options: ['To speed up computation', 'To terminate recursive calls and prevent infinite stack growth', 'To print output', 'To define parameters'],
        correctAnswer: 1,
        explanation: 'The base case provides the termination condition.'
      },
      {
        question: 'What runtime error occurs if a recursive function lacks a base case in Python?',
        options: ['TypeError', 'RecursionError', 'ZeroDivisionError', 'ValueError'],
        correctAnswer: 1,
        explanation: 'RecursionError occurs when the maximum recursion depth is exceeded.'
      }
    ]
  },
  {
    id: 'lab-12',
    labNumber: 12,
    title: 'Recursive Addition of Two Integers',
    aim: 'Perform addition of two positive integers recursively without using the + operator for addition.',
    conceptRecap: 'Adding two positive integers a and b can be expressed recursively: add(a, b) = a if b == 0, else 1 + add(a, b - 1). Each call decrements b by 1 until b reaches 0, then adds 1 upon unwinding.',
    algorithm: [
      '1. Define recursive function add(a, b).',
      '2. Base case: If b == 0, return a.',
      '3. Recursive case: Return 1 + add(a, b - 1).',
      '4. Call add(7, 5) and print result.'
    ],
    starterCode: `# Lab 12: Recursive Addition
# TODO: Define recursive function add(a, b)
def add(a, b):
    if b == 0:
        return a
    return 1 + add(a, b - 1)

# TODO: Test with a = 7, b = 5 and print
print(add(7, 5))
`,
    solutionCode: `def add(a, b):
    if b == 0:
        return a
    return 1 + add(a, b - 1)

print(add(7, 5))`,
    solutionExplanation: 'add(7, 5) decrements b successively: add(7, 4), add(7, 3), add(7, 2), add(7, 1), add(7, 0). When b == 0, it returns a (7). Unwinding adds 1 at each frame, totaling 7 + 1 + 1 + 1 + 1 + 1 = 12.',
    expectedOutput: `12`,
    result: 'Recursive addition of two positive integers without using direct addition was successfully implemented and verified.',
    hints: [
      'Base condition: when the second operand b is 0, the sum is simply a.',
      'In each step, decrease b by 1 and add 1 to the result of the recursive call.',
      'add(7, 5) should output 12.'
    ],
    commonMistakes: [
      'Modifying both a and b simultaneously: add(a + 1, b - 1) uses the + operator between a and 1 inside the parameters.',
      'Forgetting the base case b == 0, causing infinite negative recursion.'
    ],
    testCases: [
      { input: '', expectedOutput: '12' }
    ],
    vivaQuestions: [
      {
        question: 'How does recursive addition achieve addition without direct a + b?',
        options: ['By decrementing b towards base case b=0 and adding 1 on unwinding', 'By calling sum()', 'By converting to strings', 'Using bitwise shifting'],
        correctAnswer: 0,
        explanation: 'It repeatedly reduces b by 1 and increments result by 1 on return.'
      },
      {
        question: 'How many recursive calls are made when computing add(7, 5)?',
        options: ['7 calls', '5 recursive calls + 1 base call = 6 frames', '1 call', '12 calls'],
        correctAnswer: 1,
        explanation: 'b decrements from 5 down to 0, making 5 recursive steps plus the base case evaluation.'
      }
    ]
  },
  {
    id: 'lab-13',
    labNumber: 13,
    title: 'Recursive Multiplication',
    aim: 'Multiply two positive integers recursively without using the * operator.',
    conceptRecap: 'Multiplication is repeated addition: a * b is equivalent to adding a to itself b times. Recursively: multiply(a, b) = 0 if b == 0, else a + multiply(a, b - 1).',
    algorithm: [
      '1. Define recursive function multiply(a, b).',
      '2. Base case: If b == 0, return 0.',
      '3. Recursive case: Return a + multiply(a, b - 1).',
      '4. Call multiply(6, 4) and print result.'
    ],
    starterCode: `# Lab 13: Recursive Multiplication
# TODO: Define recursive function multiply(a, b)
def multiply(a, b):
    if b == 0:
        return 0
    return a + multiply(a, b - 1)

# TODO: Test with a = 6, b = 4 and print
print(multiply(6, 4))
`,
    solutionCode: `def multiply(a, b):
    if b == 0:
        return 0
    return a + multiply(a, b - 1)

print(multiply(6, 4))`,
    solutionExplanation: 'multiply(6, 4) calculates 6 + multiply(6, 3) = 6 + 6 + multiply(6, 2) = 6 + 6 + 6 + multiply(6, 1) = 6 + 6 + 6 + 6 + multiply(6, 0). The base case returns 0, yielding 6 + 6 + 6 + 6 + 0 = 24.',
    expectedOutput: `24`,
    result: 'Recursive multiplication of two positive integers without using the * operator was verified.',
    hints: [
      'Base condition: if b == 0, return 0 (anything multiplied by 0 is 0).',
      'Recursive step: return a + multiply(a, b - 1).',
      'multiply(6, 4) yields 24.'
    ],
    commonMistakes: [
      'Setting base case to return 1 instead of 0, which adds an extra 1 to the product.',
      'Decrementing a instead of b, causing incorrect terms to be summed.'
    ],
    testCases: [
      { input: '', expectedOutput: '24' }
    ],
    vivaQuestions: [
      {
        question: 'Multiplication is conceptually equivalent to which repeated operation?',
        options: ['Repeated subtraction', 'Repeated addition', 'Repeated division', 'Exponentiation'],
        correctAnswer: 1,
        explanation: 'Multiplication a * b is adding a to itself b times.'
      },
      {
        question: 'What is the base case value for multiply(a, b) when b reaches 0?',
        options: ['1', '0', 'a', 'None'],
        correctAnswer: 1,
        explanation: '0, because a * 0 = 0 and adding 0 does not alter the accumulated sum.'
      }
    ]
  },
  {
    id: 'lab-14',
    labNumber: 14,
    title: 'Recursive GCD of Two Integers',
    aim: 'Find the Greatest Common Divisor (GCD) of two positive integers using the Euclidean recursive algorithm.',
    conceptRecap: 'The Euclidean algorithm states that gcd(a, b) = a if b == 0, else gcd(b, a % b). The remainder operation a % b rapidly reduces the problem size.',
    algorithm: [
      '1. Define recursive function gcd(a, b).',
      '2. Base case: If b == 0, return a.',
      '3. Recursive case: Return gcd(b, a % b).',
      '4. Call gcd(48, 18) and print result.'
    ],
    starterCode: `# Lab 14: Recursive GCD (Euclidean Algorithm)
# TODO: Define recursive function gcd(a, b)
def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)

# TODO: Test with 48 and 18 and print
print(gcd(48, 18))
`,
    solutionCode: `def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)

print(gcd(48, 18))`,
    solutionExplanation: 'gcd(48, 18): 48 % 18 = 12 -> calls gcd(18, 12). Next: 18 % 12 = 6 -> calls gcd(12, 6). Next: 12 % 6 = 0 -> calls gcd(6, 0). Here b == 0, so the base case returns a = 6, which is the GCD.',
    expectedOutput: `6`,
    result: 'The Euclidean recursive algorithm for Greatest Common Divisor was implemented and verified.',
    hints: [
      'Euclidean principle: gcd(a, b) = gcd(b, a % b).',
      'Base condition: when b == 0, return a.',
      'gcd(48, 18) = 6.'
    ],
    commonMistakes: [
      'Returning b instead of a in the base case: when b == 0, returning b gives 0 instead of the GCD!',
      'Swapping the recursive arguments incorrectly, e.g. gcd(a % b, b).'
    ],
    testCases: [
      { input: '', expectedOutput: '6' }
    ],
    vivaQuestions: [
      {
        question: 'What mathematical property powers the Euclidean GCD algorithm?',
        options: ['gcd(a, b) = gcd(b, a % b)', 'gcd(a, b) = a * b', 'gcd(a, b) = a - b', 'gcd(a, b) = a / b'],
        correctAnswer: 0,
        explanation: 'The GCD of two numbers also divides their remainder.'
      },
      {
        question: 'What is the GCD of any positive integer a and 0?',
        options: ['0', 'a', '1', 'Undefined'],
        correctAnswer: 1,
        explanation: 'The greatest common divisor of a and 0 is a itself.'
      }
    ]
  },
  {
    id: 'lab-15',
    labNumber: 15,
    title: 'Right Triangle Checker',
    aim: 'Check whether three given side lengths form a right-angled triangle using functions and the Pythagorean theorem.',
    conceptRecap: 'According to the Pythagorean theorem, three side lengths a, b, c form a right-angled triangle if and only if c^2 = a^2 + b^2, where c is the hypotenuse (the longest side).',
    algorithm: [
      '1. Define function is_right_triangle(s1, s2, s3).',
      '2. Sort the three sides so sides[0] and sides[1] are legs, and sides[2] is hypotenuse.',
      '3. Check if sides[2]**2 == sides[0]**2 + sides[1]**2.',
      '4. Return True if equal, else False.',
      '5. Test with (3, 4, 5) and (5, 6, 7) and print results.'
    ],
    starterCode: `# Lab 15: Right Triangle Checker
def is_right_triangle(s1, s2, s3):
    # TODO: Sort sides so hypotenuse is last
    sides = sorted([s1, s2, s3])
    # TODO: Check Pythagorean theorem c^2 == a^2 + b^2
    return sides[2]**2 == sides[0]**2 + sides[1]**2

# TODO: Test inputs
print(is_right_triangle(3, 4, 5))
print(is_right_triangle(5, 6, 7))
`,
    solutionCode: `def is_right_triangle(s1, s2, s3):
    sides = sorted([s1, s2, s3])
    return sides[2]**2 == sides[0]**2 + sides[1]**2

print(is_right_triangle(3, 4, 5))
print(is_right_triangle(5, 6, 7))`,
    solutionExplanation: 'Sorting the three lengths ensures that sides[2] is the largest side. For (3, 4, 5): 5^2 = 25 and 3^2 + 4^2 = 9 + 16 = 25. Since 25 == 25, it returns True. For (5, 6, 7): 7^2 = 49 and 5^2 + 6^2 = 25 + 36 = 61. 49 != 61, so it returns False.',
    expectedOutput: `True
False`,
    result: 'Right-angled triangle verification using functions and the Pythagorean theorem was executed and verified.',
    hints: [
      'Always sort the sides first with sorted([s1, s2, s3]) to guarantee that sides[2] is the longest side.',
      'Pythagorean theorem: sides[2]**2 == sides[0]**2 + sides[1]**2.',
      'The function should return boolean True or False.'
    ],
    commonMistakes: [
      'Assuming the third argument is always the hypotenuse without sorting first (e.g. testing (5, 3, 4) would fail without sorting).',
      'Using single = (assignment) instead of == (equality comparison).'
    ],
    testCases: [
      { input: '', expectedOutput: 'True\nFalse' }
    ],
    vivaQuestions: [
      {
        question: 'Why must we sort the side lengths first before testing Pythagorean Theorem?',
        options: ['To ensure the hypotenuse (largest side) is tested as c', 'Because sorted() is required by Python', 'To avoid float errors', 'To calculate area'],
        correctAnswer: 0,
        explanation: 'The Pythagorean theorem requires c to be the largest side (hypotenuse).'
      },
      {
        question: 'What is a Pythagorean triple?',
        options: ['Three sides of any triangle', 'Three positive integers a, b, c satisfying a^2 + b^2 = c^2', 'An equilateral triangle', 'Three angles summing to 180°'],
        correctAnswer: 1,
        explanation: 'A Pythagorean triple consists of three positive integers that satisfy the Pythagorean equation.'
      }
    ]
  },
  {
    id: 'lab-16',
    labNumber: 16,
    title: 'Fibonacci Module Import',
    aim: 'Define a custom Fibonacci module and import it into another program using Python module system.',
    conceptRecap: 'A Python module is a file ending in .py containing reusable definitions. By importing the module (`import fibonacci_module`), functions within the module are accessed via dot notation (`module.function`).',
    algorithm: [
      '1. Create fibonacci_module.py containing function get_fibonacci(n).',
      '2. In main program, import fibonacci_module.',
      '3. Call fibonacci_module.get_fibonacci(10).',
      '4. Print "10th Fibonacci:" and the result.'
    ],
    isMultiFile: true,
    virtualFiles: {
      'fibonacci_module.py': `def get_fibonacci(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
`
    },
    starterCode: `# Lab 16: Main Program importing custom module
# fibonacci_module.py is mounted in the virtual workspace
import fibonacci_module

# TODO: Call get_fibonacci(10) from fibonacci_module
val = fibonacci_module.get_fibonacci(10)
print("10th Fibonacci:", val)
`,
    solutionCode: `import fibonacci_module

val = fibonacci_module.get_fibonacci(10)
print("10th Fibonacci:", val)`,
    solutionExplanation: 'The virtual filesystem contains fibonacci_module.py. The main script imports fibonacci_module and invokes fibonacci_module.get_fibonacci(10). The Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55) yields 55 for n=10.',
    expectedOutput: `10th Fibonacci: 55`,
    result: 'Creation of a custom module and importing it into another program was verified using real virtual filesystem execution.',
    hints: [
      'fibonacci_module.py is pre-mounted in your workspace with get_fibonacci(n).',
      'Use dot notation to invoke: fibonacci_module.get_fibonacci(10).',
      'Expected output is "10th Fibonacci: 55".'
    ],
    commonMistakes: [
      'Omitting the module prefix: calling get_fibonacci(10) directly raises NameError when using standard "import fibonacci_module".',
      'Typing the module name with the .py extension in the import statement (e.g. import fibonacci_module.py raises ModuleNotFoundError).'
    ],
    testCases: [
      { input: '', expectedOutput: '10th Fibonacci: 55' }
    ],
    vivaQuestions: [
      {
        question: 'What file extension is used for Python module files?',
        options: ['.py', '.mod', '.pyc', '.dll'],
        correctAnswer: 0,
        explanation: 'Python module files have a .py extension.'
      },
      {
        question: 'When using `import module_name`, how do you access a function inside the module?',
        options: ['function_name()', 'module_name.function_name()', 'module_name::function_name()', 'import.function_name()'],
        correctAnswer: 1,
        explanation: 'Standard module import requires prefixing the function with the module name and a dot.'
      }
    ]
  },
  {
    id: 'lab-17',
    labNumber: 17,
    title: 'Import Specific Function from Module',
    aim: 'Define a custom module and import a specific function into another program using the `from module import function` syntax.',
    conceptRecap: 'The `from module import identifier` syntax imports specific functions, classes, or variables directly into the current namespace, allowing them to be called without prefixing the module name.',
    algorithm: [
      '1. Create math_utils.py containing square(x) and cube(x).',
      '2. In main program, write `from math_utils import cube`.',
      '3. Compute cube(4) directly without prefix.',
      '4. Print "Cube of 4 is:" and the result.'
    ],
    isMultiFile: true,
    virtualFiles: {
      'math_utils.py': `def square(x):
    return x * x

def cube(x):
    return x * x * x
`
    },
    starterCode: `# Lab 17: Specific Function Import
# math_utils.py contains square(x) and cube(x)
# TODO: Import ONLY cube from math_utils
from math_utils import cube

# TODO: Call cube(4) directly
result = cube(4)
print("Cube of 4 is:", result)
`,
    solutionCode: `from math_utils import cube

result = cube(4)
print("Cube of 4 is:", result)`,
    solutionExplanation: 'Using "from math_utils import cube" imports only the cube function into the local namespace. The program can call cube(4) directly without writing math_utils.cube(4). 4 * 4 * 4 = 64.',
    expectedOutput: `Cube of 4 is: 64`,
    result: 'Importing a specific function from a module into the local namespace was verified successfully.',
    hints: [
      'Use the syntax: from math_utils import cube.',
      'Notice that you do NOT write math_utils.cube(4); call cube(4) directly.',
      '4 cubed is 4 * 4 * 4 = 64.'
    ],
    commonMistakes: [
      'Writing math_utils.cube(4) when imported with "from math_utils import cube", which raises NameError: name "math_utils" is not defined.',
      'Using wildcard `from math_utils import *`, which pollutes the namespace with all symbols.'
    ],
    testCases: [
      { input: '', expectedOutput: 'Cube of 4 is: 64' }
    ],
    vivaQuestions: [
      {
        question: 'When using `from math_utils import cube`, do you prefix the function with module name when calling it?',
        options: ['Yes (math_utils.cube(4))', 'No (call cube(4) directly)', 'Only if imported twice', 'It causes SyntaxError'],
        correctAnswer: 1,
        explanation: 'from ... import imports the function name directly into current namespace.'
      },
      {
        question: 'What is the main danger of using `from module import *`?',
        options: ['It slows the computer down', 'Namespace pollution and potential name collisions with existing variables/functions', 'It cannot import functions', 'It deletes the module'],
        correctAnswer: 1,
        explanation: 'Wildcard import copies all names, risking accidental overwrites of existing variables or functions.'
      }
    ]
  },
  {
    id: 'lab-18',
    labNumber: 18,
    title: 'Mobile Number Validator',
    aim: 'Validate mobile numbers using functions according to the rules: exactly 10 digits, and first digit must be 7, 8, or 9.',
    conceptRecap: 'String methods `.isdigit()` and `len()` verify numeric length and content. Indexing `s[0]` inspects the leading digit.',
    algorithm: [
      '1. Define validate_mobile(phone).',
      '2. Convert input to string phone_str = str(phone).',
      '3. Check length is 10: len(phone_str) == 10.',
      '4. Check all characters are digits: phone_str.isdigit().',
      '5. Check leading digit: phone_str[0] in ["7", "8", "9"].',
      '6. Return True if all three conditions are met, else False.',
      '7. Test with "9876543210" (valid), "5876543210" (invalid prefix), "987654" (invalid length).'
    ],
    starterCode: `# Lab 18: Mobile Number Validator
def validate_mobile(phone):
    phone_str = str(phone)
    # TODO: Verify len == 10, isdigit(), and leading digit in ['7', '8', '9']
    return len(phone_str) == 10 and phone_str.isdigit() and phone_str[0] in ['7', '8', '9']

# TODO: Test cases
print(validate_mobile("9876543210"))
print(validate_mobile("5876543210"))
print(validate_mobile("987654"))
`,
    solutionCode: `def validate_mobile(phone):
    phone_str = str(phone)
    return len(phone_str) == 10 and phone_str.isdigit() and phone_str[0] in ['7', '8', '9']

print(validate_mobile("9876543210"))
print(validate_mobile("5876543210"))
print(validate_mobile("987654"))`,
    solutionExplanation: '"9876543210" is 10 digits, all numeric, starts with "9" -> True. "5876543210" starts with "5" (not 7, 8, or 9) -> False. "987654" has only 6 digits -> False.',
    expectedOutput: `True
False
False`,
    result: 'Mobile number validation using functions, length checking, digit verification, and prefix validation was successfully verified.',
    hints: [
      'Ensure phone is converted to string first: phone_str = str(phone).',
      'Check all three rules: len(phone_str) == 10, phone_str.isdigit(), and phone_str[0] in ["7", "8", "9"].',
      'Use boolean "and" to ensure all conditions must be satisfied.'
    ],
    commonMistakes: [
      'Treating phone as an integer without converting to string: integers do not support len() or isdigit(), raising TypeError.',
      'Checking phone[0] == "7" or "8" or "9": in Python, "or "8"" evaluates to "8" (truthy), so the expression is always True! Use `phone[0] in ["7", "8", "9"]` instead.'
    ],
    testCases: [
      { input: '', expectedOutput: 'True\nFalse\nFalse' }
    ],
    vivaQuestions: [
      {
        question: 'Which string method verifies that all characters in a string are numeric digits?',
        options: ['isnumeric() / isdigit()', 'isnumber()', 'isalpha()', 'valid_num()'],
        correctAnswer: 0,
        explanation: 'isdigit() checks that all characters are digits.'
      },
      {
        question: 'Why is `phone[0] == "7" or "8" or "9"` a common Python logic bug?',
        options: ['Because "8" is a non-empty string which evaluates to True, making the whole condition always True', 'It raises a SyntaxError', 'It is not valid syntax in Python 3', 'Strings cannot be compared'],
        correctAnswer: 0,
        explanation: 'In Python, non-empty strings are truthy. Thus `... or "8"` evaluates to True regardless of phone[0]. Use `phone[0] in ["7", "8", "9"]`.'
      }
    ]
  }
];

export const getLab = (id) => PRACTICAL_LABS.find((l) => l.id === id || String(l.labNumber) === String(id));
