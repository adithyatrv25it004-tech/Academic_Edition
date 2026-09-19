import React from 'react';

/**
 * ATPTeacher - Reusable tuition-style guided teacher component
 * Adheres to ATP Academic Theme:
 * - Ivory: #F7F3EA
 * - Navy: #172033
 * - Academic Blue: #315C8C
 * - Muted Gold: #C79A45
 */
export default function ATPTeacher({
  title = "ATP Teacher",
  topic,
  content,
  instruction,
  quote,
  codeSnippet,
  note,
  onContinue,
  continueLabel = "Continue to Next Step →"
}) {
  const rawText = content || instruction || '';
  const paragraphs = Array.isArray(rawText)
    ? rawText
    : (typeof rawText === 'string' ? rawText.split('\n\n').filter(p => p.trim() !== '') : []);

  return (
    <div
      className="atp-teacher-card"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2DACB',
        borderLeft: '5px solid #315C8C',
        borderRadius: '12px',
        padding: '24px 28px',
        marginBottom: '28px',
        boxShadow: '0 4px 16px rgba(23, 32, 51, 0.04)',
        position: 'relative'
      }}
    >
      {/* Header with Academic Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: '#172033',
              color: '#C79A45',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              boxShadow: '0 2px 6px rgba(23, 32, 51, 0.15)'
            }}
          >
            👨‍🏫
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#172033', fontWeight: 700, letterSpacing: '-0.01em' }}>
                {title}
              </h3>
              <span
                style={{
                  background: '#F0EBE0',
                  color: '#315C8C',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: '1px solid #E2DACB'
                }}
              >
                Guided Tuition
              </span>
            </div>
            {topic && (
              <span style={{ fontSize: '0.85rem', color: '#687588', fontWeight: 500 }}>
                {topic}
              </span>
            )}
          </div>
        </div>

        <div style={{ fontSize: '0.8rem', color: '#8C96A5', fontStyle: 'italic' }}>
          APJ Abdul Kalam Technological University • UCEST105
        </div>
      </div>

      {/* Quote / Opening Observation */}
      {quote && (
        <blockquote
          style={{
            margin: '0 0 16px 0',
            padding: '12px 16px',
            background: '#F7F3EA',
            borderLeft: '3px solid #C79A45',
            borderRadius: '0 8px 8px 0',
            fontStyle: 'italic',
            color: '#172033',
            fontSize: '1.05rem',
            lineHeight: 1.6
          }}
        >
          "{quote}"
        </blockquote>
      )}

      {/* Main Guided Dialogue Body */}
      <div style={{ color: '#2B3545', fontSize: '1.05rem', lineHeight: '1.68' }}>
        {paragraphs.map((para, idx) => (
          <p key={idx} style={{ margin: idx === paragraphs.length - 1 ? 0 : '0 0 14px 0' }}>
            {para}
          </p>
        ))}
      </div>

      {/* Highlighted Code or Value Snippet */}
      {codeSnippet && (
        <div
          style={{
            marginTop: '16px',
            background: '#172033',
            color: '#F7F3EA',
            borderRadius: '8px',
            padding: '14px 18px',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '1rem',
            border: '1px solid #315C8C',
            overflowX: 'auto'
          }}
        >
          <pre style={{ margin: 0 }}>{codeSnippet}</pre>
        </div>
      )}

      {/* Note / Teacher Tip */}
      {note && (
        <div
          style={{
            marginTop: '16px',
            padding: '12px 14px',
            background: '#FBF8F2',
            border: '1px dashed #C79A45',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            fontSize: '0.92rem',
            color: '#4B5563'
          }}
        >
          <span style={{ color: '#C79A45', fontWeight: 'bold' }}>💡</span>
          <div>
            <strong style={{ color: '#172033', marginRight: '6px' }}>Tutor Note:</strong>
            {note}
          </div>
        </div>
      )}

      {/* Action Button (Optional) */}
      {onContinue && (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onContinue}
            style={{
              background: '#315C8C',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              padding: '9px 18px',
              fontSize: '0.92rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(49, 92, 140, 0.25)',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#234468')}
            onMouseOut={(e) => (e.currentTarget.style.background = '#315C8C')}
          >
            {continueLabel}
          </button>
        </div>
      )}
    </div>
  );
}
