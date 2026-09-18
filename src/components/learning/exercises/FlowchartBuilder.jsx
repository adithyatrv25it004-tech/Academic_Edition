import React, { useState } from 'react';

const SHAPES = {
  START_END: { borderRadios: '50px', bg: '#fef3c7', border: '#f59e0b' },
  PROCESS: { borderRadios: '4px', bg: '#e0e7ff', border: '#6366f1' },
  INPUT_OUTPUT: { borderRadios: '4px', bg: '#dcfce7', border: '#22c55e', transform: 'skew(-10deg)' },
  DECISION: { borderRadios: '4px', bg: '#fee2e2', border: '#ef4444', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
};

export default function FlowchartBuilder({ availableBlocks, correctOrder, onComplete }) {
  const [builtSequence, setBuiltSequence] = useState([]);
  const [status, setStatus] = useState(null);

  const addBlock = (block) => {
    setBuiltSequence([...builtSequence, { ...block, instanceId: Date.now() + Math.random() }]);
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

  const checkLogic = () => {
    const currentIds = builtSequence.map(b => b.id);
    const isCorrect = currentIds.join(',') === correctOrder.join(',');
    
    if (isCorrect) {
      setStatus('success');
      if (onComplete) onComplete(true);
    } else {
      setStatus('error');
    }
  };

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '12px', background: '#fff', margin: '24px 0', overflow: 'hidden' }}>
      <div style={{ background: '#f6f8fa', padding: '16px', borderBottom: '1px solid var(--border)' }}>
        <h4 style={{ margin: '0 0 12px 0' }}>Flowchart Toolbox</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {availableBlocks.map(block => (
            <button 
              key={block.id} 
              onClick={() => addBlock(block)}
              style={{ padding: '8px 12px', background: '#fff', border: '1px solid #d0d7de', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              + {block.text}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ padding: '24px' }}>
        <h4 style={{ margin: '0 0 16px 0', textAlign: 'center' }}>Your Flowchart</h4>
        
        <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {builtSequence.length === 0 && (
            <div style={{ color: 'var(--muted)', textAlign: 'center', marginTop: '40px' }}>Tap toolbox items to build your flowchart here.</div>
          )}
          
          {builtSequence.map((block, idx) => {
            const shapeStyle = SHAPES[block.shape] || SHAPES.PROCESS;
            const isSkewed = block.shape === 'INPUT_OUTPUT';
            const isDiamond = block.shape === 'DECISION';
            
            return (
              <React.Fragment key={block.instanceId}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', maxWidth: '400px', position: 'relative' }}>
                  
                  {/* The Flowchart Node */}
                  <div style={{ 
                    flex: 1, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    padding: isDiamond ? '32px 16px' : '16px', 
                    background: shapeStyle.bg, 
                    border: isDiamond ? 'none' : `2px solid ${shapeStyle.border}`, 
                    borderRadius: shapeStyle.borderRadios,
                    transform: isSkewed ? shapeStyle.transform : 'none',
                    clipPath: shapeStyle.clipPath,
                    textAlign: 'center',
                    fontWeight: 600,
                    color: '#1f2937',
                    position: 'relative'
                  }}>
                    {isDiamond && (
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: shapeStyle.bg, border: `2px solid ${shapeStyle.border}`, clipPath: shapeStyle.clipPath, zIndex: -1 }} />
                    )}
                    <span style={{ transform: isSkewed ? 'skew(10deg)' : 'none' }}>{block.text}</span>
                  </div>

                  {/* Controls on the side */}
                  <div style={{ display: 'flex', gap: '4px', position: 'absolute', right: '-80px' }}>
                    <button onClick={() => moveBlock(idx, -1)} disabled={idx === 0} style={iconBtnStyle}>↑</button>
                    <button onClick={() => moveBlock(idx, 1)} disabled={idx === builtSequence.length - 1} style={iconBtnStyle}>↓</button>
                    <button onClick={() => removeBlock(idx)} style={{ ...iconBtnStyle, color: '#cf222e' }}>✕</button>
                  </div>
                </div>
                
                {/* Arrow to next block */}
                {idx < builtSequence.length - 1 && (
                  <div style={{ width: '2px', height: '24px', background: '#94a3b8', position: 'relative', margin: '4px 0' }}>
                    <div style={{ position: 'absolute', bottom: '-4px', left: '-4px', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '8px solid #94a3b8' }} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px', gap: '24px', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-primary" onClick={checkLogic} style={{ padding: '10px 32px' }}>Verify Flowchart</button>
            <button onClick={() => { setBuiltSequence([]); setStatus(null); }} style={{ padding: '10px 16px', background: '#f6f8fa', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>Reset</button>
          </div>
          
          {status === 'success' && <div style={{ color: '#1a7f37', fontWeight: 600, fontSize: '1.1rem' }}>✓ Flowchart logically sound!</div>}
          {status === 'error' && <div style={{ color: '#cf222e', fontWeight: 600, fontSize: '1.1rem' }}>✗ There is a logical error in your flowchart.</div>}
        </div>
      </div>
    </div>
  );
}

const iconBtnStyle = {
  background: '#fff',
  border: '1px solid #d0d7de',
  borderRadius: '4px',
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '0.9rem'
};
