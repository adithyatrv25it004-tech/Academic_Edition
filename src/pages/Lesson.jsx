import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getNextLessonId, getLesson as getLocalLessonMeta } from '../data/pythonCourse/course';
import { supabase } from '../lib/supabase';
import CheckpointQuiz from '../components/learning/exercises/CheckpointQuiz';
import {
  SECTION_REGISTRY,
  normalizeSectionProps,
  normalizeLesson,
  SafeSectionFallback
} from '../components/learning/sectionRegistry';

export default function Lesson() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paywall, setPaywall] = useState(false);
  
  // Contextual Help Modal State
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedHelpTopic, setSelectedHelpTopic] = useState(null);

  // Progressive Step Engine State
  const [progressiveMode, setProgressiveMode] = useState(true);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchLessonSecurely() {
      setLoading(true);
      setPaywall(false);
      setShowHelpModal(false);
      setSelectedHelpTopic(null);
      setCurrentStepIdx(0);
      
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session) {
        navigate('/login', { replace: true });
        return;
      }

      // Mark as started in DB immediately
      await supabase.from('python_learning_progress').upsert({
        user_id: session.user.id,
        lesson_id: lessonId,
        last_opened_at: new Date().toISOString()
      }, { onConflict: 'user_id, lesson_id', ignoreDuplicates: true });

      // Fetch from edge function
      const { data, error } = await supabase.functions.invoke('get-python-lesson', {
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: { lesson_id: lessonId }
      });

      if (!isMounted) return;

      if (error || data?.error) {
        let errCode = data?.error || error?.message;
        if (errCode === 'NO_ENTITLEMENT' || errCode?.includes('NO_ENTITLEMENT')) {
          setPaywall(true);
        } else {
          console.error("Lesson fetch error:", data || error);
          navigate('/learn');
        }
        setLoading(false);
        return;
      }

      if (data?.lesson) {
        setLesson(normalizeLesson(data.lesson));
        setCompleted(false);
        setScore(null);
        window.scrollTo(0, 0);
      }
      setLoading(false);
    }
    
    fetchLessonSecurely();
    
    return () => { isMounted = false; };
  }, [lessonId, navigate]);

  if (loading) return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f6f8fa', alignItems: 'center', justifyContent: 'center', transition: "opacity 0.3s ease-out" }}>
      <div style={{ background: '#fff', padding: '32px 24px', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', maxWidth: '420px', width: '100%' }}>
        <div className="payment-spinner" style={{ margin: "0 auto 16px", width: "36px", height: "36px", borderWidth: "3px" }} aria-hidden="true" />
        <h3 style={{ color: "var(--text)", marginBottom: "6px", fontSize: "1.2rem" }}>Picking up where you left off...</h3>
        <p style={{ color: "var(--muted)", margin: 0, fontSize: "0.9rem", opacity: 0.85 }}>Restoring your learning progress.</p>
      </div>
    </div>
  );

  if (paywall) {
    const meta = getLocalLessonMeta(lessonId) || { title: 'Premium Lesson', estimatedMinutes: 10 };
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f6f8fa' }}>
        <main style={{ flex: 1, padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
          <Link to="/learn" style={{ color: 'var(--muted)', textDecoration: 'none', display: 'inline-block', marginBottom: '24px', fontWeight: 600 }}>
            ← Back to Course Map
          </Link>
          
          <div style={{ background: '#fff', padding: '60px 40px', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '40px', display: 'block', marginBottom: '16px' }}>🔒</span>
            <span style={{ color: '#0969da', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Premium Lesson Preview</span>
            <h1 style={{ color: 'var(--text)', margin: '16px 0', fontSize: '2.5rem' }}>{meta.title}</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--muted)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
              This interactive lesson ({meta.estimatedMinutes || meta.estimated_minutes || 10} min) requires an active ATP Python Journey pass to access.
            </p>
            
            <Link to="/payment" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1.2rem', textDecoration: 'none', display: 'inline-block' }}>
              Unlock Python Journey — ₹49
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!lesson) return null;

  const sections = lesson.sections || [];
  const nextLessonId = getNextLessonId(lessonId);

  const handleCheckpointComplete = (finalScore) => {
    setScore(finalScore);
    if (finalScore >= (lesson.checkpoint?.passingScore || 70)) {
      setCompleted(true);
    }
  };

  const handleNext = () => {
    if (nextLessonId) navigate(`/learn/${nextLessonId}`);
    else navigate('/learn');
  };

  const visibleSections = progressiveMode 
    ? sections.slice(0, currentStepIdx + 1)
    : sections;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f6f8fa' }}>
      
      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px 20px', maxWidth: '850px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Link to="/learn" style={{ color: 'var(--muted)', textDecoration: 'none', fontWeight: 600 }}>
            ← Back to Course
          </Link>

          {/* Contextual I'm Stuck Button */}
          <button 
            onClick={() => setShowHelpModal(true)}
            style={{ 
              background: '#fff8c5', 
              color: '#9a6700', 
              border: '1px solid #e6cc28', 
              padding: '8px 16px', 
              borderRadius: '20px', 
              fontWeight: 600, 
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
            }}
          >
            <span>🆘</span> I'm Stuck — Ask ATP Teacher
          </button>
        </div>
        
        <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: 'var(--text)', margin: '0 0 16px 0', fontSize: '2rem' }}>{lesson.title}</h1>
          
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
            {lesson.skillTags?.map(tag => (
              <span key={tag} style={{ background: '#e0e7ff', color: '#3730a3', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
                {tag}
              </span>
            ))}
            <span style={{ color: 'var(--muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
              ⏱ {lesson.estimatedMinutes ? `${lesson.estimatedMinutes} min` : 'Estimated time unavailable'}
            </span>
            
            {sections.length > 1 && (
              <button 
                onClick={() => setProgressiveMode(!progressiveMode)}
                style={{ background: 'none', border: 'none', color: '#0969da', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline', marginLeft: 'auto' }}
              >
                {progressiveMode ? 'Show All Steps' : 'Step-by-Step Mode'}
              </button>
            )}
          </div>

          {/* Step indicator in progressive mode */}
          {progressiveMode && sections.length > 1 && (
            <div style={{ background: '#f6f8fa', padding: '10px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.85rem', color: 'var(--muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Guided Learning Progress: Step {Math.min(currentStepIdx + 1, sections.length)} of {sections.length}</span>
              <div style={{ width: '120px', height: '6px', background: '#e1e4e8', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${((currentStepIdx + 1) / sections.length) * 100}%`, height: '100%', background: '#0969da', transition: 'width 0.3s' }}></div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {visibleSections.map((sec, idx) => {
              const Component = SECTION_REGISTRY[sec.type];

              if (Component) {
                const sectionProps = normalizeSectionProps(sec, {
                  lessonId,
                  onCheckpointComplete: handleCheckpointComplete
                });
                return <Component key={sec.id || idx} {...sectionProps} />;
              }
              
              // Safe production fallback
              return <SafeSectionFallback key={sec.id || idx} type={sec.type} />;
            })}
          </div>

          {/* Progressive "Continue to Next Step" button */}
          {progressiveMode && currentStepIdx < sections.length - 1 && (
            <div style={{ marginTop: '32px', textAlign: 'center' }}>
              <button 
                className="btn-primary" 
                onClick={() => setCurrentStepIdx(currentStepIdx + 1)}
                style={{ padding: '12px 32px', fontSize: '1.05rem' }}
              >
                Continue to Next Step →
              </button>
            </div>
          )}

          {lesson.checkpoint && !completed && score === null && (
            <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '2px solid var(--border)' }}>
              <h2 style={{ marginBottom: '24px', color: 'var(--text)' }}>Lesson Checkpoint</h2>
              <CheckpointQuiz 
                questions={lesson.checkpoint.questions || lesson.checkpoint} 
                lessonId={lessonId} 
                onComplete={handleCheckpointComplete} 
              />
            </div>
          )}

          {score !== null && (
            <div style={{ marginTop: '48px', padding: '32px', background: score >= (lesson.checkpoint?.passingScore || 70) ? '#dafbe1' : '#ffebe9', borderRadius: '12px', textAlign: 'center' }}>
              <h2 style={{ color: score >= (lesson.checkpoint?.passingScore || 70) ? '#238636' : '#da3633', margin: '0 0 16px 0' }}>
                {score >= (lesson.checkpoint?.passingScore || 70) ? '✓ Lesson Completed!' : 'Almost there!'}
              </h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '24px' }}>You scored {score}%</p>
              
              {score >= (lesson.checkpoint?.passingScore || 70) ? (
                <button className="btn-primary" onClick={handleNext} style={{ padding: '12px 32px', fontSize: '1.1rem' }}>
                  Continue Learning →
                </button>
              ) : (
                <button className="btn-secondary" onClick={() => setScore(null)} style={{ padding: '12px 32px', fontSize: '1.1rem' }}>
                  Review & Try Again
                </button>
              )}
            </div>
          )}

          {/* Recommended Next Class */}
          {nextLessonId && (
            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ color: 'var(--muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Up Next in Course</span>
                <div style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1.05rem', marginTop: '4px' }}>
                  {getLocalLessonMeta(nextLessonId)?.title || 'Next Class'}
                </div>
              </div>
              <Link to={`/learn/${nextLessonId}`} className="btn-secondary" style={{ padding: '10px 20px', textDecoration: 'none' }}>
                Next Class →
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Contextual I'm Stuck Modal */}
      {showHelpModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{
            background: '#fff', borderRadius: '16px', maxWidth: '520px', width: '100%',
            padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative'
          }}>
            <button 
              onClick={() => setShowHelpModal(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--muted)' }}
            >
              ✕
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '2rem' }}>👩‍🏫</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#172033' }}>ATP Teacher Contextual Support</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Topic: {lesson.title}</span>
              </div>
            </div>

            <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '20px' }}>
              Which type of help would you like for this lesson?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <button 
                onClick={() => setSelectedHelpTopic('simplify')}
                style={helpBtnStyle(selectedHelpTopic === 'simplify')}
              >
                💡 Explain Again Simply
              </button>
              <button 
                onClick={() => setSelectedHelpTopic('example')}
                style={helpBtnStyle(selectedHelpTopic === 'example')}
              >
                🔍 Show Another Example
              </button>
              <button 
                onClick={() => setSelectedHelpTopic('misconception')}
                style={helpBtnStyle(selectedHelpTopic === 'misconception')}
              >
                ❓ Why Does This Happen? (Common Pitfall)
              </button>
              <button 
                onClick={() => setSelectedHelpTopic('hint')}
                style={helpBtnStyle(selectedHelpTopic === 'hint')}
              >
                🔑 Give Me a Guided Hint
              </button>
              <button 
                onClick={() => setSelectedHelpTopic('code')}
                style={helpBtnStyle(selectedHelpTopic === 'code')}
              >
                💻 Debugging Code Syntax Tips
              </button>
            </div>

            {selectedHelpTopic && (
              <div style={{ background: '#f0f4f8', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #315C8C', fontSize: '0.95rem', color: '#1e293b', lineHeight: '1.5' }}>
                {selectedHelpTopic === 'simplify' && (
                  <div>
                    <strong>ATP Teacher Breakdown:</strong> Think of this concept step-by-step. Python reads code line-by-line from top to bottom. Take a deep breath and break down what each line is doing!
                  </div>
                )}
                {selectedHelpTopic === 'example' && (
                  <div>
                    <strong>Real-World Analogy:</strong> Imagine checking if your age is 18 or older. If true, you get access; otherwise you get a restriction message. That is decision logic in Python!
                  </div>
                )}
                {selectedHelpTopic === 'misconception' && (
                  <div>
                    <strong>Common Pitfall:</strong> Don't confuse <code>=</code> (assignment) with <code>==</code> (equality check). <code>x = 5</code> assigns 5 to x, while <code>x == 5</code> asks if x equals 5.
                  </div>
                )}
                {selectedHelpTopic === 'hint' && (
                  <div>
                    <strong>Guided Hint:</strong> Check the starting value of your variables and trace how they change at each line of execution.
                  </div>
                )}
                {selectedHelpTopic === 'code' && (
                  <div>
                    <strong>Syntax Tips:</strong> Ensure all opening brackets <code>( [ &#123;</code> have matching closing brackets <code>) ] &#123;</code>, strings are quoted, and <code>if/for/def</code> lines end with a colon <code>:</code>.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

const helpBtnStyle = (isSelected) => ({
  padding: '12px 16px',
  borderRadius: '8px',
  border: `1px solid ${isSelected ? '#315C8C' : '#e2e8f0'}`,
  background: isSelected ? '#e0e7ff' : '#f8fafc',
  color: isSelected ? '#1e1b4b' : '#334155',
  textAlign: 'left',
  fontWeight: isSelected ? 600 : 400,
  cursor: 'pointer',
  fontSize: '0.95rem',
  transition: 'all 0.2s'
});
