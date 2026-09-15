import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import bookImage from "../assets/atp-revision-book.png";
import { useScrollReveal } from "../lib/useScrollReveal";
import "../App.css";
import "./Auth.css";

const WHATS_INCLUDED_CARDS = [
  {
    num: "01",
    icon: "📚",
    title: "Complete Textbook-Referenced PDF",
    desc: "Structured material aligned with core textbook concepts.",
  },
  {
    num: "02",
    icon: "📘",
    title: "Simplified Notes",
    desc: "Understand important concepts without unnecessary complexity.",
  },
  {
    num: "03",
    icon: "📝",
    title: "Revision Notes",
    desc: "Compact material for faster second-round revision.",
  },
  {
    num: "04",
    icon: "⚡",
    title: "Quick Revision",
    desc: "High-value points for your final study hours.",
  },
  {
    num: "05",
    icon: "📋",
    title: "Complete PYQ Collection",
    desc: "Practice previous questions in a structured way.",
  },
  {
    num: "06",
    icon: "🔄",
    title: "Before & After 2024 Scheme",
    desc: "PYQs organised across both scheme periods.",
  },
  {
    num: "07",
    icon: "🎯",
    title: "Strictly Syllabus-Focused",
    desc: "Only relevant ATP content. No unnecessary clutter.",
  },
];

const LEARNING_PATH = [
  {
    phase: "UNDERSTAND",
    title: "Simplified Notes",
  },
  {
    phase: "PRACTICE",
    title: "Previous Year Questions",
  },
  {
    phase: "FOCUS",
    title: "Important Topics",
  },
  {
    phase: "REVISE",
    title: "Revision Notes",
  },
  {
    phase: "RECALL",
    title: "Quick Revision",
  },
];

const FAQ_ITEMS = [
  {
    q: "What do I get after purchase?",
    a: "You get instant access to all 7 ATP Revision modules including textbook-referenced PDFs, simplified notes, revision material, and complete PYQ collection.",
  },
  {
    q: "Is ₹49 a one-time payment?",
    a: "Yes. ₹49 is a one-time fee for full access to the ATP Revision Vault. There are no recurring subscriptions or hidden fees.",
  },
  {
    q: "How quickly does access activate?",
    a: "Access activates immediately after payment completion. No manual verification or waiting required.",
  },
  {
    q: "Can I use the Vault on another device?",
    a: "For security, access is limited to one device at a time. You can request a device transfer if needed.",
  },
  {
    q: "Is this strictly based on the syllabus?",
    a: "Yes. All material is strictly syllabus-focused and aligned with core textbook concepts.",
  },
];

const CURIOUS_VALUE_CARDS = [
  {
    phase: "UNDERSTAND",
    tagline: "Learn the concept clearly.",
  },
  {
    phase: "PRACTICE",
    tagline: "See how it appears in exams.",
  },
  {
    phase: "RECALL",
    tagline: "Bring it back when it matters.",
  },
];

function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [heroTilt, setHeroTilt] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const [openFaq, setOpenFaq] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useScrollReveal();

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        navigate("/login", { replace: true });
        return;
      }
      setUser(data.user);

      // Check if user has active entitlement
      const { data: ent } = await supabase
        .from("entitlements")
        .select("status")
        .eq("user_id", data.user.id)
        .eq("product_id", "atp_complete")
        .eq("status", "active")
        .maybeSingle();

      if (ent) {
        // User has active entitlement, redirect to device activation
        navigate("/device-activation", { replace: true });
        return;
      }

      setLoading(false);
    }
    checkUser();
  }, [navigate]);

  const handleHeroMouseMove = (e) => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.innerWidth <= 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroTilt({
      rx: Math.max(-0.5, Math.min(0.5, y * -1)),
      ry: Math.max(-0.5, Math.min(0.5, x * 1)),
      tx: Math.max(-2, Math.min(2, x * 4)),
      ty: Math.max(-2, Math.min(2, y * 4)),
    });
  };

  const handleHeroMouseLeave = () => {
    setHeroTilt({ rx: 0, ry: 0, tx: 0, ty: 0 });
  };

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? -1 : index));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <main className="auth-page">
        <div className="auth-card" style={{ textAlign: "center" }}>
          <div className="payment-spinner" style={{ margin: "0 auto 16px" }} aria-hidden="true" />
          <p style={{ color: "var(--muted)", fontWeight: 500 }}>Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="student-dashboard">
      {/* PREMIUM STICKY HEADER */}
      <header className={`dashboard-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="dashboard-header-content">
          <Link className="dashboard-brand" to="/">
            <span className="dashboard-brand-crest">A</span>
            <div className="dashboard-brand-text">
              <strong>ATP Revision Vault</strong>
              <span>Academic Edition</span>
            </div>
          </Link>

          <div className="dashboard-user-section">
            <div className="dashboard-user-info">
              <span className="dashboard-welcome">Welcome, {user?.user_metadata?.name || user?.email?.split("@")[0]}</span>
              <span className="dashboard-status-badge locked">🔒 LOCKED</span>
            </div>
            <div className="dashboard-menu">
              <button className="dashboard-menu-btn" onClick={handleLogout} aria-label="Logout">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {/* HERO SECTION */}
        <section className="dashboard-hero">
          <div className="dashboard-hero-container">
            <div className="dashboard-hero-content">
              <span className="dashboard-eyebrow">FIRST-YEAR ATP REVISION SYSTEM</span>
              <h1 className="dashboard-hero-heading">
                Your ATP Revision Vault
                <br />
                <span className="dashboard-hero-accent">is ready.</span>
              </h1>
              <p className="dashboard-hero-lead">
                Everything you need for focused ATP revision — organised into one clear study system.
              </p>
              <p className="dashboard-hero-sub">
                Less searching. More revising. Better use of your final hours.
              </p>

              <div className="dashboard-hero-status">
                <span className="dashboard-status-icon">🔒</span>
                <span>Access not unlocked</span>
              </div>

              <div className="dashboard-hero-cta">
                <Link to="/payment" className="dashboard-primary-cta">
                  UNLOCK THE COMPLETE PACK — <span className="dashboard-price">₹49</span> →
                </Link>
                <a href="#whats-included" className="dashboard-secondary-cta">
                  Preview What's Inside ↓
                </a>
              </div>

              <div className="dashboard-hero-trust">
                <span>One-time payment</span>
                <span className="dashboard-trust-dot">•</span>
                <span>Personal access</span>
                <span className="dashboard-trust-dot">•</span>
                <span>Syllabus-focused</span>
              </div>
            </div>

            <div
              className="dashboard-hero-visual"
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
              style={{
                transform:
                  heroTilt.rx || heroTilt.ry || heroTilt.tx || heroTilt.ty
                    ? `perspective(1000px) translate3d(${heroTilt.tx}px, ${heroTilt.ty}px, 0) rotateX(${heroTilt.rx}deg) rotateY(${heroTilt.ry}deg)`
                    : undefined,
                transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <div className="dashboard-book-glow" aria-hidden="true"></div>
              <div className="dashboard-book-shadow" aria-hidden="true"></div>
              <img src={bookImage} alt="ATP Revision Vault Complete Study Pack" className="dashboard-book-img" />
              
              <div className="dashboard-book-label label-notes">Simplified Notes</div>
              <div className="dashboard-book-label label-pyq">PYQ Collection</div>
              <div className="dashboard-book-label label-revision">Quick Revision</div>
            </div>
          </div>
        </section>

        {/* WHAT'S INCLUDED */}
        <section id="whats-included" className="dashboard-section">
          <div className="dashboard-container">
            <div className="dashboard-section-header centered reveal-init">
              <span className="dashboard-section-eyebrow">STRUCTURED CURATION</span>
              <h2 className="dashboard-section-title">Everything you need.</h2>
              <p className="dashboard-section-subtitle">Nothing unnecessary.</p>
              <p className="dashboard-section-lead">
                One organised pack designed for first-year ATP revision.
              </p>
              <div className="dashboard-gold-divider centered"></div>
            </div>

            <div className="dashboard-cards-grid">
              {WHATS_INCLUDED_CARDS.map((card, index) => (
                <div className={`dashboard-feature-card reveal-init stagger-${index + 1}`} key={card.num}>
                  <div className="dashboard-card-number">{card.num}</div>
                  <div className="dashboard-card-icon">{card.icon}</div>
                  <h3 className="dashboard-card-title">{card.title}</h3>
                  <p className="dashboard-card-desc">{card.desc}</p>
                  <div className="dashboard-card-lock">
                    <span className="dashboard-lock-icon">🔒</span>
                    <span>Locked</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEARNING PATH */}
        <section className="dashboard-section">
          <div className="dashboard-container">
            <div className="dashboard-section-header centered reveal-init">
              <span className="dashboard-section-eyebrow">THE REVISION BLUEPRINT</span>
              <h2 className="dashboard-section-title">A clearer way to revise.</h2>
              <div className="dashboard-gold-divider centered"></div>
            </div>

            <div className="dashboard-learning-path reveal-init">
              {LEARNING_PATH.map((step, idx) => (
                <div className={`dashboard-path-step reveal-init stagger-${idx + 1}`} key={step.phase}>
                  <span className="dashboard-path-phase">{step.phase}</span>
                  <h3 className="dashboard-path-title">{step.title}</h3>
                  {idx < LEARNING_PATH.length - 1 && (
                    <div className="dashboard-path-arrow" aria-hidden="true">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SNEAK PREVIEW */}
        <section className="dashboard-section">
          <div className="dashboard-container">
            <div className="dashboard-section-header centered reveal-init">
              <span className="dashboard-section-eyebrow">AUTHENTIC SAMPLES</span>
              <h2 className="dashboard-section-title">A small look inside the Vault.</h2>
              <p className="dashboard-section-lead">
                Enough to see the structure. The full material stays inside.
              </p>
              <div className="dashboard-gold-divider centered"></div>
            </div>

            <div className="dashboard-preview-grid">
              <div className="dashboard-preview-card reveal-init stagger-1">
                <div className="dashboard-preview-header">
                  <span className="dashboard-preview-tag">SIMPLIFIED NOTES</span>
                </div>
                <h3 className="dashboard-preview-title">Control Structures & Branching</h3>
                <div className="dashboard-preview-content">
                  <p className="dashboard-preview-def">
                    "A control mechanism that alters the sequential flow of program execution based on an evaluated boolean expression."
                  </p>
                  <div className="dashboard-preview-code">
{`if (condition == true) {
  execute_target_block();
} else {
  fallback_routine();
}`}
                  </div>
                  <div className="dashboard-preview-blur">
                    <span className="dashboard-preview-lock-badge">🔒 Full material unlocks after purchase</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-preview-card reveal-init stagger-2">
                <div className="dashboard-preview-header">
                  <span className="dashboard-preview-tag">PYQ COLLECTION</span>
                </div>
                <h3 className="dashboard-preview-title">Verified Previous Questions</h3>
                <div className="dashboard-preview-content">
                  <div className="dashboard-preview-pyq">
                    <strong>Q1. Compare static vs dynamic binding.</strong>
                    <span>[Core concept • 5 Marks]</span>
                  </div>
                  <div className="dashboard-preview-pyq">
                    <strong>Q2. Explain stack frame lifecycle during recursion.</strong>
                    <span>[Sample layout • 7 Marks]</span>
                  </div>
                  <div className="dashboard-preview-blur">
                    <span className="dashboard-preview-lock-badge">🔒 Full material unlocks after purchase</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-preview-card reveal-init stagger-3">
                <div className="dashboard-preview-header">
                  <span className="dashboard-preview-tag">QUICK REVISION</span>
                </div>
                <h3 className="dashboard-preview-title">High-Yield Memory Trigger</h3>
                <div className="dashboard-preview-content">
                  <span className="dashboard-preview-marker">CORE CHECKPOINT</span>
                  <p className="dashboard-preview-checkpoint">
                    Execution precedence: Unary {'>'} Arithmetic {'>'} Relational {'>'} Logical.
                  </p>
                  <span className="dashboard-preview-marker">QUICK SUMMARY</span>
                  <p className="dashboard-preview-summary">
                    Pass-by-value duplicates storage; Pass-by-reference aliases pointer.
                  </p>
                  <div className="dashboard-preview-blur">
                    <span className="dashboard-preview-lock-badge">🔒 Full material unlocks after purchase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY THIS PACK */}
        <section className="dashboard-section">
          <div className="dashboard-container">
            <div className="dashboard-section-header centered reveal-init">
              <span className="dashboard-section-eyebrow">THE REVISION PROBLEM</span>
              <h2 className="dashboard-section-title">Revision shouldn't begin with searching.</h2>
              <div className="dashboard-gold-divider centered"></div>
            </div>

            <div className="dashboard-comparison">
              <div className="dashboard-comparison-side negative reveal-init reveal-left">
                <h3 className="dashboard-comparison-title">WITHOUT A SYSTEM</h3>
                <ul className="dashboard-comparison-list">
                  <li><span className="dashboard-cross">✕</span> Random PDFs</li>
                  <li><span className="dashboard-cross">✕</span> Scattered WhatsApp files</li>
                  <li><span className="dashboard-cross">✕</span> Long unfocused notes</li>
                  <li><span className="dashboard-cross">✕</span> No clear revision order</li>
                  <li><span className="dashboard-cross">✕</span> Wasted final-hour time</li>
                </ul>
              </div>

              <div className="dashboard-comparison-side positive reveal-init reveal-right">
                <h3 className="dashboard-comparison-title">WITH ATP REVISION VAULT</h3>
                <ul className="dashboard-comparison-list">
                  <li><span className="dashboard-check">✓</span> Everything in one place</li>
                  <li><span className="dashboard-check">✓</span> Clear study sequence</li>
                  <li><span className="dashboard-check">✓</span> Focused revision material</li>
                  <li><span className="dashboard-check">✓</span> Faster exam preparation</li>
                  <li><span className="dashboard-check">✓</span> Easy final-hour recall</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN PURCHASE CARD */}
        <section className="dashboard-section">
          <div className="dashboard-container">
            <div className="dashboard-purchase-card reveal-init">
              <div className="dashboard-purchase-header">
                <span className="dashboard-purchase-badge">FIRST-YEAR EDITION</span>
                <h2 className="dashboard-purchase-title">ATP Complete Revision Pack</h2>
                <div className="dashboard-purchase-price">₹49</div>
                <p className="dashboard-purchase-sub">One-time payment</p>
              </div>

              <div className="dashboard-purchase-features">
                <div className="dashboard-purchase-feature">
                  <span className="dashboard-feature-check">✓</span>
                  <span>Complete study pack</span>
                </div>
                <div className="dashboard-purchase-feature">
                  <span className="dashboard-feature-check">✓</span>
                  <span>Personal access</span>
                </div>
                <div className="dashboard-purchase-feature">
                  <span className="dashboard-feature-check">✓</span>
                  <span>Syllabus-focused</span>
                </div>
                <div className="dashboard-purchase-feature">
                  <span className="dashboard-feature-check">✓</span>
                  <span>Automatic activation</span>
                </div>
                <div className="dashboard-purchase-feature">
                  <span className="dashboard-feature-check">✓</span>
                  <span>Secure checkout</span>
                </div>
              </div>

              <Link to="/payment" className="dashboard-purchase-cta">
                UNLOCK FOR ₹49 →
              </Link>

              <p className="dashboard-purchase-footer">
                Secure payment through Razorpay
              </p>
            </div>
          </div>
        </section>

        {/* UNLOCK PROCESS */}
        <section className="dashboard-section">
          <div className="dashboard-container">
            <div className="dashboard-section-header centered reveal-init">
              <span className="dashboard-section-eyebrow">AUTOMATED ACCESS</span>
              <h2 className="dashboard-section-title">Unlock in four simple steps.</h2>
              <div className="dashboard-gold-divider centered"></div>
            </div>

            <div className="dashboard-steps-grid">
              <div className="dashboard-step-card reveal-init stagger-1">
                <div className="dashboard-step-number">1</div>
                <h4>Create your account</h4>
              </div>
              <div className="dashboard-step-card reveal-init stagger-2">
                <div className="dashboard-step-number">2</div>
                <h4>Complete secure ₹49 payment</h4>
              </div>
              <div className="dashboard-step-card reveal-init stagger-3">
                <div className="dashboard-step-number">3</div>
                <h4>Activate your study device</h4>
              </div>
              <div className="dashboard-step-card reveal-init stagger-4">
                <div className="dashboard-step-number">4</div>
                <h4>Enter the Revision Vault</h4>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="dashboard-section">
          <div className="dashboard-container">
            <div className="dashboard-trust-strip reveal-init">
              <div className="dashboard-trust-item">
                <span className="dashboard-trust-icon">🔐</span>
                <span>Secure Checkout</span>
              </div>
              <div className="dashboard-trust-item">
                <span className="dashboard-trust-icon">👤</span>
                <span>Personal Study Access</span>
              </div>
              <div className="dashboard-trust-item">
                <span className="dashboard-trust-icon">📱</span>
                <span>One Approved Device</span>
              </div>
              <div className="dashboard-trust-item">
                <span className="dashboard-trust-icon">⚡</span>
                <span>Automatic Activation</span>
              </div>
            </div>
          </div>
        </section>

        {/* CURIOUS VALUE */}
        <section className="dashboard-section">
          <div className="dashboard-container">
            <div className="dashboard-section-header centered reveal-init">
              <span className="dashboard-section-eyebrow">CURATED PURPOSE</span>
              <h2 className="dashboard-section-title">Built for the hours that matter most.</h2>
              <div className="dashboard-gold-divider centered"></div>
            </div>

            <div className="dashboard-curious-grid">
              {CURIOUS_VALUE_CARDS.map((card, idx) => (
                <div className={`dashboard-curious-card reveal-init stagger-${idx + 1}`} key={card.phase}>
                  <span className="dashboard-curious-phase">{card.phase}</span>
                  <h3 className="dashboard-curious-tagline">"{card.tagline}"</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="dashboard-section">
          <div className="dashboard-container">
            <div className="dashboard-section-header centered reveal-init">
              <span className="dashboard-section-eyebrow">COMMON QUESTIONS</span>
              <h2 className="dashboard-section-title">Frequently Asked Questions</h2>
              <div className="dashboard-gold-divider centered"></div>
            </div>

            <div className="dashboard-faq-list" role="list">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div className={`dashboard-faq-item ${isOpen ? "open" : ""}`} key={item.q} role="listitem">
                    <button
                      type="button"
                      className="dashboard-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      aria-controls={`dashboard-faq-answer-${index}`}
                      id={`dashboard-faq-question-${index}`}
                    >
                      <span>{item.q}</span>
                      <span className="dashboard-faq-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="dashboard-faq-answer" id={`dashboard-faq-answer-${index}`} role="region" aria-labelledby={`dashboard-faq-question-${index}`}>
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="dashboard-footer">
          <div className="dashboard-footer-content">
            <div className="dashboard-footer-brand">
              <strong>ATP Revision Vault</strong>
              <span>Built for the hours that matter most.</span>
            </div>

            <div className="dashboard-footer-links">
              <a href="#whats-included">What's Inside</a>
              <a href="#faq">FAQ</a>
              <Link to="/login">Login</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/refund">Refund Policy</Link>
              <Link to="/support">Support</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default StudentDashboard;