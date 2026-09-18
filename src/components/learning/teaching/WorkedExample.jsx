import React from 'react';

export default function WorkedExample({ title = "Worked Example", problem, steps, finalAnswer }) {
  return (
    <div style={{ background: '#fdf8f5', border: '1px solid #f2e2d9', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '1.3rem', color: '#bc4c00', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>📝</span> {title}
      </h3>
      
      <div style={{ marginBottom: '24px', background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #f2e2d9' }}>
        <strong style={{ color: '#57606a', fontSize: '0.9rem', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>The Problem</strong>
        <p style={{ margin: 0, fontSize: '1.1rem', color: '#24292f' }}>{problem}</p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <strong style={{ color: '#57606a', fontSize: '0.9rem', display: 'block', marginBottom: '12px', textTransform: 'uppercase' }}>Step-by-Step</strong>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ background: '#bc4c00', color: '#fff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold', flexShrink: 0 }}>
                {i + 1}
              </span>
              <p style={{ margin: 0, fontSize: '1.05rem', color: '#24292f', paddingTop: '2px' }}>{step}</p>
            </div>
          ))}
        </div>
      </div>

      {finalAnswer && (
        <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #f2e2d9', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.5rem' }}>🎯</span>
          <div>
            <strong style={{ color: '#57606a', fontSize: '0.9rem', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Result</strong>
            <p style={{ margin: 0, fontSize: '1.1rem', color: '#24292f', fontWeight: 600 }}>{finalAnswer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
