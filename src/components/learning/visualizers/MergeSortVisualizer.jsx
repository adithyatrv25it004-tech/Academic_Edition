import React, { useState, useEffect } from 'react';

const DEFAULT_STAGES = [
  {
    title: "Stage 1: Original Array",
    description: "We begin with an unsorted array of size N=4.",
    groups: [
      { id: 'root', items: [8, 3, 6, 2], status: 'active', label: 'Original' }
    ]
  },
  {
    title: "Stage 2: Divide into Halves (Split)",
    description: "The array is divided into left and right halves.",
    groups: [
      { id: 'g1', items: [8, 3], status: 'split', label: 'Left Half' },
      { id: 'g2', items: [6, 2], status: 'split', label: 'Right Half' }
    ]
  },
  {
    title: "Stage 3: Subdivide to Base Cases (Split Again)",
    description: "Each subarray is divided until single elements remain (base case). Single elements are trivially sorted.",
    groups: [
      { id: 'g1a', items: [8], status: 'base', label: 'Element' },
      { id: 'g1b', items: [3], status: 'base', label: 'Element' },
      { id: 'g2a', items: [6], status: 'base', label: 'Element' },
      { id: 'g2b', items: [2], status: 'base', label: 'Element' }
    ]
  },
  {
    title: "Stage 4: Merge Subarrays in Sorted Order",
    description: "Adjacent single-element arrays are merged back together in ascending order.",
    groups: [
      { id: 'm1', items: [3, 8], status: 'merged', label: 'Merged Left' },
      { id: 'm2', items: [2, 6], status: 'merged', label: 'Merged Right' }
    ]
  },
  {
    title: "Stage 5: Final Combined Merge",
    description: "The two sorted halves [3, 8] and [2, 6] are merged to produce the completely sorted array.",
    groups: [
      { id: 'final', items: [2, 3, 6, 8], status: 'sorted', label: 'Completely Sorted' }
    ]
  }
];

export default function MergeSortVisualizer(props) {
  const config = props.config || props;
  const stages = config.stages || DEFAULT_STAGES;
  const [stageIndex, setStageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const maxStage = stages.length - 1;

  useEffect(() => {
    let timer;
    if (isPlaying && stageIndex < maxStage) {
      timer = setTimeout(() => {
        setStageIndex((prev) => prev + 1);
      }, 1500);
    } else if (stageIndex >= maxStage) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, stageIndex, maxStage]);

  const currentStage = stages[stageIndex];

  return (
    <div style={{ background: '#172033', color: '#F7F3EA', padding: '24px', borderRadius: '12px', margin: '24px 0', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h4 style={{ margin: 0, color: '#C79A45', fontSize: '1.2rem' }}>Merge Sort Visualizer (Decomposition & D&C)</h4>
          <span style={{ fontSize: '0.85rem', color: '#8b9bb4' }}>{currentStage.title}</span>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => { setIsPlaying(false); setStageIndex(Math.max(0, stageIndex - 1)); }}
            disabled={stageIndex === 0}
            style={btnStyle}
          >
            Previous
          </button>
          <button
            onClick={() => { setIsPlaying(false); setStageIndex(Math.min(maxStage, stageIndex + 1)); }}
            disabled={stageIndex === maxStage}
            style={btnStyle}
          >
            Next
          </button>
          <button
            onClick={() => { if (stageIndex === maxStage) setStageIndex(0); setIsPlaying(!isPlaying); }}
            style={{ ...btnStyle, background: isPlaying ? '#C79A45' : '#315C8C', color: isPlaying ? '#172033' : '#F7F3EA' }}
          >
            {isPlaying ? 'Pause' : 'Auto Play'}
          </button>
          <button
            onClick={() => { setIsPlaying(false); setStageIndex(0); }}
            disabled={stageIndex === 0 && !isPlaying}
            style={btnStyle}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Description card */}
      <div style={{ background: '#0d1117', padding: '14px 18px', borderRadius: '8px', marginBottom: '24px', borderLeft: '4px solid #315C8C', fontSize: '0.95rem', color: '#e6edf3' }}>
        💡 {currentStage.description}
      </div>

      {/* Visual Array Blocks Display */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '20px', minHeight: '140px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
        {currentStage.groups.map((group) => (
          <div key={group.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#8b9bb4', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {group.label}
            </span>
            <div style={{ display: 'flex', gap: '6px', padding: '8px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
              {group.items.map((val, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '42px',
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    fontFamily: 'monospace',
                    background: getStatusBg(group.status),
                    color: getStatusColor(group.status),
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Footer */}
      <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.85rem', color: '#8b9bb4' }}>
        Stage {stageIndex + 1} of {stages.length}
      </div>
    </div>
  );
}

function getStatusBg(status) {
  switch (status) {
    case 'split': return 'rgba(49, 92, 140, 0.4)';
    case 'base': return 'rgba(199, 154, 69, 0.3)';
    case 'merged': return 'rgba(56, 217, 169, 0.3)';
    case 'sorted': return 'rgba(46, 160, 67, 0.5)';
    default: return '#315C8C';
  }
}

function getStatusColor(status) {
  switch (status) {
    case 'sorted': return '#38d9a9';
    case 'base': return '#C79A45';
    default: return '#ffffff';
  }
}

const btnStyle = {
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.2)',
  color: '#F7F3EA',
  padding: '6px 14px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.85rem'
};
