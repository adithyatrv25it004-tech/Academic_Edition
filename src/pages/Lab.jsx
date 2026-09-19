import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLab, PRACTICAL_LABS } from '../data/pythonCourse/labs';
import { supabase } from '../lib/supabase';
import CodePractice from '../components/learning/exercises/CodePractice';

export default function Lab() {
  const { labId } = useParams();
  const lab = getLab(labId);

  const [vivaAnswers, setVivaAnswers] = useState({});
  const [vivaScore, setVivaScore] = useState(null);
  const [codeScore, setCodeScore] = useState(null); // Out of 8 (Alg 2 + Prog 3 + Result 3)
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [labId]);

  if (!lab) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Lab Experiment Not Found</h2>
        <Link to="/learn/lab">Return to Lab List</Link>
      </div>
    );
  }

  const handleCodeComplete = (passed) => {
    // 8 points for code/algorithm/result passing (Algorithm: 2, Programming: 3, Result: 3)
    setCodeScore(passed ? 8 : 4);
  };

  const handleVivaSubmit = () => {
    let correctCount = 0;
    lab.vivaQuestions.forEach((q, idx) => {
      if (vivaAnswers[idx] === q.correctAnswer) correctCount++;
    });
    // 2 points for viva
    const scoreVal = Math.round((correctCount / lab.vivaQuestions.length) * 2);
    setVivaScore(scoreVal);
  };

  const totalLabReadinessScore = (codeScore || 0) + (vivaScore || 0);

  const handleSaveLabReadiness = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData?.session) {
      await supabase.from('python_learning_progress').upsert({
        user_id: sessionData.session.user.id,
        lesson_id: lab.id,
        completed: totalLabReadinessScore >= 7,
        best_score: totalLabReadinessScore,
        last_opened_at: new Date().toISOString()
      }, { onConflict: 'user_id, lesson_id' });
      setIsCompleted(true);
    }
  };

  // Find next lab
  const currentIdx = PRACTICAL_LABS.findIndex(l => l.id === lab.id);
  const nextLab = currentIdx >= 0 && currentIdx < PRACTICAL_LABS.length - 1 ? PRACTICAL_LABS[currentIdx + 1] : null;
  const prevLab = currentIdx > 0 ? PRACTICAL_LABS[currentIdx - 1] : null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f6f8fa' }}>
      <main style={{ flex: 1, padding: '40px 20px', maxWidth: '950px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Link to="/learn/lab" style={{ color: '#315C8C', textDecoration: 'none', fontWeight: 600 }}>
            ← Back to All 18 Practical Labs
          </Link>
          <div style={{ display: 'flex', gap: '12px' }}>
            {prevLab && (
              <Link to={`/learn/lab/${prevLab.id}`} style={{ color: '#64748b', fontSize: '0.88rem', textDecoration: 'none' }}>
                ← Exp {prevLab.labNumber}
              </Link>
            )}
            {nextLab && (
              <Link to={`/learn/lab/${nextLab.id}`} style={{ color: '#315C8C', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' }}>
                Exp {nextLab.labNumber} →
              </Link>
            )}
          </div>
        </div>

        {/* Experiment Header */}
        <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ background: '#172033', color: '#C79A45', padding: '6px 14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.9rem', fontFamily: 'monospace' }}>
              EXPERIMENT {lab.labNumber} OF 18
            </span>
            <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>KTU S1 UCEST105 Practical Syllabus</span>
          </div>

          <h1 style={{ margin: '0 0 20px 0', color: '#172033', fontSize: '2.1rem' }}>{lab.title}</h1>
          
          {/* AIM */}
          <div style={{ background: '#f0f4f8', padding: '16px 20px', borderRadius: '8px', borderLeft: '4px solid #315C8C', marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 6px 0', color: '#172033', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🎯</span> AIM
            </h4>
            <p style={{ margin: 0, color: '#334155', fontSize: '0.98rem', lineHeight: 1.5 }}>{lab.aim}</p>
          </div>

          {/* CONCEPT RECAP */}
          <div style={{ marginBottom: '24px', background: '#fafaf9', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e7e5e4' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#172033', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>💡</span> CONCEPT RECAP
            </h4>
            <p style={{ margin: 0, color: '#44403c', lineHeight: '1.6', fontSize: '0.95rem' }}>{lab.conceptRecap}</p>
          </div>

          {/* ALGORITHM */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#172033', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📋</span> ALGORITHM
            </h4>
            <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '0.92rem', color: '#1e293b' }}>
              {lab.algorithm.map((step, idx) => (
                <div key={idx} style={{ marginBottom: idx < lab.algorithm.length - 1 ? '8px' : '0' }}>{step}</div>
              ))}
            </div>
          </div>

          {/* COMMON MISTAKES */}
          {lab.commonMistakes && lab.commonMistakes.length > 0 && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderLeft: '4px solid #ef4444', padding: '16px 20px', borderRadius: '8px', marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
                <span>⚠️</span> COMMON PITFALLS & EXAM MISTAKES
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#7f1d1d', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {lab.commonMistakes.map((m, mIdx) => (
                  <li key={mIdx} style={{ marginBottom: '4px' }}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          {/* EXPECTED OUTPUT */}
          {lab.expectedOutput && (
            <div style={{ background: '#0f172a', padding: '16px 20px', borderRadius: '8px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: '#38d9a9', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.5px' }}>
                  📺 EXPECTED CONSOLE OUTPUT
                </span>
                <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Deterministic Test Standard</span>
              </div>
              <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'Consolas, Monaco, monospace', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                {lab.expectedOutput}
              </pre>
            </div>
          )}
        </div>

        {/* Multi-file notice for Labs 16 & 17 */}
        {lab.isMultiFile && (
          <div style={{ background: '#172033', color: '#a5d6ff', padding: '16px 20px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #233554' }}>
            <span style={{ fontSize: '1.4rem' }}>📁</span>
            <div>
              <strong>Multi-File Virtual Workspace Active:</strong> Pyodide Virtual FS has mounted virtual module files ({Object.keys(lab.virtualFiles).join(', ')}). Your main script imports directly from this workspace.
            </div>
          </div>
        )}

        {/* Code Editor Practice */}
        <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ margin: 0, color: '#172033', fontSize: '1.4rem' }}>💻 Interactive Code Practice & Grading</h2>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Sequence: ATTEMPT → RUN → CHECK → HINT → RETRY → VIEW SOLUTION
            </span>
          </div>
          <CodePractice
            instruction="Write and execute the Python program to satisfy all experiment requirements:"
            starterCode={lab.starterCode}
            solutionCode={lab.solutionCode}
            solutionExplanation={lab.solutionExplanation}
            testCases={lab.testCases}
            expectedOutput={lab.expectedOutput}
            hints={lab.hints}
            virtualFiles={lab.virtualFiles}
            onComplete={handleCodeComplete}
          />
        </div>

        {/* EXPERIMENT RESULT CARD */}
        {lab.result && (
          <div style={{ background: '#f8fafc', padding: '20px 24px', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '32px' }}>
            <h4 style={{ margin: '0 0 6px 0', color: '#172033', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📝</span> EXPERIMENT RESULT & CONCLUSION
            </h4>
            <p style={{ margin: 0, color: '#334155', fontSize: '0.95rem', lineHeight: 1.5 }}>
              {lab.result}
            </p>
          </div>
        )}

        {/* Viva Questions Section */}
        <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ margin: 0, color: '#172033', fontSize: '1.4rem' }}>🗣️ Viva Voce Examination Practice</h2>
            <span style={{ fontSize: '0.85rem', color: '#315C8C', fontWeight: 600 }}>Weightage: 2 Marks</span>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 20px 0' }}>
            KTU examiners ask these targeted questions during practical lab evaluation:
          </p>

          {lab.vivaQuestions.map((q, idx) => (
            <div key={idx} style={{ marginBottom: '24px', background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 14px 0', color: '#172033', fontSize: '1rem' }}>
                Q{idx + 1}: {q.question}
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {q.options.map((opt, oIdx) => (
                  <label
                    key={oIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      background: vivaAnswers[idx] === oIdx ? '#e0e7ff' : '#ffffff',
                      border: `1px solid ${vivaAnswers[idx] === oIdx ? '#315C8C' : '#e2e8f0'}`,
                      cursor: 'pointer',
                      transition: 'background 0.15s'
                    }}
                  >
                    <input
                      type="radio"
                      name={`viva-${idx}`}
                      checked={vivaAnswers[idx] === oIdx}
                      onChange={() => setVivaAnswers({ ...vivaAnswers, [idx]: oIdx })}
                    />
                    <span style={{ fontSize: '0.95rem', color: '#1e293b' }}>{opt}</span>
                  </label>
                ))}
              </div>

              {vivaScore !== null && (
                <div style={{ marginTop: '12px', padding: '10px 14px', borderRadius: '6px', background: vivaAnswers[idx] === q.correctAnswer ? '#f0fdf4' : '#fef2f2', color: vivaAnswers[idx] === q.correctAnswer ? '#15803d' : '#b91c1c', fontSize: '0.88rem', fontWeight: 500, border: `1px solid ${vivaAnswers[idx] === q.correctAnswer ? '#bbf7d0' : '#fecaca'}` }}>
                  💡 {q.explanation}
                </div>
              )}
            </div>
          ))}

          <button
            className="btn-secondary"
            onClick={handleVivaSubmit}
            disabled={Object.keys(vivaAnswers).length < lab.vivaQuestions.length}
            style={{ padding: '10px 24px', background: '#315C8C', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
          >
            Check Viva Answers
          </button>
        </div>

        {/* ATP Lab Readiness Score Summary */}
        <div style={{ background: '#172033', color: '#F7F3EA', padding: '32px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
          <span style={{ color: '#C79A45', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
            KTU UCEST105 Lab Readiness Rubric (Total 10 Marks)
          </span>
          <h2 style={{ margin: '12px 0', fontSize: '2.2rem' }}>
            ATP Lab Readiness Score: <span style={{ color: '#38d9a9' }}>{totalLabReadinessScore} / 10</span>
          </h2>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', margin: '20px 0', flexWrap: 'wrap', fontSize: '0.95rem' }}>
            <div style={{ background: '#233044', padding: '10px 18px', borderRadius: '8px' }}>
              Algorithm & Logic: <strong style={{ color: '#C79A45' }}>2 / 2</strong>
            </div>
            <div style={{ background: '#233044', padding: '10px 18px', borderRadius: '8px' }}>
              Programming: <strong style={{ color: '#C79A45' }}>{codeScore ? 3 : 0} / 3</strong>
            </div>
            <div style={{ background: '#233044', padding: '10px 18px', borderRadius: '8px' }}>
              Result Verification: <strong style={{ color: '#C79A45' }}>{codeScore ? 3 : 0} / 3</strong>
            </div>
            <div style={{ background: '#233044', padding: '10px 18px', borderRadius: '8px' }}>
              Viva Voce: <strong style={{ color: '#C79A45' }}>{vivaScore || 0} / 2</strong>
            </div>
          </div>

          {isCompleted ? (
            <div style={{ color: '#38d9a9', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '16px' }}>
              ✓ Lab Result Recorded in Python Journey Progress!
            </div>
          ) : (
            <button
              onClick={handleSaveLabReadiness}
              style={{ padding: '12px 32px', fontSize: '1.05rem', background: '#C79A45', color: '#172033', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '8px' }}
            >
              Record Lab Completion & Progress →
            </button>
          )}
        </div>

      </main>
    </div>
  );
}
