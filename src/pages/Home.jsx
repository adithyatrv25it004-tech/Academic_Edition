import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import bookImage from "../assets/atp-revision-book.png";
import { useScrollReveal } from "../lib/useScrollReveal";

const REVISION_STEPS = [
  {
    num: "01",
    phase: "UNDERSTAND",
    title: "Simplified Notes",
    desc: "Understand core concepts quickly without textbook fluff.",
  },
  {
    num: "02",
    phase: "PRACTICE",
    title: "Previous Year Questions",
    desc: "See how topics appear in real exams.",
  },
  {
    num: "03",
    phase: "FOCUS",
    title: "Important Questions",
    desc: "Focus your time where it matters most.",
  },
  {
    num: "04",
    phase: "REVISE",
    title: "Last-Minute Material",
    desc: "Compact material built for the final hours.",
  },
  {
    num: "05",
    phase: "RECALL",
    title: "Quick Recall",
    desc: "Refresh key ideas in minutes before the exam.",
  },
];

const WHATS_INSIDE_MODULES = [
  {
    num: "01",
    icon: "📘",
    title: "Simplified Notes",
    desc: "Understand the core concept quickly.",
    tag: "Core Concepts",
  },
  {
    num: "02",
    icon: "📝",
    title: "Previous Year Questions",
    desc: "See how topics appear in real exams.",
    tag: "Exam Solved",
  },
  {
    num: "03",
    icon: "🎯",
    title: "Important Questions",
    desc: "Focus your time where it matters most.",
    tag: "Priority Focus",
  },
  {
    num: "04",
    icon: "⚡",
    title: "Last-Minute Revision",
    desc: "Compact material for the final hours.",
    tag: "Final Hour",
  },
  {
    num: "05",
    icon: "🧠",
    title: "Quick Recall",
    desc: "Refresh key ideas in minutes.",
    tag: "Memory Triggers",
  },
];

const WHY_IT_WORKS_POINTS = [
  {
    icon: "📘",
    title: "Clear concepts",
    desc: "Digestible summaries that strip away textbook fluff and retain core principles.",
  },
  {
    icon: "📝",
    title: "Exam-oriented practice",
    desc: "Past exam questions organized to highlight genuine recurring question patterns.",
  },
  {
    icon: "🎯",
    title: "Priority-based revision",
    desc: "Curated focus areas so you allocate your revision time where it matters most.",
  },
  {
    icon: "⚡",
    title: "Fast final-hour recall",
    desc: "Compact memory sheets designed for high retention right before your exam.",
  },
];

const CURIOSITY_CARDS = [
  {
    phase: "UNDERSTAND",
    tagline: "Learn the concept.",
    subtext: "Core theory explained clearly without unnecessary textbook padding.",
  },
  {
    phase: "PRACTICE",
    tagline: "See the exam pattern.",
    subtext: "Real university question structures, weightage, and solved formats.",
  },
  {
    phase: "RECALL",
    tagline: "Bring it back when it matters.",
    subtext: "High-yield trigger sheets for the critical hours right before the exam.",
  },
];

const ACCESS_STEPS = [
  {
    num: "1",
    icon: "👤",
    title: "Create your account",
    desc: "Register with your name and email in less than a minute.",
  },
  {
    num: "2",
    icon: "💳",
    title: "Complete secure ₹49 checkout",
    desc: "One-time payment processed instantly via secure Razorpay checkout.",
  },
  {
    num: "3",
    icon: "⚡",
    title: "Payment is verified automatically",
    desc: "Zero waiting or manual UTR submissions — access activates immediately.",
  },
  {
    num: "4",
    icon: "📱",
    title: "Activate your study device",
    desc: "Study securely on your chosen device with protected access.",
  },
  {
    num: "5",
    icon: "🔓",
    title: "Enter the Revision Vault",
    desc: "Open your personal student dashboard and begin revising right away.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What do I receive?",
    a: "You receive instant access to all 5 ATP Revision modules: Simplified Concept Notes, Previous Year Questions, Important Questions, Last-Minute Revision Sheets, and Quick Recall Material, all organized within your student dashboard.",
  },
  {
    q: "Is ₹49 a one-time payment?",
    a: "Yes. ₹49 is a one-time fee for full access to the ATP Revision Vault. There are no recurring subscriptions, hidden renewals, or upgrade fees.",
  },
  {
    q: "How does payment verification work?",
    a: "Payment verification is completely automatic. Once you complete the ₹49 checkout through our secure Razorpay gateway, your account activates immediately without any manual verification or delay.",
  },
  {
    q: "How do I access my material?",
    a: "After completing payment, log in with your registered email, activate your chosen study device, and begin revising inside the Vault immediately.",
  },
  {
    q: "Can I access the material on my phone?",
    a: "Yes. The Revision Vault is fully responsive and optimized for seamless reading on smartphones, tablets, and computers. You can study securely on your chosen device wherever you are.",
  },
  {
    q: "How does device security work?",
    a: "To safeguard study material and account integrity, access is tied securely to your designated study device. This prevents unauthorized sharing and keeps your personal revision progress safe.",
  },
];

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroTilt, setHeroTilt] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const [openFaq, setOpenFaq] = useState(0);

  useScrollReveal();

  const handleHeroMouseMove = (e) => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.innerWidth <= 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // User Requirement 5: Desktop only subtle movement, max 3px translate, max 0.6deg rotate
    setHeroTilt({
      rx: Math.max(-0.6, Math.min(0.6, y * -1.2)),
      ry: Math.max(-0.6, Math.min(0.6, x * 1.2)),
      tx: Math.max(-3, Math.min(3, x * 6)),
      ty: Math.max(-3, Math.min(3, y * 6)),
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

  return (
    <div className="app paper-texture">
      {/* ==================================================================
          NAVBAR: Warm Ivory Glass on Scroll, Clean Typography
          ================================================================== */}
      <header className={`navbar-wrapper ${isScrolled ? "scrolled" : ""}`}>
        <nav className="navbar" aria-label="Main Navigation">
          <Link className="brand" to="/">
            <span className="brand-crest">A</span>
            <div className="brand-text">
              <strong>ATP Revision Vault</strong>
              <span>Academic Edition</span>
            </div>
          </Link>

          <div className="nav-links">
            <a href="#why-this-pack" className="nav-link">Why This Pack</a>
            <a href="#whats-inside" className="nav-link">What's Inside</a>
            <a href="#preview" className="nav-link">Preview</a>
            <a href="#revision-flow" className="nav-link">Revision Flow</a>
            <a href="#why-it-works" className="nav-link">Why It Works</a>
            <a href="#access-process" className="nav-link">Process</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </div>

          <div className="nav-actions">
            <Link className="nav-login-btn" to="/login" aria-label="Login to your account">Login</Link>
          </div>
        </nav>
      </header>

      <main>
        {/* ==================================================================
            1. HERO SECTION (ONLY PURCHASE CTA ON ENTIRE HOMEPAGE)
            ================================================================== */}
        <section className="hero-section">
          <div className="page-container hero-layout">
            <div className="hero-copy">
              <span className="eyebrow hero-eyebrow">
                <span className="eyebrow-dot"></span>
                01 / ATP COMPLETE REVISION PACK
              </span>

              <h1 className="hero-headline">
                <span className="headline-line-1">Revise smarter.</span>
                <span className="headline-line-2 academic-accent">Walk in prepared.</span>
              </h1>

              <p className="hero-lede">
                Everything you need for focused ATP revision — organised into one clear study system.
              </p>

              <div className="hero-editorial-callout">
                <span className="editorial-line" aria-hidden="true"></span>
                <p className="editorial-text">
                  Less searching. More revising. Better use of your final hours.
                </p>
              </div>

              <div className="hero-actions">
                <Link to="/signup" className="btn-primary hero-cta-btn" aria-label="Get the complete ATP revision pack for ₹49">
                  GET THE COMPLETE PACK — <span className="cta-price-highlight">₹49</span> <span className="cta-arrow" aria-hidden="true">→</span>
                </Link>
                <a href="#why-this-pack" className="btn-secondary hero-secondary-btn" aria-label="Explore what's inside the revision pack">
                  Explore What's Inside <span aria-hidden="true">↓</span>
                </a>
              </div>

              <div className="hero-meta">
                <span>One-time payment</span>
                <span className="hero-meta-dot" aria-hidden="true">•</span>
                <span>Personal access</span>
                <span className="hero-meta-dot" aria-hidden="true">•</span>
                <span>Built for focused revision</span>
              </div>
            </div>

            <div
              className="hero-visual-wrapper"
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
              {/* Soft ambient warm gold glow behind book */}
              <div className="ambient-glow" aria-hidden="true"></div>

              {/* Ground shadow beneath book */}
              <div className="book-ground-shadow" aria-hidden="true"></div>

              <img
                src={bookImage}
                alt="ATP Revision Vault Complete Study Pack"
                className="hero-book-img"
              />

              {/* Floating Academic Paper Tabs */}
              <div className="paper-tab tab-notes" aria-label="Simplified Notes">
                <span className="tab-tag-icon">📘</span>
                <span>Simplified Notes</span>
              </div>

              <div className="paper-tab tab-pyq" aria-label="PYQ Collection">
                <span className="tab-tag-icon">📝</span>
                <span>PYQ Collection</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            2. WHY THIS PACK (CONCISE, EMOTIONALLY RELEVANT)
            ================================================================== */}
        <section id="why-this-pack" className="section-editorial problem-section">
          <div className="page-container">
            <div className="section-header centered reveal-init">
              <span className="eyebrow">
                <span className="eyebrow-dot"></span>
                THE REVISION PROBLEM
              </span>
              <h2 className="section-title">Revision shouldn't begin with searching.</h2>
              <div className="gold-divider centered"></div>
            </div>

            <div className="problem-solution-grid">
              <div className="problem-card reveal-init reveal-left">
                <div className="problem-card-header">
                  <span className="problem-badge">COMMON FRICTION</span>
                  <h3>Where revision time gets lost</h3>
                </div>
                <ul className="problem-list">
                  <li>
                    <span className="bullet-cross">✕</span>
                    <span>Scattered notes and random PDFs</span>
                  </li>
                  <li>
                    <span className="bullet-cross">✕</span>
                    <span>Too much material, not enough time</span>
                  </li>
                  <li>
                    <span className="bullet-cross">✕</span>
                    <span>No clear order for what to revise first</span>
                  </li>
                </ul>
              </div>

              <div className="solution-card reveal-init reveal-right">
                <div className="solution-card-header">
                  <span className="solution-badge">THE VAULT ARCHITECTURE</span>
                  <h3>The Vault Solution</h3>
                </div>
                <p className="solution-lead">
                  ATP Revision Vault turns scattered material into one focused revision path.
                </p>
                <div className="solution-pillars">
                  <div className="solution-pillar">
                    <span className="pillar-num">01</span>
                    <div>
                      <strong>Single-Source Access</strong>
                      <span>Zero searching across chat groups or folders.</span>
                    </div>
                  </div>
                  <div className="solution-pillar">
                    <span className="pillar-num">02</span>
                    <div>
                      <strong>Purpose-Built Material</strong>
                      <span>Notes for understanding, summaries for recall.</span>
                    </div>
                  </div>
                  <div className="solution-pillar">
                    <span className="pillar-num">03</span>
                    <div>
                      <strong>Sequence-Driven Flow</strong>
                      <span>Open one place. Know what to revise next.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            3. WHAT'S INSIDE (5 CARDS ONLY, 1 SENTENCE EACH, NO WHY BOX)
            ================================================================== */}
        <section id="whats-inside" className="section-editorial features-section">
          <div className="page-container">
            <div className="section-header centered reveal-init">
              <span className="eyebrow">
                <span className="eyebrow-dot"></span>
                STRUCTURED CURATION
              </span>
              <h2 className="section-title">Everything has a purpose.</h2>
              <p className="section-subtitle">
                Five carefully structured revision resources designed to provide complete revision coverage without overwhelm.
              </p>
              <div className="gold-divider centered"></div>
            </div>

            <div className="features-grid">
              {WHATS_INSIDE_MODULES.map((item, index) => (
                <div className={`chapter-card reveal-init stagger-${index + 1}`} key={item.num} role="article">
                  <div className="bookmark-ribbon" aria-hidden="true"></div>
                  <div className="chapter-card-top">
                    <span className="chapter-num" aria-hidden="true">{item.num}</span>
                    <span className="chapter-badge">{item.tag}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. REAL PREVIEW SECTION (3 CARDS ONLY, CURIOSITY-DRIVEN)
            ================================================================== */}
        <section id="preview" className="section-editorial sneak-peek-section">
          <div id="sneak-peek" className="anchor-shim" aria-hidden="true"></div>
          <div className="page-container">
            <div className="section-header centered reveal-init">
              <span className="eyebrow eyebrow-blue">
                <span className="eyebrow-dot"></span>
                AUTHENTIC SAMPLES
              </span>
              <h2 className="section-title">A small look inside the Vault.</h2>
              <p className="section-subtitle">
                Enough to see the structure. The full material stays inside.
              </p>
              <div className="gold-divider centered"></div>
            </div>

            <div className="peek-grid peek-grid-three">
              {/* Preview 1: Simplified Notes */}
              <article className="peek-card reveal-init stagger-1">
                <div className="peek-card-header">
                  <span className="peek-tag">SIMPLIFIED NOTES</span>
                  <span className="peek-badge">Important topic</span>
                </div>
                <h3 className="peek-title">Control Structures &amp; Branching</h3>
                <div className="peek-sheet">
                  <p className="peek-sheet-def">
                    "A control mechanism that alters the sequential flow of program execution based on an evaluated boolean expression."
                  </p>
                  <div className="peek-code">
{`if (condition == true) {
  execute_target_block();
} else {
  fallback_routine();
}`}
                  </div>
                  <span className="peek-marker">EXAM PATTERN</span>
                  <p style={{ margin: 0, fontSize: "11px", color: "var(--muted)" }}>
                    Always evaluate nested switch cases for break fall-through.
                  </p>

                  <div className="peek-blur-overlay">
                    <span className="peek-sample-pill">🔒 Preview</span>
                  </div>
                </div>
              </article>

              {/* Preview 2: PYQ Collection */}
              <article className="peek-card reveal-init stagger-2">
                <div className="peek-card-header">
                  <span className="peek-tag">PYQ COLLECTION</span>
                  <span className="peek-badge">Exam pattern</span>
                </div>
                <h3 className="peek-title">Verified Previous Questions</h3>
                <div className="peek-sheet">
                  <div className="peek-pyq-item">
                    <strong>Q1. Compare static vs dynamic binding.</strong>
                    <span>[Core concept • 5 Marks]</span>
                  </div>
                  <div className="peek-pyq-item">
                    <strong>Q2. Explain stack frame lifecycle during recursion.</strong>
                    <span>[Sample layout • 7 Marks]</span>
                  </div>

                  <div className="peek-blur-overlay">
                    <span className="peek-sample-pill">🔒 Preview</span>
                  </div>
                </div>
              </article>

              {/* Preview 3: Last-Minute Revision */}
              <article className="peek-card reveal-init stagger-3">
                <div className="peek-card-header">
                  <span className="peek-tag">LAST-MINUTE REVISION</span>
                  <span className="peek-badge">Quick checkpoint</span>
                </div>
                <h3 className="peek-title">High-Yield Memory Trigger</h3>
                <div className="peek-sheet">
                  <span className="peek-marker">CORE CHECKPOINT</span>
                  <p style={{ margin: "4px 0 10px", fontSize: "11.5px", fontWeight: 600 }}>
                    Execution precedence: Unary &gt; Arithmetic &gt; Relational &gt; Logical.
                  </p>
                  <span className="peek-marker">QUICK SUMMARY</span>
                  <p style={{ margin: "4px 0 0", fontSize: "11px", color: "var(--muted)" }}>
                    Pass-by-value duplicates storage; Pass-by-reference aliases pointer.
                  </p>

                  <div className="peek-blur-overlay">
                    <span className="peek-sample-pill">🔒 Preview</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ==================================================================
            5. REVISION FLOW (THE LEARNING STORY)
            ================================================================== */}
        <section id="revision-flow" className="section-editorial system-section">
          <div className="page-container">
            <div className="section-header centered reveal-init">
              <span className="eyebrow eyebrow-gold">
                <span className="eyebrow-dot"></span>
                THE REVISION BLUEPRINT
              </span>
              <h2 className="section-title">One clear path from learning to recall.</h2>
              <p className="section-subtitle">
                Move through the material in sequence — from building understanding to quick recall before your exam.
              </p>
              <div className="gold-divider centered"></div>
            </div>

            <div className="flow-timeline reveal-init">
              {REVISION_STEPS.map((step, idx) => (
                <div className={`flow-step-card reveal-init stagger-${idx + 1}`} key={step.num}>
                  <span className="flow-step-number">{step.num}</span>
                  <span className="flow-step-phase">{step.phase}</span>
                  <h3 className="flow-step-title">{step.title}</h3>
                  <p className="flow-step-desc">{step.desc}</p>
                  {idx < REVISION_STEPS.length - 1 && (
                    <div className="flow-arrow-indicator" aria-hidden="true">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            6. WHY IT WORKS (COMPACT 4 VALUE POINTS)
            ================================================================== */}
        <section id="why-it-works" className="section-editorial why-it-works-section">
          <div className="page-container">
            <div className="section-header centered reveal-init">
              <span className="eyebrow eyebrow-blue">
                <span className="eyebrow-dot"></span>
                ACADEMIC FOCUS
              </span>
              <h2 className="section-title">Built for focused revision.</h2>
              <p className="section-subtitle">
                Designed as a disciplined revision companion, not an unorganized file dump.
              </p>
              <div className="gold-divider centered"></div>
            </div>

            <div className="why-it-works-grid">
              {WHY_IT_WORKS_POINTS.map((pt, idx) => (
                <div className={`why-value-card reveal-init stagger-${idx + 1}`} key={pt.title} role="article">
                  <div className="why-value-icon" aria-hidden="true">{pt.icon}</div>
                  <div className="why-value-content">
                    <h3 className="why-value-title">{pt.title}</h3>
                    <p className="why-value-desc">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            7. CURIOSITY MOMENT & ACCESS PROCESS
            ================================================================== */}
        <section id="access-process" className="section-editorial access-section">
          <div className="page-container">
            {/* 7a. The Curiosity Moment */}
            <div className="curiosity-moment-block">
              <div className="section-header centered reveal-init">
                <span className="eyebrow eyebrow-gold">
                  <span className="eyebrow-dot"></span>
                  CURATED PURPOSE
                </span>
                <h2 className="section-title">Everything in the Vault has a reason to be there.</h2>
                <div className="gold-divider centered"></div>
              </div>

              <div className="curiosity-grid">
                {CURIOSITY_CARDS.map((card, idx) => (
                  <div className={`curiosity-card reveal-init stagger-${idx + 1}`} key={card.phase}>
                    <span className="curiosity-phase">{card.phase}</span>
                    <h3 className="curiosity-tagline">"{card.tagline}"</h3>
                    <p className="curiosity-subtext">{card.subtext}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 7b. The Automated 5-Step Access Process */}
            <div className="access-process-block">
              <div className="section-header centered reveal-init" style={{ marginTop: "72px" }}>
                <span className="eyebrow">
                  <span className="eyebrow-dot"></span>
                  AUTOMATED ACCESS
                </span>
                <h2 className="section-title">Simple access. Clear process.</h2>
                <p className="section-subtitle">
                  Study securely on your chosen device with instant automated checkout.
                </p>
                <div className="gold-divider centered"></div>
              </div>

              <div className="trust-steps-grid">
                {ACCESS_STEPS.map((step, idx) => (
                  <div className={`trust-step-card reveal-init stagger-${idx + 1}`} key={step.num} role="listitem">
                    <div className="trust-step-num-badge" aria-hidden="true">{step.num}</div>
                    <span className="trust-step-icon" aria-hidden="true">{step.icon}</span>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                    {idx < ACCESS_STEPS.length - 1 && (
                      <div className="trust-step-connector" aria-hidden="true">→</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            8. FAQ SECTION (SMOOTH ACCORDION, AUTOMATED PAYMENT & SECURITY)
            ================================================================== */}
        <section id="faq" className="section-editorial faq-section">
          <div className="page-container faq-container">
            <div className="section-header centered reveal-init">
              <span className="eyebrow eyebrow-blue">
                <span className="eyebrow-dot"></span>
                COMMON QUESTIONS
              </span>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">
                Clear answers about the pack, automatic activation, and how to access your study materials.
              </p>
              <div className="gold-divider centered"></div>
            </div>

            <div className="faq-list" role="list">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div className={`faq-item ${isOpen ? "open" : ""}`} key={item.q} role="listitem">
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      id={`faq-question-${index}`}
                    >
                      <span>{item.q}</span>
                      <span className="faq-icon-bubble" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`}>
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ==================================================================
          9. MINIMAL FOOTER (NO PURCHASE CTA)
          ================================================================== */}
      <footer className="site-footer">
        <div className="footer-content">
          <Link className="brand" to="/">
            <span className="brand-crest">A</span>
            <div className="brand-text">
              <strong>ATP Revision Vault</strong>
              <span>Built for the hours that matter most.</span>
            </div>
          </Link>

          <div className="footer-links">
            <a href="#whats-inside">What's Inside</a>
            <a href="#preview">Preview</a>
            <a href="#why-this-pack">Why This Pack</a>
            <a href="#revision-flow">Revision Flow</a>
            <a href="#why-it-works">Why It Works</a>
            <a href="#faq">FAQ</a>
            <Link to="/login">Login</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/refund">Refund</Link>
            <Link to="/support">Support</Link>
          </div>

          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} ATP Revision Vault. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
