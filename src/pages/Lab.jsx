import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLab } from '../data/pythonCourse/labs';
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
    // 8 points for code/algorithm/result passing
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

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f6f8fa' }}>
      <main style={{ flex: 1, padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
        
        <Link to="/learn/lab" style={{ color: 'var(--muted)', textDecoration: 'none', display: 'inline-block', marginBottom: '24px', fontWeight: 600 }}>
          ← Back to Practical Lab List
        </Link>

        {/* Experiment Header */}
        <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ background: '#172033', color: '#C79A45', padding: '6px 14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.9rem', fontFamily: 'monospace' }}>
              EXPERIMENT {lab.labNumber}
            </span>
            <span style={{ color: 'var(--muted)', fontSize: '0.9rem', fontWeight: 600 }}>KTU S1 UCEST105 Lab</span>
          </div>

          <h1 style={{ margin: '0 0 16px 0', color: 'var(--text)', fontSize: '2rem' }}>{lab.title}</h1>
          
          <div style={{ background: '#f0f4f8', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #315C8C', marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 6px 0', color: '#172033' }}>🎯 AIM</h4>
            <p style={{ margin: 0, color: '#334155', fontSize: '0.95rem' }}>{lab.aim}</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--text)' }}>💡 CONCEPT RECAP</h4>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: '1.6' }}>{lab.conceptRecap}</p>
          </div>

          <div>
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--text)' }}>📋 ALGORITHM</h4>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.9rem', color: '#334155' }}>
              {lab.algorithm.map((step, idx) => (
                <div key={idx} style={{ marginBottom: '6px' }}>{step}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Multi-file notice for Labs 16 & 17 */}
        {lab.isMultiFile && (
          <div style={{ background: '#172033', color: '#a5d6ff', padding: '16px 20px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.4rem' }}>📁</span>
            <div>
              <strong>Multi-File Virtual Workspace Active:</strong> Pyodide Virtual FS has mounted virtual module files ({Object.keys(lab.virtualFiles).join(', ')}). Your main script imports from this virtual workspace.
            </div>
          </div>
        )}

        {/* Code Editor Practice */}
        <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
          <h2 style={{ margin: '0 0 20px 0', color: 'var(--text)' }}>💻 Lab Code Execution & Checking</h2>
          <CodePractice
            instruction="Write and execute the program to satisfy the experiment requirements:"
            starterCode={lab.starterCode}
            solutionCode={lab.solutionCode}
            testCases={lab.testCases}
            virtualFiles={lab.virtualFiles}
            onComplete={handleCodeComplete}
          />
        </div>

        {/* Viva Questions Section */}
        <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
          <h2 style={{ margin: '0 0 20px 0', color: 'var(--text)' }}>🗣️ Viva Voice Practice</h2>

          {lab.vivaQuestions.map((q, idx) => (
            <div key={idx} style={{ marginBottom: '24px', background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h4 style={{ margin: '0 0 12px 0', color: 'var(--text)' }}>Q{idx + 1}: {q.question}</h4>
              
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
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name={`viva-${idx}`}
                      checked={vivaAnswers[idx] === oIdx}
                      onChange={() => setVivaAnswers({ ...vivaAnswers, [idx]: oIdx })}
                    />
                    <span style={{ fontSize: '0.95rem' }}>{opt}</span>
                  </label>
                ))}
              </div>

              {vivaScore !== null && (
                <div style={{ marginTop: '12px', fontSize: '0.85rem', color: vivaAnswers[idx] === q.correctAnswer ? '#1a7f37' : '#cf222e', fontWeight: 600 }}>
                  💡 {q.explanation}
                </div>
              )}
            </div>
          ))}

          <button
            className="btn-secondary"
            onClick={handleVivaSubmit}
            disabled={Object.keys(vivaAnswers).length < lab.vivaQuestions.length}
            style={{ padding: '10px 24px' }}
          >
            Check Viva Answers
          </button>
        </div>

        {/* ATP Lab Readiness Score Summary */}
        {(codeScore !== null || vivaScore !== null) && (
          <div style={{ background: '#172033', color: '#F7F3EA', padding: '32px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <span style={{ color: '#C79A45', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              ATP Lab Practice Evaluation Rubric
            </span>
            <h2 style={{ margin: '12px 0', fontSize: '2rem' }}>
              ATP Lab Readiness Score: <span style={{ color: '#38d9a9' }}>{totalLabReadinessScore} / 10</span>
            </h2>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', margin: '20px 0', flexWrap: 'wrap', fontSize: '0.9rem' }}>
              <div>Algorithm & Logic: <strong style={{ color: '#C79A45' }}>2 / 2</strong></div>
              <div>Programming: <strong style={{ color: '#C79A45' }}>{codeScore ? 3 : 0} / 3</strong></div>
              <div>Result Verification: <strong style={{ color: '#C79A45' }}>{codeScore ? 3 : 0} / 3</strong></div>
              <div>Viva Voice: <strong style={{ color: '#C79A45' }}>{vivaScore || 0} / 2</strong></div>
            </div>

            {isCompleted ? (
              <div style={{ color: '#38d9a9', fontWeight: 'bold', fontSize: '1.1rem' }}>
                ✓ Lab Result Recorded in Python Journey Progress!
              </div>
            ) : (
              <button
                className="btn-primary"
                onClick={handleSaveLabReadiness}
                style={{ padding: '12px 32px', fontSize: '1.1rem' }}
              >
                Record Lab Completion →
              </button>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
