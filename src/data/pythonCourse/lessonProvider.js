import { SHOWCASE_LESSONS } from './showcaseLessons';
import { ALL_LESSONS_DATA } from './allLessonsData';
import { getLesson as getLocalLessonMeta } from './course';

/**
 * Generates an interactive curriculum lesson structure if a lesson is not yet in the pre-compiled database.
 */
function generateCurriculumLesson(lessonId, meta) {
  const title = meta?.title || 'Interactive Lesson';
  const minutes = meta?.estimatedMinutes || meta?.estimated_minutes || 7;
  const tags = meta?.skillTags || ['programming', 'algorithmic-thinking'];

  // Tailor visualizer and exercises based on skill tags and title keywords
  const titleLower = title.toLowerCase();
  const tagsStr = tags.join(' ').toLowerCase();

  let specialSection = null;
  if (tagsStr.includes('merge-sort') || titleLower.includes('merge sort')) {
    specialSection = {
      id: `${lessonId}-vis`,
      type: 'merge-sort-visualizer',
      content: {}
    };
  } else if (tagsStr.includes('brute-force') || titleLower.includes('brute force') || titleLower.includes('padlock')) {
    specialSection = {
      id: `${lessonId}-vis`,
      type: 'brute-force-visualizer',
      content: { target: '0427' }
    };
  } else if (tagsStr.includes('greedy') || titleLower.includes('greedy')) {
    specialSection = {
      id: `${lessonId}-vis`,
      type: 'greedy-task-visualizer',
      content: {}
    };
  } else if (tagsStr.includes('dynamic-programming') || titleLower.includes('dynamic programming') || titleLower.includes('dp')) {
    specialSection = {
      id: `${lessonId}-vis`,
      type: 'dynamic-programming-visualizer',
      content: {}
    };
  } else if (tagsStr.includes('coupon') || titleLower.includes('coupon')) {
    specialSection = {
      id: `${lessonId}-vis`,
      type: 'coupon-simulation',
      content: {}
    };
  } else if (tagsStr.includes('hat-check') || titleLower.includes('hat check') || titleLower.includes('hat-check')) {
    specialSection = {
      id: `${lessonId}-vis`,
      type: 'hat-check-simulation',
      content: {}
    };
  } else if (tagsStr.includes('recursion') || titleLower.includes('recursion') || titleLower.includes('factorial')) {
    specialSection = {
      id: `${lessonId}-vis`,
      type: 'recursion-visualizer',
      content: { n: 4 }
    };
  } else if (tagsStr.includes('for-loop') || tagsStr.includes('while-loop') || titleLower.includes('loop')) {
    specialSection = {
      id: `${lessonId}-vis`,
      type: 'loop-visualizer',
      content: { maxCount: 5 }
    };
  } else if (tagsStr.includes('variable') || titleLower.includes('variable')) {
    specialSection = {
      id: `${lessonId}-vis`,
      type: 'variable-trace',
      content: {
        steps: [
          { line: 'x = 10', vars: { x: 10 } },
          { line: 'y = x + 5', vars: { x: 10, y: 15 } },
          { line: 'x = x * 2', vars: { x: 20, y: 15 } }
        ]
      }
    };
  } else if (tagsStr.includes('pseudocode') || titleLower.includes('pseudocode')) {
    specialSection = {
      id: `${lessonId}-vis`,
      type: 'pseudocode-builder',
      content: {
        availableBlocks: [
          { id: 'b1', text: 'OUTPUT result' },
          { id: 'b2', text: 'INPUT data' },
          { id: 'b3', text: 'CALCULATE result = data * 2' }
        ],
        correctOrder: [
          { id: 'b2', indent: 0 },
          { id: 'b3', indent: 0 },
          { id: 'b1', indent: 0 }
        ]
      }
    };
  } else if (tagsStr.includes('flowchart') || titleLower.includes('flowchart')) {
    specialSection = {
      id: `${lessonId}-vis`,
      type: 'flowchart-builder',
      content: {
        title: `Flowchart for ${title}`
      }
    };
  } else if (tagsStr.includes('python') || tagsStr.includes('input-output') || tagsStr.includes('operators') || tagsStr.includes('string')) {
    specialSection = {
      id: `${lessonId}-vis`,
      type: 'code-practice',
      content: {
        instruction: `Practice applying the concept of ${title}. Write and test your Python code below:`,
        prefill: `# Experiment with ${title}\n# Write your code here:\nprint("Testing ${title}")\n`,
        expectedOutput: [`Testing ${title}`]
      }
    };
  }

  const sections = [
    {
      id: `${lessonId}-step-1`,
      type: 'atp-teacher',
      title: 'ATP Teacher Explanation',
      topic: title,
      quote: `Mastering ${title} is key to understanding algorithmic problem-solving in Python.`,
      content: [
        `In this lesson, we break down ${title}.`,
        `When solving computational problems, clarity of thought and precision of steps are what separate working programs from broken ones.`,
        `Study the concepts below carefully, and complete the interactive checkpoint to reinforce your understanding.`
      ],
      note: 'Aligned with KTU B.Tech 2024 Scheme UCEST105 curriculum.'
    },
    {
      id: `${lessonId}-step-2`,
      type: 'concept-card',
      icon: '💡',
      title: `Core Concept: ${title}`,
      content: [
        `Understanding the core principles behind ${title} allows you to formulate algorithms that are efficient, verifiable, and easy to translate into Python code.`,
        `Pay close attention to initial conditions, edge cases, and boundary conditions.`
      ]
    }
  ];

  if (specialSection) {
    sections.push(specialSection);
  }

  sections.push({
    id: `${lessonId}-step-quiz`,
    type: 'multiple-choice',
    content: {
      question: `Which statement best describes the fundamental principle of "${title}"?`,
      options: [
        `It provides a structured, algorithmic approach to solving the specific problem systematically.`,
        `It bypasses computational thinking by guessing solutions without analysis.`,
        `It is only applicable in Python and cannot be generalized to pseudocode or algorithms.`,
        `It ignores runtime efficiency and boundary conditions.`
      ],
      correctAnswer: 0,
      explanation: `Correct! ${title} is part of the systematic foundation of algorithmic problem-solving in KTU UCEST105.`
    }
  });

  sections.push({
    id: `${lessonId}-step-recap`,
    type: 'quick-recap',
    content: {
      keyIdea: `Mastered the fundamentals and application of ${title}.`,
      example: `# Aligned with KTU UCEST105 Course Outcomes\n# Topic: ${title}\n`
    }
  });

  return {
    id: lessonId,
    title,
    estimatedMinutes: minutes,
    skillTags: tags,
    objectives: [
      `Understand the definition and principles of ${title}`,
      `Apply ${title} to algorithmic problem-solving scenarios`,
      `Analyze execution behavior and edge cases`
    ],
    sections,
    isFreePreview: !!(meta?.isFreePreview || meta?.is_free_preview)
  };
}

/**
 * Returns complete lesson data for any lesson in the curriculum.
 * Looks up showcase lessons first, then pre-compiled migration lessons,
 * and falls back to a generated curriculum lesson so no lesson ever crashes.
 */
export function getLessonData(lessonId) {
  if (!lessonId) return null;

  // 1. Check Showcase Lessons (highest fidelity)
  if (SHOWCASE_LESSONS[lessonId]) {
    return SHOWCASE_LESSONS[lessonId];
  }

  // 2. Check Pre-compiled Database Migration Lessons
  const dbLesson = ALL_LESSONS_DATA[lessonId];
  const meta = getLocalLessonMeta(lessonId);

  if (dbLesson) {
    return {
      ...dbLesson,
      title: meta?.title || dbLesson.title || 'Interactive Lesson',
      estimatedMinutes: meta?.estimatedMinutes || dbLesson.estimated_minutes || dbLesson.estimatedMinutes || 7,
      skillTags: meta?.skillTags || dbLesson.skill_tags || dbLesson.skillTags || ['algorithmic-thinking'],
      isFreePreview: !!(meta?.isFreePreview || meta?.is_free_preview || dbLesson.is_free_preview)
    };
  }

  // 3. Generate interactive curriculum lesson from metadata
  return generateCurriculumLesson(lessonId, meta);
}
