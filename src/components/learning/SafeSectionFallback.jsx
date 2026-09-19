import React from 'react';

/**
 * Production Safe Fallback Component when an unknown section is encountered
 */
export default function SafeSectionFallback({ type, onRetry }) {
  if (typeof window !== 'undefined' && (import.meta.env?.DEV || window.location.hostname === 'localhost')) {
    console.warn(`[Lesson Renderer] Unsupported section type: "${type}"`);
  }

  return (
    <div style={{
      padding: '20px',
      background: '#fcf8e3',
      border: '1px solid #faebcc',
      borderRadius: '8px',
      color: '#8a6d3b',
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <strong>This activity couldn't be loaded.</strong> Please refresh the lesson.
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: '#8a6d3b',
            color: '#fff',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}
