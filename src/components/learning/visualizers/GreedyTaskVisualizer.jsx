import React, { useState } from 'react';

const INITIAL_TASKS = [
  { id: 'A', duration: 4 },
  { id: 'B', duration: 2 },
  { id: 'C', duration: 7 },
  { id: 'D', duration: 1 },
  { id: 'E', duration: 3 }
];

const MAX_TIME = 6;

export default function GreedyTaskVisualizer() {
  const [selectedIds, setSelectedIds] = useState([]);

  const totalTimeUsed = selectedIds.reduce((sum, id) => {
    const task = INITIAL_TASKS.find((t) => t.id === id);
    return sum + (task ? task.duration : 0);
  }, 0);

  const isOverLimit = totalTimeUsed > MAX_TIME;

  const toggleTask = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((t) => t !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const applyGreedyChoice = () => {
    // Greedy strategy for maximizing task count: sort by duration ascending
    const sorted = [...INITIAL_TASKS].sort((a, b) => a.duration - b.duration);
    let time = 0;
    const greedySelected = [];
    for (const task of sorted) {
      if (time + task.duration <= MAX_TIME) {
        greedySelected.push(task.id);
        time += task.duration;
      }
    }
    setSelectedIds(greedySelected);
  };

  const handleReset = () => {
    setSelectedIds([]);
  };

  return (
    <div style={{ background: '#172033', color: '#F7F3EA', padding: '24px', borderRadius: '12px', margin: '24px 0', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h4 style={{ margin: 0, color: '#C79A45', fontSize: '1.2rem' }}>Greedy Task Completion Visualizer</h4>
          <span style={{ fontSize: '0.85rem', color: '#8b9bb4' }}>Goal: Maximize the number of tasks completed within {MAX_TIME} minutes</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={applyGreedyChoice} style={{ ...btnStyle, background: '#C79A45', color: '#172033', fontWeight: 'bold' }}>
            ⚡ Apply Greedy Choice (Shortest First)
          </button>
          <button onClick={handleReset} style={btnStyle}>Reset</button>
        </div>
      </div>

      {/* Task Cards Selection */}
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '0.85rem', color: '#8b9bb4', display: 'block', marginBottom: '10px' }}>TAP A TASK TO SELECT / DESELECT:</span>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {INITIAL_TASKS.map((task) => {
            const isSelected = selectedIds.includes(task.id);
            return (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                style={{
                  padding: '12px 18px',
                  borderRadius: '10px',
                  border: `2px solid ${isSelected ? '#38d9a9' : 'rgba(255,255,255,0.2)'}`,
                  background: isSelected ? 'rgba(56, 217, 169, 0.2)' : '#0d1117',
                  color: isSelected ? '#ffffff' : '#8b9bb4',
                  cursor: 'pointer',
                  textAlign: 'center',
                  minWidth: '90px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: isSelected ? '#38d9a9' : '#ffffff' }}>Task {task.id}</div>
                <div style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>⏱ {task.duration} min</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Resource Gauge */}
      <div style={{ background: '#0d1117', padding: '20px', borderRadius: '10px', border: `1px solid ${isOverLimit ? '#e63946' : 'rgba(255,255,255,0.1)'}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
          <span>Time Used: <strong style={{ color: isOverLimit ? '#ff8787' : '#a5d6ff' }}>{totalTimeUsed} / {MAX_TIME} min</strong></span>
          <span>Tasks Completed: <strong style={{ color: '#38d9a9' }}>{selectedIds.length} tasks</strong></span>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.1)', borderRadius: '7px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${Math.min(100, (totalTimeUsed / MAX_TIME) * 100)}%`,
              height: '100%',
              background: isOverLimit ? '#e63946' : '#38d9a9',
              transition: 'width 0.3s ease'
            }}
          />
        </div>

        {isOverLimit && (
          <div style={{ color: '#ff8787', fontSize: '0.85rem', marginTop: '10px', fontWeight: 'bold' }}>
            ⚠️ Time limit exceeded! Deselect longer tasks or apply the Greedy Choice strategy.
          </div>
        )}

        {!isOverLimit && selectedIds.length === 3 && (
          <div style={{ color: '#38d9a9', fontSize: '0.85rem', marginTop: '10px', fontWeight: 'bold' }}>
            🎉 Optimal Greedy Result! You completed 3 tasks (D=1m, B=2m, E=3m) using exactly {MAX_TIME} minutes!
          </div>
        )}
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
