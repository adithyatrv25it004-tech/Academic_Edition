import { Component, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookScene from "../three/BookScene";
import { playUiBubbleSound } from "../../lib/uiBubbleSound";
import "./CinematicHero.css";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  { range: [0, 0.18], step: "01", kicker: "ATP COMPLETE REVISION PACK", title: "Revise smarter.", sub: "Walk in prepared.", detail: "Everything you need for focused ATP revision — simplified notes, PYQs, important questions and final-hour revision, organised in one place." },
  { range: [0.18, 0.28], step: "02", kicker: "THE VAULT APPROACHES", title: "The Vault Approaches.", sub: "Built for focused revision.", detail: "Step closer to your structured revision blueprint designed for peak academic performance." },
  { range: [0.28, 0.38], step: "03", kicker: "THE HARDCOVER OPENS", title: "The Vault Opens.", sub: "From the spine.", detail: "The front cover hinges open from the spine to reveal your structured revision blueprint." },
  { range: [0.38, 0.48], step: "04", kicker: "FEATURE 1 — TEXTBOOK MATERIAL", title: "Complete Textbook Material.", sub: "Reference-aligned theory.", detail: "Core concepts, organised clearly without unnecessary textbook fluff." },
  { range: [0.48, 0.58], step: "05", kicker: "FEATURE 2 — SIMPLIFIED NOTES", title: "Simplified Notes.", sub: "Understand faster.", detail: "Clear conceptual breakdowns designed to build strong foundations in minimal time." },
  { range: [0.58, 0.68], step: "06", kicker: "FEATURE 3 — REVISION NOTES", title: "High-Yield Summary.", sub: "Revision notes.", detail: "Structured formula blocks and high-impact summaries for rapid second-round review." },
  { range: [0.68, 0.78], step: "07", kicker: "FEATURE 4 — COMPLETE PYQ COLLECTION", title: "Complete PYQ Collection.", sub: "Before & after 2024 schemes.", detail: "Comprehensive past exam questions split into pre-2024 and 2024+ schemes for targeted practice." },
  { range: [0.78, 0.86], step: "08", kicker: "FEATURE 5 — IMPORTANT QUESTIONS", title: "Important Questions.", sub: "Exam priority bank.", detail: "High-probability questions marked with priority indicators so you spend time where it counts." },
  { range: [0.86, 0.92], step: "09", kicker: "FEATURE 6 — QUICK REVISION", title: "Built for Final Hours.", sub: "Quick recall deck.", detail: "Compact recall cards designed to refresh key definitions and formulas right before the exam." },
  { range: [0.92, 1.01], step: "10", kicker: "STRICTLY SYLLABUS-FOCUSED", title: "Ready for Your Exam.", sub: "Strictly syllabus-focused.", detail: "No unnecessary clutter. Your complete ATP Revision Pack is fully assembled for ₹49." },
];

function getChapterIndex(progress) {
  const index = CHAPTERS.findIndex(({ range }) => progress >= range[0] && progress < range[1]);
  return index === -1 ? CHAPTERS.length - 1 : index;
}

class WebGLBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function CinematicHero() {
  const sectionRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const progressRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobile, setMobile] = useState(false);
  const chapter = CHAPTERS[chapterIndex];

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    updateMotion();
    motionQuery.addEventListener?.("change", updateMotion);
    return () => motionQuery.removeEventListener?.("change", updateMotion);
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 860px)");
    const updateMobile = () => setMobile(mobileQuery.matches);
    updateMobile();
    mobileQuery.addEventListener?.("change", updateMobile);
    return () => mobileQuery.removeEventListener?.("change", updateMobile);
  }, []);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      progressRef.current = 0;
      return undefined;
    }
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${Math.max(window.innerHeight * 3.8, 2200)}`,
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        setScrollProgress(self.progress);
        sectionRef.current?.style.setProperty("--scroll-progress", self.progress.toFixed(4));
        const nextChapter = getChapterIndex(self.progress);
        setChapterIndex((current) => current === nextChapter ? current : nextChapter);
      },
    });
    return () => trigger.kill();
  }, [reducedMotion]);

  useEffect(() => {
    const onPointerMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * -2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`cinematic-hero ${reducedMotion ? "is-reduced" : ""}`}
      style={{ "--scroll-progress": 0.01 }}
      aria-label="ATP Python Journey Hero Section"
    >
      <div className="hero-ambient-glow" aria-hidden="true" />

      {/* Main 2-Column Container */}
      <div className="hero-container">
        {/* LEFT COLUMN: Editorial Academic Content */}
        <div className="hero-text-column">
          <div className="hero-eyebrow">
            <span className="eyebrow-num">{chapter.step} /</span>
            <span className="eyebrow-text">{chapter.kicker}</span>
            <span className="eyebrow-rule" aria-hidden="true" />
          </div>

          <h1 className="hero-headline">
            <span className="headline-line-1">
              {chapterIndex === 0 ? "Revise smarter." : chapter.title}
            </span>
            <span className="headline-line-2">
              {chapterIndex === 0 ? "Walk in prepared." : chapter.sub}
            </span>
          </h1>

          <p className="hero-description">
            {chapter.detail}
          </p>

          <p className="hero-secondary-line">
            Less searching. More revising. Better use of your final hours.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <Link
              to="/signup"
              className="hero-primary-cta"
              onClick={() => playUiBubbleSound()}
            >
              <span>GET THE COMPLETE PACK — ₹49</span>
              <span className="cta-arrow" aria-hidden="true">→</span>
            </Link>
            <a
              href="#why-this-pack"
              className="hero-secondary-cta"
              onClick={() => playUiBubbleSound()}
            >
              <span>Explore What&apos;s Inside</span>
              <span className="cta-arrow-down" aria-hidden="true">↓</span>
            </a>
          </div>

          {/* Trust Row */}
          <div className="hero-trust-row">
            <span className="trust-item">
              <svg className="trust-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="5" width="16" height="11" rx="2" />
                <path d="M2 9h16" />
                <path d="M5 13h3" />
              </svg>
              One-time payment
            </span>
            <span className="trust-sep" aria-hidden="true">•</span>
            <span className="trust-item">
              <svg className="trust-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 17v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 15.5V17" />
                <circle cx="10" cy="7" r="3.5" />
              </svg>
              Personal access
            </span>
            <span className="trust-sep" aria-hidden="true">•</span>
            <span className="trust-item">
              <svg className="trust-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 17h14" />
                <path d="M6 17V12" />
                <path d="M10 17V8" />
                <path d="M14 17V4" />
              </svg>
              Built for focused revision
            </span>
          </div>

          {/* Scroll Progress Pill */}
          {scrollProgress > 0.15 && (
            <div className="hero-scroll-pill">
              <span className="pill-dot" />
              <span>Step {chapter.step}: {chapter.kicker}</span>
            </div>
          )}

          {/* Bottom Watermark */}
          <div className="hero-watermark">
            BUILT FOR BRIGHTER TOMORROWS
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Animated Book Scene */}
        <div className="hero-visual-column">
          <div className="hero-ambient-orbit" aria-hidden="true" />
          <div className="hero-book-stage">
            <WebGLBoundary fallback={<div className="cinematic-fallback-book" aria-hidden="true" />}>
              <BookScene
                progressRef={progressRef}
                reducedMotion={reducedMotion}
                pointer={pointer}
                mobile={mobile}
              />
            </WebGLBoundary>
          </div>
        </div>
      </div>

      {/* Editorial Scroll Cue */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <span>SCROLL TO OPEN THE VAULT</span>
        <span className="scroll-cue-arrow">↓</span>
      </div>
    </section>
  );
}

export default CinematicHero;
