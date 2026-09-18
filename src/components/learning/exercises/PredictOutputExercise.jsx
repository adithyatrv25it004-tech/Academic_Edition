import React, { useState } from 'react';
import { playUiBubbleSound } from '../../../lib/uiBubbleSound';

export default function PredictOutputExercise({ instruction, code, expectedOutput, explanation, onComplete }) {
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('idle'); // idle, correct, incorrect

  const handleCheck = () => {
    if (!answer.trim()) return;
    
    // Simple exact match (ignoring leading/trailing whitespace)
    const isCorrect = answer.trim() === expectedOutput.trim();
    setStatus(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      playUiBubbleSound();
      if (onComplete) onComplete(true);
    }
  };

  return (
    <div style={{ background: '#0d1117', borderRadius: '12px', padding: '24px', border: '1px solid #30363d', marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{ fontSize: '1.5rem' }}>🤔</span>
        <h3 style={{ margin: 0, color: '#c9d1d9', fontSize: '1.1rem', fontWeight: 600 }}>Predict the Output</h3>
      </div>
      
      <p style={{ color: '#e6edf3', marginBottom: '16px', fontSize: '1.05rem' }}>{instruction}</p>
      
      <pre style={{ background: '#161b22', padding: '16px', borderRadius: '8px', border: '1px solid #30363d', color: '#e6edf3', fontSize: '1.05rem', overflowX: 'auto', marginBottom: '20px' }}>
        <code>{code}</code>
      </pre>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <input
            type="text"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setStatus('idle');
            }}
            placeholder="Type the exact output here..."
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '6px',
              border: `2px solid ${status === 'correct' ? '#238636' : status === 'incorrect' ? '#da3633' : '#30363d'}`,
              background: '#010409',
              color: '#c9d1d9',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          />
        </div>
        <button
          onClick={handleCheck}
          disabled={!answer.trim()}
          className="btn-primary"
          style={{ padding: '12px 24px' }}
        >
          Check
        </button>
      </div>

      {status === 'correct' && (
        <div style={{ marginTop: '16px', color: '#3fb950', fontWeight: 600, display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          <span>✓</span> 
          <div>
            <div>Correct!</div>
            {explanation && <div style={{ color: '#8b949e', fontWeight: 400, marginTop: '4px', fontSize: '0.95rem' }}>{explanation}</div>}
          </div>
        </div>
      )}
      
      {status === 'incorrect' && (
        <div style={{ marginTop: '16px', color: '#ff7b72', fontWeight: 500 }}>
          ✗ Not quite. Look closely at what is printed!
        </div>
      )}
    </div>
  );
}
