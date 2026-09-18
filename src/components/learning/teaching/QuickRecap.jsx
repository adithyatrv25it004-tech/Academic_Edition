import React from 'react';

export default function QuickRecap({ title = "Quick Recap", items = [], points = [], content }) {
  let list = [];
  if (Array.isArray(items) && items.length > 0) list = items;
  else if (Array.isArray(points) && points.length > 0) list = points;
  else if (Array.isArray(content)) list = content;
  else if (typeof content === 'string') list = content.split('\n').filter(l => l.trim() !== '');

  return (
    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '1.3rem', color: '#166534', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>📌</span> {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {list.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
            <span style={{ fontSize: '1.05rem', color: '#14532d', lineHeight: '1.5' }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
