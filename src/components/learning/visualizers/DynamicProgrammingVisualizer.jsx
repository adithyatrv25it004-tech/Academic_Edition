import React, { useState } from 'react';

export default function DynamicProgrammingVisualizer() {
  const [activeTab, setActiveTab] = useState('dp'); // 'recursive' | 'dp'

  const recursiveTrace = [
    { call: 'fib(5)', action: 'calls fib(4) and fib(3)', isRedundant: false },
    { call: 'fib(4)', action: 'calls fib(3) and fib(2)', isRedundant: false },
    { call: 'fib(3)', action: 'calls fib(2) and fib(1)', isRedundant: false },
    { call: 'fib(2)', action: 'calls fib(1) and fib(0)', isRedundant: false },
    { call: 'fib(1)', action: 'base case -> 1', isRedundant: false },
    { call: 'fib(0)', action: 'base case -> 0', isRedundant: false },
    { call: 'fib(3)', action: 'RECOMPUTING fib(3) again from scratch!', isRedundant: true },
    { call: 'fib(2)', action: 'RECOMPUTING fib(2) again from scratch!', isRedundant: true }
  ];

  const dpTrace = [
    { n: 0, val: 0, status: 'base', desc: 'fib(0) = 0 (Base case stored)' },
    { n: 1, val: 1, status: 'base', desc: 'fib(1) = 1 (Base case stored)' },
    { n: 2, val: 1, status: 'computed', desc: 'fib(2) = fib(1) + fib(0) = 1 + 0 = 1 (Stored in memo table)' },
    { n: 3, val: 2, status: 'computed', desc: 'fib(3) = fib(2) + fib(1) = 1 + 1 = 2 (Reuses stored fib(2)!)' },
    { n: 4, val: 3, status: 'computed', desc: 'fib(4) = fib(3) + fib(2) = 2 + 1 = 3 (Reuses stored fib(3) & fib(2)!)' },
    { n: 5, val: 5, status: 'computed', desc: 'fib(5) = fib(4) + fib(3) = 3 + 2 = 5 (Final result achieved in O(N))' }
  ];

  return (
    <div style={{ background: '#172033', color: '#F7F3EA', padding: '24px', borderRadius: '12px', margin: '24px 0', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h4 style={{ margin: 0, color: '#C79A45', fontSize: '1.2rem' }}>Dynamic Programming Visualizer: fib(5)</h4>
          <span style={{ fontSize: '0.85rem', color: '#8b9bb4' }}>Comparing Plain Naive Recursion vs DP Memoization</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('recursive')}
            style={{ ...btnStyle, background: activeTab === 'recursive' ? '#e63946' : 'transparent', borderColor: '#e63946' }}
          >
            Naive Recursion (Repeats Work)
          </button>
          <button
            onClick={() => setActiveTab('dp')}
            style={{ ...btnStyle, background: activeTab === 'dp' ? '#38d9a9' : 'transparent', color: activeTab === 'dp' ? '#172033' : '#F7F3EA', borderColor: '#38d9a9' }}
          >
            Dynamic Programming (Reuses Results)
          </button>
        </div>
      </div>

      {activeTab === 'recursive' ? (
        <div style={{ background: '#0d1117', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #e63946' }}>
          <h5 style={{ margin: '0 0 12px 0', color: '#ff8787' }}>⚠️ Naive Recursion Call Tree (Notice Redundant Calculations!)</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recursiveTrace.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: item.isRedundant ? 'rgba(230, 57, 70, 0.2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${item.isRedundant ? '#e63946' : 'rgba(255,255,255,0.1)'}`,
                  fontSize: '0.9rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'monospace'
                }}
              >
                <span style={{ color: item.isRedundant ? '#ff8787' : '#a5d6ff', fontWeight: 'bold' }}>{item.call}</span>
                <span style={{ color: item.isRedundant ? '#ff8787' : '#8b9bb4' }}>{item.action}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '16px', fontSize: '0.85rem', color: '#ff8787', margin: '16px 0 0 0' }}>
            🔴 Problem: fib(3) and fib(2) are computed multiple times from scratch, causing exponential O(2^N) wasted work!
          </p>
        </div>
      ) : (
        <div style={{ background: '#0d1117', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #38d9a9' }}>
          <h5 style={{ margin: '0 0 12px 0', color: '#38d9a9' }}>✅ DP Memoization Table (Stores Results Once)</h5>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {dpTrace.map((item) => (
              <div
                key={item.n}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(56, 217, 169, 0.15)',
                  border: '1px solid #38d9a9',
                  textAlign: 'center',
                  minWidth: '80px'
                }}
              >
                <span style={{ fontSize: '0.75rem', color: '#8b9bb4', display: 'block' }}>fib({item.n})</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#38d9a9', fontFamily: 'monospace' }}>{item.val}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {dpTrace.map((item) => (
              <div key={item.n} style={{ fontSize: '0.88rem', color: '#e6edf3', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '6px' }}>
                💡 <strong>n={item.n}:</strong> {item.desc}
              </div>
            ))}
          </div>

          <p style={{ marginTop: '16px', fontSize: '0.85rem', color: '#38d9a9', margin: '16px 0 0 0' }}>
            🟢 Solution: Each subproblem is solved ONCE. Results are stored in memory and looked up in O(1) time!
          </p>
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
