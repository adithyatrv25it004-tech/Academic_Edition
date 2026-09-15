import { Link } from "react-router-dom";
import "./Auth.css";

function Refund() {
  return (
    <main className="auth-page">
      <section className="auth-card" style={{ maxWidth: "700px", textAlign: "left" }}>
        <Link className="auth-brand" to="/">
          <span className="auth-brand-icon">A</span>
          <div className="auth-brand-text">
            <strong>ATP Revision Vault</strong>
            <span>REFUND POLICY</span>
          </div>
        </Link>

        <div className="auth-header" style={{ textAlign: "left" }}>
          <span className="auth-eyebrow">CUSTOMER SERVICE</span>
          <h1>Refund Policy</h1>
          <p>Last updated: September 2026</p>
        </div>

        <div className="legal-content">
          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>Refund Policy Statement</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              <strong>Refund policy must be confirmed by the site owner before launch.</strong>
            </p>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              The ATP Revision Vault team is committed to customer satisfaction. Our refund policy is designed to be fair while protecting the integrity of our digital study materials.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>Refund Request Process</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              To request a refund, please:
            </p>
            <ol style={{ paddingLeft: "20px", lineHeight: "1.8", color: "var(--muted-brown)" }}>
              <li>Contact our support team through the support page</li>
              <li>Provide your order ID and email address used for purchase</li>
              <li>Explain the reason for your refund request</li>
              <li>Allow 5-7 business days for processing</li>
            </ol>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>Refund Eligibility</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              Refund eligibility will be determined based on:
            </p>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "var(--muted-brown)" }}>
              <li>Time since purchase</li>
              <li>Technical issues preventing access to materials</li>
              <li>Content not matching description</li>
              <li>Other valid customer service concerns</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>Digital Content Considerations</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              As ATP Revision Vault provides digital study materials, please note:
            </p>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "var(--muted-brown)" }}>
              <li>Once accessed, materials cannot be "returned" in the traditional sense</li>
              <li>Our device binding system helps ensure fair usage</li>
              <li>We work to resolve technical issues before considering refunds</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>Contact for Refund Requests</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              Please use our support page to submit refund requests. Our team will review your case and respond within the stated timeframe.
            </p>
          </section>

          <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
            <Link to="/" style={{ fontSize: "14px", color: "var(--muted)", textDecoration: "none" }}>
              ← Return to Homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Refund;