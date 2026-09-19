import React from 'react';

// Teaching components
import ATPTeacher from './teaching/ATPTeacher';
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
  'atp-teacher': ATPTeacher,
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

import { normalizeSectionProps, normalizeLesson } from './lessonNormalizer';
import SafeSectionFallback from './SafeSectionFallback';

export { normalizeSectionProps, normalizeLesson, SafeSectionFallback };
