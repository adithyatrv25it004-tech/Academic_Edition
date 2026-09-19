import React, { useState } from 'react';

export default function QuickRecap({
  title = "Quick Recap",
  keyIdea,
  example,
  watchOut,
  recall,
  recallQuestion,
  recallAnswer,
  items = [],
  points = [],
  content
}) {
  const [showRecallAnswer, setShowRecallAnswer] = useState(false);

  // Normalize fallback list if structured fields are not passed
  let list = [];
  if (Array.isArray(items) && items.length > 0) list = items;
  else if (Array.isArray(points) && points.length > 0) list = points;
  else if (Array.isArray(content)) list = content;
  else if (typeof content === 'string') list = content.split('\n').filter(l => l.trim() !== '');

  const hasStructured = Boolean(keyIdea || example || watchOut || recall || recallQuestion);
  const recallText = recall || recallQuestion;

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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #EFEAE1', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.3rem' }}>📌</span>
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#172033', fontWeight: 700 }}>
            {title}
          </h3>
        </div>
        <span style={{ fontSize: '0.78rem', color: '#315C8C', background: '#F0EBE0', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Summary Note
        </span>
      </div>

      {hasStructured ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Key Idea */}
          {keyIdea && (
            <div style={{ background: '#F7F3EA', padding: '14px 18px', borderRadius: '8px', borderLeft: '4px solid #315C8C' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#315C8C', marginBottom: '4px' }}>
                Key Idea
              </div>
              <div style={{ color: '#172033', fontSize: '1rem', lineHeight: 1.5, fontWeight: 500 }}>
                {keyIdea}
              </div>
            </div>
          )}

          {/* Example */}
          {example && (
            <div style={{ background: '#FDFBF7', padding: '14px 18px', borderRadius: '8px', border: '1px solid #EFEAE1' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#C79A45', marginBottom: '4px' }}>
                Example
              </div>
              <div style={{ color: '#2B3545', fontSize: '0.98rem', fontFamily: 'Consolas, Monaco, monospace', lineHeight: 1.5 }}>
                {example}
              </div>
            </div>
          )}

          {/* Watch Out */}
          {watchOut && (
            <div style={{ background: '#FFF9F0', padding: '14px 18px', borderRadius: '8px', borderLeft: '4px solid #C79A45' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8C6718', marginBottom: '4px' }}>
                Watch Out
              </div>
              <div style={{ color: '#4B3819', fontSize: '0.98rem', lineHeight: 1.5 }}>
                {watchOut}
              </div>
            </div>
          )}

          {/* Recall Question */}
          {recallText && (
            <div style={{ background: '#F4F7FB', padding: '14px 18px', borderRadius: '8px', border: '1px solid #DCE5F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#315C8C' }}>
                  Recall Question
                </div>
                {recallAnswer && (
                  <button
                    onClick={() => setShowRecallAnswer(!showRecallAnswer)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#315C8C',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    {showRecallAnswer ? 'Hide Answer' : 'Check Recall'}
                  </button>
                )}
              </div>
              <div style={{ color: '#172033', fontSize: '0.98rem', fontWeight: 500, lineHeight: 1.5 }}>
                {recallText}
              </div>
              {showRecallAnswer && recallAnswer && (
                <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #DCE5F0', color: '#14532D', fontSize: '0.92rem', fontWeight: 600 }}>
                  Answer: {recallAnswer}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {list.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: '#315C8C', fontWeight: 'bold' }}>✓</span>
              <span style={{ fontSize: '1rem', color: '#2B3545', lineHeight: '1.5' }}>{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

