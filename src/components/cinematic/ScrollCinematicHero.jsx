import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookScene from "../three/BookScene";
import "./ScrollCinematicHero.css";

gsap.registerPlugin(ScrollTrigger);

function ScrollCinematicHero() {
  const containerRef = useRef(null);
  const progressRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check mobile and reduced motion preferences
    const checkPreferences = () => {
      setIsMobile(window.innerWidth < 1024);
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    };
    checkPreferences();
    window.addEventListener("resize", checkPreferences);
    return () => window.removeEventListener("resize", checkPreferences);
  }, []);

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    // Set up scroll timeline
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400vh", // Scroll distance for animation
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Update progress ref on scroll
      timeline.to(progressRef, {
        value: 1,
        duration: 1,
        onUpdate: () => {
          progressRef.current = timeline.progress();
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Handle pointer movement for subtle parallax
  useEffect(() => {
    if (reducedMotion || isMobile) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      pointerRef.current.x = (e.clientX / innerWidth - 0.5) * 2;
      pointerRef.current.y = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion, isMobile]);

  return (
    <section ref={containerRef} className="scroll-cinematic-hero" aria-label="ATP Python Journey Cinematic Hero">
      <div className="scroll-cinematic-hero-content">
        {/* Left Column: Editorial Content */}
        <div className="cinematic-text-column">
        <div className="cinematic-eyebrow">
          <span className="eyebrow-num">01 /</span>
          <span className="eyebrow-text">ATP COMPLETE REVISION PACK</span>
          <span className="eyebrow-rule" aria-hidden="true" />
        </div>

        <h1 className="cinematic-headline">
          <span className="headline-line-1">Revise smarter.</span>
          <span className="headline-line-2">Walk in prepared.</span>
        </h1>

        <p className="cinematic-description">
          Everything you need for focused ATP revision — simplified notes, PYQs,
          important questions and final-hour revision, organised in one place.
        </p>

        <p className="cinematic-secondary-line">
          Less searching. More revising. Better use of your final hours.
        </p>

        <div className="cinematic-cta-group">
          <Link to="/signup" className="cinematic-primary-cta">
            <span>GET THE COMPLETE PACK — ₹49</span>
            <span className="cta-arrow" aria-hidden="true">→</span>
          </Link>
          <a href="#why-this-pack" className="cinematic-secondary-cta">
            <span>Explore What&apos;s Inside</span>
            <span className="cta-arrow-down" aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="cinematic-trust-row">
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

        <div className="cinematic-watermark">
          BUILT FOR BRIGHTER TOMORROWS
        </div>
      </div>

      {/* Right Column: 3D Book Scene */}
      <div className="cinematic-visual-column">
        <BookScene 
          progressRef={progressRef} 
          reducedMotion={reducedMotion}
          pointer={pointerRef}
          mobile={isMobile}
        />
      </div>
    </div>
    </section>
  );
}

export default ScrollCinematicHero;