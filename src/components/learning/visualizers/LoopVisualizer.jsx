import React, { useState, useEffect } from 'react';

export default function LoopVisualizer({ config, steps: directSteps }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = directSteps || config?.steps || [];
  const maxStep = Math.max(0, steps.length - 1);

  useEffect(() => {
    if (!isPlaying) return;
    if (currentStepIndex >= maxStep) {
      return;
    }
    const timer = setTimeout(() => {
      setCurrentStepIndex((prev) => {
        const next = prev + 1;
        if (next >= maxStep) {
          setIsPlaying(false);
          return maxStep;
        }
        return next;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, maxStep]);

  if (steps.length === 0) return null;

  const currentStep = steps[currentStepIndex];

  return (
    <div style={{ background: '#172033', color: '#F7F3EA', padding: '24px', borderRadius: '12px', fontFamily: 'monospace', margin: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
        <h4 style={{ margin: 0, color: '#C79A45' }}>Loop Execution Trace</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => { setIsPlaying(false); setCurrentStepIndex(Math.max(0, currentStepIndex - 1)); }}
            disabled={currentStepIndex === 0}
            style={btnStyle}
          >
            Previous
          </button>
          <button
            onClick={() => { setIsPlaying(false); setCurrentStepIndex(Math.min(maxStep, currentStepIndex + 1)); }}
            disabled={currentStepIndex === maxStep}
            style={btnStyle}
          >
            Next
          </button>
          <button
            onClick={() => { if (currentStepIndex === maxStep) setCurrentStepIndex(0); setIsPlaying(!isPlaying); }}
            style={{ ...btnStyle, background: isPlaying ? '#C79A45' : '#315C8C', color: isPlaying ? '#172033' : '#F7F3EA' }}
          >
            {isPlaying ? 'Pause' : 'Auto Play'}
          </button>
          <button
            onClick={() => { setIsPlaying(false); setCurrentStepIndex(0); }}
            disabled={currentStepIndex === 0 && !isPlaying}
            style={btnStyle}
          >
            Reset
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px' }}>
          <h5 style={{ margin: '0 0 12px 0', color: '#8b9bb4', fontSize: '0.9rem' }}>Variables (Memory)</h5>
          {Object.entries(currentStep.variables || {}).map(([key, val]) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontWeight: 'bold' }}>{key}</span>
              <span style={{ color: '#C79A45' }}>{val}</span>
            </div>
          ))}
        </div>
        
        <div style={{ flex: 1, background: '#0d1117', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h5 style={{ margin: '0 0 12px 0', color: '#8b9bb4', fontSize: '0.9rem' }}>Output (Console)</h5>
          <div style={{ color: '#a5d6ff', whiteSpace: 'pre-wrap' }}>
            {currentStep.output || <span style={{color: '#4b5563'}}>No output yet...</span>}
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.9rem', color: '#8b9bb4' }}>
        Iteration {currentStepIndex + 1} of {steps.length}
      </div>
    </div>
  );
}

const btnStyle = {
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.2)',
  color: '#F7F3EA',
  padding: '6px 12px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.85rem'
};
