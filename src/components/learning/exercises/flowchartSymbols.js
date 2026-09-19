/**
 * APJ Abdul Kalam Technological University (KTU) S1 UCEST105
 * 8 Official Required Flowchart Symbols Specification
 */

export const SYMBOL_DEFINITIONS = {
  START_END: {
    type: 'START_END',
    name: 'Terminal (Start / End)',
    shortName: 'Start / End',
    syllabusCategory: 'Terminal',
    academicUsage: 'Represents the starting point or completion of an algorithm flow.',
    colorBg: '#FEF3C7',
    colorBorder: '#D97706',
    colorText: '#78350F',
    defaultText: 'START',
    isConnector: false,
    shapeDesc: 'Oval / Rounded Capsule'
  },
  PROCESS: {
    type: 'PROCESS',
    name: 'Process / Arithmetic',
    shortName: 'Process',
    syllabusCategory: 'Computation',
    academicUsage: 'Calculations, data assignments, or variable updates (e.g., c = a + b).',
    colorBg: '#EEF2FF',
    colorBorder: '#4F46E5',
    colorText: '#312E81',
    defaultText: 'c = a + b',
    isConnector: false,
    shapeDesc: 'Rectangle'
  },
  INPUT_OUTPUT: {
    type: 'INPUT_OUTPUT',
    name: 'Input / Output (I/O)',
    shortName: 'Input / Output',
    syllabusCategory: 'I/O',
    academicUsage: 'Reading input data from user or printing output results (e.g., READ a, b).',
    colorBg: '#ECFDF5',
    colorBorder: '#059669',
    colorText: '#064E3B',
    defaultText: 'READ a, b',
    isConnector: false,
    shapeDesc: 'Parallelogram'
  },
  DECISION: {
    type: 'DECISION',
    name: 'Decision / Selection',
    shortName: 'Decision',
    syllabusCategory: 'Branching',
    academicUsage: 'Conditional test with True/False (Yes/No) exit pathways (e.g., a > b ?).',
    colorBg: '#FFF1F2',
    colorBorder: '#E11D48',
    colorText: '#881337',
    defaultText: 'a > b ?',
    isConnector: false,
    shapeDesc: 'Rhombus / Diamond'
  },
  MODULE: {
    type: 'MODULE',
    name: 'Module / Subroutine',
    shortName: 'Module',
    syllabusCategory: 'Subroutine',
    academicUsage: 'Predefined process, function call, or external sub-algorithm (e.g., CALL factorial(n)).',
    colorBg: '#F0F9FF',
    colorBorder: '#0284C7',
    colorText: '#0C4A6E',
    defaultText: 'CALL factorial(n)',
    isConnector: false,
    shapeDesc: 'Double-bordered Rectangle'
  },
  HEXAGON: {
    type: 'HEXAGON',
    name: 'For-loop Hexagon',
    shortName: 'For Hexagon',
    syllabusCategory: 'Iteration',
    academicUsage: 'Preparation / loop counter initialization and step update (e.g., i = 1 to n, step 1).',
    colorBg: '#FAF5FF',
    colorBorder: '#9333EA',
    colorText: '#581C87',
    defaultText: 'i = 1 to n, step 1',
    isConnector: false,
    shapeDesc: 'Pointed Hexagon'
  },
  ON_PAGE_CONNECTOR: {
    type: 'ON_PAGE_CONNECTOR',
    name: 'On-Page Connector',
    shortName: 'On-Page Conn',
    syllabusCategory: 'Connector',
    academicUsage: 'Connects flowlines on the same diagram page without crossing lines (e.g., A, 1).',
    colorBg: '#F0FDFA',
    colorBorder: '#0D9488',
    colorText: '#134E4A',
    defaultText: 'A',
    isConnector: true,
    shapeDesc: 'Small Circle'
  },
  OFF_PAGE_CONNECTOR: {
    type: 'OFF_PAGE_CONNECTOR',
    name: 'Off-Page Connector',
    shortName: 'Off-Page Conn',
    syllabusCategory: 'Connector',
    academicUsage: 'Connects flowlines to another page or external diagram sheet.',
    colorBg: '#FFF7ED',
    colorBorder: '#EA580C',
    colorText: '#7C2D12',
    defaultText: 'Page 2',
    isConnector: true,
    shapeDesc: 'Downward Pentagon'
  }
};

// Aliases for compatibility
SYMBOL_DEFINITIONS.TERMINAL = SYMBOL_DEFINITIONS.START_END;
SYMBOL_DEFINITIONS.CONNECTOR = SYMBOL_DEFINITIONS.ON_PAGE_CONNECTOR;
SYMBOL_DEFINITIONS.PREPARATION = SYMBOL_DEFINITIONS.HEXAGON;

export const SYMBOL_KEYS = [
  'START_END',
  'PROCESS',
  'INPUT_OUTPUT',
  'DECISION',
  'MODULE',
  'HEXAGON',
  'ON_PAGE_CONNECTOR',
  'OFF_PAGE_CONNECTOR'
];

export const KTU_PRESETS = [
  {
    id: 'sum-two',
    label: 'Sum of Two Numbers (Sequential)',
    blocks: [
      { shape: 'START_END', text: 'START' },
      { shape: 'INPUT_OUTPUT', text: 'READ a, b' },
      { shape: 'PROCESS', text: 'c = a + b' },
      { shape: 'INPUT_OUTPUT', text: 'PRINT c' },
      { shape: 'START_END', text: 'STOP' }
    ]
  },
  {
    id: 'larger-two',
    label: 'Larger of Two Numbers (Decision)',
    blocks: [
      { shape: 'START_END', text: 'START' },
      { shape: 'INPUT_OUTPUT', text: 'READ a, b' },
      { shape: 'DECISION', text: 'a > b ?' },
      { shape: 'INPUT_OUTPUT', text: 'PRINT "a is larger"' },
      { shape: 'ON_PAGE_CONNECTOR', text: 'A' },
      { shape: 'START_END', text: 'STOP' }
    ]
  },
  {
    id: 'loop-hex',
    label: 'Print 1 to n (For-loop Hexagon)',
    blocks: [
      { shape: 'START_END', text: 'START' },
      { shape: 'INPUT_OUTPUT', text: 'READ n' },
      { shape: 'HEXAGON', text: 'i = 1 to n, step 1' },
      { shape: 'INPUT_OUTPUT', text: 'PRINT i' },
      { shape: 'START_END', text: 'STOP' }
    ]
  },
  {
    id: 'module-fact',
    label: 'Subroutine / Module Call (Predefined)',
    blocks: [
      { shape: 'START_END', text: 'START' },
      { shape: 'INPUT_OUTPUT', text: 'READ n' },
      { shape: 'MODULE', text: 'CALL factorial(n)' },
      { shape: 'INPUT_OUTPUT', text: 'PRINT result' },
      { shape: 'START_END', text: 'STOP' }
    ]
  }
];
