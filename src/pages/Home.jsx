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
    desc: "Understand concepts without digging through unnecessary textbook detail.",
  },
  {
    num: "02",
    phase: "PRACTICE",
    title: "Previous Year Questions",
    desc: "See how important topics have appeared in actual exams.",
  },
  {
    num: "03",
    phase: "FOCUS",
    title: "Important Questions",
    desc: "Know which areas deserve more of your revision time.",
  },
  {
    num: "04",
    phase: "REVISE",
    title: "Last-Minute Material",
    desc: "Compact material built for the final hours before the exam.",
  },
  {
    num: "05",
    phase: "RECALL",
    title: "Quick Recall",
    desc: "Refresh definitions, concepts and important points in minutes.",
  },
];

const RESOURCE_MODULES = [
  {
    num: "01",
    title: "Simplified Notes",
    desc: "Understand the concept without digging through unnecessary textbook detail.",
    tag: "Core Concepts",
    why: "Provides crystal-clear conceptual explanations that eliminate guesswork and confusion.",
  },
  {
    num: "02",
    title: "Previous Year Questions",
    desc: "See how important topics have appeared in actual exams.",
    tag: "Exam Solved",
    why: "Helps you recognize recurring examination question patterns and mark distribution.",
  },
  {
    num: "03",
    title: "Important Questions",
    desc: "Know which areas deserve more of your revision time.",
    tag: "Priority Focus",
    why: "Guides your attention toward high-weightage topics so you make the best use of study time.",
  },
  {
    num: "04",
    title: "Last-Minute Revision",
    desc: "Compact material built for the final hours before the exam.",
    tag: "High-Yield",
    why: "Condenses key definitions, tables, and rules into quick sheets for the night before.",
  },
  {
    num: "05",
    title: "Quick Recall",
    desc: "Refresh definitions, concepts and important points in minutes.",
    tag: "Memory Triggers",
    why: "Fast memory activation right before walking into the examination hall.",
  },
];

const WHAT_STUDENT_GETS = [
  {
    icon: "📘",
    title: "Concept-focused notes",
    desc: "Clear explanations that emphasize essential theory and core principles without textbook fluff.",
  },
  {
    icon: "📝",
    title: "Previous-year question collection",
    desc: "Past exam questions categorized by topic to highlight genuine exam patterns.",
  },
  {
    icon: "🎯",
    title: "Important-topic guidance",
    desc: "High-probability concepts separated to help you allocate revision time efficiently.",
  },
  {
    icon: "⚡",
    title: "Final-hour revision material",
    desc: "Compact summaries built specifically for the critical 24 hours before the exam.",
  },
  {
    icon: "🧠",
    title: "Quick-recall resources",
    desc: "Memory triggers, definitions, and key formula checkpoints for rapid review sessions.",
  },
  {
    icon: "📱",
    title: "Mobile-friendly web access",
    desc: "Responsive digital portal allowing comfortable study on smartphone, tablet, or laptop.",
  },
  {
    icon: "🔐",
    title: "Personal account access",
    desc: "Secure login access linked directly to your individual student account.",
  },
];

const TRUST_STEPS = [
  {
    num: "1",
    icon: "👤",
    title: "Create your account",
    desc: "Register with your name and email address in less than a minute.",
  },
  {
    num: "2",
    icon: "💳",
    title: "Make the ₹49 UPI payment",
    desc: "Pay via UPI QR code or copyable UPI ID using any UPI payment app.",
  },
  {
    num: "3",
    icon: "📋",
    title: "Submit your UPI Transaction ID / UTR",
    desc: "Enter your 12-digit reference number so your payment can be matched.",
  },
  {
    num: "4",
    icon: "🔍",
    title: "Payment is verified",
    desc: "Transaction verification confirms the submission.",
  },
  {
    num: "5",
    icon: "🔓",
    title: "Your Revision Vault becomes available",
    desc: "All 5 revision modules unlock in your student portal ready for study.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What do I receive?",
    a: "You receive access to all 5 ATP Revision modules: Simplified Concept Notes, Previous Year Questions, Important Questions, Last-Minute Revision Sheets, and Quick Recall Material, all organized within your student dashboard.",
  },
  {
    q: "Is ₹49 a one-time payment?",
    a: "Yes. ₹49 is a one-time fee for full access to the ATP Revision Vault. There are no recurring subscriptions, hidden renewals, or upgrade fees.",
  },
  {
    q: "How does payment verification work?",
    a: "After completing your ₹49 UPI payment, submit the 12-digit UPI Transaction Reference / UTR number in the checkout form. Once verified, your account is activated with full access to the vault.",
  },
  {
    q: "How do I access my material after approval?",
    a: "Simply log in to your account with your email. Your dashboard will show all 5 modules as unlocked, and you can begin studying immediately.",
  },
  {
    q: "Can I share my account?",
    a: "Access is intended for individual student use to ensure account security and progress consistency.",
  },
  {
    q: "What if I change my device?",
    a: "You can log in from any web browser on your phone, tablet, or computer using your registered login credentials.",
  },
  {
    q: "Can I access the material on my phone?",
    a: "Yes, the Revision Vault is fully responsive and optimized for mobile reading, making it easy to revise whether you are at your desk or reviewing right outside the exam hall.",
  },
  {
    q: "Who do I contact if payment verification is delayed?",
    a: "If your verification takes longer than expected, you can reach out through our contact support with your registered email and UTR number for prompt resolution.",
  },
];

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const [openFaq, setOpenFaq] = useState(0);

  useScrollReveal();

  const handleHeroMouseMove = (e) => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroTilt({
      x: Math.max(-1.5, Math.min(1.5, y * -3)),
      y: Math.max(-1.5, Math.min(1.5, x * 3)),
    });
  };

  const handleHeroMouseLeave = () => {
    setHeroTilt({ x: 0, y: 0 });
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
      {/* --- Minimal Navbar --- */}
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
            <a href="#sneak-peek" className="nav-link">Preview</a>
            <a href="#revision-flow" className="nav-link">Revision Flow</a>
            <a href="#how-it-works" className="nav-link">Process</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </div>

          <div className="nav-actions">
            <Link className="nav-login-btn" to="/login">Login</Link>
          </div>
        </nav>
      </header>

      <main>
        {/* ==================================================================
            1. HERO SECTION (ONLY PURCHASE CTA ON THE ENTIRE HOMEPAGE)
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
                Everything you need for focused ATP revision — simplified notes, PYQs, important questions and final-hour revision, organised in one place.
              </p>

              <div className="hero-editorial-callout">
                <span className="editorial-line" aria-hidden="true"></span>
                <p className="editorial-text">
                  Less searching. More revising. Better use of your final hours.
                </p>
              </div>

              <div className="hero-actions">
                <Link to="/signup" className="btn-primary hero-cta-btn">
                  GET THE COMPLETE PACK — <span className="cta-price-highlight">₹49</span> <span className="cta-arrow" aria-hidden="true">→</span>
                </Link>
                <a href="#why-this-pack" className="btn-secondary hero-secondary-btn">
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
                transform: heroTilt.x || heroTilt.y ? `perspective(1000px) rotateX(${heroTilt.x}deg) rotateY(${heroTilt.y}deg)` : undefined,
                transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {/* Soft ambient warm gold light behind book */}
              <div className="ambient-glow" aria-hidden="true"></div>

              {/* Soft ground ellipse beneath book */}
              <div className="book-ground-shadow" aria-hidden="true"></div>

              <img
                src={bookImage}
                alt="ATP Revision Vault Complete Study Pack"
                className="hero-book-img"
              />

              {/* Only TWO Floating Academic Paper Tabs: Clean & Editorial */}
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
            2. WHY THIS PACK EXISTS
            ================================================================== */}
        <section id="why-this-pack" className="section-editorial problem-section">
          <div className="page-container">
            <div className="section-header centered reveal-init">
              <span className="eyebrow">
                <span className="eyebrow-dot"></span>
                THE REVISION PROBLEM
              </span>
              <h2 className="section-title">Revision shouldn't start with searching.</h2>
              <p className="section-subtitle">
                When time is short, hunting down scattered material drains energy that belongs to actual study.
              </p>
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
                    <span>Notes are scattered across WhatsApp groups and chat threads</span>
                  </li>
                  <li>
                    <span className="bullet-cross">✕</span>
                    <span>PDFs are stored in different folders and duplicate downloads</span>
                  </li>
                  <li>
                    <span className="bullet-cross">✕</span>
                    <span>Textbook notes are too large and unfocused for last-minute revision</span>
                  </li>
                  <li>
                    <span className="bullet-cross">✕</span>
                    <span>PYQs are separated from study material, requiring constant switching</span>
                  </li>
                  <li>
                    <span className="bullet-cross">✕</span>
                    <span>Students don't know what to revise first or what syllabus parts matter most</span>
                  </li>
                  <li>
                    <span className="bullet-cross">✕</span>
                    <span>Important topics are mixed with low-priority, low-weightage content</span>
                  </li>
                </ul>
              </div>

              <div className="solution-card reveal-init reveal-right">
                <div className="solution-card-header">
                  <span className="solution-badge">THE VAULT ARCHITECTURE</span>
                  <h3>The Vault Solution</h3>
                </div>
                <p className="solution-lead">
                  ATP Revision Vault brings each revision resource into one organised study flow.
                </p>
                <p className="solution-desc">
                  Instead of collecting random files the night before your exam, you open a single, structured workspace where every document is written, condensed, and tagged for a specific revision stage.
                </p>
                <div className="solution-pillars">
                  <div className="solution-pillar">
                    <span className="pillar-num">01</span>
                    <div>
                      <strong>Single-Source Access</strong>
                      <span>Zero searching across groups or shared drives.</span>
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
                      <span>Always know what to study next without confusion.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            3. WHAT'S INSIDE (EDUCATIONAL, NO PROMOTIONAL BUTTONS)
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
              {RESOURCE_MODULES.map((item, index) => (
                <div className={`chapter-card reveal-init stagger-${index + 1}`} key={item.num}>
                  <div className="bookmark-ribbon" aria-hidden="true"></div>
                  <div className="chapter-card-top">
                    <span className="chapter-num">{item.num}</span>
                    <span className="chapter-badge">{item.tag}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="chapter-purpose-box">
                    <span className="chapter-purpose-label">WHY IT'S USEFUL</span>
                    <span className="chapter-purpose-text">{item.why}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. REAL PREVIEW SECTION (NON-PROMOTIONAL, CURIOSITY-DRIVEN)
            ================================================================== */}
        <section id="sneak-peek" className="section-editorial sneak-peek-section">
          <div className="page-container">
            <div className="section-header centered reveal-init">
              <span className="eyebrow eyebrow-blue">
                <span className="eyebrow-dot"></span>
                AUTHENTIC SAMPLES
              </span>
              <h2 className="section-title">See how the material is actually structured.</h2>
              <p className="section-subtitle">
                Not random screenshots — a small look at how each resource is organised.
              </p>
              <div className="gold-divider centered"></div>
            </div>

            <div className="peek-grid">
              {/* Preview 1: Simplified Notes */}
              <article className="peek-card reveal-init stagger-1">
                <div className="peek-card-header">
                  <span className="peek-tag">SIMPLIFIED NOTES</span>
                  <span className="peek-badge">CHAPTER 02</span>
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
                  <span className="peek-marker">EXAM NOTE</span>
                  <p style={{ margin: 0, fontSize: "11px", color: "var(--muted)" }}>
                    Always evaluate nested switch cases for break fall-through.
                  </p>

                  <div className="peek-blur-overlay">
                    <span className="peek-sample-pill">🔒 Sample preview</span>
                  </div>
                </div>
              </article>

              {/* Preview 2: PYQ Vault */}
              <article className="peek-card reveal-init stagger-2">
                <div className="peek-card-header">
                  <span className="peek-tag">PYQ COLLECTION</span>
                  <span className="peek-badge">EXAM 2024</span>
                </div>
                <h3 className="peek-title">Verified Previous Questions</h3>
                <div className="peek-sheet">
                  <div className="peek-pyq-item">
                    <strong>Q1. Compare static vs dynamic binding.</strong>
                    <span>[Repeated 3 times • 5 Marks]</span>
                  </div>
                  <div className="peek-pyq-item">
                    <strong>Q2. Explain stack frame lifecycle during recursion.</strong>
                    <span>[Important Pattern • 7 Marks]</span>
                  </div>

                  <div className="peek-blur-overlay">
                    <span className="peek-sample-pill">🔒 Example layout</span>
                  </div>
                </div>
              </article>

              {/* Preview 3: Last-Minute Revision */}
              <article className="peek-card reveal-init stagger-3">
                <div className="peek-card-header">
                  <span className="peek-tag">LAST-MINUTE REVISION</span>
                  <span className="peek-badge">FINAL HOUR</span>
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
                    <span className="peek-sample-pill">🔒 Preview of study format</span>
                  </div>
                </div>
              </article>

              {/* Preview 4: Important Questions */}
              <article className="peek-card reveal-init stagger-4">
                <div className="peek-card-header">
                  <span className="peek-tag">IMPORTANT QUESTIONS</span>
                  <span className="peek-badge">HIGH PROBABILITY</span>
                </div>
                <h3 className="peek-title">Curated Topic Weightage</h3>
                <div className="peek-sheet">
                  <div className="peek-priority-item">
                    <span>Memory Allocation &amp; Pointers</span>
                    <b>92% High Yield</b>
                  </div>
                  <div className="peek-priority-item">
                    <span>Interrupt Service Routines</span>
                    <b>88% High Yield</b>
                  </div>
                  <div className="peek-priority-item">
                    <span>File Handling &amp; Buffers</span>
                    <b>76% Expected</b>
                  </div>

                  <div className="peek-blur-overlay">
                    <span className="peek-sample-pill">🔒 Sample preview</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ==================================================================
            5. THE REVISION FLOW (NO CTA)
            ================================================================== */}
        <section id="revision-flow" className="section-editorial system-section">
          <div className="page-container">
            <div className="section-header centered reveal-init">
              <span className="eyebrow eyebrow-gold">
                <span className="eyebrow-dot"></span>
                THE REVISION BLUEPRINT
              </span>
              <h2 className="section-title">Built around how you actually revise.</h2>
              <p className="section-subtitle">
                "Instead of jumping between unrelated files, move through the material depending on what stage of revision you're in."
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
            6. WHY ORGANISATION MATTERS (NO BUTTON)
            ================================================================== */}
        <section id="organisation" className="section-editorial compare-section">
          <div className="page-container">
            <div className="section-header centered reveal-init">
              <span className="eyebrow">
                <span className="eyebrow-dot"></span>
                THE REVISION DIFFERENCE
              </span>
              <h2 className="section-title">When the exam is close, organisation matters.</h2>
              <p className="section-subtitle">
                When time is short, the way your material is organised decides how calmly you revise.
              </p>
              <div className="gold-divider centered"></div>
            </div>

            <div className="comparison-box">
              <div className="compare-col compare-col-muted reveal-init reveal-left">
                <span className="compare-label compare-label-red">SCATTERED REVISION</span>
                <h3 className="compare-heading">Scattered &amp; Disorienting</h3>
                <ul className="compare-list">
                  <li>
                    <span className="bullet-cross">✕</span>
                    <span>Random PDFs</span>
                  </li>
                  <li>
                    <span className="bullet-cross">✕</span>
                    <span>Searching WhatsApp</span>
                  </li>
                  <li>
                    <span className="bullet-cross">✕</span>
                    <span>Long notes</span>
                  </li>
                  <li>
                    <span className="bullet-cross">✕</span>
                    <span>Different sources</span>
                  </li>
                  <li>
                    <span className="bullet-cross">✕</span>
                    <span>No clear order</span>
                  </li>
                </ul>
              </div>

              <div className="compare-col compare-col-bright reveal-init reveal-right">
                <span className="compare-label compare-label-green">ATP REVISION SYSTEM</span>
                <h3 className="compare-heading">Organised &amp; Exam-Ready</h3>
                <ul className="compare-list">
                  <li>
                    <span className="bullet-check">✓</span>
                    <span>Material grouped by purpose</span>
                  </li>
                  <li>
                    <span className="bullet-check">✓</span>
                    <span>Notes ready to revise</span>
                  </li>
                  <li>
                    <span className="bullet-check">✓</span>
                    <span>PYQs easy to locate</span>
                  </li>
                  <li>
                    <span className="bullet-check">✓</span>
                    <span>Important topics separated</span>
                  </li>
                  <li>
                    <span className="bullet-check">✓</span>
                    <span>Final-hour resources ready</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            7. PRODUCT QUALITY SECTION (NO PRICE, NO CTA)
            ================================================================== */}
        <section id="quality" className="section-editorial showcase-section">
          <div className="page-container showcase-layout">
            <div className="showcase-visual reveal-init reveal-left">
              <div className="ambient-glow" aria-hidden="true"></div>
              <img
                src={bookImage}
                alt="ATP Revision Vault Physical & Digital Companion"
                className="showcase-book-img"
              />
            </div>

            <div className="showcase-details reveal-init reveal-right">
              <span className="eyebrow eyebrow-blue">
                <span className="eyebrow-dot"></span>
                PRODUCT SPECIFICATION
              </span>
              <h2 className="section-title">Designed as a revision companion, not a PDF dump.</h2>
              <p className="section-subtitle">
                Each section of the pack serves a different stage of revision — from understanding a topic to recalling it shortly before the exam.
              </p>

              <div className="showcase-rows">
                <div className="showcase-row-item">
                  <span className="showcase-row-icon">📘</span>
                  <div className="showcase-row-content">
                    <strong>Concept clarity</strong>
                    <span>Digestible summaries that strip away textbook fluff and retain key principles.</span>
                  </div>
                </div>

                <div className="showcase-row-item">
                  <span className="showcase-row-icon">📝</span>
                  <div className="showcase-row-content">
                    <strong>Exam practice</strong>
                    <span>PYQs indexed by topic with step-by-step guidance on expected answers.</span>
                  </div>
                </div>

                <div className="showcase-row-item">
                  <span className="showcase-row-icon">🎯</span>
                  <div className="showcase-row-content">
                    <strong>Priority revision</strong>
                    <span>Curated list of repeated question concepts so you maximise mark efficiency.</span>
                  </div>
                </div>

                <div className="showcase-row-item">
                  <span className="showcase-row-icon">⚡</span>
                  <div className="showcase-row-content">
                    <strong>Final-hour preparation</strong>
                    <span>Condensed bullet sheets and high-yield triggers built for the night before.</span>
                  </div>
                </div>

                <div className="showcase-row-item">
                  <span className="showcase-row-icon">🧠</span>
                  <div className="showcase-row-content">
                    <strong>Quick recall</strong>
                    <span>Instant memory recall aids for quick reviews right outside the examination hall.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            8. WHAT THE STUDENT GETS (FACTUAL CARDS, NO CTA)
            ================================================================== */}
        <section id="student-gets" className="section-editorial facts-section">
          <div className="page-container">
            <div className="section-header centered reveal-init">
              <span className="eyebrow">
                <span className="eyebrow-dot"></span>
                AUTHENTIC SPECIFICATION
              </span>
              <h2 className="section-title">One organised place for ATP revision.</h2>
              <p className="section-subtitle">
                Clean, verified study resources curated specifically for your syllabus.
              </p>
              <div className="gold-divider centered"></div>
            </div>

            <div className="facts-grid-seven">
              {WHAT_STUDENT_GETS.map((item, index) => (
                <div className={`fact-card reveal-init stagger-${(index % 3) + 1}`} key={item.title}>
                  <div className="fact-card-icon">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            9. TRUST SECTION: SIMPLE ACCESS. CLEAR PROCESS. (NO CTA)
            ================================================================== */}
        <section id="how-it-works" className="section-editorial trust-section">
          <div className="page-container">
            <div className="section-header centered reveal-init">
              <span className="eyebrow eyebrow-gold">
                <span className="eyebrow-dot"></span>
                ACCESS WORKFLOW
              </span>
              <h2 className="section-title">Simple access. Clear process.</h2>
              <p className="section-subtitle">
                A straightforward five-step process from account creation to your revision material.
              </p>
              <div className="gold-divider centered"></div>
            </div>

            <div className="trust-steps-grid">
              {TRUST_STEPS.map((step, idx) => (
                <div className={`trust-step-card reveal-init stagger-${idx + 1}`} key={step.num}>
                  <div className="trust-step-num-badge">{step.num}</div>
                  <span className="trust-step-icon">{step.icon}</span>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                  {idx < TRUST_STEPS.length - 1 && (
                    <div className="trust-step-connector" aria-hidden="true">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            10. FAQ SECTION (ACCORDION INTERACTIONS, NO CTA)
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
                Clear answers about the pack, payment verification, and how to access your study materials.
              </p>
              <div className="gold-divider centered"></div>
            </div>

            <div className="faq-list">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div className={`faq-item ${isOpen ? "open" : ""}`} key={item.q}>
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <span className="faq-icon-bubble" aria-hidden="true">
                        {isOpen ? "✕" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
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
          11. MINIMAL FOOTER (NO PURCHASE CTA)
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
            <a href="#sneak-peek">Preview</a>
            <a href="#why-this-pack">Why This Pack</a>
            <a href="#faq">FAQ</a>
            <Link to="/login">Login</Link>
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
