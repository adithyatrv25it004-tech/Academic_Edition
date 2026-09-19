/**
 * Lesson and Section data normalization helpers
 */

export function normalizeSectionProps(section, options = {}) {
  if (!section) return {};

  const { id, type, content, ...topLevel } = section;
  let normalized = {};

  if (typeof content === 'object' && content !== null && !Array.isArray(content)) {
    normalized = { id, type, ...topLevel, ...content };
  } else {
    normalized = { id, type, ...topLevel, content };
  }

  // Type specific normalizations
  if (type === 'checkpoint' || type === 'checkpoint-quiz') {
    const questions = Array.isArray(content)
      ? content
      : (content?.questions || section.questions || []);
    normalized.questions = questions;
    if (options.lessonId) normalized.lessonId = options.lessonId;
    if (options.onCheckpointComplete) normalized.onComplete = options.onCheckpointComplete;
  }

  if (type === 'code-practice' || type === 'code_practice' || type === 'try') {
    if (normalized.expectedOutput && typeof normalized.expectedOutput === 'string') {
      normalized.expectedOutput = [normalized.expectedOutput];
    }
  }

  if (type === 'variable-trace' || type === 'loop-visualizer') {
    if (!normalized.config && normalized.steps) {
      normalized.config = { steps: normalized.steps, title: normalized.title };
    }
  }

  if (options.onComplete && !normalized.onComplete) {
    normalized.onComplete = options.onComplete;
  }

  return normalized;
}

export function normalizeLesson(rawLesson) {
  if (!rawLesson) return null;

  const estimatedMinutes =
    rawLesson.estimated_minutes ??
    rawLesson.estimatedMinutes ??
    rawLesson.content?.estimated_minutes ??
    rawLesson.content?.estimatedMinutes ??
    rawLesson.intro?.estimatedMinutes ??
    null;

  const skillTags =
    rawLesson.skill_tags ??
    rawLesson.skillTags ??
    rawLesson.intro?.skillTags ??
    [];

  const objectives =
    rawLesson.objectives ??
    rawLesson.content?.objectives ??
    rawLesson.intro?.objectives ??
    [];

  const title =
    rawLesson.title ??
    rawLesson.intro?.title ??
    'Lesson';

  const sections = Array.isArray(rawLesson.content)
    ? rawLesson.content
    : (Array.isArray(rawLesson.sections) ? rawLesson.sections : []);

  return {
    ...rawLesson,
    title,
    estimatedMinutes,
    skillTags,
    objectives,
    sections
  };
}
