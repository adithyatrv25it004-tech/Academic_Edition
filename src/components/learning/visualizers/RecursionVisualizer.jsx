import React, { useState, useEffect } from 'react';

const RECURSION_PRESETS = {
  factorial: {
    title: "Factorial Recursion: factorial(4)",
    steps: [
      { phase: 'CALLING', depth: 1, fn: 'factorial(4)', args: 'n = 4', desc: 'n > 1, so return 4 * factorial(3)', stack: ['factorial(4)'] },
      { phase: 'CALLING', depth: 2, fn: 'factorial(3)', args: 'n = 3', desc: 'n > 1, so return 3 * factorial(2)', stack: ['factorial(4)', 'factorial(3)'] },
      { phase: 'CALLING', depth: 3, fn: 'factorial(2)', args: 'n = 2', desc: 'n > 1, so return 2 * factorial(1)', stack: ['factorial(4)', 'factorial(3)', 'factorial(2)'] },
      { phase: 'CALLING', depth: 4, fn: 'factorial(1)', args: 'n = 1', desc: 'Base case reached! Return 1', stack: ['factorial(4)', 'factorial(3)', 'factorial(2)', 'factorial(1)'] },
      { phase: 'RETURNING', depth: 4, fn: 'factorial(1)', args: 'n = 1', returnVal: '1', desc: 'factorial(1) returns 1', stack: ['factorial(4)', 'factorial(3)', 'factorial(2)', 'factorial(1)'] },
      { phase: 'RETURNING', depth: 3, fn: 'factorial(2)', args: 'n = 2', returnVal: '2 * 1 = 2', desc: 'factorial(2) returns 2', stack: ['factorial(4)', 'factorial(3)', 'factorial(2)'] },
      { phase: 'RETURNING', depth: 2, fn: 'factorial(3)', args: 'n = 3', returnVal: '3 * 2 = 6', desc: 'factorial(3) returns 6', stack: ['factorial(4)', 'factorial(3)'] },
      { phase: 'RETURNING', depth: 1, fn: 'factorial(4)', args: 'n = 4', returnVal: '4 * 6 = 24', desc: 'Final result: factorial(4) = 24', stack: ['factorial(4)'] }
    ]
  },
  fibonacci: {
    title: "Fibonacci Recursion: fib(4)",
    steps: [
      { phase: 'CALLING', depth: 1, fn: 'fib(4)', args: 'n = 4', desc: 'fib(4) calls fib(3) + fib(2)', stack: ['fib(4)'] },
      { phase: 'CALLING', depth: 2, fn: 'fib(3)', args: 'n = 3', desc: 'fib(3) calls fib(2) + fib(1)', stack: ['fib(4)', 'fib(3)'] },
      { phase: 'CALLING', depth: 3, fn: 'fib(2)', args: 'n = 2', desc: 'fib(2) calls fib(1) + fib(0)', stack: ['fib(4)', 'fib(3)', 'fib(2)'] },
      { phase: 'CALLING', depth: 4, fn: 'fib(1)', args: 'n = 1', desc: 'Base case fib(1) = 1', stack: ['fib(4)', 'fib(3)', 'fib(2)', 'fib(1)'] },
      { phase: 'RETURNING', depth: 4, fn: 'fib(1)', args: 'n = 1', returnVal: '1', desc: 'fib(1) returns 1', stack: ['fib(4)', 'fib(3)', 'fib(2)', 'fib(1)'] },
      { phase: 'CALLING', depth: 4, fn: 'fib(0)', args: 'n = 0', desc: 'Base case fib(0) = 0', stack: ['fib(4)', 'fib(3)', 'fib(2)', 'fib(0)'] },
      { phase: 'RETURNING', depth: 4, fn: 'fib(0)', args: 'n = 0', returnVal: '0', desc: 'fib(0) returns 0', stack: ['fib(4)', 'fib(3)', 'fib(2)', 'fib(0)'] },
      { phase: 'RETURNING', depth: 3, fn: 'fib(2)', args: 'n = 2', returnVal: '1 + 0 = 1', desc: 'fib(2) returns 1', stack: ['fib(4)', 'fib(3)', 'fib(2)'] },
      { phase: 'CALLING', depth: 3, fn: 'fib(1)', args: 'n = 1', desc: 'Base case fib(1) = 1', stack: ['fib(4)', 'fib(3)', 'fib(1)'] },
      { phase: 'RETURNING', depth: 3, fn: 'fib(1)', args: 'n = 1', returnVal: '1', desc: 'fib(1) returns 1', stack: ['fib(4)', 'fib(3)', 'fib(1)'] },
      { phase: 'RETURNING', depth: 2, fn: 'fib(3)', args: 'n = 3', returnVal: '1 + 1 = 2', desc: 'fib(3) returns 2', stack: ['fib(4)', 'fib(3)'] },
      { phase: 'CALLING', depth: 2, fn: 'fib(2)', args: 'n = 2', desc: 'Right branch: fib(2) calls fib(1) + fib(0)', stack: ['fib(4)', 'fib(2)'] },
      { phase: 'RETURNING', depth: 2, fn: 'fib(2)', args: 'n = 2', returnVal: '1', desc: 'fib(2) returns 1', stack: ['fib(4)', 'fib(2)'] },
      { phase: 'RETURNING', depth: 1, fn: 'fib(4)', args: 'n = 4', returnVal: '2 + 1 = 3', desc: 'Final result: fib(4) = 3', stack: ['fib(4)'] }
    ]
  },
  gcd: {
    title: "GCD Recursion: gcd(48, 18)",
    steps: [
      { phase: 'CALLING', depth: 1, fn: 'gcd(48, 18)', args: 'a=48, b=18', desc: 'b != 0, return gcd(18, 48 % 18) -> gcd(18, 12)', stack: ['gcd(48, 18)'] },
      { phase: 'CALLING', depth: 2, fn: 'gcd(18, 12)', args: 'a=18, b=12', desc: 'b != 0, return gcd(12, 18 % 12) -> gcd(12, 6)', stack: ['gcd(48, 18)', 'gcd(18, 12)'] },
      { phase: 'CALLING', depth: 3, fn: 'gcd(12, 6)', args: 'a=12, b=6', desc: 'b != 0, return gcd(6, 12 % 6) -> gcd(6, 0)', stack: ['gcd(48, 18)', 'gcd(18, 12)', 'gcd(12, 6)'] },
      { phase: 'CALLING', depth: 4, fn: 'gcd(6, 0)', args: 'a=6, b=0', desc: 'Base case! b == 0, return a (6)', stack: ['gcd(48, 18)', 'gcd(18, 12)', 'gcd(12, 6)', 'gcd(6, 0)'] },
      { phase: 'RETURNING', depth: 4, fn: 'gcd(6, 0)', args: 'a=6, b=0', returnVal: '6', desc: 'Returns 6', stack: ['gcd(48, 18)', 'gcd(18, 12)', 'gcd(12, 6)', 'gcd(6, 0)'] },
      { phase: 'RETURNING', depth: 3, fn: 'gcd(12, 6)', args: 'a=12, b=6', returnVal: '6', desc: 'Returns 6', stack: ['gcd(48, 18)', 'gcd(18, 12)', 'gcd(12, 6)'] },
      { phase: 'RETURNING', depth: 2, fn: 'gcd(18, 12)', args: 'a=18, b=12', returnVal: '6', desc: 'Returns 6', stack: ['gcd(48, 18)', 'gcd(18, 12)'] },
      { phase: 'RETURNING', depth: 1, fn: 'gcd(48, 18)', args: 'a=48, b=18', returnVal: '6', desc: 'Final Result: GCD is 6', stack: ['gcd(48, 18)'] }
    ]
  },
  recursive_addition: {
    title: "Recursive Addition: add(3, 4)",
    steps: [
      { phase: 'CALLING', depth: 1, fn: 'add(3, 4)', args: 'a=3, b=4', desc: 'b > 0, return 1 + add(3, 3)', stack: ['add(3, 4)'] },
      { phase: 'CALLING', depth: 2, fn: 'add(3, 3)', args: 'a=3, b=3', desc: 'b > 0, return 1 + add(3, 2)', stack: ['add(3, 4)', 'add(3, 3)'] },
      { phase: 'CALLING', depth: 3, fn: 'add(3, 2)', args: 'a=3, b=2', desc: 'b > 0, return 1 + add(3, 1)', stack: ['add(3, 4)', 'add(3, 3)', 'add(3, 2)'] },
      { phase: 'CALLING', depth: 4, fn: 'add(3, 1)', args: 'a=3, b=1', desc: 'b > 0, return 1 + add(3, 0)', stack: ['add(3, 4)', 'add(3, 3)', 'add(3, 2)', 'add(3, 1)'] },
      { phase: 'CALLING', depth: 5, fn: 'add(3, 0)', args: 'a=3, b=0', desc: 'Base case! b == 0, return a (3)', stack: ['add(3, 4)', 'add(3, 3)', 'add(3, 2)', 'add(3, 1)', 'add(3, 0)'] },
      { phase: 'RETURNING', depth: 5, fn: 'add(3, 0)', args: 'a=3, b=0', returnVal: '3', desc: 'Returns 3', stack: ['add(3, 4)', 'add(3, 3)', 'add(3, 2)', 'add(3, 1)', 'add(3, 0)'] },
      { phase: 'RETURNING', depth: 4, fn: 'add(3, 1)', args: 'a=3, b=1', returnVal: '1 + 3 = 4', desc: 'Returns 4', stack: ['add(3, 4)', 'add(3, 3)', 'add(3, 2)', 'add(3, 1)'] },
      { phase: 'RETURNING', depth: 3, fn: 'add(3, 2)', args: 'a=3, b=2', returnVal: '1 + 4 = 5', desc: 'Returns 5', stack: ['add(3, 4)', 'add(3, 3)', 'add(3, 2)'] },
      { phase: 'RETURNING', depth: 2, fn: 'add(3, 3)', args: 'a=3, b=3', returnVal: '1 + 5 = 6', desc: 'Returns 6', stack: ['add(3, 4)', 'add(3, 3)'] },
      { phase: 'RETURNING', depth: 1, fn: 'add(3, 4)', args: 'a=3, b=4', returnVal: '1 + 6 = 7', desc: 'Final Result: 3 + 4 = 7', stack: ['add(3, 4)'] }
    ]
  },
  sum_of_digits: {
    title: "Sum of Digits: sum_digits(126)",
    steps: [
      { phase: 'CALLING', depth: 1, fn: 'sum_digits(126)', args: 'n = 126', desc: 'n > 0, return (126 % 10) + sum_digits(126 // 10) -> 6 + sum_digits(12)', stack: ['sum_digits(126)'] },
      { phase: 'CALLING', depth: 2, fn: 'sum_digits(12)', args: 'n = 12', desc: 'n > 0, return (12 % 10) + sum_digits(12 // 10) -> 2 + sum_digits(1)', stack: ['sum_digits(126)', 'sum_digits(12)'] },
      { phase: 'CALLING', depth: 3, fn: 'sum_digits(1)', args: 'n = 1', desc: 'n > 0, return (1 % 10) + sum_digits(1 // 10) -> 1 + sum_digits(0)', stack: ['sum_digits(126)', 'sum_digits(12)', 'sum_digits(1)'] },
      { phase: 'CALLING', depth: 4, fn: 'sum_digits(0)', args: 'n = 0', desc: 'Base case! n == 0, return 0', stack: ['sum_digits(126)', 'sum_digits(12)', 'sum_digits(1)', 'sum_digits(0)'] },
      { phase: 'RETURNING', depth: 4, fn: 'sum_digits(0)', args: 'n = 0', returnVal: '0', desc: 'Returns 0', stack: ['sum_digits(126)', 'sum_digits(12)', 'sum_digits(1)', 'sum_digits(0)'] },
      { phase: 'RETURNING', depth: 3, fn: 'sum_digits(1)', args: 'n = 1', returnVal: '1 + 0 = 1', desc: 'Returns 1', stack: ['sum_digits(126)', 'sum_digits(12)', 'sum_digits(1)'] },
      { phase: 'RETURNING', depth: 2, fn: 'sum_digits(12)', args: 'n = 12', returnVal: '2 + 1 = 3', desc: 'Returns 3', stack: ['sum_digits(126)', 'sum_digits(12)'] },
      { phase: 'RETURNING', depth: 1, fn: 'sum_digits(126)', args: 'n = 126', returnVal: '6 + 3 = 9', desc: 'Final Result: Sum of digits = 9', stack: ['sum_digits(126)'] }
    ]
  }
};

export default function RecursionVisualizer(props) {
  const config = props.config || props;
  const initialPreset = config.preset || 'factorial';
  const [activePresetKey, setActivePresetKey] = useState(initialPreset);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const preset = RECURSION_PRESETS[activePresetKey] || (config.steps ? { title: config.title || "Call Stack Trace", steps: config.steps } : RECURSION_PRESETS.factorial);
  const steps = preset.steps;
  const maxStep = steps.length - 1;

  useEffect(() => {
    if (!isPlaying) return;
    if (stepIndex >= maxStep) {
      return;
    }
    const timer = setTimeout(() => {
      setStepIndex((prev) => {
        const next = prev + 1;
        if (next >= maxStep) {
          setIsPlaying(false);
          return maxStep;
        }
        return next;
      });
    }, 1200);
    return () => clearTimeout(timer);
  }, [isPlaying, stepIndex, maxStep]);

  const handleSelectPreset = (key) => {
    setActivePresetKey(key);
    setStepIndex(0);
    setIsPlaying(false);
  };

  const currentStep = steps[stepIndex] || steps[0];

  return (
    <div style={{ background: '#172033', color: '#F7F3EA', padding: '24px', borderRadius: '12px', margin: '24px 0', fontFamily: 'sans-serif' }}>
      {/* Header & Preset Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h4 style={{ margin: 0, color: '#C79A45', fontSize: '1.2rem' }}>Call Stack Visualizer</h4>
          <span style={{ fontSize: '0.85rem', color: '#8b9bb4' }}>{preset.title}</span>
        </div>

        {!config.steps && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {Object.keys(RECURSION_PRESETS).map((key) => (
              <button
                key={key}
                onClick={() => handleSelectPreset(key)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid #315C8C',
                  background: activePresetKey === key ? '#315C8C' : 'transparent',
                  color: '#F7F3EA',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                {key.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          onClick={() => { setIsPlaying(false); setStepIndex(Math.max(0, stepIndex - 1)); }}
          disabled={stepIndex === 0}
          style={btnStyle}
        >
          Previous
        </button>
        <button
          onClick={() => { setIsPlaying(false); setStepIndex(Math.min(maxStep, stepIndex + 1)); }}
          disabled={stepIndex === maxStep}
          style={btnStyle}
        >
          Next
        </button>
        <button
          onClick={() => { if (stepIndex === maxStep) setStepIndex(0); setIsPlaying(!isPlaying); }}
          style={{ ...btnStyle, background: isPlaying ? '#C79A45' : '#315C8C', color: isPlaying ? '#172033' : '#F7F3EA' }}
        >
          {isPlaying ? 'Pause' : 'Auto Play'}
        </button>
        <button
          onClick={() => { setIsPlaying(false); setStepIndex(0); }}
          disabled={stepIndex === 0 && !isPlaying}
          style={btnStyle}
        >
          Reset
        </button>
      </div>

      {/* Main Visual Display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        
        {/* Call Stack Frame Stack */}
        <div style={{ background: '#0d1117', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h5 style={{ margin: '0 0 12px 0', color: '#8b9bb4', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Call Stack (Depth: {currentStep.stack.length})</span>
            <span style={{ color: currentStep.phase === 'CALLING' ? '#38d9a9' : '#ff922b', fontWeight: 'bold' }}>
              {currentStep.phase === 'CALLING' ? 'CALLING ↓' : 'RETURNING ↑'}
            </span>
          </h5>

          <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '8px', minHeight: '180px', justifyContent: 'flex-start' }}>
            {currentStep.stack.map((frame, idx) => {
              const isTop = idx === currentStep.stack.length - 1;
              return (
                <div
                  key={idx}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '6px',
                    background: isTop
                      ? (currentStep.phase === 'CALLING' ? 'rgba(56, 217, 169, 0.15)' : 'rgba(255, 146, 43, 0.15)')
                      : 'rgba(255,255,255,0.05)',
                    borderLeft: `4px solid ${isTop ? (currentStep.phase === 'CALLING' ? '#38d9a9' : '#ff922b') : '#315C8C'}`,
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{ fontWeight: isTop ? 'bold' : 'normal', color: isTop ? '#ffffff' : '#8b9bb4' }}>
                    [{idx + 1}] {frame}
                  </span>
                  {isTop && currentStep.returnVal && (
                    <span style={{ color: '#ff922b', fontWeight: 'bold', fontSize: '0.85rem' }}>
                      returns {currentStep.returnVal}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Current State & Explanation */}
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h5 style={{ margin: '0 0 12px 0', color: '#8b9bb4', fontSize: '0.9rem' }}>Current Execution Step</h5>
            
            <div style={{ marginBottom: '12px' }}>
              <span style={{ color: '#8b9bb4', fontSize: '0.85rem' }}>Active Function: </span>
              <span style={{ fontFamily: 'monospace', color: '#C79A45', fontWeight: 'bold', fontSize: '1rem' }}>
                {currentStep.fn}
              </span>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <span style={{ color: '#8b9bb4', fontSize: '0.85rem' }}>Arguments: </span>
              <span style={{ fontFamily: 'monospace', color: '#a5d6ff' }}>{currentStep.args}</span>
            </div>

            {currentStep.returnVal && (
              <div style={{ marginBottom: '12px', padding: '8px', background: 'rgba(255,146,43,0.1)', borderRadius: '6px', border: '1px solid rgba(255,146,43,0.3)' }}>
                <span style={{ color: '#ff922b', fontSize: '0.85rem', fontWeight: 'bold' }}>Return Value: </span>
                <span style={{ fontFamily: 'monospace', color: '#ffffff', fontWeight: 'bold' }}>{currentStep.returnVal}</span>
              </div>
            )}

            <div style={{ background: '#0d1117', padding: '12px', borderRadius: '6px', fontSize: '0.9rem', color: '#e6edf3', lineHeight: '1.4' }}>
              💡 {currentStep.desc}
            </div>
          </div>

          <div style={{ marginTop: '16px', textAlign: 'right', fontSize: '0.8rem', color: '#8b9bb4' }}>
            Step {stepIndex + 1} of {steps.length}
          </div>
        </div>

      </div>
    </div>
  );
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
