import React from 'react';

// Teaching components
import TeacherExplanation from './teaching/TeacherExplanation';
import ConceptCard from './teaching/ConceptCard';
import WorkedExample from './teaching/WorkedExample';
import QuickRecap from './teaching/QuickRecap';

// Exercise components
import MultipleChoiceExercise from './exercises/MultipleChoiceExercise';
import PredictOutputExercise from './exercises/PredictOutputExercise';
import FillCodeExercise from './exercises/FillCodeExercise';
import CodePractice from './exercises/CodePractice';
import ReorderAlgorithmExercise from './exercises/ReorderAlgorithmExercise';
import PseudocodeBuilder from './exercises/PseudocodeBuilder';
import FlowchartBuilder from './exercises/FlowchartBuilder';
import CheckpointQuiz from './exercises/CheckpointQuiz';

// Visualizers & Simulations
import VariableTrace from './visualizers/VariableTrace';
import LoopVisualizer from './visualizers/LoopVisualizer';
import RecursionVisualizer from './visualizers/RecursionVisualizer';
import MergeSortVisualizer from './visualizers/MergeSortVisualizer';
import BruteForceVisualizer from './visualizers/BruteForceVisualizer';
import DynamicProgrammingVisualizer from './visualizers/DynamicProgrammingVisualizer';
import GreedyTaskVisualizer from './visualizers/GreedyTaskVisualizer';
import CouponCollectorSimulation from './visualizers/CouponCollectorSimulation';
import HatCheckSimulation from './visualizers/HatCheckSimulation';

export const SECTION_REGISTRY = {
  // Primary ATP Lesson Section Types
  'teacher-explanation': TeacherExplanation,
  'concept-card': ConceptCard,
  'worked-example': WorkedExample,
  'predict-output': PredictOutputExercise,
  'multiple-choice': MultipleChoiceExercise,
  'fill-code': FillCodeExercise,
  'code-practice': CodePractice,
  'code_practice': CodePractice,
  'variable-trace': VariableTrace,
  'algorithm-reorder': ReorderAlgorithmExercise,
  'pseudocode-builder': PseudocodeBuilder,
  'flowchart-builder': FlowchartBuilder,
  'checkpoint': CheckpointQuiz,
  'checkpoint-quiz': CheckpointQuiz,
  'quick-recap': QuickRecap,

  // Interactive Visualizers & Simulations
  'loop-visualizer': LoopVisualizer,
  'recursion-visualizer': RecursionVisualizer,
  'merge-sort-visualizer': MergeSortVisualizer,
  'brute-force-visualizer': BruteForceVisualizer,
  'dynamic-programming-visualizer': DynamicProgrammingVisualizer,
  'greedy-task-visualizer': GreedyTaskVisualizer,
  'coupon-simulation': CouponCollectorSimulation,
  'hat-check-simulation': HatCheckSimulation,

  // Legacy / Alternative Aliases found in database content
  'explanation': TeacherExplanation,
  'text': TeacherExplanation,
  'try': CodePractice,
  'visualizer': LoopVisualizer
};

/**
 * Safely normalizes section props to prevent runtime errors
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

/**
 * Normalizes raw lesson object from API or database
 */
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
    sections
  };
}

/**
 * Production Safe Fallback Component when an unknown section is encountered
 */
export function SafeSectionFallback({ type, onRetry }) {
  if (typeof window !== 'undefined' && (import.meta.env?.DEV || window.location.hostname === 'localhost')) {
    console.warn(`[Lesson Renderer] Unsupported section type: "${type}"`);
  }

  return (
    <div style={{
      padding: '20px',
      background: '#fcf8e3',
      border: '1px solid #faebcc',
      borderRadius: '8px',
      color: '#8a6d3b',
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <strong>This activity couldn't be loaded.</strong> Please refresh the lesson.
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: '#8a6d3b',
            color: '#fff',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}
