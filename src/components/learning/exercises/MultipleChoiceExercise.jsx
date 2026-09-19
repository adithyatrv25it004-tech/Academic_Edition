import React, { useState } from 'react';
import { playUiBubbleSound } from '../../../lib/uiBubbleSound';

export default function MultipleChoiceExercise({
  question,
  options = [],
  correctAnswer,
  explanation,
  optionFeedback = [],
  wrongFeedback,
  onComplete
}) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'correct' | 'incorrect'

  // Extract option labels and targeted feedback
  const parsedOptions = options.map((opt, idx) => {
    if (typeof opt === 'object' && opt !== null) {
      return {
        text: opt.text || opt.label || '',
        feedback: opt.feedback || opt.explanation || null
      };
    }
    return {
      text: String(opt),
      feedback: optionFeedback[idx] || null
    };
  });

  const handleSelect = (idx) => {
    if (status === 'correct') return;
    setSelectedIdx(idx);

    const isCorrect = idx === correctAnswer;
    if (isCorrect) {
      setStatus('correct');
      playUiBubbleSound();
      if (onComplete) onComplete(true);
    } else {
      setStatus('incorrect');
    }
  };

  const handleRetry = () => {
    setSelectedIdx(null);
    setStatus('idle');
  };

  // Determine feedback text for current incorrect selection
  const getWrongFeedback = () => {
    if (selectedIdx === null) return null;
    const opt = parsedOptions[selectedIdx];
    if (opt?.feedback) return opt.feedback;
    if (wrongFeedback) {
      if (typeof wrongFeedback === 'string') return wrongFeedback;
      if (wrongFeedback[selectedIdx]) return wrongFeedback[selectedIdx];
    }
    // Intelligent domain-specific guidance if applicable
    const selectedText = opt?.text || '';
    if (question.includes('range(3)') && selectedText.includes('3')) {
      return "Almost. Remember that range(3) stops before 3. So Python produces: 0, 1, 2. Try once more.";
    }
    return "Not quite. Review the rule carefully and give it another try.";
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <span style={{ fontSize: '1.2rem' }}>🎯</span>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#315C8C' }}>
          Concept Checkpoint
        </span>
      </div>

      <h3 style={{ margin: '0 0 20px 0', fontSize: '1.18rem', color: '#172033', fontWeight: 700, lineHeight: 1.5 }}>
        {question}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {parsedOptions.map((opt, i) => {
          const isSelected = selectedIdx === i;
          const isCorrectAns = i === correctAnswer;

          let bgColor = '#FDFBF7';
          let borderColor = '#E2DACB';
          let textColor = '#2B3545';
          let badgeBg = '#EFEAE1';
          let badgeColor = '#687588';

          if (isSelected) {
            if (status === 'correct') {
              bgColor = '#F0FDF4';
              borderColor = '#22C55E';
              textColor = '#14532D';
              badgeBg = '#22C55E';
              badgeColor = '#FFFFFF';
            } else if (status === 'incorrect') {
              bgColor = '#FEF2F2';
              borderColor = '#EF4444';
              textColor = '#991B1B';
              badgeBg = '#EF4444';
              badgeColor = '#FFFFFF';
            }
          } else if (status === 'correct' && isCorrectAns) {
            bgColor = '#F0FDF4';
            borderColor = '#22C55E';
            textColor = '#14532D';
            badgeBg = '#22C55E';
            badgeColor = '#FFFFFF';
          }

          const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={status === 'correct'}
              style={{
                background: bgColor,
                border: `1.5px solid ${borderColor}`,
                color: textColor,
                padding: '14px 18px',
                borderRadius: '8px',
                textAlign: 'left',
                fontSize: '1rem',
                cursor: status === 'correct' ? 'default' : 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <span
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: badgeBg,
                  color: badgeColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  flexShrink: 0
                }}
              >
                {optionLetters[i] || i + 1}
              </span>
              <span style={{ fontWeight: isSelected ? 600 : 400, flex: 1 }}>
                {opt.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Targeted Feedback for Incorrect Selection */}
      {status === 'incorrect' && (
        <div
          style={{
            marginTop: '18px',
            padding: '14px 18px',
            background: '#FFF9F0',
            borderRadius: '8px',
            border: '1px solid #F3DFC1',
            borderLeft: '4px solid #C79A45'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <strong style={{ color: '#8C6718', fontSize: '0.95rem' }}>ATP Teacher Feedback</strong>
            <button
              onClick={handleRetry}
              style={{
                background: '#C79A45',
                color: '#FFFFFF',
                border: 'none',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Try Once More
            </button>
          </div>
          <p style={{ margin: 0, color: '#3A2E1C', fontSize: '0.94rem', lineHeight: 1.5 }}>
            {getWrongFeedback()}
          </p>
        </div>
      )}

      {/* Pedagogical Reinforcement for Correct Answer */}
      {status === 'correct' && (
        <div
          style={{
            marginTop: '18px',
            padding: '16px 20px',
            background: '#F4F9F4',
            borderRadius: '8px',
            border: '1px solid #CCE7CE',
            borderLeft: '4px solid #22C55E'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ color: '#15803D', fontWeight: 'bold' }}>✓</span>
            <strong style={{ color: '#15803D', fontSize: '1rem' }}>Exactly Right!</strong>
          </div>
          {explanation && (
            <p style={{ margin: 0, color: '#1E4620', fontSize: '0.95rem', lineHeight: 1.5 }}>
              {explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

