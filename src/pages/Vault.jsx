import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LESSONS_LIST } from '../data/pythonCourse/course';
import { getMaterialAccess, requestDeviceTransfer } from '../lib/razorpay';
import {
  getDeviceName,
  hasLocalKeyPair,
  storeDeviceId,
  signChallenge,
} from '../lib/deviceCrypto';
import {
  getStoredSessionToken,
  isSessionTokenExpired,
  storeSessionToken,
  clearSessionToken,
  issueDeviceChallenge,
  verifyAndStartSession,
  refreshStudySession,
} from '../lib/studySession';
import ProtectedPdfViewer from '../components/ProtectedPdfViewer';
import { playUiBubbleSound } from '../lib/uiBubbleSound';
import './Auth.css';

const INITIAL_VAULT_MODULES = [
  {
    id: 3,
    num: '01',
    title: 'Module 1 - Simplified Notes',
    tag: 'MODULE 01 • 14 CHAPTERS',
    desc: 'Structured conceptual explanations with clear logic, code samples and exam notes.',
    badge: 'Core Concepts',
    active: true,
    is_free: true,
    content: [
      {
        section: 'Chapter 01: Core Architecture & Program Lifecycle',
        body: 'Understand execution models, memory segmentation (Stack, Heap, Data, Code), and how compilers map source instructions to target architecture.',
      },
      {
        section: 'Chapter 02: Control Structures & Execution Flow',
        body: 'Branching logic, evaluation of relational expressions, loop optimization techniques, and branch hazard minimization.',
      },
      {
        section: 'Chapter 03: Functions, Stack Frames & Recursion',
        body: 'Activation records, parameter passing (by value vs by reference), return address preservation, and stack overflow prevention.',
      },
    ],
  },
  {
    id: 'pyq_vault',
    num: '02',
    title: 'Previous Year Questions',
    tag: 'MODULE 02 • 50+ SOLVED',
    desc: 'Categorised by mark weightage (2, 5 & 10 marks) with step-by-step expected solutions.',
    badge: 'Solved Bank',
    active: false,
    content: [
      {
        section: 'Question Pattern: 5-Mark Concepts',
        body: 'Q: Compare static vs dynamic linking. A: Static linking resolves symbols at compile-time producing larger standalone binaries, whereas dynamic linking shares memory-mapped library routines.',
      },
      {
        section: 'Question Pattern: 10-Mark Analytical Problems',
        body: 'Q: Analyze cache memory mapping techniques (Direct, Associative, Set-Associative) with cache hit/miss timing equations.',
      },
    ],
  },
  {
    id: 'last_minute',
    num: '03',
    title: 'Last-Minute Revision',
    tag: 'MODULE 03 • 24-HR SPRINT',
    desc: 'Condensed memory triggers and execution rules designed for the night before the exam.',
    badge: 'High-Yield',
    active: false,
    content: [
      {
        section: 'The 10 Golden Checkpoints',
        body: '1. Operator precedence rules. 2. Storage classes (auto, static, extern, register). 3. Volatile keyword behavior in hardware registers.',
      },
      {
        section: 'Common Exam Pitfalls',
        body: 'Avoid off-by-one loop boundaries; Ensure string null terminators; Never dereference dangling pointers.',
      },
    ],
  },
  {
    id: 'important_q',
    num: '04',
    title: 'Important Questions',
    tag: 'MODULE 04 • PRIORITY MATRIX',
    desc: 'Curated high-probability exam concepts and repeated pattern checklist.',
    badge: 'High Priority',
    active: false,
    content: [
      {
        section: 'Priority Tier A (90%+ Probability)',
        body: 'Memory segmentation, Pointers arithmetic & function pointers, Interrupt Service Routines (ISR), Process synchronization.',
      },
      {
        section: 'Priority Tier B (75%+ Probability)',
        body: 'File I/O stream buffering, Bitwise manipulation tricks, Memory leaks & Valgrind debugging patterns.',
      },
    ],
  },
  {
    id: 'quick_recall',
    num: '05',
    title: 'Quick Recall Material',
    tag: 'MODULE 05 • FINAL MORNING',
    desc: 'Fast formula triggers and key definitions for the final morning review.',
    badge: 'Quick Recall',
    active: false,
    content: [
      {
        section: '5-Minute Memory Deck',
        body: 'DMA Controller states: Idle, Request, Transfer, Termination. Interrupt vs Polling latency comparison.',
      },
      {
        section: 'Final Checklist',
        body: 'Review register naming conventions, binary two-complement formulas, and standard library headers.',
      },
    ],
  },
];

function maskEmail(email) {
  if (!email || !email.includes('@')) return 'user***@atp.vault';
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
}

function getFriendlyErrorMessage(err) {
  const code = typeof err === 'string' ? err : err?.error || err?.message || '';

  if (code.includes('NO_ENTITLEMENT')) {
    return 'An active ATP Python Journey entitlement is required to view this material.';
  }
  if (code.includes('SESSION_REVOKED')) {
    return 'Your study session was revoked because a new session was started. Please reopen the module to continue.';
  }
  if (code.includes('SESSION_EXPIRED') || code.includes('SESSION_REQUIRED') || code.includes('SESSION_INVALID')) {
    return 'Your secure study session has expired. Re-authenticating your device...';
  }
  if (code.includes('DEVICE_REVOKED')) {
    return 'This device is no longer authorized. If you switched devices, please transfer your pack.';
  }
  if (code.includes('DEVICE_NOT_FOUND') || code.includes('NO_ACTIVE_DEVICE')) {
    return 'No registered study device found for this account. Please activate this device to proceed.';
  }
  if (code.includes('KEY_MISSING')) {
    return 'This browser no longer has the secure key for your registered study device.';
  }
  if (code.includes('material inactive') || code.includes('not active')) {
    return 'This study material is currently in preparation and will be published shortly.';
  }
  if (code.includes('Storage object missing') || code.includes('not found')) {
    return 'The requested study document is currently being updated on the secure server.';
  }
  return 'Unable to open study document securely. Please try again or refresh your session.';
}

function Vault() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState('checking'); // 'checking' | 'authorized' | 'needs-verification'
  const [entitlement, setEntitlement] = useState(null);
  const [modules, setModules] = useState(INITIAL_VAULT_MODULES);
  const [registeredDevice, setRegisteredDevice] = useState(null);
  
  const [entitlementLoading, setEntitlementLoading] = useState(true);
  const [progressLoading, setProgressLoading] = useState(true);
  const [progressError, setProgressError] = useState(false);
  const [materialsLoading, setMaterialsLoading] = useState(true);
  const [materialsError, setMaterialsError] = useState(false);
  // Python Journey State
  const [nextLesson, setNextLesson] = useState(null);
  const [keyMissing, setKeyMissing] = useState(false);
  const [keyMissingMessage, setKeyMissingMessage] = useState('');

  const [activeViewerModule, setActiveViewerModule] = useState(null);
  const [viewerLoading, setViewerLoading] = useState(false);
  const [viewerData, setViewerData] = useState(null);
  const [viewerError, setViewerError] = useState('');
  const [deviceBlocked, setDeviceBlocked] = useState(null);
  const [transferringDevice, setTransferringDevice] = useState(false);
  const [transferMessage, setTransferMessage] = useState('');

  /**
   * Ensures an active, non-expired study session exists.
   * If a valid session is already present in sessionStorage, it is reused.
   * If expired or missing, performs ECDSA P-256 challenge-response verification.
   */
  const ensureValidStudySession = useCallback(async (forceFresh = false) => {
    // 1. Session reuse: Check sessionStorage
    if (!forceFresh) {
      const storedToken = getStoredSessionToken();
      if (storedToken && !isSessionTokenExpired()) {
        return storedToken;
      }

      // If expired, attempt lightweight refresh first
      if (storedToken && isSessionTokenExpired()) {
        try {
          const refreshed = await refreshStudySession();
          if (refreshed?.ok && refreshed?.expires_at) {
            const freshToken = getStoredSessionToken();
            if (freshToken) return freshToken;
          }
        } catch (refreshErr) {
          console.warn('Study session refresh failed, proceeding to full challenge:', refreshErr.message);
          clearSessionToken();
        }
      }
    }

    // 2. Cryptographic challenge-response authentication
    const hasKeys = await hasLocalKeyPair();
    if (!hasKeys) {
      throw new Error('KEY_MISSING');
    }

    // Step A: Issue server challenge
    const challengeData = await issueDeviceChallenge();
    if (!challengeData?.challenge || !challengeData?.challenge_id) {
      throw new Error(challengeData?.message || challengeData?.error || 'Failed to issue device challenge');
    }

    // Step B: Browser signs challenge using non-exportable WebCrypto private key
    const signature = await signChallenge(challengeData.challenge);

    // Step C: Server verifies signature against stored public key and starts 4-hr session
    const verifyData = await verifyAndStartSession(
      challengeData.challenge_id,
      signature,
      challengeData.device_id
    );

    if (!verifyData?.session_token) {
      throw new Error(verifyData?.message || verifyData?.error || 'Device verification failed');
    }

    // Step D: Store session token in sessionStorage
    storeSessionToken(verifyData.session_token, verifyData.expires_at);

    return verifyData.session_token;
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function bootstrapDashboard() {
      // 1. Authenticate user (CRITICAL PATH)
      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user) {
        navigate('/login', { replace: true });
        return;
      }

      if (!isMounted) return;
      setUser(userData.user);
      
      // Render dashboard shell immediately
      setAuthStatus('authorized');

      const userId = userData.user.id;

      // 2. Fetch Entitlement (Parallel)
      const fetchEntitlement = async () => {
        try {
          const { data: entData, error: entError } = await supabase
            .from('entitlements')
            .select('*')
            .eq('user_id', userId)
            .eq('product_id', 'atp_complete')
            .eq('status', 'active')
            .maybeSingle();

          if (isMounted) {
            setEntitlement(entError || !entData ? null : entData);
          }
        } catch (err) {
          console.error('Error verifying entitlement:', err);
          if (isMounted) setEntitlement(null);
        } finally {
          if (isMounted) setEntitlementLoading(false);
        }
      };

      // 3. Fetch Python Journey Progress (Parallel)
      const fetchProgress = async () => {
        try {
          const { data: progressData, error } = await supabase
            .from('python_learning_progress')
            .select('lesson_id, status, best_score')
            .eq('user_id', userId);
            
          if (error) throw error;
          
          if (isMounted && progressData) {
            let nextL = null;
            for (const lesson of LESSONS_LIST) {
              const p = progressData.find(x => x.lesson_id === lesson.id);
              if (!p || p.status !== 'completed') {
                nextL = lesson;
                break;
              }
            }
            if (!nextL && LESSONS_LIST.length > 0) nextL = LESSONS_LIST[LESSONS_LIST.length - 1];
            setNextLesson(nextL);
          }
        } catch (e) {
          console.error("Progress fetch error:", e);
          if (isMounted) setProgressError(true);
        } finally {
          if (isMounted) setProgressLoading(false);
        }
      };

      // 4. Fetch Materials Metadata (Parallel)
      const fetchMaterials = async () => {
        try {
          const { data: dbMaterials, error } = await supabase
            .from('materials')
            .select('id, title, category, module_number, summary, active')
            .order('sort_order', { ascending: true });
            
          if (error) throw error;

          if (isMounted && dbMaterials && dbMaterials.length > 0) {
            setModules((prev) =>
              prev.map((mod) => {
                const match = dbMaterials.find(
                  (m) => String(m.id) === String(mod.id) || m.module_number === mod.num
                );
                if (match) {
                  return {
                    ...mod,
                    id: match.id,
                    title: match.title || mod.title,
                    desc: match.summary || mod.desc,
                    active: Boolean(match.active),
                  };
                }
                return mod;
              })
            );
          }
        } catch (matErr) {
          console.warn('Using local module definitions:', matErr.message);
          if (isMounted) setMaterialsError(true);
        } finally {
          if (isMounted) setMaterialsLoading(false);
        }
      };

      // Execute non-critical fetches in parallel
      fetchEntitlement();
      fetchProgress();
      fetchMaterials();
    }

    // Safety watchdog for the critical auth path
    const watchdog = setTimeout(() => {
      setAuthStatus((prev) => {
        if (prev === 'checking') {
          console.warn('[DashboardBootstrap] Auth check exceeded 8 seconds. Forcing fallback.');
          return 'error';
        }
        return prev;
      });
    }, 8000);

    bootstrapDashboard();

    return () => {
      isMounted = false;
      clearTimeout(watchdog);
    };
  }, [navigate]);

  async function handleLogout() {
    clearSessionToken();
    await supabase.auth.signOut();
    navigate('/login');
  }

  /**
   * Opens module inside secure watermarked reader
   */
  async function handleOpenModule(mod) {
    // Inactive materials must NEVER call getMaterialAccess
    if (!mod.active) {
      return;
    }

    setActiveViewerModule(mod);
    setViewerLoading(true);
    setViewerData(null);
    setDeviceBlocked(null);
    setViewerError('');

    try {
      // 1. Ensure active study session token
      let sessionToken;
      try {
        sessionToken = await ensureValidStudySession();
      } catch (sessionErr) {
        if (sessionErr.message === 'KEY_MISSING') {
          setKeyMissing(true);
          setKeyMissingMessage(
            'This browser no longer has the secure key for your registered study device.'
          );
          setViewerLoading(false);
          return;
        }
        throw sessionErr;
      }

      // 2. Request short-lived signed material access
      let accessResponse;
      try {
        accessResponse = await getMaterialAccess(mod.id, sessionToken, mod.is_free);
      } catch (accessErr) {
        const errStr = String(accessErr?.message || accessErr?.error || '');
        // If session expired or invalid, clear token and retry ONCE with fresh challenge
        if (
          errStr.includes('SESSION_EXPIRED') ||
          errStr.includes('SESSION_INVALID') ||
          errStr.includes('SESSION_REQUIRED') ||
          errStr.includes('SESSION_REVOKED')
        ) {
          clearSessionToken();
          const freshToken = await ensureValidStudySession(true);
          accessResponse = await getMaterialAccess(mod.id, freshToken, mod.is_free);
        } else {
          throw accessErr;
        }
      }

      if (accessResponse?.error === 'DEVICE_BLOCKED' || accessResponse?.error === 'DEVICE_REVOKED') {
        setDeviceBlocked(accessResponse);
        setViewerLoading(false);
        return;
      }

      if (accessResponse?.error) {
        setViewerError(getFriendlyErrorMessage(accessResponse.error));
        setViewerLoading(false);
        return;
      }

      setViewerData(accessResponse);
    } catch (err) {
      console.warn('Material access notice:', err.message);
      const friendly = getFriendlyErrorMessage(err.message || err.error);
      setViewerError(friendly);
    } finally {
      setViewerLoading(false);
    }
  }

  function handleCloseViewer() {
    setActiveViewerModule(null);
    setViewerData(null);
    setViewerError('');
    setDeviceBlocked(null);
    setTransferMessage('');
  }

  /**
   * Device transfer flow for current device
   */
  async function handleDeviceTransfer() {
    setTransferringDevice(true);
    setTransferMessage('');

    try {
      // 1. Clear old local keys
      await clearDeviceKeys();

      // 2. Generate new non-exportable WebCrypto key pair
      const { publicKeyJwk } = await generateDeviceKeyPair();
      const deviceName = getDeviceName();

      // 3. Request server-side device transfer
      const res = await requestDeviceTransfer(
        publicKeyJwk,
        deviceName,
        'User transferred study pack to current browser'
      );

      if (res?.error === 'TRANSFER_RATE_LIMITED') {
        const cooldownDate = res.next_transfer_available
          ? new Date(res.next_transfer_available).toLocaleDateString()
          : 'a few days';
        setTransferMessage(
          `Device transfer is limited to once every 7 days for account security. Available again after ${cooldownDate}.`
        );
        return;
      }

      if (!res?.success) {
        throw new Error(res?.message || res?.error || 'Device transfer failed');
      }

      // 4. Store newly registered device_id locally
      await storeDeviceId(res.new_device_id);

      // 5. Clear old study session
      clearSessionToken();

      setRegisteredDevice({
        id: res.new_device_id,
        device_name: res.new_device_name || deviceName,
        status: 'active',
      });
      setKeyMissing(false);
      setDeviceBlocked(null);
      setTransferMessage('Device transfer approved! Your study pack is now bound to this device.');

      // 6. Establish a fresh study session
      await ensureValidStudySession(true);

      // If active viewer was waiting, reload
      if (activeViewerModule && activeViewerModule.active) {
        handleOpenModule(activeViewerModule);
      }
    } catch (err) {
      console.error('Device transfer error:', err);
      setTransferMessage(err.message || 'Failed to complete device transfer.');
    } finally {
      setTransferringDevice(false);
    }
  }

  if (authStatus === 'checking' || !user) {
    return (
      <main className="auth-page" style={{ transition: 'opacity 0.3s ease-out' }}>
        <div className="auth-card" style={{ textAlign: 'center', maxWidth: '420px', padding: '32px 24px', margin: '0 auto', boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <div className="payment-spinner" style={{ margin: '0 auto 16px', width: '36px', height: '36px', borderWidth: '3px' }} aria-hidden="true"></div>
          <h3 style={{ color: 'var(--text)', marginBottom: '6px', fontSize: '1.2rem' }}>Preparing your workspace...</h3>
          <p style={{ color: 'var(--muted)', margin: 0, fontSize: "0.9rem", opacity: 0.85 }}>Loading your Python Journey and progress.</p>
        </div>
      </main>
    );
  }

  const watermarkText = `ATP REVISION VAULT • Licensed to: ${viewerData?.watermark?.licensed_to || maskEmail(user?.email || '')} • Ref: ${viewerData?.watermark?.order_id || entitlement?.payment_id || 'REF_ACTIVE'} • Personal Study Access`;

  return (
    <div className="vault-page">
      {/* Top Bar */}
      <header className="quiet-topbar">
        <Link className="auth-brand" to="/">
          <span className="auth-brand-icon">A</span>
          <div className="auth-brand-text">
            <strong>ATP Python Journey</strong>
            <span>STUDENT WORKSPACE</span>
          </div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span className="vault-active-chip">
            <span className="vault-active-dot"></span> Active Entitlement
          </span>
          <button
            type="button"
            onClick={() => { playUiBubbleSound(); handleLogout(); }}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              backgroundColor: 'transparent',
              fontSize: '12.5px',
              color: 'var(--muted-brown)',
              cursor: 'pointer',
            }}
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="vault-container">
        {/* ==================================================================
            ATP PYTHON JOURNEY (PREMIUM / PREVIEW)
            ================================================================== */}
        {entitlementLoading ? (
          <section style={{ background: '#fff', borderRadius: '12px', padding: '32px', marginBottom: '32px', border: '1px solid var(--border)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)' }}>Loading Python Journey...</p>
          </section>
        ) : entitlement ? (
          <section style={{ background: '#fff', borderRadius: '12px', padding: '32px', marginBottom: '32px', border: '1px solid var(--border)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <span className="auth-eyebrow">YOUR PYTHON JOURNEY</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '2.2rem', margin: '8px 0', color: 'var(--text)' }}>
                  Continue Learning
                </h2>
                {progressError ? (
                  <div style={{ marginBottom: '24px' }}>
                    <p style={{ color: 'var(--burgundy)', fontSize: '1.1rem', margin: '0 0 12px 0' }}>Progress couldn't be loaded.</p>
                    <button type="button" className="btn-secondary" onClick={() => window.location.reload()}>Retry</button>
                  </div>
                ) : progressLoading ? (
                  <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginBottom: '24px' }}>Loading progress...</p>
                ) : (
                  <>
                    <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginBottom: '24px' }}>
                      {nextLesson ? `${nextLesson.title} • ${nextLesson.estimatedMinutes} min` : 'You are up to date!'}
                    </p>
                    
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <Link to={nextLesson ? `/learn/${nextLesson.id}` : '/learn'} className="btn-primary" style={{ padding: '12px 32px', fontSize: '1.1rem', textDecoration: 'none' }}>
                        Continue →
                      </Link>
                      <Link to="/learn" className="btn-secondary" style={{ padding: '12px 24px', fontSize: '1.1rem', textDecoration: 'none' }}>
                        Course Map
                      </Link>
                    </div>
                  </>
                )}
              </div>
              
              <div style={{ background: '#f6f8fa', padding: '24px', borderRadius: '12px', minWidth: '250px' }}>
                <h4 style={{ margin: '0 0 12px 0', color: 'var(--text)' }}>Today's Mission</h4>
                <ul style={{ paddingLeft: '20px', margin: '0 0 16px 0', color: 'var(--muted-brown)' }}>
                  <li style={{ marginBottom: '8px' }}>Finish "{nextLesson?.title || 'next lesson'}"</li>
                  <li style={{ marginBottom: '8px' }}>Solve one coding challenge</li>
                  <li>Complete Checkpoint</li>
                </ul>
              </div>
            </div>
          </section>
        ) : (
          <section style={{ background: '#0d1117', borderRadius: '12px', padding: '40px', marginBottom: '32px', color: '#fff', textAlign: 'center' }}>
            <span style={{ color: '#8b949e', fontWeight: 700, letterSpacing: '1px', fontSize: '0.85rem' }}>ACADEMIC EDITION</span>
            <h1 style={{ fontSize: '2.5rem', margin: '16px 0' }}>Learn First-Year Python From Zero</h1>
            <p style={{ fontSize: '1.1rem', color: '#c9d1d9', maxWidth: '600px', margin: '0 auto 32px auto', lineHeight: '1.6' }}>
              ATP takes you from algorithms and flowcharts to writing real Python programs — one short, interactive lesson at a time.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/payment" className="btn-primary" style={{ padding: '12px 32px', fontSize: '1.1rem', textDecoration: 'none', background: '#238636', borderColor: 'rgba(240,246,252,0.1)' }}>
                Unlock Python Journey — ₹49
              </Link>
              <Link to="/learn/m1-problem-solving-intro" className="btn-secondary" style={{ padding: '12px 24px', fontSize: '1.1rem', textDecoration: 'none', background: 'transparent', color: '#c9d1d9', borderColor: '#30363d' }}>
                Try Free Lesson
              </Link>
            </div>
          </section>
        )}

        {/* Quick Shortcuts: Practical Lab & Exam Practice */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '1.4rem' }}>🧪</span>
            <h3 style={{ margin: '8px 0 6px 0', fontSize: '1.2rem', color: 'var(--text)' }}>Practical Lab (18 Experiments)</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--muted)', fontSize: '0.9rem' }}>Real Pyodide execution, virtual modules, viva practice & lab readiness score.</p>
            <Link to="/learn/lab" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block', padding: '8px 18px', fontSize: '0.9rem' }}>
              Open Practical Lab →
            </Link>
          </div>

          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '1.4rem' }}>📝</span>
            <h3 style={{ margin: '8px 0 6px 0', fontSize: '1.2rem', color: 'var(--text)' }}>ESE Exam Practice (60 Marks)</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--muted)', fontSize: '0.9rem' }}>Part A (24 marks) & Part B (36 marks) practice with rubric self-check.</p>
            <Link to="/learn/exam" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block', padding: '8px 18px', fontSize: '0.9rem', background: '#315C8C', color: '#F7F3EA', border: 'none' }}>
              Open Exam Practice →
            </Link>
          </div>
        </div>

        <div style={{ marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text)', margin: 0 }}>Study Material — Included with your Python Journey</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>Notes &PYQs</span>
        </div>

        {/* 5 Vault Study Modules */}
        {materialsError ? (
          <div style={{ padding: '40px', textAlign: 'center', background: '#fff', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--burgundy)', marginBottom: '16px' }}>Revision materials couldn't be loaded.</p>
            <button type="button" className="btn-secondary" onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : materialsLoading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
             <p style={{ color: 'var(--muted)' }}>Loading materials...</p>
          </div>
        ) : (
          <section className="vault-grid">
            {modules.map((mod) => (
              <article className="vault-card" key={mod.id}>
                <div className="vault-card-header">
                  <span className="vault-tag">
                    {mod.active ? mod.tag : `${mod.tag} • IN PREPARATION`}
                  </span>
                  <span className="vault-badge">
                    {mod.active ? mod.badge : 'Coming Soon'}
                  </span>
                </div>
                <h3>{mod.title}</h3>
                <p>{mod.desc}</p>
                <div className="vault-footer">
                  <span className="vault-status-text">
                    {mod.active ? '🔒 Device-Protected' : '⏳ In Preparation'}
                  </span>
                  {mod.active ? (
                    <button
                      type="button"
                      className="vault-open-btn"
                      onClick={() => { playUiBubbleSound(); handleOpenModule(mod); }}
                    >
                      Study Module →
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="vault-open-btn"
                      disabled
                      style={{ opacity: 0.6, cursor: 'not-allowed' }}
                      aria-label={`${mod.title} is currently in preparation`}
                    >
                      In Preparation
                    </button>
                  )}
                </div>
              </article>
            ))}
          </section>
        )}

        {/* Device Binding Status Strip */}
        <div className="vault-device-strip">
          <span style={{ fontSize: '15px' }}>📱</span>
          <span>
            Bound to your registered device: <strong>{registeredDevice?.device_name || getDeviceName()}</strong> (Single-Student Study Session)
          </span>
        </div>
      </main>

      {/* ==================================================================
          KEY MISSING MODAL (BROWSER NO LONGER HAS SECURE KEY)
          ================================================================== */}
      {keyMissing && (
        <div className="vault-modal-backdrop" onClick={() => setKeyMissing(false)}>
          <div className="vault-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="vault-modal-header" style={{ borderColor: 'rgba(129, 62, 81, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>⚠️</span>
                <h3 style={{ margin: 0, color: 'var(--burgundy)', fontFamily: 'var(--font-serif)' }}>
                  Device Authentication Required
                </h3>
              </div>
              <button type="button" className="drawer-close-btn" onClick={() => setKeyMissing(false)}>✕</button>
            </div>

            <div style={{ padding: '24px 28px' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--burgundy)', margin: '0 0 12px' }}>
                {keyMissingMessage || 'This browser no longer has the secure key for your registered study device.'}
              </p>

              <p style={{ fontSize: '13.5px', color: 'var(--muted-brown)', lineHeight: 1.6, margin: '0 0 16px' }}>
                Your study pack is currently registered to{' '}
                <strong>{registeredDevice?.device_name || 'your primary study device'}</strong>.
                To access your study materials on this browser, you can transfer your study pack to this device ({getDeviceName()}).
              </p>

              {transferMessage && (
                <div style={{
                  padding: '10px 14px',
                  backgroundColor: transferMessage.includes('approved') ? 'var(--green-light)' : 'rgba(129, 62, 81, 0.08)',
                  border: `1px solid ${transferMessage.includes('approved') ? 'rgba(49, 94, 82, 0.25)' : 'rgba(129, 62, 81, 0.25)'}`,
                  borderRadius: '6px',
                  color: transferMessage.includes('approved') ? 'var(--green)' : 'var(--burgundy)',
                  fontSize: '12.5px',
                  marginBottom: '16px'
                }}>
                  {transferMessage}
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setKeyMissing(false)}
                  style={{ width: 'auto', padding: '10px 18px', fontSize: '12.5px' }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={(e) => { playUiBubbleSound(); handleDeviceTransfer(e); }}
                  disabled={transferringDevice}
                  style={{ width: 'auto', padding: '10px 20px', fontSize: '12.5px' }}
                >
                  {transferringDevice ? 'Transferring Device...' : 'Transfer Pack To This Device →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================
          DEVICE BLOCKED MODAL (ONE-PERSON ACCESS SYSTEM)
          ================================================================== */}
      {deviceBlocked && (
        <div className="vault-modal-backdrop" onClick={handleCloseViewer}>
          <div className="vault-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="vault-modal-header" style={{ borderColor: 'rgba(129, 62, 81, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>⚠️</span>
                <h3 style={{ margin: 0, color: 'var(--burgundy)', fontFamily: 'var(--font-serif)' }}>
                  This study pack is activated on another device
                </h3>
              </div>
              <button type="button" className="drawer-close-btn" onClick={handleCloseViewer}>✕</button>
            </div>

            <div style={{ padding: '24px 28px' }}>
              <p style={{ fontSize: '13.5px', color: 'var(--muted-brown)', lineHeight: 1.6, margin: '0 0 16px' }}>
                For account security and exam integrity, each student pack is bound to one active primary device.
              </p>

              <div style={{ padding: '14px 18px', backgroundColor: 'var(--paper)', border: '1px solid var(--border)', borderRadius: '6px', marginBottom: '20px' }}>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--ink)' }}>
                  Currently Registered Device:
                </span>
                <span style={{ fontSize: '13px', color: 'var(--muted-brown)' }}>
                  {deviceBlocked.registered_device || registeredDevice?.device_name || 'Your primary study device'}
                </span>
              </div>

              {transferMessage && (
                <div style={{
                  padding: '10px 14px',
                  backgroundColor: transferMessage.includes('approved') ? 'var(--green-light)' : 'rgba(129, 62, 81, 0.08)',
                  border: `1px solid ${transferMessage.includes('approved') ? 'rgba(49, 94, 82, 0.25)' : 'rgba(129, 62, 81, 0.25)'}`,
                  borderRadius: '6px',
                  color: transferMessage.includes('approved') ? 'var(--green)' : 'var(--burgundy)',
                  fontSize: '12.5px',
                  marginBottom: '16px'
                }}>
                  {transferMessage}
                </div>
              )}

              <p style={{ fontSize: '12.5px', color: 'var(--muted)', margin: '0 0 20px' }}>
                Replaced your phone or laptop? You can transfer your active study pack to this current device ({getDeviceName()}).
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCloseViewer}
                  style={{ width: 'auto', padding: '10px 18px', fontSize: '12.5px' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={(e) => { playUiBubbleSound(); handleDeviceTransfer(e); }}
                  disabled={transferringDevice}
                  style={{ width: 'auto', padding: '10px 20px', fontSize: '12.5px' }}
                >
                  {transferringDevice ? 'Transferring...' : 'Request Device Transfer →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================
          PROTECTED STUDY VIEWER WITH PERSISTENT SUBTLE WATERMARK
          ================================================================== */}
      {/* ==================================================================
          CUSTOM PROTECTED PDF.JS CANVAS READER (NO NATIVE IFRAME)
          ================================================================== */}
      {activeViewerModule && !deviceBlocked && viewerData?.signedUrl && (
        <ProtectedPdfViewer
          pdfUrl={viewerData.signedUrl}
          title={activeViewerModule.title}
          watermark={
            viewerData.watermark || {
              brand: 'ATP REVISION VAULT',
              licensed_to: maskEmail(user?.email || ''),
              order_id: entitlement?.payment_id || 'REF_ACTIVE',
            }
          }
          onClose={handleCloseViewer}
        />
      )}

      {/* ==================================================================
          FALLBACK STUDY VIEWER & LOADING/ERROR MODAL
          ================================================================== */}
      {activeViewerModule && !deviceBlocked && !viewerData?.signedUrl && (
        <div className="vault-modal-backdrop" onClick={handleCloseViewer}>
          <div
            className="vault-viewer-card"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* Viewer Top Bar */}
            <div className="vault-viewer-header">
              <div className="vault-viewer-title-group">
                <span className="vault-viewer-badge">{activeViewerModule.tag}</span>
                <h2>{activeViewerModule.title}</h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="vault-viewer-sec-badge">
                  🔒 Encrypted • {viewerData?.expiresIn ? `Signed (${viewerData.expiresIn}s)` : 'Secure Session'}
                </span>
                <button
                  type="button"
                  className="drawer-close-btn"
                  onClick={handleCloseViewer}
                  aria-label="Close Reader"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Viewer Content Surface with Dynamic Diagonal Repeating Watermark */}
            <div className="vault-viewer-surface">
              {/* PERSISTENT SUBTLE WATERMARK OVERLAY */}
              <div className="watermark-overlay" aria-hidden="true">
                <div className="watermark-grid">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <span className="watermark-item" key={i}>
                      {watermarkText}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reader Body */}
              {viewerLoading ? (
                <div style={{ padding: '32px 24px', textAlign: 'center', maxWidth: '420px', margin: '0 auto', transition: 'opacity 0.3s ease-out' }}>
                  <div className="payment-spinner" style={{ margin: '0 auto 16px', width: '36px', height: '36px', borderWidth: '3px' }} aria-hidden="true"></div>
                  <h3 style={{ color: 'var(--text)', marginBottom: '6px', fontSize: '1.2rem' }}>Opening your revision notes...</h3>
                  <p style={{ color: 'var(--muted)', margin: 0, fontSize: "0.9rem", opacity: 0.85 }}>
                    Preparing your secure study copy.
                  </p>
                </div>
              ) : viewerError ? (
                <div style={{ padding: '60px 24px', textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
                  <span style={{ fontSize: '36px', display: 'block', marginBottom: '16px' }}>🔒</span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--burgundy)', marginBottom: '8px' }}>
                    Access Notice
                  </h3>
                  <p style={{ color: 'var(--muted-brown)', fontSize: '13.5px', lineHeight: 1.6, marginBottom: '24px' }}>
                    {viewerError}
                  </p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => handleOpenModule(activeViewerModule)}
                    style={{ width: 'auto', padding: '10px 22px', fontSize: '13px', margin: '0 auto' }}
                  >
                    Retry Access
                  </button>
                </div>
              ) : (
                <div className="vault-study-content">
                  {/* In-App Study Fallback Reader */}
                  <div className="module-interactive-reader">
                    <div className="reader-meta-box">
                      <span className="auth-eyebrow" style={{ margin: 0 }}>OFFICIAL SYLLABUS MATERIAL</span>
                      <h3 style={{ margin: '6px 0 8px', fontFamily: 'var(--font-serif)' }}>
                        {activeViewerModule.title}
                      </h3>
                      <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--muted-brown)' }}>
                        {activeViewerModule.desc}
                      </p>
                    </div>

                    {activeViewerModule.content?.map((section, idx) => (
                      <div className="reader-section-block" key={idx}>
                        <h4>{section.section}</h4>
                        <p>{section.body}</p>
                      </div>
                    ))}

                    <div className="reader-security-footer">
                      <span>Protected Academic Material • ATP Python Journey</span>
                      <span>Personal Study License: {maskEmail(user.email)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vault;
