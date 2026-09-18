import React, { useState } from 'react';

export default function VariableTrace({ config, steps: directSteps }) {
  const [stepIndex, setStepIndex] = useState(0);
  const steps = directSteps || config?.steps || [];

  const handleNext = () => {
    if (stepIndex < steps.length - 1) setStepIndex(stepIndex + 1);
  };

  const handlePrev = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const currentStep = steps[stepIndex];
  
  if (!currentStep) return null;

  const varEntries = Object.entries(currentStep.state || currentStep.variables || {});

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', background: '#f6f8fa' }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', color: 'var(--text)' }}>Execution Trace</h4>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Code View */}
        <div>
          <div style={{ background: '#0d1117', padding: '12px', borderRadius: '6px', color: '#e6edf3', fontFamily: 'monospace', minHeight: '100px' }}>
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                style={{ 
                  backgroundColor: idx === stepIndex ? '#1f6feb33' : 'transparent',
                  borderLeft: idx === stepIndex ? '3px solid #1f6feb' : '3px solid transparent',
                  paddingLeft: '8px',
                  opacity: idx > stepIndex ? 0.4 : 1
                }}
              >
                {step.code}
              </div>
            ))}
          </div>
        </div>

        {/* Memory View */}
        <div>
          <h5 style={{ margin: '0 0 8px 0', color: 'var(--muted)' }}>Memory Map</h5>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {varEntries.map(([varName, varVal]) => (
              <div key={varName} style={{ border: '2px solid #d0d7de', borderRadius: '4px', textAlign: 'center', width: '80px', background: '#fff' }}>
                <div style={{ background: '#d0d7de', padding: '4px', fontSize: '0.8rem', fontWeight: 600 }}>{varName}</div>
                <div style={{ padding: '8px', fontSize: '1.1rem', fontWeight: 700, color: '#0969da' }}>{String(varVal)}</div>
              </div>
            ))}
          </div>

          {currentStep.output && (
            <div style={{ marginTop: '16px' }}>
              <h5 style={{ margin: '0 0 8px 0', color: 'var(--muted)' }}>Console Output</h5>
              <div style={{ background: '#0d1117', color: '#e6edf3', padding: '8px', borderRadius: '4px', fontFamily: 'monospace' }}>
                {currentStep.output}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button onClick={handlePrev} disabled={stepIndex === 0} className="btn-secondary" style={{ padding: '6px 16px' }}>Previous</button>
        <button onClick={handleNext} disabled={stepIndex === steps.length - 1} className="btn-primary" style={{ padding: '6px 16px' }}>Next Step</button>
      </div>
    </div>
  );
}
