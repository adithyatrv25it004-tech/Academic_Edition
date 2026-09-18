import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ESE_EXAM_QUESTIONS } from '../data/pythonCourse/exam';

export default function Exam() {
  const [activeTab, setActiveTab] = useState('full-mock'); // 'full-mock' | 'part-a' | 'part-b'
  const [answers, setAnswers] = useState({});
  const [checkedIds, setCheckedIds] = useState(new Set());

  const handleSelfCheck = (id) => {
    const next = new Set(checkedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCheckedIds(next);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f6f8fa' }}>
      <main style={{ flex: 1, padding: '40px 20px', maxWidth: '950px', margin: '0 auto' }}>
        
        <Link to="/learn" style={{ color: 'var(--muted)', textDecoration: 'none', display: 'inline-block', marginBottom: '24px', fontWeight: 600 }}>
          ← Back to Course Map
        </Link>

        {/* ESE Exam Header */}
        <div style={{ background: '#172033', color: '#F7F3EA', padding: '32px', borderRadius: '16px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
          <span style={{ color: '#C79A45', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
            APJ Abdul Kalam Technological University — S1 UCEST105
          </span>
          <h1 style={{ margin: '8px 0 0 0', fontSize: '2rem' }}>End Semester Examination (ESE) Practice</h1>
          <p style={{ margin: '8px 0 0 0', color: '#8b9bb4', fontSize: '0.95rem' }}>
            Official Format: 60 Marks total (Part A: 24 Marks, Part B: 36 Marks) | Duration: 2 Hours 30 Minutes
          </p>

          <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
            <button
              onClick={() => setActiveTab('full-mock')}
              style={{ ...btnStyle, background: activeTab === 'full-mock' ? '#C79A45' : 'transparent', color: activeTab === 'full-mock' ? '#172033' : '#F7F3EA', fontWeight: 'bold' }}
            >
              Full ESE Mock Exam (60 Marks)
            </button>
            <button
              onClick={() => setActiveTab('part-a')}
              style={{ ...btnStyle, background: activeTab === 'part-a' ? '#315C8C' : 'transparent' }}
            >
              Part A Practice (3 Marks each)
            </button>
            <button
              onClick={() => setActiveTab('part-b')}
              style={{ ...btnStyle, background: activeTab === 'part-b' ? '#315C8C' : 'transparent' }}
            >
              Part B Practice (9 Marks each)
            </button>
          </div>
        </div>

        {/* PART A SECTION */}
        {(activeTab === 'full-mock' || activeTab === 'part-a') && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ background: '#315C8C', color: '#ffffff', padding: '16px 24px', borderRadius: '8px 8px 0 0', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
              <span>PART A (Answer ALL 8 Questions — 3 Marks Each = 24 Marks)</span>
              <span>2 Questions per Module</span>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '0 0 8px 8px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {ESE_EXAM_QUESTIONS.partA.map((q, idx) => {
                const showCheck = checkedIds.has(q.id);
                return (
                  <div key={q.id} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 'bold', color: '#172033' }}>Q{idx + 1}. [Module {q.module}]</span>
                      <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>{q.marks} Marks</span>
                    </div>

                    <p style={{ margin: '0 0 12px 0', fontSize: '1rem', color: '#334155' }}>{q.question}</p>

                    <textarea
                      placeholder="Type your written answer here..."
                      rows={3}
                      value={answers[q.id] || ''}
                      onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontFamily: 'sans-serif', fontSize: '0.9rem', marginBottom: '10px' }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button onClick={() => handleSelfCheck(q.id)} style={{ ...btnStyle, color: '#315C8C', borderColor: '#315C8C' }}>
                        {showCheck ? 'Hide Model Points' : 'Self-Check Model Answer'}
                      </button>
                    </div>

                    {showCheck && (
                      <div style={{ marginTop: '12px', background: '#f8fafc', padding: '16px', borderRadius: '6px', borderLeft: '4px solid #38d9a9' }}>
                        <h5 style={{ margin: '0 0 8px 0', color: '#172033' }}>💡 Model Answer Points:</h5>
                        <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px', fontSize: '0.9rem', color: '#334155' }}>
                          {q.modelPoints.map((pt, pIdx) => (
                            <li key={pIdx}>{pt}</li>
                          ))}
                        </ul>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                          <strong>Expected Keywords:</strong> {q.keywords.join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PART B SECTION */}
        {(activeTab === 'full-mock' || activeTab === 'part-b') && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ background: '#172033', color: '#C79A45', padding: '16px 24px', borderRadius: '8px 8px 0 0', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
              <span>PART B (Choose 1 Question from each of the 4 Modules — 9 Marks Each = 36 Marks)</span>
              <span>4 x 9 = 36 Marks</span>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '0 0 8px 8px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {ESE_EXAM_QUESTIONS.partB.map((q, idx) => {
                const showCheck = checkedIds.has(q.id);
                return (
                  <div key={q.id} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 'bold', color: '#172033' }}>Q{idx + 9}. [Module {q.module}] — {q.title}</span>
                      <span style={{ background: '#dafbe1', color: '#1a7f37', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>{q.marks} Marks</span>
                    </div>

                    <p style={{ margin: '0 0 12px 0', fontSize: '1rem', color: '#334155', fontWeight: 600 }}>{q.question}</p>

                    <textarea
                      placeholder="Type your long descriptive response, pseudocode or algorithm here..."
                      rows={5}
                      value={answers[q.id] || ''}
                      onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '0.9rem', marginBottom: '10px' }}
                    />

                    <button onClick={() => handleSelfCheck(q.id)} style={{ ...btnStyle, color: '#315C8C', borderColor: '#315C8C' }}>
                      {showCheck ? 'Hide Model Structure' : 'Self-Check Model Answer & Rubric'}
                    </button>

                    {showCheck && (
                      <div style={{ marginTop: '12px', background: '#f8fafc', padding: '16px', borderRadius: '6px', borderLeft: '4px solid #C79A45' }}>
                        <h5 style={{ margin: '0 0 8px 0', color: '#172033' }}>💡 Model Structure & Evaluation Rubric:</h5>
                        <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px', fontSize: '0.9rem', color: '#334155' }}>
                          {q.modelPoints.map((pt, pIdx) => (
                            <li key={pIdx}>{pt}</li>
                          ))}
                        </ul>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                          <strong>Expected Key Concepts:</strong> {q.keywords.join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>
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
