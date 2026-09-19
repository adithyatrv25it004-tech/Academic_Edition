import React, { useState } from 'react';

export default function ReorderAlgorithmExercise({ blocks = [], correctOrder, onComplete }) {
  // Initialize with deterministic scrambled order without calling setState in effect
  const [items, setItems] = useState(() => {
    if (!blocks || blocks.length === 0) return [];
    // Deterministic swap: reverse the blocks so student has to put them in order
    return [...blocks].reverse();
  });
  const [status, setStatus] = useState(null); // 'success', 'error', null
  const [selectedId, setSelectedId] = useState(null); // for tap-based movement

  const moveItem = (index, direction) => {
    const newItems = [...items];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    
    // Swap
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setItems(newItems);
    setStatus(null);
  };

  const checkLogic = () => {
    const currentOrder = items.map(i => i.id);
    const isCorrect = currentOrder.join(',') === correctOrder.join(',');
    
    if (isCorrect) {
      setStatus('success');
      if (onComplete) onComplete(true);
    } else {
      setStatus('error');
    }
  };

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', background: '#fff', margin: '24px 0' }}>
      <h4 style={{ margin: '0 0 16px 0', fontSize: '1.1rem' }}>Reorder the Logical Steps</h4>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {items.map((item, idx) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
            style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px', background: selectedId === item.id ? '#f0f6fc' : '#f6f8fa', 
              border: `1px solid ${selectedId === item.id ? '#0969da' : '#d0d7de'}`, 
              borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '28px', height: '28px', borderRadius: '50%', background: '#fff', 
                border: '1px solid #d0d7de', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', fontSize: '0.85rem', color: 'var(--muted)',
                fontWeight: 'bold'
              }}>
                {idx + 1}
              </div>
              <span style={{ fontSize: '1rem', color: 'var(--text)' }}>{item.text}</span>
            </div>
            
            <div style={{ display: 'flex', gap: '4px' }}>
              <button 
                onClick={(e) => { e.stopPropagation(); moveItem(idx, -1); }}
                disabled={idx === 0}
                style={arrowBtnStyle}
                title="Move Up"
              >
                ↑
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); moveItem(idx, 1); }}
                disabled={idx === items.length - 1}
                style={arrowBtnStyle}
                title="Move Down"
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn-primary" onClick={checkLogic} style={{ padding: '10px 24px' }}>
          Check Logic
        </button>
        
        {status === 'success' && (
          <div style={{ color: '#1a7f37', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>✓</span> Correct Sequence!
          </div>
        )}
        {status === 'error' && (
          <div style={{ color: '#cf222e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>✗</span> Incorrect logic. Try again.
          </div>
        )}
      </div>
    </div>
  );
}

const arrowBtnStyle = {
  background: '#fff',
  border: '1px solid #d0d7de',
  borderRadius: '4px',
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: 'var(--text)'
};
