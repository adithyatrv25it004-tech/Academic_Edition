import React, { useState, useEffect } from 'react';

export default function BruteForceVisualizer(props) {
  const config = props.config || props;
  const target = config.target || "0427";
  const [candidate, setCandidate] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const targetNum = parseInt(target, 10) || 427;
  const isMatched = candidate === targetNum;

  useEffect(() => {
    if (isPlaying && candidate < targetNum) {
      const timer = setTimeout(() => {
        setCandidate((prev) => {
          const next = Math.min(targetNum, prev + Math.max(1, Math.floor((targetNum - prev) / 10)));
          setAttempts((a) => a + (next - prev));
          if (next >= targetNum) {
            setIsPlaying(false);
          }
          return next;
        });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, candidate, targetNum]);

  const formattedCandidate = String(candidate).padStart(4, '0');

  const handleStepNext = () => {
    if (candidate < targetNum) {
      setCandidate((prev) => prev + 1);
      setAttempts((a) => a + 1);
    }
  };

  const handleStepPrev = () => {
    if (candidate > 0) {
      setCandidate((prev) => prev - 1);
      setAttempts((a) => Math.max(0, a - 1));
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCandidate(0);
    setAttempts(0);
  };

  return (
    <div style={{ background: '#172033', color: '#F7F3EA', padding: '24px', borderRadius: '12px', margin: '24px 0', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h4 style={{ margin: 0, color: '#C79A45', fontSize: '1.2rem' }}>Brute Force Padlock Search</h4>
          <span style={{ fontSize: '0.85rem', color: '#8b9bb4' }}>Systematically testing every combination from 0000 up to target</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleStepPrev} disabled={candidate === 0 || isPlaying} style={btnStyle}>Previous</button>
          <button onClick={handleStepNext} disabled={isMatched || isPlaying} style={btnStyle}>Next (+1)</button>
          <button
            onClick={() => { if (isMatched) handleReset(); setIsPlaying(!isPlaying); }}
            style={{ ...btnStyle, background: isPlaying ? '#C79A45' : '#315C8C', color: isPlaying ? '#172033' : '#F7F3EA' }}
          >
            {isPlaying ? 'Pause' : 'Auto Search'}
          </button>
          <button onClick={handleReset} style={btnStyle}>Reset</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', alignItems: 'center' }}>
        
        {/* Lock Wheels Display */}
        <div style={{ background: '#0d1117', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <span style={{ color: '#8b9bb4', fontSize: '0.85rem', display: 'block', marginBottom: '12px' }}>🔒 CURRENT COMBINATION</span>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {formattedCandidate.split('').map((digit, idx) => (
              <div
                key={idx}
                style={{
                  width: '48px',
                  height: '60px',
                  background: isMatched ? '#238636' : '#1f293d',
                  color: isMatched ? '#ffffff' : '#C79A45',
                  border: `2px solid ${isMatched ? '#2ea043' : '#315C8C'}`,
                  borderRadius: '8px',
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  transition: 'all 0.2s ease'
                }}
              >
                {digit}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '16px', fontSize: '0.9rem', color: isMatched ? '#38d9a9' : '#ff922b', fontWeight: 'bold' }}>
            {isMatched ? '✓ UNLOCKED! Target Match Found' : '❌ Lock Closed (Searching...)'}
          </div>
        </div>

        {/* Search Statistics */}
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
            <span style={{ color: '#8b9bb4' }}>Target Code:</span>
            <span style={{ fontFamily: 'monospace', color: '#a5d6ff', fontWeight: 'bold' }}>{target}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
            <span style={{ color: '#8b9bb4' }}>Attempts Made:</span>
            <span style={{ fontFamily: 'monospace', color: '#C79A45', fontWeight: 'bold' }}>{attempts}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
            <span style={{ color: '#8b9bb4' }}>Strategy Type:</span>
            <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Exhaustive Search</span>
          </div>

          <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', color: '#e6edf3', background: '#0d1117', padding: '10px', borderRadius: '6px', lineHeight: '1.4' }}>
            💡 Brute force tries combinations sequentially without skipping. It guarantees finding the answer if a finite solution exists!
          </p>
        </div>

      </div>
    </div>
  );
}

const btnStyle = {
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.2)',
  color: '#F7F3EA',
  padding: '6px 14px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.85rem'
};
