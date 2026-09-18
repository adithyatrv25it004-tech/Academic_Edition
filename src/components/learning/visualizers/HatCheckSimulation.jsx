import React, { useState } from 'react';

const PEOPLE = [
  { name: 'Alice', expectedHat: 'Hat A' },
  { name: 'Bob', expectedHat: 'Hat B' },
  { name: 'Charlie', expectedHat: 'Hat C' },
  { name: 'David', expectedHat: 'Hat D' }
];

export default function HatCheckSimulation() {
  const [assignments, setAssignments] = useState(PEOPLE.map((p) => ({ ...p, assignedHat: p.expectedHat })));

  const handleShuffleHats = () => {
    const hats = ['Hat A', 'Hat B', 'Hat C', 'Hat D'];
    // Random shuffle (Fisher-Yates)
    for (let i = hats.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [hats[i], hats[j]] = [hats[j], hats[i]];
    }
    const nextAssignments = PEOPLE.map((p, idx) => ({
      ...p,
      assignedHat: hats[idx]
    }));
    setAssignments(nextAssignments);
  };

  const matchesCount = assignments.filter((a) => a.assignedHat === a.expectedHat).length;

  return (
    <div style={{ background: '#172033', color: '#F7F3EA', padding: '24px', borderRadius: '12px', margin: '24px 0', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h4 style={{ margin: 0, color: '#C79A45', fontSize: '1.2rem' }}>Hat-Check Problem (Random Assignment Simulation)</h4>
          <span style={{ fontSize: '0.85rem', color: '#8b9bb4' }}>N=4 people receive hats randomly returned from cloakroom</span>
        </div>

        <button onClick={handleShuffleHats} style={{ ...btnStyle, background: '#315C8C', color: '#F7F3EA', fontWeight: 'bold' }}>
          🎲 Randomly Return Hats
        </button>
      </div>

      {/* People and Assigned Hats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        {assignments.map((person) => {
          const isMatch = person.assignedHat === person.expectedHat;
          return (
            <div
              key={person.name}
              style={{
                background: isMatch ? 'rgba(56, 217, 169, 0.15)' : '#0d1117',
                border: `2px solid ${isMatch ? '#38d9a9' : 'rgba(255,255,255,0.1)'}`,
                padding: '16px',
                borderRadius: '10px',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>👤</div>
              <div style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '0.95rem' }}>{person.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#8b9bb4', margin: '4px 0' }}>Received: <strong style={{ color: isMatch ? '#38d9a9' : '#a5d6ff' }}>{person.assignedHat}</strong></div>
              <div style={{ fontSize: '0.75rem', color: isMatch ? '#38d9a9' : '#ff8787', fontWeight: 'bold' }}>
                {isMatch ? '✓ Correct Hat!' : '❌ Wrong Hat'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Outcome statistics */}
      <div style={{ background: '#0d1117', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: '#8b9bb4' }}>Correct Matches This Trial: </span>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#38d9a9', fontFamily: 'monospace' }}>{matchesCount} / 4</span>
        </div>

        <div style={{ fontSize: '0.85rem', color: '#e6edf3' }}>
          💡 <strong>Expected Match Result:</strong> On average, exactly <strong>1 person</strong> gets their own hat regardless of N!
        </div>
      </div>
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
