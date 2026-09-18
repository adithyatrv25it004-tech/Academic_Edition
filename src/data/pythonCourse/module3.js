export const module3 = {
  id: 'module-3',
  title: 'Module 3: Control, Iteration, Collections & Recursion',
  description: 'Selection, loops, strings, collections, NumPy, functions, decomposition and recursion with guided teaching flow.',
  levels: [
    {
      id: 'level-8',
      title: 'Decisions',
      lessons: [
        { id: 'm3-boolean-decisions', title: 'Why Programs Need Decisions', estimatedMinutes: 6, skillTags: ['decision'], isPremium: true },
        { id: 'm3-boolean-conditions', title: 'Boolean Conditions', estimatedMinutes: 6, skillTags: ['decision'], isPremium: true },
        { id: 'm3-if', title: 'Meet if', estimatedMinutes: 5, skillTags: ['decision'], isPremium: true },
        { id: 'm3-if-else', title: 'if-else', estimatedMinutes: 5, skillTags: ['decision'], isPremium: true },
        { id: 'm3-if-elif-else', title: 'elif', estimatedMinutes: 6, skillTags: ['decision'], isPremium: true },
        { id: 'm3-combined-conditions', title: 'Combining Conditions', estimatedMinutes: 7, skillTags: ['decision', 'operator'], isPremium: true },
        { id: 'm3-decision-checkpoint', title: 'Decisions Checkpoint', estimatedMinutes: 8, skillTags: ['decision'], isPremium: true }
      ]
    },
    {
      id: 'level-9',
      title: 'For Loops',
      lessons: [
        { id: 'm3-why-loops', title: 'Why Repetition Exists', estimatedMinutes: 5, skillTags: ['for-loop'], isPremium: true },
        { id: 'm3-meet-for-loop', title: 'Meet the for Loop', estimatedMinutes: 8, skillTags: ['for-loop'], isPremium: true },
        { id: 'm3-range-stop', title: 'range(stop)', estimatedMinutes: 7, skillTags: ['for-loop'], isPremium: true },
        { id: 'm3-range-start-stop', title: 'range(start, stop)', estimatedMinutes: 7, skillTags: ['for-loop'], isPremium: true },
        { id: 'm3-range-step', title: 'range(start, stop, step)', estimatedMinutes: 7, skillTags: ['for-loop'], isPremium: true },
        { id: 'm3-negative-steps', title: 'Negative Steps', estimatedMinutes: 6, skillTags: ['for-loop'], isPremium: true },
        { id: 'm3-counters-accumulators', title: 'Counters and Accumulators', estimatedMinutes: 8, skillTags: ['for-loop', 'variable'], isPremium: true },
        { id: 'm3-nested-loop-intro', title: 'Nested Loop Introduction', estimatedMinutes: 7, skillTags: ['for-loop'], isPremium: true },
        { id: 'm3-for-loop-practice', title: 'For Loop Practice', estimatedMinutes: 10, skillTags: ['for-loop'], isPremium: true },
        { id: 'm3-for-loop-checkpoint', title: 'For-Loop Checkpoint', estimatedMinutes: 8, skillTags: ['for-loop'], isPremium: true }
      ]
    },
    {
      id: 'level-10',
      title: 'While Loops',
      lessons: [
        { id: 'm3-why-while', title: 'Meet while', estimatedMinutes: 5, skillTags: ['while-loop'], isPremium: true },
        { id: 'm3-while-init-condition-update', title: 'Initialization, Condition and Update', estimatedMinutes: 6, skillTags: ['while-loop'], isPremium: true },
        { id: 'm3-loop-termination', title: 'Loop Termination', estimatedMinutes: 6, skillTags: ['while-loop'], isPremium: true },
        { id: 'm3-infinite-loops', title: 'Avoiding Infinite Loops', estimatedMinutes: 5, skillTags: ['while-loop'], isPremium: true },
        { id: 'm3-while-problems', title: 'Guided While Problems', estimatedMinutes: 9, skillTags: ['while-loop'], isPremium: true },
        { id: 'm3-sum-digits', title: 'Sum of Digits', estimatedMinutes: 8, skillTags: ['while-loop'], isPremium: true },
        { id: 'm3-while-checkpoint', title: 'While Loop Checkpoint', estimatedMinutes: 8, skillTags: ['while-loop'], isPremium: true }
      ]
    },
    {
      id: 'level-11',
      title: 'Strings',
      lessons: [
        { id: 'm3-string-creation', title: 'Creating Strings', estimatedMinutes: 5, skillTags: ['string'], isPremium: true },
        { id: 'm3-string-indexing', title: 'Indexing and Slicing', estimatedMinutes: 6, skillTags: ['string'], isPremium: true },
        { id: 'm3-string-concatenation', title: 'Concatenation and Comparison', estimatedMinutes: 6, skillTags: ['string'], isPremium: true },
        { id: 'm3-string-traversal', title: 'String Traversal', estimatedMinutes: 7, skillTags: ['string', 'for-loop'], isPremium: true },
        { id: 'm3-string-methods', title: 'Useful String Methods', estimatedMinutes: 7, skillTags: ['string'], isPremium: true },
        { id: 'm3-string-validation', title: 'Validation Concepts', estimatedMinutes: 6, skillTags: ['string'], isPremium: true },
        { id: 'm3-string-practice', title: 'String Practice', estimatedMinutes: 10, skillTags: ['string'], isPremium: true }
      ]
    },
    {
      id: 'level-12',
      title: 'Lists',
      lessons: [
        { id: 'm3-what-is-list', title: 'What is a List?', estimatedMinutes: 5, skillTags: ['list'], isPremium: true },
        { id: 'm3-creating-lists', title: 'Creating Lists', estimatedMinutes: 5, skillTags: ['list'], isPremium: true },
        { id: 'm3-list-accessing', title: 'Accessing and Updating', estimatedMinutes: 6, skillTags: ['list'], isPremium: true },
        { id: 'm3-list-append-remove', title: 'append and remove', estimatedMinutes: 6, skillTags: ['list'], isPremium: true },
        { id: 'm3-list-traversal', title: 'Traversing Lists', estimatedMinutes: 7, skillTags: ['list', 'for-loop'], isPremium: true },
        { id: 'm3-list-searching', title: 'Searching and Min/Max', estimatedMinutes: 8, skillTags: ['list'], isPremium: true },
        { id: 'm3-list-problems', title: 'Simple List Problems', estimatedMinutes: 10, skillTags: ['list'], isPremium: true },
        { id: 'm3-list-checkpoint', title: 'Lists Checkpoint', estimatedMinutes: 8, skillTags: ['list'], isPremium: true }
      ]
    },
    {
      id: 'level-13',
      title: 'Tuples, Sets and Dictionaries',
      lessons: [
        { id: 'm3-tuples', title: 'Tuples', estimatedMinutes: 6, skillTags: ['tuple'], isPremium: true },
        { id: 'm3-sets', title: 'Sets', estimatedMinutes: 6, skillTags: ['set'], isPremium: true },
        { id: 'm3-dictionaries-intro', title: 'Dictionaries', estimatedMinutes: 10, skillTags: ['dictionary'], isPremium: true },
        { id: 'm3-collections-checkpoint', title: 'Strings and Collections Checkpoint', estimatedMinutes: 8, skillTags: ['string', 'list', 'tuple', 'set', 'dictionary'], isPremium: true }
      ]
    },
    {
      id: 'level-14',
      title: 'NumPy Arrays',
      lessons: [
        { id: 'm3-numpy-why-arrays', title: 'Why Arrays?', estimatedMinutes: 6, skillTags: ['numpy'], isPremium: true },
        { id: 'm3-numpy-import', title: 'Import and Create Arrays', estimatedMinutes: 7, skillTags: ['numpy'], isPremium: true },
        { id: 'm3-numpy-access', title: 'Access and Modify Arrays', estimatedMinutes: 7, skillTags: ['numpy'], isPremium: true },
        { id: 'm3-numpy-practice', title: 'NumPy Practice', estimatedMinutes: 10, skillTags: ['numpy'], isPremium: true }
      ]
    },
    {
      id: 'level-15',
      title: 'Functions',
      lessons: [
        { id: 'm3-why-functions', title: 'Why Functions?', estimatedMinutes: 5, skillTags: ['function'], isPremium: true },
        { id: 'm3-defining-functions', title: 'Defining a Function', estimatedMinutes: 6, skillTags: ['function'], isPremium: true },
        { id: 'm3-calling-functions', title: 'Calling a Function', estimatedMinutes: 5, skillTags: ['function'], isPremium: true },
        { id: 'm3-parameters', title: 'Parameters and Arguments', estimatedMinutes: 7, skillTags: ['function'], isPremium: true },
        { id: 'm3-return', title: 'return Values', estimatedMinutes: 7, skillTags: ['function'], isPremium: true },
        { id: 'm3-multiple-returns', title: 'Multiple Return Values', estimatedMinutes: 6, skillTags: ['function'], isPremium: true },
        { id: 'm3-function-practice', title: 'Function Practice', estimatedMinutes: 10, skillTags: ['function'], isPremium: true },
        { id: 'm3-function-checkpoint', title: 'Functions Checkpoint', estimatedMinutes: 8, skillTags: ['function'], isPremium: true }
      ]
    },
    {
      id: 'level-16',
      title: 'Decomposition & Modularization',
      lessons: [
        { id: 'm3-decomposition', title: 'Break It Down', estimatedMinutes: 8, skillTags: ['decomposition', 'modularization'], isPremium: true },
        { id: 'm3-modularization', title: 'Modularization', estimatedMinutes: 8, skillTags: ['modularization', 'function'], isPremium: true },
        { id: 'm3-merge-sort', title: 'Merge Sort as Decomposition', estimatedMinutes: 10, skillTags: ['decomposition'], isPremium: true },
        { id: 'm3-top-three-integers', title: 'Top Three Integers', estimatedMinutes: 12, skillTags: ['decomposition', 'function'], isPremium: true },
        { id: 'm3-decomposition-checkpoint', title: 'Decomposition Checkpoint', estimatedMinutes: 8, skillTags: ['decomposition', 'modularization'], isPremium: true }
      ]
    },
    {
      id: 'level-17',
      title: 'Recursion',
      lessons: [
        { id: 'm3-what-is-recursion', title: 'What is Recursion?', estimatedMinutes: 6, skillTags: ['recursion'], isPremium: true },
        { id: 'm3-recursion-reasons', title: 'Why Recursion?', estimatedMinutes: 6, skillTags: ['recursion'], isPremium: true },
        { id: 'm3-base-case', title: 'Base Case and Recursive Case', estimatedMinutes: 6, skillTags: ['recursion'], isPremium: true },
        { id: 'm3-call-stack', title: 'Call Stack and Unwinding', estimatedMinutes: 8, skillTags: ['recursion'], isPremium: true },
        { id: 'm3-factorial-recursion', title: 'Factorial', estimatedMinutes: 8, skillTags: ['recursion'], isPremium: true },
        { id: 'm3-fibonacci-recursion', title: 'Fibonacci', estimatedMinutes: 8, skillTags: ['recursion'], isPremium: true },
        { id: 'm3-gcd-recursion', title: 'GCD of Two Positive Integers', estimatedMinutes: 8, skillTags: ['recursion'], isPremium: true },
        { id: 'm3-recursive-addition', title: 'Recursive Addition', estimatedMinutes: 8, skillTags: ['recursion'], isPremium: true },
        { id: 'm3-sum-of-digits', title: 'Sum of Digits', estimatedMinutes: 8, skillTags: ['recursion'], isPremium: true },
        { id: 'm3-recursive-sum-range', title: 'Recursive Sum 0..n', estimatedMinutes: 8, skillTags: ['recursion'], isPremium: true },
        { id: 'm3-recursive-product', title: 'Recursive Product of a List', estimatedMinutes: 8, skillTags: ['recursion'], isPremium: true },
        { id: 'm3-recursion-practice', title: 'Recursive Practice', estimatedMinutes: 10, skillTags: ['recursion'], isPremium: true },
        { id: 'm3-recursion-checkpoint', title: 'Recursion Checkpoint', estimatedMinutes: 10, skillTags: ['recursion'], isPremium: true }
      ]
    }
  ]
};
