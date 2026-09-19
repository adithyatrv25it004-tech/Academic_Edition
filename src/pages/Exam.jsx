import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ESE_EXAM_QUESTIONS } from '../data/pythonCourse/exam';

export default function Exam() {
  const [activeTab, setActiveTab] = useState('full-mock'); // 'full-mock' | 'part-a' | 'part-b'
  const [answers, setAnswers] = useState({});
  const [checkedIds, setCheckedIds] = useState(new Set());
  const [chosenPartB, setChosenPartB] = useState({
    1: 'pb-q9',
    2: 'pb-q11',
    3: 'pb-q13',
    4: 'pb-q15'
  });
  const [selfScores, setSelfScores] = useState({});

  const handleSelfCheck = (id) => {
    const next = new Set(checkedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCheckedIds(next);
  };

  const handleScoreChange = (id, score, maxScore) => {
    const val = Math.min(Math.max(0, Number(score) || 0), maxScore);
    setSelfScores({ ...selfScores, [id]: val });
  };

  // Calculate total score
  const partAScore = ESE_EXAM_QUESTIONS.partA.reduce((acc, q) => acc + (selfScores[q.id] || 0), 0);
  const partBScore = [1, 2, 3, 4].reduce((acc, mod) => {
    const qId = chosenPartB[mod];
    return acc + (selfScores[qId] || 0);
  }, 0);
  const totalScore = partAScore + partBScore;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f6f8fa' }}>
      <main style={{ flex: 1, padding: '40px 20px', maxWidth: '950px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Link to="/learn" style={{ color: '#315C8C', textDecoration: 'none', fontWeight: 600 }}>
            ← Back to Course Map
          </Link>
          <div style={{ background: '#172033', color: '#C79A45', padding: '6px 14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.85rem' }}>
            Current Self-Score: {totalScore} / 60 Marks
          </div>
        </div>

        {/* ESE Exam Header */}
        <div style={{ background: '#172033', color: '#F7F3EA', padding: '32px', borderRadius: '16px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ color: '#C79A45', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                APJ Abdul Kalam Technological University — B.Tech 2024 Scheme
              </span>
              <h1 style={{ margin: '8px 0 4px 0', fontSize: '2rem' }}>End Semester Examination (ESE) Practice</h1>
              <p style={{ margin: 0, color: '#8b9bb4', fontSize: '0.95rem' }}>
                Course: <strong>S1 UCEST105 — Algorithmic Thinking with Python</strong>
              </p>
            </div>
            <div style={{ textAlign: 'right', background: '#233044', padding: '12px 18px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.85rem', color: '#C79A45', fontWeight: 600 }}>EXAM DURATION</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>2 Hrs 30 Min</div>
              <div style={{ fontSize: '0.8rem', color: '#8b9bb4' }}>Max Marks: 60</div>
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '12px 16px', background: '#233044', borderRadius: '8px', fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
            <strong>Pattern Instructions:</strong> PART A is compulsory (8 questions × 3 marks = 24 marks; 2 questions from each of the 4 modules). PART B contains 2 full questions from each module of 9 marks each (student answers 1 full question from each module = 4 × 9 = 36 marks; max 3 subdivisions per question).
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>
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
              Part A Only (24 Marks)
            </button>
            <button
              onClick={() => setActiveTab('part-b')}
              style={{ ...btnStyle, background: activeTab === 'part-b' ? '#315C8C' : 'transparent' }}
            >
              Part B with Internal Choice (36 Marks)
            </button>
          </div>
        </div>

        {/* PART A SECTION */}
        {(activeTab === 'full-mock' || activeTab === 'part-a') && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ background: '#315C8C', color: '#ffffff', padding: '16px 24px', borderRadius: '8px 8px 0 0', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>PART A (Compulsory — Answer ALL 8 Questions; 3 Marks Each = 24 Marks)</span>
              <span style={{ fontSize: '0.9rem' }}>Score: {partAScore} / 24</span>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '0 0 8px 8px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {ESE_EXAM_QUESTIONS.partA.map((q, idx) => {
                const showCheck = checkedIds.has(q.id);
                return (
                  <div key={q.id} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontWeight: 'bold', color: '#172033', fontSize: '1.05rem' }}>
                        Q{idx + 1}. [Module {q.module}]
                      </span>
                      <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '3px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        {q.marks} Marks
                      </span>
                    </div>

                    <p style={{ margin: '0 0 14px 0', fontSize: '1rem', color: '#334155', lineHeight: 1.5, fontWeight: 500 }}>
                      {q.question}
                    </p>

                    <textarea
                      placeholder="Type your exam answer here..."
                      rows={3}
                      value={answers[q.id] || ''}
                      onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                      style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontFamily: 'sans-serif', fontSize: '0.92rem', marginBottom: '12px', boxSizing: 'border-box' }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                      <button
                        onClick={() => handleSelfCheck(q.id)}
                        style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #315C8C', background: 'transparent', color: '#315C8C', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}
                      >
                        {showCheck ? 'Hide Model Answer' : 'Reveal Model Answer & Rubric'}
                      </button>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#64748b' }}>
                        <span>Self-Award Marks:</span>
                        <input
                          type="number"
                          min="0"
                          max={q.marks}
                          value={selfScores[q.id] !== undefined ? selfScores[q.id] : ''}
                          onChange={(e) => handleScoreChange(q.id, e.target.value, q.marks)}
                          placeholder="0"
                          style={{ width: '50px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 'bold' }}
                        />
                        <span>/ {q.marks}</span>
                      </div>
                    </div>

                    {showCheck && (
                      <div style={{ marginTop: '14px', background: '#f8fafc', padding: '16px 20px', borderRadius: '8px', borderLeft: '4px solid #38d9a9', border: '1px solid #e2e8f0', borderLeftWidth: '4px' }}>
                        <h5 style={{ margin: '0 0 8px 0', color: '#172033', fontSize: '0.95rem' }}>💡 Model Answer Points:</h5>
                        <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px', fontSize: '0.92rem', color: '#334155', lineHeight: 1.5 }}>
                          {q.modelPoints.map((pt, pIdx) => (
                            <li key={pIdx} style={{ marginBottom: '4px' }}>{pt}</li>
                          ))}
                        </ul>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', background: '#ffffff', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                          <strong style={{ color: '#172033' }}>Keywords KTU Examiners Look For: </strong>{q.keywords.join(', ')}
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
            <div style={{ background: '#172033', color: '#C79A45', padding: '16px 24px', borderRadius: '8px 8px 0 0', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>PART B (Internal Choice — Answer 1 Full Question from EACH of the 4 Modules; 4 × 9 = 36 Marks)</span>
              <span style={{ color: '#38d9a9', fontSize: '0.9rem' }}>Score: {partBScore} / 36</span>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '0 0 8px 8px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '36px' }}>
              {ESE_EXAM_QUESTIONS.partB.map((modGroup) => {
                const currentChosenId = chosenPartB[modGroup.module];
                const chosenQuestion = modGroup.options.find(o => o.id === currentChosenId) || modGroup.options[0];
                const showCheck = checkedIds.has(chosenQuestion.id);

                return (
                  <div key={modGroup.module} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', background: '#fafbfc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ fontWeight: 'bold', color: '#172033', fontSize: '1.1rem' }}>
                        MODULE {modGroup.module} — (Select Question to Answer)
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {modGroup.options.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setChosenPartB({ ...chosenPartB, [modGroup.module]: opt.id })}
                            style={{
                              padding: '6px 14px',
                              borderRadius: '6px',
                              border: `1px solid ${currentChosenId === opt.id ? '#315C8C' : '#cbd5e1'}`,
                              background: currentChosenId === opt.id ? '#315C8C' : '#ffffff',
                              color: currentChosenId === opt.id ? '#ffffff' : '#334155',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '0.88rem'
                            }}
                          >
                            {opt.questionNumber}: {opt.title}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontWeight: 'bold', color: '#172033', fontSize: '1.05rem' }}>
                          {chosenQuestion.questionNumber}: {chosenQuestion.title}
                        </span>
                        <span style={{ background: '#dafbe1', color: '#1a7f37', padding: '3px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                          {chosenQuestion.marks} Marks
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                        {chosenQuestion.subdivisions.map((sub, sIdx) => (
                          <span key={sIdx} style={{ background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                            Subdivision {sub.sub}: {sub.marks}M ({sub.topic})
                          </span>
                        ))}
                      </div>

                      <pre style={{ margin: '0 0 14px 0', fontSize: '0.95rem', color: '#1e293b', whiteSpace: 'pre-wrap', fontFamily: 'sans-serif', lineHeight: 1.5, fontWeight: 500 }}>
                        {chosenQuestion.question}
                      </pre>

                      <textarea
                        placeholder="Type your structured answer, algorithm, diagram description or Python program here..."
                        rows={6}
                        value={answers[chosenQuestion.id] || ''}
                        onChange={(e) => setAnswers({ ...answers, [chosenQuestion.id]: e.target.value })}
                        style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '0.92rem', marginBottom: '12px', boxSizing: 'border-box' }}
                      />

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <button
                          onClick={() => handleSelfCheck(chosenQuestion.id)}
                          style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #315C8C', background: 'transparent', color: '#315C8C', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}
                        >
                          {showCheck ? 'Hide Model Structure' : 'Reveal Model Answer & Rubric'}
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#64748b' }}>
                          <span>Self-Award Marks:</span>
                          <input
                            type="number"
                            min="0"
                            max={chosenQuestion.marks}
                            value={selfScores[chosenQuestion.id] !== undefined ? selfScores[chosenQuestion.id] : ''}
                            onChange={(e) => handleScoreChange(chosenQuestion.id, e.target.value, chosenQuestion.marks)}
                            placeholder="0"
                            style={{ width: '50px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 'bold' }}
                          />
                          <span>/ {chosenQuestion.marks}</span>
                        </div>
                      </div>

                      {showCheck && (
                        <div style={{ marginTop: '16px', background: '#f8fafc', padding: '16px 20px', borderRadius: '8px', borderLeft: '4px solid #C79A45', border: '1px solid #e2e8f0', borderLeftWidth: '4px' }}>
                          <h5 style={{ margin: '0 0 8px 0', color: '#172033', fontSize: '0.95rem' }}>💡 Model Structure & Evaluation Rubric:</h5>
                          <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px', fontSize: '0.92rem', color: '#334155', lineHeight: 1.5 }}>
                            {chosenQuestion.modelPoints.map((pt, pIdx) => (
                              <li key={pIdx} style={{ marginBottom: '6px' }}>{pt}</li>
                            ))}
                          </ul>
                          <div style={{ fontSize: '0.85rem', color: '#64748b', background: '#ffffff', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                            <strong style={{ color: '#172033' }}>Expected Core Concepts & Keywords: </strong>{chosenQuestion.keywords.join(', ')}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Total Score Summary Card */}
        <div style={{ background: '#172033', color: '#F7F3EA', padding: '28px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <span style={{ color: '#C79A45', fontWeight: 'bold', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Official KTU End Semester Examination Self-Evaluation
          </span>
          <h2 style={{ margin: '10px 0', fontSize: '2.2rem' }}>
            Total ESE Score: <span style={{ color: '#38d9a9' }}>{totalScore} / 60</span>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px', fontSize: '0.95rem', color: '#cbd5e1' }}>
            <div>Part A: <strong style={{ color: '#F7F3EA' }}>{partAScore} / 24</strong></div>
            <div>•</div>
            <div>Part B: <strong style={{ color: '#F7F3EA' }}>{partBScore} / 36</strong></div>
            <div>•</div>
            <div>KTU Pass Threshold (40%): <strong style={{ color: totalScore >= 24 ? '#38d9a9' : '#f87171' }}>{totalScore >= 24 ? 'Passed (≥24/60)' : 'Below Cutoff (<24/60)'}</strong></div>
          </div>
        </div>

      </main>
    </div>
  );
}

const btnStyle = {
  padding: '8px 16px',
  borderRadius: '6px',
  border: '1px solid rgba(255,255,255,0.2)',
  color: '#F7F3EA',
  cursor: 'pointer',
  fontSize: '0.9rem'
};
