import React, { useState } from 'react';
import { playUiBubbleSound } from '../../../lib/uiBubbleSound';

export default function PredictOutputExercise({
  instruction,
  code,
  expectedOutput,
  explanation,
  hint,
  onComplete
}) {
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'correct' | 'incorrect'

  const handleCheck = () => {
    if (!answer.trim()) return;

    const cleanInput = answer.trim();
    const cleanTarget = (expectedOutput || '').trim();

    // Check equality (allowing quotes or without quotes if student typed quotes)
    const isCorrect =
      cleanInput === cleanTarget ||
      cleanInput.replace(/^["']|["']$/g, '') === cleanTarget.replace(/^["']|["']$/g, '');

    if (isCorrect) {
      setStatus('correct');
      playUiBubbleSound();
      if (onComplete) onComplete(true);
    } else {
      setStatus('incorrect');
    }
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2DACB',
        borderRadius: '12px',
        padding: '24px 28px',
        marginBottom: '28px',
        boxShadow: '0 4px 16px rgba(23, 32, 51, 0.04)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <span style={{ fontSize: '1.2rem' }}>🤔</span>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#315C8C' }}>
          Observation & Prediction
        </span>
      </div>

      <p style={{ color: '#2B3545', marginBottom: '16px', fontSize: '1.05rem', lineHeight: 1.5, fontWeight: 500 }}>
        {instruction || "Before running this code, predict what Python will display on the screen:"}
      </p>

      {code && (
        <pre
          style={{
            background: '#172033',
            padding: '16px 20px',
            borderRadius: '8px',
            border: '1px solid #2B3D59',
            color: '#F7F3EA',
            fontSize: '1rem',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            overflowX: 'auto',
            marginBottom: '20px'
          }}
        >
          <code>{code}</code>
        </pre>
      )}

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <input
            type="text"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              if (status !== 'idle') setStatus('idle');
            }}
            placeholder="Type the exact output here..."
            style={{
              width: '100%',
              padding: '11px 16px',
              borderRadius: '6px',
              border: `1.5px solid ${status === 'correct' ? '#22C55E' : status === 'incorrect' ? '#EF4444' : '#C79A45'}`,
              background: '#FDFBF7',
              color: '#172033',
              fontSize: '1rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          />
        </div>
        <button
          onClick={handleCheck}
          disabled={!answer.trim()}
          style={{
            background: '#315C8C',
            color: '#FFFFFF',
            border: 'none',
            padding: '11px 22px',
            borderRadius: '6px',
            fontSize: '0.92rem',
            fontWeight: 600,
            cursor: !answer.trim() ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 6px rgba(49, 92, 140, 0.25)'
          }}
        >
          Check My Prediction
        </button>
      </div>

      {status === 'correct' && (
        <div
          style={{
            marginTop: '16px',
            padding: '14px 18px',
            background: '#F4F9F4',
            borderRadius: '8px',
            borderLeft: '4px solid #22C55E',
            color: '#14532D'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '4px' }}>
            <span>✓</span> Spot on!
          </div>
          <div style={{ fontSize: '0.93rem', color: '#166534', lineHeight: 1.5 }}>
            {explanation || `Python displays exactly: "${expectedOutput}". Notice that quotes are not printed!`}
          </div>
        </div>
      )}

      {status === 'incorrect' && (
        <div
          style={{
            marginTop: '16px',
            padding: '14px 18px',
            background: '#FFF9F0',
            borderRadius: '8px',
            borderLeft: '4px solid #C79A45',
            color: '#78350F'
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: '4px' }}>
            Not quite. Look closely at what Python prints!
          </div>
          <div style={{ fontSize: '0.93rem', lineHeight: 1.5 }}>
            {hint || "Remember: Python prints only the contents inside the quotes, without the quotation marks themselves."}
          </div>
        </div>
      )}
    </div>
  );
}

