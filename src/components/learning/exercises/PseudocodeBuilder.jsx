import React, { useState } from 'react';
import { playUiBubbleSound } from '../../../lib/uiBubbleSound';

export default function PseudocodeBuilder({ availableBlocks, correctOrder, onComplete }) {
  const [builtSequence, setBuiltSequence] = useState([]);
  const [status, setStatus] = useState(null);

  const addBlock = (block) => {
    setBuiltSequence([...builtSequence, { ...block, instanceId: Date.now() + Math.random(), indent: 0 }]);
    setStatus(null);
  };

  const removeBlock = (index) => {
    const newSeq = [...builtSequence];
    newSeq.splice(index, 1);
    setBuiltSequence(newSeq);
    setStatus(null);
  };

  const moveBlock = (index, direction) => {
    const newSeq = [...builtSequence];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= newSeq.length) return;
    [newSeq[index], newSeq[newIndex]] = [newSeq[newIndex], newSeq[index]];
    setBuiltSequence(newSeq);
    setStatus(null);
  };

  const changeIndent = (index, delta) => {
    const newSeq = [...builtSequence];
    const newIndent = Math.max(0, Math.min(3, newSeq[index].indent + delta));
    newSeq[index].indent = newIndent;
    setBuiltSequence(newSeq);
    setStatus(null);
  };

  const checkLogic = () => {
    // Check against correctOrder which should be an array of objects: { id: 'b1', indent: 0 }
    if (builtSequence.length !== correctOrder.length) {
      setStatus('error');
      return;
    }

    let isCorrect = true;
    for (let i = 0; i < builtSequence.length; i++) {
      if (builtSequence[i].id !== correctOrder[i].id || builtSequence[i].indent !== (correctOrder[i].indent || 0)) {
        isCorrect = false;
        break;
      }
    }
    
    if (isCorrect) {
      setStatus('success');
      playUiBubbleSound();
      if (onComplete) onComplete(true);
    } else {
      setStatus('error');
    }
  };

  const reset = () => {
    setBuiltSequence([]);
    setStatus(null);
  };

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '12px', background: '#fff', margin: '24px 0', overflow: 'hidden' }}>
      <div style={{ background: '#f6f8fa', padding: '16px', borderBottom: '1px solid var(--border)' }}>
        <h4 style={{ margin: '0 0 12px 0' }}>Available Blocks</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {availableBlocks.map(block => (
            <button 
              key={block.id} 
              onClick={() => addBlock(block)}
              style={{ padding: '8px 12px', background: '#fff', border: '1px solid #d0d7de', borderRadius: '6px', cursor: 'pointer', fontFamily: 'monospace' }}
            >
              + {block.text}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ padding: '24px' }}>
        <h4 style={{ margin: '0 0 16px 0' }}>Your Pseudocode</h4>
        
        <div style={{ minHeight: '150px', background: '#f6f8fa', borderRadius: '8px', padding: '16px', border: '1px dashed #d0d7de', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {builtSequence.length === 0 && (
            <div style={{ color: 'var(--muted)', textAlign: 'center', marginTop: '40px' }}>Tap available blocks to add them here.</div>
          )}
          {builtSequence.map((block, idx) => (
            <div key={block.instanceId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1px solid #d0d7de', borderRadius: '6px', padding: '12px', marginLeft: `${block.indent * 24}px` }}>
              <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{block.text}</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button onClick={() => changeIndent(idx, -1)} disabled={block.indent === 0} style={iconBtnStyle}>←</button>
                <button onClick={() => changeIndent(idx, 1)} disabled={block.indent === 3} style={iconBtnStyle}>→</button>
                <button onClick={() => moveBlock(idx, -1)} disabled={idx === 0} style={iconBtnStyle}>↑</button>
                <button onClick={() => moveBlock(idx, 1)} disabled={idx === builtSequence.length - 1} style={iconBtnStyle}>↓</button>
                <button onClick={() => removeBlock(idx)} style={{ ...iconBtnStyle, color: '#cf222e' }}>✕</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-primary" onClick={checkLogic} style={{ padding: '10px 24px' }}>Check Logic</button>
            <button onClick={reset} style={{ padding: '10px 16px', background: '#f6f8fa', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>Reset</button>
          </div>
          
          {status === 'success' && <div style={{ color: '#1a7f37', fontWeight: 600 }}>✓ Correct Logic & Structure!</div>}
          {status === 'error' && <div style={{ color: '#cf222e', fontWeight: 600 }}>✗ Logic incorrect. Review order and indentation.</div>}
        </div>
      </div>
    </div>
  );
}

const iconBtnStyle = {
  background: '#f6f8fa',
  border: '1px solid #d0d7de',
  borderRadius: '4px',
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
};
