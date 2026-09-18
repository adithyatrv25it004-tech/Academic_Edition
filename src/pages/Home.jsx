import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useScrollReveal } from "../lib/useScrollReveal";
import { playUiBubbleSound } from "../lib/uiBubbleSound";
import { supabase } from "../lib/supabase";

export default function Home() {
  useScrollReveal();
  const [user, setUser] = useState(null);
  const [demoSelected, setDemoSelected] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUser(data.user);
    });
  }, []);

  return (
    <div className="home-page" style={{ background: "#F7F3EA", color: "#172033", fontFamily: "var(--font-sans)", minHeight: "100vh" }}>
      
      {/* Navigation Header */}
      <header className="quiet-topbar" style={{ background: "rgba(247, 243, 234, 0.95)", backdropFilter: "blur(8px)", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid #DED5C6", padding: "16px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/" className="auth-brand" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <span style={{ background: "#172033", color: "#C79A45", width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem" }}>A</span>
            <div className="auth-brand-text">
              <strong style={{ color: "#172033", fontSize: "1.1rem" }}>ATP Python Journey</strong>
              <span style={{ display: "block", fontSize: "0.75rem", color: "#6F756F", letterSpacing: "1px", textTransform: "uppercase" }}>KTU S1 UCEST105</span>
            </div>
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: "24px", fontSize: "0.95rem", fontWeight: 500 }} className="desktop-nav">
            <a href="#why-atp" style={{ color: "#24324A" }}>Why ATP</a>
            <a href="#course" style={{ color: "#24324A" }}>Course</a>
            <a href="#demo" style={{ color: "#24324A" }}>Classroom Demo</a>
            <a href="#labs" style={{ color: "#24324A" }}>18 Labs</a>
            <a href="#pricing" style={{ color: "#24324A" }}>Pricing</a>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {user ? (
              <Link to="/vault" className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.9rem", textDecoration: "none" }}>
                Student Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/login" style={{ padding: "8px 16px", color: "#315C8C", fontWeight: 600, textDecoration: "none", fontSize: "0.95rem" }}>
                  Sign In
                </Link>
                <Link to="/signup" className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.9rem", textDecoration: "none" }}>
                  START LEARNING
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ padding: "80px 24px 60px", background: "linear-gradient(180deg, #F7F3EA 0%, #FFFDF8 100%)", borderBottom: "1px solid #DED5C6" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
          
          <div>
            <span style={{ display: "inline-block", background: "#EEF4FA", color: "#315C8C", border: "1px solid #315C8C", padding: "6px 14px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>
              KTU S1 • UCEST105 • B.Tech 2024 Scheme
            </span>
            
            <h1 style={{ fontSize: "2.8rem", lineHeight: 1.15, color: "#172033", margin: "0 0 20px 0", fontWeight: 800 }}>
              LEARN FIRST-YEAR PYTHON FROM ZERO.
            </h1>

            <p style={{ fontSize: "1.15rem", lineHeight: 1.6, color: "#6F756F", margin: "0 0 32px 0", maxWidth: "540px" }}>
              ATP guides you through <strong>Algorithmic Thinking with Python</strong> with short guided lessons, visual explanations, real Python execution, 18 practical labs, and exam preparation.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
              <Link to="/payment" onClick={() => playUiBubbleSound()} className="btn-primary" style={{ padding: "14px 32px", fontSize: "1.1rem", textDecoration: "none", boxShadow: "0 4px 14px rgba(23, 32, 51, 0.15)" }}>
                START LEARNING — ₹49
              </Link>
              <Link to="/learn/m1-problem-solving-intro" className="btn-secondary" style={{ padding: '14px 24px', fontSize: '1.1rem', textDecoration: 'none', background: '#ffffff', color: '#172033', border: '1px solid #DED5C6' }}>
                TRY A FREE LESSON
              </Link>
            </div>

            <div style={{ fontSize: "0.9rem", color: "#746E65", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <span>✓ ₹49 One-Time Access</span>
              <span>•</span>
              <span>✓ Complete UCEST105 Journey</span>
              <span>•</span>
              <span>✓ Revision Notes Included</span>
            </div>
          </div>

          {/* Hero Visual: ATP Classroom Interactive Teaser */}
          <div style={{ background: "#172033", color: "#F7F3EA", padding: "28px", borderRadius: "16px", boxShadow: "0 24px 60px rgba(23, 32, 51, 0.2)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px" }}>
              <span style={{ color: "#C79A45", fontWeight: "bold", fontSize: "0.85rem", letterSpacing: "1px" }}>
                MODULE 3 • FOR LOOPS
              </span>
              <span style={{ fontSize: "0.8rem", color: "#8b9bb4" }}>Lesson 2 of 10</span>
            </div>

            <div style={{ background: "rgba(255,255,255,0.05)", padding: "14px 16px", borderRadius: "8px", marginBottom: "16px", fontSize: "0.95rem" }}>
              <strong>🎓 ATP Teacher:</strong> "Don't run it yet. What do you think Python will print?"
            </div>

            {/* Code Block */}
            <div style={{ background: "#0d1117", padding: "16px", borderRadius: "8px", fontFamily: "monospace", fontSize: "0.95rem", color: "#a5d6ff", marginBottom: "16px" }}>
              <span style={{ color: "#ff7b72" }}>for</span> i <span style={{ color: "#ff7b72" }}>in</span> range(<span style={{ color: "#79c0ff" }}>3</span>):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;print(i)
            </div>

            {/* Simulated Execution Controls */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
              <button style={{ flex: 1, padding: "8px", background: "#315C8C", color: "#fff", border: "none", borderRadius: "6px", fontSize: "0.85rem", cursor: "pointer", fontWeight: "bold" }}>
                ▶ RUN CODE
              </button>
              <button style={{ flex: 1, padding: "8px", background: "#238636", color: "#fff", border: "none", borderRadius: "6px", fontSize: "0.85rem", cursor: "pointer", fontWeight: "bold" }}>
                ✓ CHECK MY WORK
              </button>
            </div>

            {/* Console Output Preview */}
            <div style={{ background: "#0d1117", padding: "12px", borderRadius: "6px", fontSize: "0.85rem", fontFamily: "monospace", color: "#38d9a9" }}>
              Output:<br />
              0<br />1<br />2
            </div>
          </div>

        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section id="why-atp" style={{ padding: "80px 24px", background: "#FFFDF8", borderBottom: "1px solid #DED5C6" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ color: "#813E51", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase" }}>THE FIRST-YEAR CHALLENGE</span>
          <h2 style={{ fontSize: "2.2rem", margin: "12px 0 20px 0", color: "#172033" }}>
            Python feels hard when you're left to figure out the order.
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#6F756F", lineHeight: 1.6, marginBottom: "40px" }}>
            You may already have syllabus PDFs, scattered notes, YouTube tutorials, and ChatGPT. But when exam day approaches, you still ask: <em>"What do I learn next, and how do I solve this problem?"</em>
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", textAlign: "left" }}>
            <div style={{ background: "#F7F3EA", padding: "24px", borderRadius: "12px", border: "1px solid #DED5C6" }}>
              <span style={{ fontSize: "1.5rem" }}>❌</span>
              <h4 style={{ margin: "12px 0 6px 0", color: "#172033" }}>Scattered YouTube Videos</h4>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#746E65" }}>Generic tutorials cover Web Dev or AI instead of KTU UCEST105 syllabus requirements.</p>
            </div>
            <div style={{ background: "#F7F3EA", padding: "24px", borderRadius: "12px", border: "1px solid #DED5C6" }}>
              <span style={{ fontSize: "1.5rem" }}>❌</span>
              <h4 style={{ margin: "12px 0 6px 0", color: "#172033" }}>Static PDF Notes</h4>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#746E65" }}>Reading code on paper doesn't teach call stack unwinding or loop boundaries.</p>
            </div>
            <div style={{ background: "#F7F3EA", padding: "24px", borderRadius: "12px", border: "1px solid #DED5C6" }}>
              <span style={{ fontSize: "1.5rem" }}>✅</span>
              <h4 style={{ margin: "12px 0 6px 0", color: "#315C8C" }}>The ATP Guided Path</h4>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#172033" }}>Every lesson is structured: Teach → Show → Ask → Visualize → Try → Run → Check.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW ATP TEACHES */}
      <section style={{ padding: "80px 24px", background: "#F7F3EA", borderBottom: "1px solid #DED5C6" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span style={{ color: "#C79A45", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase" }}>PEDAGOGY THAT WORKS</span>
            <h2 style={{ fontSize: "2.2rem", margin: "8px 0 0 0", color: "#172033" }}>How ATP Teaches Python</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px" }}>
            {[
              { num: "01", step: "LEARN", desc: "Understand core concepts in simple terms" },
              { num: "02", step: "SEE", desc: "Visualize loop variables and call stack" },
              { num: "03", step: "TRY", desc: "Predict output before executing" },
              { num: "04", step: "RUN", desc: "Run real Python inside your browser" },
              { num: "05", step: "CHECK", desc: "Get automatic deterministic checking" },
              { num: "06", step: "MASTER", desc: "Track progress & prepare for exam" }
            ].map((s) => (
              <div key={s.num} style={{ background: "#FFFDF8", padding: "24px 16px", borderRadius: "12px", border: "1px solid #DED5C6", textAlign: "center" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#C79A45", fontFamily: "monospace" }}>{s.num}</span>
                <h4 style={{ margin: "8px 0 6px 0", color: "#172033", fontSize: "1.1rem" }}>{s.step}</h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#6F756F" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSE MODULES OVERVIEW */}
      <section id="course" style={{ padding: "80px 24px", background: "#FFFDF8", borderBottom: "1px solid #DED5C6" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span style={{ color: "#315C8C", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase" }}>SYLLABUS COVERAGE</span>
            <h2 style={{ fontSize: "2.2rem", margin: "8px 0 0 0", color: "#172033" }}>Complete UCEST105 Modules</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            <div style={{ background: "#F7F3EA", padding: "28px", borderRadius: "14px", border: "1px solid #DED5C6" }}>
              <span style={{ fontSize: "0.8rem", color: "#315C8C", fontWeight: "bold" }}>MODULE 1 • 7 HOURS</span>
              <h3 style={{ margin: "8px 0 12px 0", color: "#172033" }}>Problem Solving & Python Essentials</h3>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#6F756F" }}>Strategies (heuristics, backtracking), computation models, variables, numeric types, math module, operators & precedence.</p>
            </div>

            <div style={{ background: "#F7F3EA", padding: "28px", borderRadius: "14px", border: "1px solid #DED5C6" }}>
              <span style={{ fontSize: "0.8rem", color: "#315C8C", fontWeight: "bold" }}>MODULE 2 • 9 HOURS</span>
              <h3 style={{ margin: "8px 0 12px 0", color: "#172033" }}>Algorithms, Pseudocode & Flowcharts</h3>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#6F756F" }}>Pseudocode structures (case, repeat-until), 9 official flowchart symbols, 10 official sample problems (factorial, grades, SI).</p>
            </div>

            <div style={{ background: "#F7F3EA", padding: "28px", borderRadius: "14px", border: "1px solid #DED5C6" }}>
              <span style={{ fontSize: "0.8rem", color: "#315C8C", fontWeight: "bold" }}>MODULE 3 • 10 HOURS</span>
              <h3 style={{ margin: "8px 0 12px 0", color: "#172033" }}>Python Programming, Functions & Recursion</h3>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#6F756F" }}>Decisions, for/while loops, strings, lists, tuples, sets, dicts, NumPy, functions, decomposition (Merge Sort) & recursion call stack.</p>
            </div>

            <div style={{ background: "#F7F3EA", padding: "28px", borderRadius: "14px", border: "1px solid #DED5C6" }}>
              <span style={{ fontSize: "0.8rem", color: "#315C8C", fontWeight: "bold" }}>MODULE 4 • 10 HOURS</span>
              <h3 style={{ margin: "8px 0 12px 0", color: "#172033" }}>Computational Approaches</h3>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#6F756F" }}>Brute Force (padlock), Divide & Conquer (Merge Sort), Dynamic Programming (Fibonacci), Greedy (task scheduling), Randomized (coupon, hats).</p>
            </div>
          </div>
        </div>
      </section>

      {/* CLASSROOM INTERACTIVE DEMO */}
      <section id="demo" style={{ padding: "80px 24px", background: "#172033", color: "#F7F3EA" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ color: "#C79A45", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase" }}>INTERACTIVE CLASSROOM DEMO</span>
          <h2 style={{ fontSize: "2.2rem", margin: "12px 0 24px 0" }}>Test Your Understanding Right Now</h2>

          <div style={{ background: "#FFFDF8", color: "#172033", padding: "32px", borderRadius: "16px", textAlign: "left", boxShadow: "0 18px 45px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontSize: "1.4rem" }}>🎓</span>
              <h4 style={{ margin: 0, color: "#315C8C" }}>ATP Teacher Question:</h4>
            </div>

            <p style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "16px" }}>
              What values are produced by <code>list(range(3))</code> in Python?
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              {[
                { id: 'a', text: '[0, 1, 2]', isCorrect: true },
                { id: 'b', text: '[1, 2, 3]', isCorrect: false },
                { id: 'c', text: '[0, 1, 2, 3]', isCorrect: false }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setDemoSelected(opt.id)}
                  style={{
                    padding: "12px 18px",
                    borderRadius: "8px",
                    border: `2px solid ${demoSelected === opt.id ? (opt.isCorrect ? "#238636" : "#cf222e") : "#DED5C6"}`,
                    background: demoSelected === opt.id ? (opt.isCorrect ? "#dafbe1" : "#ffebe9") : "#ffffff",
                    color: "#172033",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textAlign: "left",
                    cursor: "pointer"
                  }}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {demoSelected === 'a' && (
              <div style={{ background: "#dafbe1", color: "#1a7f37", padding: "14px", borderRadius: "8px", fontWeight: 600, fontSize: "0.95rem" }}>
                ✓ Correct! <code>range(3)</code> starts at 0 and stops before reaching 3, generating <code>[0, 1, 2]</code>.
              </div>
            )}

            {demoSelected && demoSelected !== 'a' && (
              <div style={{ background: "#ffebe9", color: "#cf222e", padding: "14px", borderRadius: "8px", fontWeight: 600, fontSize: "0.95rem" }}>
                ❌ Remember: In Python, <code>range(stop)</code> always excludes the stop number itself!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 18 PRACTICAL LABS & EXAM PRACTICE */}
      <section id="labs" style={{ padding: "80px 24px", background: "#FFFDF8", borderBottom: "1px solid #DED5C6" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px" }}>
          
          <div style={{ background: "#F7F3EA", padding: "32px", borderRadius: "16px", border: "1px solid #DED5C6" }}>
            <span style={{ fontSize: "2rem" }}>🧪</span>
            <h3 style={{ fontSize: "1.6rem", margin: "12px 0", color: "#172033" }}>18 Official Practical Labs</h3>
            <p style={{ color: "#6F756F", lineHeight: 1.6, marginBottom: "20px" }}>
              Every single lab experiment required by the KTU UCEST105 syllabus is implemented with real browser Python execution, viva voice practice, and lab readiness evaluation.
            </p>
            <ul style={{ paddingLeft: "20px", color: "#24324A", fontSize: "0.95rem", lineHeight: 1.8 }}>
              <li>Factorial, Fibonacci, GCD Recursion</li>
              <li>NumPy Array Append & Delete</li>
              <li>Virtual Module Imports & Custom Functions</li>
              <li>Right Triangle Checker & Mobile Validator</li>
            </ul>
          </div>

          <div style={{ background: "#F7F3EA", padding: "32px", borderRadius: "16px", border: "1px solid #DED5C6" }}>
            <span style={{ fontSize: "2rem" }}>📝</span>
            <h3 style={{ fontSize: "1.6rem", margin: "12px 0", color: "#172033" }}>ESE Exam Practice</h3>
            <p style={{ color: "#6F756F", lineHeight: 1.6, marginBottom: "20px" }}>
              Practice for the End Semester Examination using official KTU format guidelines with model answer points and self-check checklists.
            </p>
            <ul style={{ paddingLeft: "20px", color: "#24324A", fontSize: "0.95rem", lineHeight: 1.8 }}>
              <li>Part A: 8 Questions × 3 Marks = 24 Marks</li>
              <li>Part B: 4 Questions × 9 Marks = 36 Marks</li>
              <li>Full 60-Mark ESE Mock Exam Mode</li>
              <li>Model Points & Keyword Evaluation Rubric</li>
            </ul>
          </div>

        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" style={{ padding: "80px 24px", background: "#F7F3EA" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textTransform: "center" }}>
          <div style={{ background: "#FFFDF8", padding: "40px", borderRadius: "20px", border: "2px solid #C79A45", boxShadow: "0 18px 45px rgba(23, 32, 51, 0.08)", textAlign: "center" }}>
            <span style={{ background: "#FAF5E8", color: "#C79A45", padding: "6px 16px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>
              ALL-INCLUSIVE ACCESS
            </span>

            <h2 style={{ fontSize: "2.2rem", margin: "16px 0 8px 0", color: "#172033" }}>ATP Python Journey</h2>
            <div style={{ fontSize: "3rem", fontWeight: "800", color: "#172033", margin: "12px 0" }}>
              ₹49 <span style={{ fontSize: "1.1rem", color: "#6F756F", fontWeight: "normal" }}>/ ONE-TIME</span>
            </div>

            <p style={{ color: "#6F756F", fontSize: "0.95rem", marginBottom: "32px" }}>
              One-time payment unlocks the complete course, practical labs, exam practice, and included study notes.
            </p>

            <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px", fontSize: "0.95rem" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}><span>✓</span> <span>Complete UCEST105 Syllabus (Modules 1–4)</span></div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}><span>✓</span> <span>Interactive Tuition-Style Guided Lessons</span></div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}><span>✓</span> <span>Real Browser Python Execution & Checkers</span></div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}><span>✓</span> <span>All 18 Official Practical Lab Experiments</span></div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}><span>✓</span> <span>Viva Voice Practice & ESE Mock Exam</span></div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}><span>✓</span> <span>All ATP Revision Notes Included</span></div>
            </div>

            <Link to="/payment" onClick={() => playUiBubbleSound()} className="btn-primary" style={{ display: "block", padding: "16px", fontSize: "1.15rem", textDecoration: "none", boxShadow: "0 4px 14px rgba(23, 32, 51, 0.2)" }}>
              UNLOCK PYTHON JOURNEY — ₹49
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#172033", color: "#8b9bb4", padding: "40px 24px", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: "0.9rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <strong style={{ color: "#F7F3EA", fontSize: "1.1rem" }}>ATP Python Journey</strong>
            <p style={{ margin: "4px 0 0 0" }}>Algorithmic Thinking with Python • KTU S1 UCEST105</p>
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <Link to="/privacy" style={{ color: "#8b9bb4" }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: "#8b9bb4" }}>Terms of Service</Link>
            <Link to="/refund" style={{ color: "#8b9bb4" }}>Refund Policy</Link>
            <Link to="/support" style={{ color: "#8b9bb4" }}>Support</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
