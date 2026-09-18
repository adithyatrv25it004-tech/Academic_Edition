import React, { useState } from 'react';
import { playUiBubbleSound } from '../../../lib/uiBubbleSound';

// instruction: string
// parts: array of strings and objects. e.g. ["print(", { answer: '"Hello"', id: 'p1' }, ")"]
export default function FillCodeExercise({ instruction, parts, explanation, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState('idle');

  const checkAnswers = () => {
    let allCorrect = true;
    parts.forEach(p => {
      if (typeof p === 'object' && p.answer) {
        const userVal = (answers[p.id] || '').trim();
        if (userVal !== p.answer) {
          allCorrect = false;
        }
      }
    });

    setStatus(allCorrect ? 'correct' : 'incorrect');
    if (allCorrect) {
      playUiBubbleSound();
      if (onComplete) onComplete(true);
    }
  };

  return (
    <div style={{ background: '#0d1117', borderRadius: '12px', padding: '24px', border: '1px solid #30363d', marginBottom: '32px' }}>
      <h3 style={{ margin: '0 0 16px 0', color: '#c9d1d9', fontSize: '1.1rem', fontWeight: 600 }}>Fill in the Blanks</h3>
      <p style={{ color: '#8b949e', marginBottom: '20px' }}>{instruction}</p>

      <div style={{ 
        background: '#161b22', 
        padding: '24px', 
        borderRadius: '8px', 
        border: '1px solid #30363d',
        fontFamily: 'monospace',
        fontSize: '1.1rem',
        color: '#e6edf3',
        lineHeight: '2.5'
      }}>
        {parts.map((p, i) => {
          if (typeof p === 'string') {
            return <span key={i} style={{ whiteSpace: 'pre' }}>{p}</span>;
          }
          
          // Input block
          const isCorrect = status === 'correct';
          return (
            <input
              key={p.id || i}
              type="text"
              value={answers[p.id] || ''}
              onChange={(e) => {
                setAnswers({...answers, [p.id]: e.target.value});
                setStatus('idle');
              }}
              disabled={isCorrect}
              style={{
                background: '#010409',
                border: `2px solid ${isCorrect ? '#238636' : status === 'incorrect' ? '#da3633' : '#58a6ff'}`,
                color: isCorrect ? '#3fb950' : '#c9d1d9',
                padding: '4px 8px',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '1.1rem',
                width: `${Math.max(4, p.answer.length + 2)}ch`,
                textAlign: 'center',
                margin: '0 4px',
                outline: 'none'
              }}
            />
          );
        })}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          className="btn-primary" 
          onClick={checkAnswers}
          disabled={status === 'correct'}
        >
          Check Code
        </button>
        {status === 'correct' && <span style={{ color: '#3fb950', fontWeight: 600 }}>✓ Looks good!</span>}
        {status === 'incorrect' && <span style={{ color: '#ff7b72', fontWeight: 500 }}>✗ Not quite right.</span>}
      </div>

      {status === 'correct' && explanation && (
        <div style={{ marginTop: '16px', color: '#8b949e', fontSize: '0.95rem' }}>
          {explanation}
        </div>
      )}
    </div>
  );
}
