import React from 'react';

export default function ConceptCard({ title, content, icon = "💡" }) {
  const contentBlocks = Array.isArray(content) ? content : (content || '').split('\n').filter(l => l.trim() !== '');

  return (
    <div style={{ background: '#fff', border: '1px solid #d0d7de', borderRadius: '12px', padding: '24px', marginBottom: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', borderBottom: '1px solid #e1e4e8', paddingBottom: '12px' }}>
        <span style={{ fontSize: '1.8rem' }}>{icon}</span>
        <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#24292f' }}>{title}</h3>
      </div>
      <div style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#57606a' }}>
        {contentBlocks.map((block, i) => (
          <p key={i} style={{ marginBottom: i < contentBlocks.length - 1 ? '12px' : '0' }}>{block}</p>
        ))}
      </div>
    </div>
  );
}
