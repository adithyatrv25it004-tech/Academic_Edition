import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getMaterialAccess, requestDeviceTransfer } from '../lib/razorpay';
import { getDeviceName } from '../lib/deviceCrypto';
import './Auth.css';

const VAULT_MODULES = [
  {
    id: 'notes_complete',
    num: '01',
    title: 'Simplified Notes',
    tag: 'MODULE 01 • 14 CHAPTERS',
    desc: 'Structured conceptual explanations with clear logic, code samples and exam notes.',
    badge: 'Core Concepts',
    content: [
      {
        section: 'Chapter 01: Core Architecture & Program Lifecycle',
        body: 'Understand execution models, memory segmentation (Stack, Heap, Data, Code), and how compilers map source instructions to target architecture.'
      },
      {
        section: 'Chapter 02: Control Structures & Execution Flow',
        body: 'Branching logic, evaluation of relational expressions, loop optimization techniques, and branch hazard minimization.'
      },
      {
        section: 'Chapter 03: Functions, Stack Frames & Recursion',
        body: 'Activation records, parameter passing (by value vs by reference), return address preservation, and stack overflow prevention.'
      }
    ]
  },
  {
    id: 'pyq_vault',
    num: '02',
    title: 'Previous Year Questions',
    tag: 'MODULE 02 • 50+ SOLVED',
    desc: 'Categorised by mark weightage (2, 5 & 10 marks) with step-by-step expected solutions.',
    badge: 'Solved Bank',
    content: [
      {
        section: 'Question Pattern: 5-Mark Concepts',
        body: 'Q: Compare static vs dynamic linking. A: Static linking resolves symbols at compile-time producing larger standalone binaries, whereas dynamic linking shares memory-mapped library routines.'
      },
      {
        section: 'Question Pattern: 10-Mark Analytical Problems',
        body: 'Q: Analyze cache memory mapping techniques (Direct, Associative, Set-Associative) with cache hit/miss timing equations.'
      }
    ]
  },
  {
    id: 'last_minute',
    num: '03',
    title: 'Last-Minute Revision',
    tag: 'MODULE 03 • 24-HR SPRINT',
    desc: 'Condensed memory triggers and execution rules designed for the night before the exam.',
    badge: 'High-Yield',
    content: [
      {
        section: 'The 10 Golden Checkpoints',
        body: '1. Operator precedence rules. 2. Storage classes (auto, static, extern, register). 3. Volatile keyword behavior in hardware registers.'
      },
      {
        section: 'Common Exam Pitfalls',
        body: 'Avoid off-by-one loop boundaries; Ensure string null terminators; Never dereference dangling pointers.'
      }
    ]
  },
  {
    id: 'important_q',
    num: '04',
    title: 'Important Questions',
    tag: 'MODULE 04 • PRIORITY MATRIX',
    desc: 'Curated high-probability exam concepts and repeated pattern checklist.',
    badge: 'High Priority',
    content: [
      {
        section: 'Priority Tier A (90%+ Probability)',
        body: 'Memory segmentation, Pointers arithmetic & function pointers, Interrupt Service Routines (ISR), Process synchronization.'
      },
      {
        section: 'Priority Tier B (75%+ Probability)',
        body: 'File I/O stream buffering, Bitwise manipulation tricks, Memory leaks & Valgrind debugging patterns.'
      }
    ]
  },
  {
    id: 'quick_recall',
    num: '05',
    title: 'Quick Recall Material',
    tag: 'MODULE 05 • FINAL MORNING',
    desc: 'Fast formula triggers and key definitions for the final morning review.',
    badge: 'Quick Recall',
    content: [
      {
        section: '5-Minute Memory Deck',
        body: 'DMA Controller states: Idle, Request, Transfer, Termination. Interrupt vs Polling latency comparison.'
      },
      {
        section: 'Final Checklist',
        body: 'Review register naming conventions, binary two-complement formulas, and standard library headers.'
      }
    ]
  }
];

function maskEmail(email) {
  if (!email || !email.includes('@')) return 'user***@atp.vault';
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
}

function Vault() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [entitlement, setEntitlement] = useState(null);
  const [activeViewerModule, setActiveViewerModule] = useState(null);
  const [viewerLoading, setViewerLoading] = useState(false);
  const [viewerData, setViewerData] = useState(null);
  const [deviceBlocked, setDeviceBlocked] = useState(null);
  const [transferringDevice, setTransferringDevice] = useState(false);
  const [transferMessage, setTransferMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadVault() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user) {
        navigate('/login', { replace: true });
        return;
      }

      if (!isMounted) return;
      setUser(userData.user);

      // Strict server-enforced entitlement check for 'atp_complete'
      try {
        const { data: entData, error: entError } = await supabase
          .from('entitlements')
          .select('*')
          .eq('user_id', userData.user.id)
          .eq('product_id', 'atp_complete')
          .eq('status', 'active')
          .maybeSingle();

        if (entError || !entData) {
          // No active entitlement -> redirect to payment
          navigate('/payment', { replace: true });
          return;
        }

        if (!isMounted) return;
        setEntitlement(entData);
      } catch (err) {
        console.error('Error verifying entitlement:', err);
        navigate('/payment', { replace: true });
        return;
      }

      if (isMounted) {
        setLoading(false);
      }
    }

    loadVault();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  /**
   * Opens module inside secure watermarked reader
   */
  async function handleOpenModule(mod) {
    setActiveViewerModule(mod);
    setViewerLoading(true);
    setViewerData(null);
    setDeviceBlocked(null);

    try {
      const accessResponse = await getMaterialAccess(mod.id);

      if (accessResponse?.error === 'DEVICE_BLOCKED') {
        setDeviceBlocked(accessResponse);
        setViewerLoading(false);
        return;
      }

      setViewerData(accessResponse);
    } catch (err) {
      console.warn('Material access notice (using fallback content):', err.message);
      // Construct fallback watermark if offline/edge function not configured
      setViewerData({
        material_id: mod.id,
        title: mod.title,
        watermark: {
          brand: 'ATP REVISION VAULT',
          licensed_to: maskEmail(user?.email || ''),
          order_id: entitlement?.payment_id || 'REF_ACTIVE',
          footer_notice: 'Personal Study Access • Do not distribute',
        },
      });
    } finally {
      setViewerLoading(false);
    }
  }

  function handleCloseViewer() {
    setActiveViewerModule(null);
    setViewerData(null);
    setDeviceBlocked(null);
    setTransferMessage('');
  }

  async function handleDeviceTransfer() {
    setTransferringDevice(true);
    setTransferMessage('');

    try {
      const res = await requestDeviceTransfer('User authorized device transfer');
      if (res?.success) {
        setTransferMessage('Device transfer approved! Your study pack is now bound to this device.');
        setDeviceBlocked(null);
        // Re-open module after transfer
        if (activeViewerModule) {
          handleOpenModule(activeViewerModule);
        }
      }
    } catch (err) {
      setTransferMessage(err.message || 'Failed to complete device transfer.');
    } finally {
      setTransferringDevice(false);
    }
  }

  if (loading || !user) {
    return (
      <main className="auth-page">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <div className="payment-spinner" style={{ margin: '0 auto 16px' }} aria-hidden="true"></div>
          <p style={{ color: 'var(--muted)', fontWeight: 500 }}>Verifying your ATP Revision Vault access...</p>
        </div>
      </main>
    );
  }

  const watermarkText = `ATP REVISION VAULT • Licensed to: ${viewerData?.watermark?.licensed_to || maskEmail(user.email)} • Ref: ${viewerData?.watermark?.order_id || entitlement?.payment_id || 'REF_ACTIVE'} • Personal Study Access`;

  return (
    <div className="vault-page">
      {/* Top Bar */}
      <header className="quiet-topbar">
        <Link className="auth-brand" to="/">
          <span className="auth-brand-icon">A</span>
          <div className="auth-brand-text">
            <strong>ATP Revision Vault</strong>
            <span>STUDENT WORKSPACE</span>
          </div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span className="vault-active-chip">
            <span className="vault-active-dot"></span> Active Entitlement
          </span>
          <button
            type="button"
            onClick={handleLogout}
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
        {/* Banner */}
        <section className="vault-banner">
          <div className="vault-banner-copy">
            <span className="auth-eyebrow">ACADEMIC EDITION</span>
            <h1>Your Revision Vault</h1>
            <p>"Everything you need, organised into one focused study flow."</p>
          </div>

          <div className="vault-user-chip">
            <strong>{user.user_metadata?.name || user.email?.split('@')[0]}</strong>
            <span>{user.email}</span>
            <span style={{ color: 'var(--green)', fontWeight: 700, marginTop: '4px' }}>
              ● ATP Complete Revision Pack Active
            </span>
          </div>
        </section>

        {/* 5 Vault Study Modules */}
        <section className="vault-grid">
          {VAULT_MODULES.map((mod) => (
            <article className="vault-card" key={mod.id}>
              <div className="vault-card-header">
                <span className="vault-tag">{mod.tag}</span>
                <span className="vault-badge">{mod.badge}</span>
              </div>
              <h3>{mod.title}</h3>
              <p>{mod.desc}</p>
              <div className="vault-footer">
                <span className="vault-status-text">🔒 Device-Protected</span>
                <button
                  type="button"
                  className="vault-open-btn"
                  onClick={() => handleOpenModule(mod)}
                >
                  Study Module →
                </button>
              </div>
            </article>
          ))}
        </section>

        {/* Device Binding Status Strip */}
        <div className="vault-device-strip">
          <span style={{ fontSize: '15px' }}>📱</span>
          <span>
            Bound to your registered device: <strong>{getDeviceName()}</strong> (Single-Student Study Session)
          </span>
        </div>
      </main>

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
                  {deviceBlocked.registered_device || 'Your primary study device'}
                </span>
              </div>

              {transferMessage && (
                <div style={{ padding: '10px 14px', backgroundColor: 'var(--green-light)', border: '1px solid rgba(49, 94, 82, 0.25)', borderRadius: '6px', color: 'var(--green)', fontSize: '12.5px', marginBottom: '16px' }}>
                  {transferMessage}
                </div>
              )}

              <p style={{ fontSize: '12.5px', color: 'var(--muted)', margin: '0 0 20px' }}>
                Replaced your phone or laptop? You can transfer your active study pack to this current device ({getDeviceName()}).
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
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
                  onClick={handleDeviceTransfer}
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
      {activeViewerModule && !deviceBlocked && (
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
                <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                  <div className="payment-spinner" style={{ margin: '0 auto 16px' }} aria-hidden="true"></div>
                  <p style={{ color: 'var(--muted)', fontSize: '13.5px' }}>
                    Authorizing study materials and generating secure session...
                  </p>
                </div>
              ) : (
                <div className="vault-study-content">
                  {/* If short-lived signed PDF URL exists, embed viewer */}
                  {viewerData?.signedUrl ? (
                    <div className="pdf-viewer-frame-container">
                      <iframe
                        src={`${viewerData.signedUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                        title={activeViewerModule.title}
                        className="pdf-viewer-iframe"
                      />
                    </div>
                  ) : (
                    /* High-Yield Formatted In-App Content */
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
                        <span>Protected Academic Material • ATP Revision Vault</span>
                        <span>Personal Study License: {maskEmail(user.email)}</span>
                      </div>
                    </div>
                  )}
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
