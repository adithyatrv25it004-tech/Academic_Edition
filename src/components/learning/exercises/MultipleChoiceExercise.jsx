import React, { useState } from 'react';
import { playUiBubbleSound } from '../../../lib/uiBubbleSound';

export default function MultipleChoiceExercise({ question, options, correctAnswer, explanation, onComplete }) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, correct, incorrect

  const handleSelect = (idx) => {
    if (status === 'correct') return; // Lock if already correct
    setSelectedIdx(idx);
    
    if (idx === correctAnswer) {
      setStatus('correct');
      playUiBubbleSound();
      if (onComplete) onComplete(true);
    } else {
      setStatus('incorrect');
    }
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #d0d7de', borderRadius: '12px', padding: '24px', marginBottom: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <h3 style={{ margin: '0 0 20px 0', fontSize: '1.2rem', color: '#24292f' }}>{question}</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {options.map((opt, i) => {
          const isSelected = selectedIdx === i;
          const isCorrectAns = i === correctAnswer;
          
          let bgColor = '#f6f8fa';
          let borderColor = '#d0d7de';
          let textColor = '#24292f';
          
          if (isSelected) {
            if (status === 'correct') {
              bgColor = '#dafbe1';
              borderColor = '#4ac26b';
              textColor = '#1a7f37';
            } else if (status === 'incorrect') {
              bgColor = '#ffebe9';
              borderColor = '#ff8182';
              textColor = '#d1242f';
            }
          } else if (status === 'correct' && isCorrectAns) {
            // Highlight the correct answer if they got it right (should already be selected, but just in case)
            bgColor = '#dafbe1';
            borderColor = '#4ac26b';
            textColor = '#1a7f37';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={status === 'correct'}
              style={{
                background: bgColor,
                border: `1px solid ${borderColor}`,
                color: textColor,
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'left',
                fontSize: '1.05rem',
                cursor: status === 'correct' ? 'default' : 'pointer',
                transition: 'all 0.2s',
                fontWeight: isSelected ? 600 : 400
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {status === 'correct' && explanation && (
        <div style={{ marginTop: '20px', padding: '16px', background: '#f6f8fa', borderRadius: '8px', borderLeft: '4px solid #4ac26b' }}>
          <strong style={{ color: '#1a7f37', display: 'block', marginBottom: '8px' }}>Excellent!</strong>
          <p style={{ margin: 0, color: '#57606a', fontSize: '0.95rem' }}>{explanation}</p>
        </div>
      )}
    </div>
  );
}
