/**
 * Contextual Teaching Guidance for ATP Classroom "I'm Stuck" System
 * Non-AI, pedagogically grounded tuition explanations
 */

export const LESSON_HELP_GUIDES = {
  'm1-problem-solving-intro': {
    simplify: {
      title: 'Explain Again Simply',
      content: 'Think of problem-solving like giving directions to a friend. You must know where you are standing right now (Initial State), the exact turns allowed (Operations), and the exact destination address (Goal State). If any of these three is missing or vague, nobody can reach the destination.'
    },
    example: {
      title: 'One More Example',
      content: 'Consider calculating the area of a circle. Initial State: Radius r = 7 cm. Operations: Formula Area = π × r². Goal State: Area = 153.94 cm². Because the steps are exact and measurable, a computer program can solve it instantly.'
    },
    misconception: {
      title: 'Common Misconception',
      content: 'Mistake: Thinking computer programming starts by typing code. In reality, writing code is only Step 4! 80% of an engineer\'s time is spent defining the problem and designing the algorithm on paper.'
    },
    hint: {
      title: 'Guided Hint',
      content: 'Ask yourself: Can someone verify the answer with a true/false test? If yes, it is well-defined. If it depends on personal feelings or opinions, it is ill-defined.'
    }
  },

  'm1-first-python': {
    simplify: {
      title: 'Explain Again Simply',
      content: 'Python print() is like a loudspeaker. Whatever you put inside quotes print("message") is repeated word-for-word onto the screen. If you remove the quotes, Python looks for a variable instead of reading the words.'
    },
    example: {
      title: 'One More Example',
      content: 'print("My name is Rahul")\n\nOutput:\nMy name is Rahul\n\nNotice that the quotation marks are not printed. They only tell Python where the string begins and ends.'
    },
    misconception: {
      title: 'Common Misconception',
      content: 'Beginners often type PRINT("Hello") or Print("Hello"). Remember: Python is strictly case-sensitive! Only lowercase print() is recognized by the interpreter.'
    },
    hint: {
      title: 'Guided Hint',
      content: 'Check for matching pairs: Every opening parenthesis ( must have a closing ), and every opening quote " must have a closing ".'
    }
  },

  'm3-range-stop': {
    simplify: {
      title: 'Explain Again Simply',
      content: 'Think of range(stop) like an alarm clock set for a certain count. It starts counting from 0, and stops the moment it reaches stop without including that number. So range(3) rings on 0, 1, 2, and stops.'
    },
    example: {
      title: 'One More Example',
      content: 'range(6) produces: 0, 1, 2, 3, 4, 5.\nTotal count of numbers = 6.\nSmallest number = 0.\nLargest number = 5 (one less than 6).'
    },
    misconception: {
      title: 'Common Misconception',
      content: 'The #1 error in KTU exams: Assuming range(5) includes 5. It DOES NOT! It stops at 4. The stop number is always excluded.'
    },
    hint: {
      title: 'Guided Hint',
      content: 'If you need numbers up to N (inclusive), pass N + 1 as your stop argument: range(N + 1).'
    }
  },

  'm3-factorial-recursion': {
    simplify: {
      title: 'Explain Again Simply',
      content: 'Recursion is like Russian nesting dolls. You open a doll (factorial(4)), which contains a smaller doll (4 * factorial(3)), which contains an even smaller one... until you reach the solid tiny doll at the center that cannot open (Base Case: 1! = 1). Then you put them all back together in reverse.'
    },
    example: {
      title: 'One More Example',
      content: 'Computing factorial(3):\n1. factorial(3) needs 3 * factorial(2)\n2. factorial(2) needs 2 * factorial(1)\n3. factorial(1) hits Base Case and returns 1!\nNow returning back up:\n2 * 1 = 2\n3 * 2 = 6. Done!'
    },
    misconception: {
      title: 'Common Misconception',
      content: 'Forgetting the Base Case causes infinite recursion. Every recursive call consumes memory on the Call Stack. Without a base case to return, memory runs out and Python raises: RecursionError: maximum recursion depth exceeded.'
    },
    hint: {
      title: 'Guided Hint',
      content: 'Always write your if statement for the base case at the very top of your function before writing any recursive call.'
    }
  }
};

export const DEFAULT_HELP_GUIDE = {
  simplify: {
    title: 'Explain Again Simply',
    content: 'Take a step back. Read the concept one line at a time. In programming, complex solutions are made of simple single-line operations chained together.'
  },
  example: {
    title: 'One More Example',
    content: 'Trace with a concrete number. Replace variables like x or n with small integers like 2 or 3 and follow what each line calculates on paper.'
  },
  misconception: {
    title: 'Common Pitfall',
    content: 'Check operators: Remember that = is assignment (stores a value), while == is comparison (checks if two values are equal).'
  },
  hint: {
    title: 'Guided Hint',
    content: 'Break your code into two parts: 1) What input data do you have? 2) What exact output is requested? Focus only on bridging that single gap.'
  }
};
