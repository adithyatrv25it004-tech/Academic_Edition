import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRACTICAL_LABS } from '../data/pythonCourse/labs';
import { supabase } from '../lib/supabase';

export default function LabList() {
  const navigate = useNavigate();
  const [labProgress, setLabProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) {
        navigate('/login');
        return;
      }

      const { data } = await supabase
        .from('python_learning_progress')
        .select('lesson_id, completed, best_score')
        .eq('user_id', sessionData.session.user.id);

      if (data) {
        const pMap = {};
        data.forEach((row) => {
          pMap[row.lesson_id] = row;
        });
        setLabProgress(pMap);
      }
      setLoading(false);
    }
    loadProgress();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f6f8fa', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', padding: '32px 24px', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border)', maxWidth: '420px', width: '100%' }}>
          <div className="payment-spinner" style={{ margin: "0 auto 16px", width: "36px", height: "36px" }} />
          <h3 style={{ color: "var(--text)", marginBottom: "6px" }}>Preparing Practical Lab...</h3>
          <p style={{ color: "var(--muted)", margin: 0, fontSize: "0.9rem" }}>Loading 18 official KTU UCEST105 experiments.</p>
        </div>
      </div>
    );
  }

  const completedCount = PRACTICAL_LABS.filter((l) => labProgress[l.id]?.completed).length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f6f8fa' }}>
      <main style={{ flex: 1, padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        
        <Link to="/learn" style={{ color: 'var(--muted)', textDecoration: 'none', display: 'inline-block', marginBottom: '24px', fontWeight: 600 }}>
          ← Back to Course Map
        </Link>

        {/* Header */}
        <div style={{ background: '#172033', color: '#F7F3EA', padding: '32px', borderRadius: '16px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ color: '#C79A45', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                KTU S1 UCEST105 Practical Syllabus
              </span>
              <h1 style={{ margin: '8px 0 0 0', fontSize: '2rem' }}>Official Python Practical Lab</h1>
              <p style={{ margin: '8px 0 0 0', color: '#8b9bb4', fontSize: '0.95rem' }}>
                All 18 official lab experiments with real Pyodide execution, viva practice, and ATP Lab Readiness scoring.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px 24px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: '0.8rem', color: '#8b9bb4', display: 'block' }}>COMPLETED</span>
              <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#38d9a9', fontFamily: 'monospace' }}>{completedCount} / 18</span>
            </div>
          </div>
        </div>

        {/* Grid of 18 Labs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {PRACTICAL_LABS.map((lab) => {
            const prog = labProgress[lab.id];
            const isCompleted = prog?.completed;
            const score = prog?.best_score;

            return (
              <Link
                key={lab.id}
                to={`/learn/lab/${lab.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    background: '#fff',
                    padding: '24px',
                    borderRadius: '12px',
                    border: `1px solid ${isCompleted ? '#38d9a9' : 'var(--border)'}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ background: '#172033', color: '#C79A45', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                        EXP {lab.labNumber}
                      </span>
                      {isCompleted && (
                        <span style={{ background: '#dafbe1', color: '#1a7f37', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                          ✓ Completed ({score}/10)
                        </span>
                      )}
                    </div>

                    <h3 style={{ margin: '0 0 8px 0', color: 'var(--text)', fontSize: '1.1rem' }}>{lab.title}</h3>
                    <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.85rem', lineHeight: '1.4' }}>{lab.aim}</p>
                  </div>

                  <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#315C8C', fontWeight: 600 }}>
                    <span>{isCompleted ? 'Review Lab' : 'Start Experiment'}</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </main>
    </div>
  );
}
