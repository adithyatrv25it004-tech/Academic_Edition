export const module1 = {
  id: 'module-1',
  title: 'Module 1: Foundations',
  levels: [
    {
      id: 'level-0',
      title: 'Thinking Before Coding',
      lessons: [
        { id: 'm1-problem-solving-intro', title: 'What is Problem Solving?', estimatedMinutes: 5, skillTags: ['problem-solving'], isFreePreview: true },
        { id: 'm1-different-ways', title: 'Different Ways to Solve Problems', estimatedMinutes: 6, skillTags: ['problem-solving'], isPremium: true },
        { id: 'm1-process', title: 'The Programming Problem-Solving Process', estimatedMinutes: 8, skillTags: ['problem-solving'], isPremium: true }
      ]
    },
    {
      id: 'level-1',
      title: 'Meet Python',
      lessons: [
        { id: 'm1-what-is-python', title: 'What is Python?', estimatedMinutes: 4, skillTags: ['python'], isPremium: true },
        { id: 'm1-first-python', title: 'Your First Python Program', estimatedMinutes: 7, skillTags: ['python', 'input-output'], isFreePreview: true },
        { id: 'm1-understanding-errors', title: 'Understanding Errors', estimatedMinutes: 8, skillTags: ['python'], isPremium: true }
      ]
    },
    {
      id: 'level-2',
      title: 'Variables & Data',
      lessons: [
        { id: 'm1-variables', title: 'Variables are Labels', estimatedMinutes: 6, skillTags: ['variables'], isPremium: true },
        { id: 'm1-variables-change', title: 'Variables Can Change', estimatedMinutes: 6, skillTags: ['variables'], isPremium: true },
        { id: 'm1-numbers', title: 'Numbers', estimatedMinutes: 5, skillTags: ['variables'], isPremium: true },
        { id: 'm1-strings', title: 'Strings', estimatedMinutes: 5, skillTags: ['variables', 'strings'], isPremium: true }
      ]
    },
    {
      id: 'level-3',
      title: 'Input, Output & Operators',
      lessons: [
        { id: 'm1-getting-input', title: 'Getting Input', estimatedMinutes: 5, skillTags: ['input-output'], isPremium: true },
        { id: 'm1-input-text', title: 'input() Gives Text', estimatedMinutes: 6, skillTags: ['input-output'], isPremium: true },
        { id: 'm1-arithmetic', title: 'Arithmetic Operators', estimatedMinutes: 8, skillTags: ['operators'], isPremium: true },
        { id: 'm1-comparison', title: 'Comparison Operators', estimatedMinutes: 6, skillTags: ['operators', 'conditions'], isPremium: true },
        { id: 'm1-logical', title: 'Logical Operators', estimatedMinutes: 6, skillTags: ['operators', 'conditions'], isPremium: true },
        { id: 'm1-precedence', title: 'Operator Precedence', estimatedMinutes: 5, skillTags: ['operators'], isPremium: true },
        { id: 'm1-checkpoint', title: 'Module 1 Checkpoint', estimatedMinutes: 10, skillTags: ['problem-solving', 'variables', 'operators'], isPremium: true }
      ]
    }
  ]
};
