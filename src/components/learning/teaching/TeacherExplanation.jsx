import React from 'react';

export default function TeacherExplanation({ content, title, avatar = "👩‍🏫" }) {
  const contentBlocks = Array.isArray(content) ? content : (content || '').split('\n').filter(l => l.trim() !== '');

  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
      <div style={{ fontSize: '2.5rem', flexShrink: 0, alignSelf: 'flex-start', marginTop: '-8px' }}>
        {avatar}
      </div>
      <div style={{ background: '#f6f8fa', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #0969da', flex: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        {title && <h3 style={{ color: '#0969da', margin: '0 0 12px 0', fontSize: '1.2rem' }}>{title}</h3>}
        <div style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#24292f' }}>
          {contentBlocks.map((block, i) => (
            <p key={i} style={{ marginBottom: i < contentBlocks.length - 1 ? '16px' : '0' }}>{block}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
