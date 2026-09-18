import React, { useState, useEffect } from 'react';

const COUPONS = ['A', 'B', 'C', 'D'];

export default function CouponCollectorSimulation() {
  const [purchases, setPurchases] = useState([]);
  const [collected, setCollected] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);

  const isComplete = collected.size === COUPONS.length;

  useEffect(() => {
    let timer;
    if (isPlaying && !isComplete) {
      timer = setTimeout(() => {
        const randomCoupon = COUPONS[Math.floor(Math.random() * COUPONS.length)];
        setPurchases((prev) => [...prev, randomCoupon]);
        setCollected((prev) => new Set(prev).add(randomCoupon));
      }, 500);
    } else if (isComplete) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, isComplete]);

  const handleBuy = () => {
    if (isComplete) return;
    const randomCoupon = COUPONS[Math.floor(Math.random() * COUPONS.length)];
    setPurchases((prev) => [...prev, randomCoupon]);
    setCollected((prev) => new Set(prev).add(randomCoupon));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setPurchases([]);
    setCollected(new Set());
  };

  const totalPurchases = purchases.length;
  const duplicatesCount = totalPurchases - collected.size;

  return (
    <div style={{ background: '#172033', color: '#F7F3EA', padding: '24px', borderRadius: '12px', margin: '24px 0', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h4 style={{ margin: 0, color: '#C79A45', fontSize: '1.2rem' }}>Coupon Collector Problem (Randomized Simulation)</h4>
          <span style={{ fontSize: '0.85rem', color: '#8b9bb4' }}>Buy jeans to collect all N=4 unique coupons: [A, B, C, D]</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleBuy} disabled={isComplete || isPlaying} style={btnStyle}>
            👖 Buy 1 Jeans Pair
          </button>
          <button
            onClick={() => { if (isComplete) handleReset(); setIsPlaying(!isPlaying); }}
            style={{ ...btnStyle, background: isPlaying ? '#C79A45' : '#315C8C', color: isPlaying ? '#172033' : '#F7F3EA' }}
          >
            {isPlaying ? 'Pause' : 'Auto Simulate'}
          </button>
          <button onClick={handleReset} style={btnStyle}>Reset</button>
        </div>
      </div>

      {/* Target Collection Cards */}
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '0.85rem', color: '#8b9bb4', display: 'block', marginBottom: '10px' }}>COLLECTION STATUS (TARGET = 4 UNIQUE COUPONS):</span>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {COUPONS.map((c) => {
            const isOwned = collected.has(c);
            return (
              <div
                key={c}
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '10px',
                  border: `2px solid ${isOwned ? '#38d9a9' : 'rgba(255,255,255,0.1)'}`,
                  background: isOwned ? 'rgba(56, 217, 169, 0.2)' : '#0d1117',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: isOwned ? '#38d9a9' : '#4b5563' }}>{c}</span>
                <span style={{ fontSize: '0.75rem', color: isOwned ? '#38d9a9' : '#4b5563' }}>{isOwned ? '✓ Owned' : 'Missing'}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div style={{ background: '#0d1117', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: '#8b9bb4', display: 'block' }}>Total Purchases:</span>
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#a5d6ff', fontFamily: 'monospace' }}>{totalPurchases}</span>
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: '#8b9bb4', display: 'block' }}>Unique Collected:</span>
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#38d9a9', fontFamily: 'monospace' }}>{collected.size} / 4</span>
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: '#8b9bb4', display: 'block' }}>Duplicates Received:</span>
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#ff8787', fontFamily: 'monospace' }}>{duplicatesCount}</span>
        </div>
      </div>

      {isComplete && (
        <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(56,217,169,0.15)', border: '1px solid #38d9a9', borderRadius: '8px', color: '#38d9a9', fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold' }}>
          🎉 Complete! All 4 coupons collected in {totalPurchases} purchases!
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  padding: '6px 14px',
  borderRadius: '6px',
  border: '1px solid rgba(255,255,255,0.2)',
  color: '#F7F3EA',
  cursor: 'pointer',
  fontSize: '0.85rem'
};
