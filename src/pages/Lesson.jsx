import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getNextLessonId, getLesson as getLocalLessonMeta } from '../data/pythonCourse/course';
import { supabase } from '../lib/supabase';
import { playUiBubbleSound } from '../lib/uiBubbleSound';
import { SHOWCASE_LESSONS } from '../data/pythonCourse/showcaseLessons';
import { getLessonData } from '../data/pythonCourse/lessonProvider';
import { LESSON_HELP_GUIDES, DEFAULT_HELP_GUIDE } from '../data/pythonCourse/lessonHelp';
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
  const [selectedHelpTopic, setSelectedHelpTopic] = useState('simplify');

  // Mobile Sidebar Drawer State
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Progressive Step Engine State
  const [progressiveMode, setProgressiveMode] = useState(true);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function fetchLessonSecurely() {
      setLoading(true);
      setPaywall(false);
      setShowHelpModal(false);
      setSelectedHelpTopic('simplify');
      setCurrentStepIdx(0);
      setCompleted(false);
      setScore(null);

      const showcaseLesson = SHOWCASE_LESSONS[lessonId];
      const localMeta = getLocalLessonMeta(lessonId);

      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      // Handle unauthenticated state
      if (!session) {
        const localLesson = getLessonData(lessonId);
        // If it's a free preview showcase lesson, allow guest preview
        if (showcaseLesson?.isFreePreview || localMeta?.isFreePreview || localMeta?.is_free_preview || localLesson?.isFreePreview) {
          if (localLesson) {
            setLesson(normalizeLesson(localLesson));
            setLoading(false);
            window.scrollTo(0, 0);
            return;
          }
        }
        navigate('/login', { replace: true });
        return;
      }

      // User is logged in: record lesson start in background
      try {
        await supabase.from('python_learning_progress').upsert({
          user_id: session.user.id,
          lesson_id: lessonId,
          last_opened_at: new Date().toISOString()
        }, { onConflict: 'user_id, lesson_id', ignoreDuplicates: true });
      } catch (err) {
        console.warn("Progress update notice:", err);
      }

      // If this is one of our showcase lessons, use the enriched showcase syllabus
      if (showcaseLesson) {
        if (!isMounted) return;
        setLesson(normalizeLesson(showcaseLesson));
        setLoading(false);
        window.scrollTo(0, 0);
        return;
      }

      // Otherwise, attempt to fetch from edge function
      try {
        const { data, error } = await supabase.functions.invoke('get-python-lesson', {
          headers: { Authorization: `Bearer ${session.access_token}` },
          body: { lesson_id: lessonId }
        });

        if (!isMounted) return;

        if (data?.lesson) {
          setLesson(normalizeLesson(data.lesson));
          setLoading(false);
          window.scrollTo(0, 0);
          return;
        }

        const errCode = data?.error || error?.message;
        const isPreviewUser = session?.user?.id?.startsWith?.('preview-');
        if (!isPreviewUser && (errCode === 'NO_ENTITLEMENT' || errCode?.includes('NO_ENTITLEMENT'))) {
          setPaywall(true);
          setLoading(false);
          return;
        }
      } catch (invokeErr) {
        console.warn("Edge function invocation fallback triggered:", invokeErr);
      }

      // Fallback: load curriculum lesson from local provider
      const localLesson = getLessonData(lessonId);
      if (localLesson) {
        if (!isMounted) return;
        setLesson(normalizeLesson(localLesson));
        setLoading(false);
        window.scrollTo(0, 0);
        return;
      }

      if (!isMounted) return;
      navigate('/learn');
      setLoading(false);
    }

    fetchLessonSecurely();

    return () => { isMounted = false; };
  }, [lessonId, navigate]);

  if (loading) return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F3EA', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#FFFFFF', padding: '36px 28px', borderRadius: '14px', textAlign: 'center', border: '1px solid #E2DACB', boxShadow: '0 8px 24px rgba(23, 32, 51, 0.06)', maxWidth: '420px', width: '100%' }}>
        <div className="payment-spinner" style={{ margin: "0 auto 18px", width: "40px", height: "40px", borderWidth: "3px", borderColor: "#315C8C", borderTopColor: "transparent" }} aria-hidden="true" />
        <h3 style={{ color: "#172033", marginBottom: "8px", fontSize: "1.2rem", fontWeight: 700 }}>Preparing ATP Classroom...</h3>
        <p style={{ color: "#687588", margin: 0, fontSize: "0.92rem" }}>Loading pedagogical materials and interactive execution engine.</p>
      </div>
    </div>
  );

  if (paywall) {
    const meta = getLocalLessonMeta(lessonId) || { title: 'Premium Lesson', estimatedMinutes: 10 };
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F3EA' }}>
        <main style={{ flex: 1, padding: '48px 20px', maxWidth: '780px', margin: '0 auto' }}>
          <Link to="/learn" style={{ color: '#315C8C', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px', fontWeight: 600, fontSize: '0.95rem' }}>
            ← Back to Course Map
          </Link>

          <div style={{ background: '#FFFFFF', padding: '56px 40px', borderRadius: '16px', textAlign: 'center', border: '1px solid #E2DACB', boxShadow: '0 8px 30px rgba(23, 32, 51, 0.06)' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🔒</span>
            <span style={{ color: '#C79A45', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', background: '#FFF9F0', padding: '4px 12px', borderRadius: '20px', border: '1px solid #F3DFC1' }}>
              Full Journey Access Required
            </span>
            <h1 style={{ color: '#172033', margin: '20px 0 12px 0', fontSize: '2.2rem', fontWeight: 800 }}>{meta.title}</h1>
            <p style={{ fontSize: '1.1rem', color: '#4E5A6C', marginBottom: '32px', maxWidth: '520px', margin: '0 auto 32px', lineHeight: 1.6 }}>
              This interactive tuition class ({meta.estimatedMinutes || meta.estimated_minutes || 7} min) is part of the complete KTU B.Tech Algorithmic Thinking with Python curriculum.
            </p>

            <div style={{ background: '#FDFBF7', border: '1px solid #EFEAE1', borderRadius: '12px', padding: '20px', maxWidth: '440px', margin: '0 auto 32px', textAlign: 'left' }}>
              <div style={{ fontWeight: 700, color: '#172033', marginBottom: '10px', fontSize: '0.95rem' }}>What's included:</div>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#4E5A6C', fontSize: '0.9rem', lineHeight: 1.6 }}>
                <li>Step-by-step ATP Teacher guided lessons</li>
                <li>Live in-browser Python execution & error teaching</li>
                <li>Interactive visual execution traces & memory models</li>
                <li>KTU exam-aligned question patterns and checkpoints</li>
              </ul>
            </div>

            <Link
              to="/payment"
              style={{
                background: '#315C8C',
                color: '#FFFFFF',
                padding: '14px 36px',
                fontSize: '1.1rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-block',
                borderRadius: '8px',
                boxShadow: '0 4px 14px rgba(49, 92, 140, 0.3)'
              }}
            >
              Unlock Full Python Journey — ₹49 One-Time
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!lesson) return null;

  const sections = lesson.sections || [];
  const nextLessonId = getNextLessonId(lessonId);

  // Current Help Guide for this lesson
  const helpData = LESSON_HELP_GUIDES[lessonId] || DEFAULT_HELP_GUIDE;

  const handleCheckpointComplete = (finalScore) => {
    setScore(finalScore);
    if (finalScore >= (lesson.checkpoint?.passingScore || 70)) {
      setCompleted(true);
      playUiBubbleSound();
    }
  };

  const handleNext = () => {
    if (nextLessonId) navigate(`/learn/${nextLessonId}`);
    else navigate('/learn');
  };

  const handleContinueStep = () => {
    playUiBubbleSound();
    setCurrentStepIdx(prev => Math.min(sections.length - 1, prev + 1));
  };

  const visibleSections = progressiveMode
    ? sections.slice(0, currentStepIdx + 1)
    : sections;

  // Derive teaching stage of the current step
  const getStageName = (type) => {
    if (!type) return 'TEACH';
    if (type.includes('teacher') || type.includes('explanation')) return 'TEACH';
    if (type.includes('concept') || type.includes('visualizer') || type.includes('trace') || type.includes('example')) return 'DEMONSTRATE';
    if (type.includes('multiple-choice') || type.includes('predict') || type.includes('algorithm-reorder')) return 'CHECKPOINT';
    if (type.includes('code') || type.includes('fill') || type.includes('try')) return 'PRACTICE';
    if (type.includes('recap')) return 'RECAP';
    return 'GUIDE';
  };

  const currentSection = sections[currentStepIdx] || sections[0];
  const currentStage = getStageName(currentSection?.type);

  // Calculate learning objectives with completion state based on progress
  const objectives = (lesson.objectives && lesson.objectives.length > 0)
    ? lesson.objectives
    : [
        'Master core conceptual definitions for this topic',
        'Analyze worked examples and predict code behavior',
        'Execute and verify hands-on Python exercises',
        'Consolidate key rules and avoid common exam pitfalls'
      ];

  const objectivesCompletedCount = Math.min(
    objectives.length,
    Math.floor(((currentStepIdx + 1) / Math.max(1, sections.length)) * objectives.length)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F7F3EA' }}>

      {/* TOP ACADEMIC CLASSROOM BAR */}
      <header
        style={{
          background: '#172033',
          color: '#F7F3EA',
          borderBottom: '1px solid #2B3D59',
          padding: '12px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          
          {/* Left: Navigation & Course info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              to="/learn"
              style={{
                color: '#F7F3EA',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                background: 'rgba(247, 243, 234, 0.08)',
                border: '1px solid rgba(247, 243, 234, 0.15)'
              }}
            >
              ← Course Map
            </Link>

            <div className="hidden sm:block">
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#C79A45' }}>
                KTU B.Tech • S1 UCEST105
              </span>
              <div style={{ fontSize: '0.85rem', color: '#CBD5E1', fontWeight: 500 }}>
                Algorithmic Thinking with Python
              </div>
            </div>
          </div>

          {/* Center: Current Lesson Title */}
          <div className="hidden md:block" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF' }}>
              {lesson.title}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              Step {currentStepIdx + 1} of {sections.length} • Stage: <span style={{ color: '#C79A45', fontWeight: 600 }}>{currentStage}</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Contextual I'm Stuck Button */}
            <button
              onClick={() => setShowHelpModal(true)}
              style={{
                background: '#FFF9F0',
                color: '#8C6718',
                border: '1.5px solid #C79A45',
                padding: '7px 14px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(199, 154, 69, 0.15)'
              }}
            >
              <span>🆘</span> I'm Stuck — Ask Teacher
            </button>

            {/* Mobile Drawer Toggle */}
            <button
              onClick={() => setShowMobileSidebar(!showMobileSidebar)}
              className="lg:hidden"
              style={{
                background: 'rgba(247, 243, 234, 0.12)',
                color: '#F7F3EA',
                border: '1px solid rgba(247, 243, 234, 0.2)',
                padding: '7px 12px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              📋 Objectives
            </button>
          </div>
        </div>
      </header>

      {/* CLASSROOM CONTENT WRAPPER */}
      <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '24px 20px', display: 'flex', gap: '28px', flex: 1 }}>

        {/* MAIN CONTENT AREA: Primary Teaching Stage */}
        <main style={{ flex: 1, maxWidth: '860px', margin: '0 auto', width: '100%' }}>
          
          {/* Lesson Header Card */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2DACB',
              padding: '24px 28px',
              marginBottom: '24px',
              boxShadow: '0 4px 16px rgba(23, 32, 51, 0.04)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '10px' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ background: '#315C8C', color: '#FFFFFF', padding: '3px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Module {lesson.moduleNumber || 1}
                </span>
                {lesson.isFreePreview && (
                  <span style={{ background: '#F0FDF4', color: '#15803D', border: '1px solid #BBF7D0', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                    Free Preview
                  </span>
                )}
                {lesson.skillTags?.map(tag => (
                  <span key={tag} style={{ background: '#F4F7FB', color: '#315C8C', border: '1px solid #DCE5F0', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                    #{tag}
                  </span>
                ))}
              </div>

              <div style={{ color: '#687588', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>⏱</span>
                <span>{lesson.estimatedMinutes ? `${lesson.estimatedMinutes} min study` : '7 min study'}</span>
              </div>
            </div>

            <h1 style={{ color: '#172033', margin: '0 0 16px 0', fontSize: '1.9rem', fontWeight: 800, lineHeight: 1.3 }}>
              {lesson.title}
            </h1>

            {/* Teaching Stage Timeline */}
            <div style={{ background: '#FDFBF7', border: '1px solid #EFEAE1', borderRadius: '8px', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                <span style={{ color: currentStage === 'TEACH' ? '#315C8C' : '#94A3B8' }}>1. Teach</span>
                <span style={{ color: '#CBD5E1' }}>→</span>
                <span style={{ color: currentStage === 'DEMONSTRATE' ? '#315C8C' : '#94A3B8' }}>2. Demonstrate</span>
                <span style={{ color: '#CBD5E1' }}>→</span>
                <span style={{ color: currentStage === 'PRACTICE' ? '#315C8C' : '#94A3B8' }}>3. Practice</span>
                <span style={{ color: '#CBD5E1' }}>→</span>
                <span style={{ color: currentStage === 'CHECKPOINT' ? '#315C8C' : '#94A3B8' }}>4. Checkpoint</span>
                <span style={{ color: '#CBD5E1' }}>→</span>
                <span style={{ color: currentStage === 'RECAP' ? '#315C8C' : '#94A3B8' }}>5. Recap</span>
              </div>

              {sections.length > 1 && (
                <button
                  onClick={() => setProgressiveMode(!progressiveMode)}
                  style={{ background: 'none', border: 'none', color: '#315C8C', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline', padding: 0 }}
                >
                  {progressiveMode ? 'View All Steps' : 'Step-by-Step Mode'}
                </button>
              )}
            </div>

            {/* Guided Progress Indicator */}
            {progressiveMode && sections.length > 1 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#4E5A6C', marginBottom: '6px' }}>
                  <span>Class Progress: Step {currentStepIdx + 1} of {sections.length}</span>
                  <span style={{ fontWeight: 700, color: '#315C8C' }}>{Math.round(((currentStepIdx + 1) / sections.length) * 100)}%</span>
                </div>
                <div style={{ height: '6px', background: '#EFEAE1', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${((currentStepIdx + 1) / sections.length) * 100}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #315C8C 0%, #C79A45 100%)',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* ACTIVE SECTIONS LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {visibleSections.map((sec, idx) => {
              const Component = SECTION_REGISTRY[sec.type];

              if (Component) {
                const sectionProps = normalizeSectionProps(sec, {
                  lessonId,
                  onCheckpointComplete: handleCheckpointComplete
                });
                return <Component key={sec.id || idx} {...sectionProps} />;
              }

              return <SafeSectionFallback key={sec.id || idx} type={sec.type} />;
            })}
          </div>

          {/* Progressive "Continue to Next Step" button */}
          {progressiveMode && currentStepIdx < sections.length - 1 && (
            <div
              style={{
                marginTop: '32px',
                marginBottom: '32px',
                padding: '20px',
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2DACB',
                textAlign: 'center',
                boxShadow: '0 4px 16px rgba(23, 32, 51, 0.04)'
              }}
            >
              <div style={{ color: '#4E5A6C', fontSize: '0.92rem', marginBottom: '14px' }}>
                Ready for the next concept or exercise?
              </div>
              <button
                onClick={handleContinueStep}
                style={{
                  background: '#315C8C',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '13px 36px',
                  borderRadius: '8px',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(49, 92, 140, 0.25)',
                  transition: 'all 0.15s ease'
                }}
              >
                Continue to Next Step →
              </button>
            </div>
          )}

          {/* Checkpoint Quiz fallback if declared on lesson level */}
          {lesson.checkpoint && !completed && score === null && (!sections.some(s => s.type === 'checkpoint')) && (
            <div style={{ marginTop: '40px', paddingTop: '28px', borderTop: '2px solid #E2DACB' }}>
              <h2 style={{ marginBottom: '20px', color: '#172033', fontSize: '1.4rem' }}>Lesson Checkpoint</h2>
              <CheckpointQuiz
                questions={lesson.checkpoint.questions || lesson.checkpoint}
                lessonId={lessonId}
                onComplete={handleCheckpointComplete}
              />
            </div>
          )}

          {/* Checkpoint Completion Celebration Banner */}
          {score !== null && (
            <div
              style={{
                marginTop: '32px',
                padding: '32px 24px',
                background: score >= (lesson.checkpoint?.passingScore || 70) ? '#F0FDF4' : '#FFF9F0',
                border: `1.5px solid ${score >= (lesson.checkpoint?.passingScore || 70) ? '#BBF7D0' : '#F3DFC1'}`,
                borderRadius: '12px',
                textAlign: 'center'
              }}
            >
              <h2 style={{ color: score >= (lesson.checkpoint?.passingScore || 70) ? '#15803D' : '#8C6718', margin: '0 0 12px 0', fontSize: '1.5rem' }}>
                {score >= (lesson.checkpoint?.passingScore || 70) ? '🎉 Class Concepts Mastered!' : 'Almost there!'}
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#2B3545', marginBottom: '24px' }}>
                You scored {score}% on this lesson checkpoint.
              </p>

              {score >= (lesson.checkpoint?.passingScore || 70) ? (
                <button
                  onClick={handleNext}
                  style={{
                    background: '#15803D',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '12px 32px',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Continue to Next Class →
                </button>
              ) : (
                <button
                  onClick={() => setScore(null)}
                  style={{
                    background: '#8C6718',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '12px 32px',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Review Concepts & Try Again
                </button>
              )}
            </div>
          )}

          {/* Recommended Next Class Footer */}
          {nextLessonId && (
            <div
              style={{
                marginTop: '40px',
                padding: '24px 28px',
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2DACB',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                boxShadow: '0 4px 16px rgba(23, 32, 51, 0.04)'
              }}
            >
              <div>
                <span style={{ color: '#8C6718', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Next Class in Journey
                </span>
                <div style={{ color: '#172033', fontWeight: 700, fontSize: '1.15rem', marginTop: '4px' }}>
                  {getLocalLessonMeta(nextLessonId)?.title || SHOWCASE_LESSONS[nextLessonId]?.title || 'Next Class'}
                </div>
              </div>
              <Link
                to={`/learn/${nextLessonId}`}
                style={{
                  background: '#315C8C',
                  color: '#FFFFFF',
                  padding: '10px 24px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Next Class →
              </Link>
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR (Desktop Classroom Info) */}
        <aside
          className="hidden lg:block"
          style={{
            width: '320px',
            flexShrink: 0
          }}
        >
          <div style={{ position: 'sticky', top: '84px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Card 1: Learning Objectives */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2DACB',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 16px rgba(23, 32, 51, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid #EFEAE1', paddingBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#315C8C' }}>
                  Class Objectives
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803D', background: '#F0FDF4', padding: '2px 8px', borderRadius: '10px' }}>
                  {objectivesCompletedCount} / {objectives.length}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {objectives.map((obj, i) => {
                  const isDone = i < objectivesCompletedCount;
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem' }}>
                      <span
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          background: isDone ? '#22C55E' : '#EFEAE1',
                          color: isDone ? '#FFFFFF' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          flexShrink: 0,
                          marginTop: '2px'
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ color: isDone ? '#172033' : '#687588', lineHeight: 1.4, fontWeight: isDone ? 500 : 400 }}>
                        {obj}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card 2: Current Teaching Status */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2DACB',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 16px rgba(23, 32, 51, 0.04)'
              }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8C6718', marginBottom: '8px' }}>
                Current Teaching Stage
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#172033', marginBottom: '6px' }}>
                {currentStage === 'TEACH' && '🎓 Concept Presentation'}
                {currentStage === 'DEMONSTRATE' && '🔬 Visual Demonstration'}
                {currentStage === 'PRACTICE' && '💻 Guided Code Execution'}
                {currentStage === 'CHECKPOINT' && '🎯 Knowledge Checkpoint'}
                {currentStage === 'RECAP' && '📌 Summary & Takeaways'}
                {currentStage === 'GUIDE' && '📖 Guided Step'}
              </div>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#687588', lineHeight: 1.5 }}>
                Follow along with each step. Work through exercises attentively to solidify memory.
              </p>
            </div>

            {/* Card 3: Contextual Help Quick Trigger */}
            <div
              style={{
                background: '#FFF9F0',
                border: '1px solid #F3DFC1',
                borderRadius: '12px',
                padding: '18px 20px'
              }}
            >
              <div style={{ fontWeight: 700, color: '#8C6718', fontSize: '0.92rem', marginBottom: '6px' }}>
                Stuck on this concept?
              </div>
              <p style={{ margin: '0 0 12px 0', fontSize: '0.82rem', color: '#4E5A6C', lineHeight: 1.4 }}>
                The ATP Teacher can explain simply, demonstrate another example, or give a targeted hint.
              </p>
              <button
                onClick={() => setShowHelpModal(true)}
                style={{
                  width: '100%',
                  background: '#C79A45',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '9px 14px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Ask ATP Teacher
              </button>
            </div>

          </div>
        </aside>

      </div>

      {/* MOBILE OBJECTIVES DRAWER */}
      {showMobileSidebar && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(23, 32, 51, 0.6)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          onClick={() => setShowMobileSidebar(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              width: '85%',
              maxWidth: '340px',
              height: '100%',
              padding: '28px 20px',
              boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#172033', fontSize: '1.1rem' }}>Class Objectives</h3>
              <button
                onClick={() => setShowMobileSidebar(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#687588' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {objectives.map((obj, i) => {
                const isDone = i < objectivesCompletedCount;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem' }}>
                    <span
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        background: isDone ? '#22C55E' : '#EFEAE1',
                        color: isDone ? '#FFFFFF' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ color: isDone ? '#172033' : '#687588', lineHeight: 1.4 }}>
                      {obj}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CONTEXTUAL "I'M STUCK" ASSISTANCE MODAL */}
      {showHelpModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(23, 32, 51, 0.65)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowHelpModal(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '560px',
              width: '100%',
              padding: '32px',
              boxShadow: '0 20px 50px rgba(23, 32, 51, 0.25)',
              border: '1px solid #E2DACB',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowHelpModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#F7F3EA',
                border: 'none',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                fontSize: '1rem',
                cursor: 'pointer',
                color: '#687588',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#315C8C', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                👨‍🏫
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#172033', fontWeight: 700 }}>
                  ATP Teacher Assistance
                </h3>
                <span style={{ fontSize: '0.84rem', color: '#687588' }}>
                  Lesson: {lesson.title}
                </span>
              </div>
            </div>

            <p style={{ color: '#4E5A6C', fontSize: '0.92rem', marginBottom: '16px', lineHeight: 1.5 }}>
              How can I help you through this step? Choose an option:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
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
                ❓ Common Pitfall
              </button>
              <button
                onClick={() => setSelectedHelpTopic('hint')}
                style={helpBtnStyle(selectedHelpTopic === 'hint')}
              >
                🔑 Give Me a Hint
              </button>
            </div>

            {/* Answer Display */}
            {selectedHelpTopic && (
              <div
                style={{
                  background: '#FDFBF7',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid #EFEAE1',
                  borderLeft: '4px solid #315C8C',
                  fontSize: '0.94rem',
                  color: '#172033',
                  lineHeight: 1.6
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#315C8C', marginBottom: '6px' }}>
                  {helpData[selectedHelpTopic]?.title || 'Teacher Advice'}
                </div>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {helpData[selectedHelpTopic]?.content || DEFAULT_HELP_GUIDE[selectedHelpTopic]?.content}
                </div>
              </div>
            )}

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                onClick={() => setShowHelpModal(false)}
                style={{
                  background: '#315C8C',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '6px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Got It, Return to Class
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const helpBtnStyle = (isSelected) => ({
  padding: '10px 14px',
  borderRadius: '8px',
  border: `1.5px solid ${isSelected ? '#315C8C' : '#E2DACB'}`,
  background: isSelected ? '#F4F7FB' : '#FFFFFF',
  color: isSelected ? '#315C8C' : '#2B3545',
  textAlign: 'left',
  fontWeight: isSelected ? 700 : 500,
  cursor: 'pointer',
  fontSize: '0.86rem',
  transition: 'all 0.15s ease'
});

