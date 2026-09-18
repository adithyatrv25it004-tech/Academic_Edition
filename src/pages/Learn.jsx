import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COURSE_MODULES } from '../data/pythonCourse/course';
import { supabase } from '../lib/supabase';

const MODULE_HOURS = {
  'module-1': '7 Academic Contact Hours',
  'module-2': '9 Academic Contact Hours',
  'module-3': '10 Academic Contact Hours',
  'module-4': '10 Academic Contact Hours'
};

export default function Learn() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadProgress() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) {
        navigate('/login', { replace: true });
        return;
      }
      
      const { data: progressData } = await supabase
        .from('python_learning_progress')
        .select('lesson_id, status, best_score, completed')
        .eq('user_id', userData.user.id);

      if (isMounted) {
        const progMap = {};
        if (progressData) {
          progressData.forEach(p => {
            progMap[p.lesson_id] = p;
          });
        }
        setProgress(progMap);
        setLoading(false);
      }
    }
    loadProgress();
    return () => { isMounted = false; };
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f6f8fa', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', padding: '32px 24px', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border)', maxWidth: '420px', width: '100%' }}>
          <div className="payment-spinner" style={{ margin: "0 auto 16px", width: "36px", height: "36px" }} aria-hidden="true" />
          <h3 style={{ color: "var(--text)", marginBottom: "6px" }}>Picking up where you left off...</h3>
          <p style={{ color: "var(--muted)", margin: 0, fontSize: "0.9rem" }}>Restoring your learning progress.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f6f8fa', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        <Link to="/vault" style={{ color: 'var(--muted)', textDecoration: 'none', display: 'inline-block', marginBottom: '24px', fontWeight: 600 }}>
          ← Back to Dashboard
        </Link>

        {/* Header */}
        <div style={{ background: '#172033', color: '#F7F3EA', padding: '32px', borderRadius: '16px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
          <span style={{ color: '#C79A45', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
            APJ Abdul Kalam Technological University — B.Tech 2024 Scheme
          </span>
          <h1 style={{ margin: '8px 0 0 0', fontSize: '2.2rem' }}>ATP Python Journey: UCEST105</h1>
          <p style={{ margin: '8px 0 0 0', color: '#8b9bb4', fontSize: '0.95rem' }}>
            Algorithmic Thinking with Python (Common to all branches, 4 Credits, CIE: 40, ESE: 60)
          </p>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
            <Link to="/learn/lab" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              🧪 Practical Lab (18 Experiments)
            </Link>
            <Link to="/learn/exam" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#315C8C', color: '#F7F3EA', border: 'none' }}>
              📝 ESE Exam Practice (60 Marks)
            </Link>
          </div>
        </div>

        {/* Modules List */}
        {COURSE_MODULES.map((mod) => (
          <div key={mod.id} style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px', flexWrap: 'wrap' }}>
              <h2 style={{ color: '#315C8C', fontSize: '1.2rem', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {mod.id.toUpperCase().replace('-', ' ')}
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>
                {MODULE_HOURS[mod.id]}
              </span>
            </div>

            <h3 style={{ fontSize: '1.8rem', margin: '0 0 12px 0', color: 'var(--text)' }}>{mod.title}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '24px' }}>{mod.description}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '24px', top: '24px', bottom: '24px', width: '2px', background: '#d0d7de', zIndex: 0 }}></div>

              {mod.levels.map((level, lIdx) => (
                <div key={level.id} style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  
                  <div style={{ 
                    width: '48px', height: '48px', borderRadius: '24px', 
                    background: '#fff', border: '3px solid #315C8C',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold', color: '#315C8C', backgroundColor: '#f0f4f8'
                  }}>
                    {lIdx + 1}
                  </div>

                  <div style={{ flex: 1, background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <h4 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', color: 'var(--text)' }}>{level.title}</h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {level.lessons.map(lesson => {
                        const prog = progress[lesson.id];
                        const isCompleted = prog?.status === 'completed' || prog?.completed;
                        const isStarted = prog?.status === 'in_progress';

                        return (
                          <Link 
                            key={lesson.id} 
                            to={`/learn/${lesson.id}`}
                            style={{ 
                              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                              padding: '14px 16px', borderRadius: '8px', textDecoration: 'none',
                              background: isCompleted ? '#dafbe1' : isStarted ? '#f0f7ff' : '#fff',
                              border: isCompleted ? '1px solid #2ea043' : isStarted ? '1px solid #315C8C' : '1px solid #d0d7de',
                              transition: 'all 0.2s'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              {isCompleted ? (
                                <span style={{ color: '#1a7f37', fontSize: '1.1rem', fontWeight: 'bold' }}>✓</span>
                              ) : isStarted ? (
                                <span style={{ color: '#315C8C', fontSize: '1.1rem' }}>●</span>
                              ) : (
                                <span style={{ color: '#8c959f', fontSize: '1.1rem' }}>○</span>
                              )}
                              <span style={{ color: 'var(--text)', fontWeight: 500, fontSize: '1rem' }}>
                                {lesson.title}
                              </span>
                            </div>
                            <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>⏱ {lesson.estimatedMinutes} min</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
