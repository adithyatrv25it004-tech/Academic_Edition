import { module1 } from './module1';
import { module2 } from './module2';
import { module3 } from './module3';
import { module4 } from './module4';

export const COURSE_MODULES = [
  module1,
  module2,
  module3,
  module4
];

// Flatten all lessons into a map for fast lookup
export const LESSON_MAP = {};
export const LESSONS_LIST = [];

COURSE_MODULES.forEach((mod) => {
  mod.levels.forEach((level) => {
    level.lessons.forEach((lesson) => {
      lesson.moduleId = mod.id;
      lesson.levelId = level.id;
      LESSON_MAP[lesson.id] = lesson;
      LESSONS_LIST.push(lesson);
    });
  });
});

export const getLesson = (id) => LESSON_MAP[id];

export const getNextLessonId = (currentId) => {
  const index = LESSONS_LIST.findIndex((l) => l.id === currentId);
  if (index >= 0 && index < LESSONS_LIST.length - 1) {
    return LESSONS_LIST[index + 1].id;
  }
  return null;
};
