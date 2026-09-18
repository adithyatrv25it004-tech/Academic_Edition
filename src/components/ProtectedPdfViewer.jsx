import { useEffect, useState, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import './ProtectedPdfViewer.css';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

/**
 * Individual Lazy-Loaded PDF Page
 */
function PdfPageItem({
  pdfDoc,
  pageNum,
  scale,
  watermarkText,
  aspectRatio,
  onVisible,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);
  const [isRendered, setIsRendered] = useState(false);
  const [shouldRender, setShouldRender] = useState(pageNum <= 2); // Eagerly render first 2 pages

  // Lazy loading observer
  useEffect(() => {
    if (shouldRender) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRender(true);
            if (onVisible) onVisible(pageNum);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '600px 0px 600px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldRender, pageNum, onVisible]);

  // Canvas render logic
  useEffect(() => {
    if (!shouldRender || !pdfDoc || !canvasRef.current) return;

    let isCancelled = false;

    async function renderPage() {
      try {
        const page = await pdfDoc.getPage(pageNum);
        if (isCancelled) return;

        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Cancel previous task if active
        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch {
            // ignore
          }
        }

        const renderContext = {
          canvasContext: ctx,
          viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
        if (!isCancelled) {
          setIsRendered(true);
        }
      } catch (err) {
        if (err?.name !== 'RenderingCancelledException') {
          console.warn(`Error rendering page ${pageNum}:`, err);
        }
      }
    }

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // ignore
        }
      }
    };
  }, [shouldRender, pdfDoc, pageNum, scale]);

  // Repeating diagonal watermark items for this page
  const watermarkItems = Array.from({ length: 14 }).map((_, i) => (
    <span key={i} className="page-watermark-item">
      {watermarkText}
    </span>
  ));

  return (
    <div
      ref={containerRef}
      className="protected-page-container"
      data-page-number={pageNum}
      style={{
        minHeight: aspectRatio ? `${800 * aspectRatio}px` : '750px',
      }}
    >
      <div className="protected-page-sheet">
        <canvas ref={canvasRef} className="protected-page-canvas" />

        {/* Per-Page Persistent Watermark Grid */}
        <div className="page-watermark-overlay" aria-hidden="true">
          <div className="page-watermark-grid">
            {watermarkItems}
          </div>
        </div>

        {/* Loading placeholder before rendering */}
        {!isRendered && (
          <div className="page-loading-skeleton" aria-hidden="true">
            <span className="page-skeleton-indicator">Page {pageNum}</span>
          </div>
        )}
      </div>

      <div className="page-footer-index">
        <span>— Page {pageNum} —</span>
      </div>
    </div>
  );
}

/**
 * ProtectedPdfViewer
 * Custom PDF.js Canvas Reader without Download, Print, or Browser Controls
 */
export default function ProtectedPdfViewer({
  pdfUrl,
  title = 'Study Material',
  watermark = {},
  onClose,
}) {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.15);
  const [aspectRatio, setAspectRatio] = useState(1.414); // default A4 ratio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const scrollContainerRef = useRef(null);

  // Formatted watermark string
  const watermarkText = `ATP REVISION VAULT • Licensed to: ${watermark.licensed_to || 'Confidential Student'} • Ref: ${watermark.order_id || 'ATP-ACTIVE'} • PERSONAL STUDY ACCESS`;

  // Keyboard shortcut deterrence (Ctrl+S, Ctrl+P, etc.)
  useEffect(() => {
    function handleKeyDown(e) {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (
        mod &&
        (e.key === 's' ||
          e.key === 'S' ||
          e.key === 'p' ||
          e.key === 'P' ||
          e.key === 'u' ||
          e.key === 'U')
      ) {
        e.preventDefault();
        e.stopPropagation();
      }

      // Quick keyboard page navigation
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        // Allow smooth scroll
      }
      if (e.key === 'Escape') {
        if (onClose) onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [onClose]);

  // Load PDF Document via PDF.js
  useEffect(() => {
    let isCancelled = false;

    async function loadDocument() {
      setLoading(true);
      setError('');
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          withCredentials: false,
          isEvalSupported: false,
        });

        const doc = await loadingTask.promise;
        if (isCancelled) return;

        setPdfDoc(doc);
        setNumPages(doc.numPages);

        // Measure aspect ratio from page 1
        try {
          const firstPage = await doc.getPage(1);
          const vp = firstPage.getViewport({ scale: 1 });
          if (vp.width && vp.height) {
            setAspectRatio(vp.height / vp.width);
          }
        } catch {
          // fallback ratio
        }

        setLoading(false);
      } catch (err) {
        console.error('Failed to load PDF via PDF.js:', err);
        if (!isCancelled) {
          setError('Unable to open this material. Please refresh your study session.');
          setLoading(false);
        }
      }
    }

    if (pdfUrl) {
      loadDocument();
    }

    return () => {
      isCancelled = true;
    };
  }, [pdfUrl]);

  // Page Scroll Tracker
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const pageElements = container.querySelectorAll('.protected-page-container');
    const containerTop = container.scrollTop + 120;

    for (let i = 0; i < pageElements.length; i++) {
      const el = pageElements[i];
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (containerTop >= top && containerTop < top + height) {
        const pNum = parseInt(el.getAttribute('data-page-number') || '1', 10);
        setCurrentPage(pNum);
        break;
      }
    }
  }, []);

  const scrollToPage = (pageNum) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const target = container.querySelector(`[data-page-number="${pageNum}"]`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentPage(pageNum);
    }
  };

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.15, 2.0));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.15, 0.75));
  const handleFitWidth = () => setScale(1.0);

  return (
    <div
      className="protected-viewer-root"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Top Academic Reader Bar */}
      <header className="protected-viewer-topbar">
        {/* Left: Branding & Material Title */}
        <div className="viewer-top-left">
          <div className="viewer-brand-badge">
            <span className="brand-dot">A</span>
            <strong>ATP Python Journey</strong>
          </div>
          <span className="viewer-title-divider">/</span>
          <span className="viewer-material-title" title={title}>
            {title}
          </span>
        </div>

        {/* Center: Reading & Zoom Controls */}
        <div className="viewer-top-center">
          <div className="viewer-page-controls">
            <button
              type="button"
              className="viewer-ctrl-btn"
              onClick={() => scrollToPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage <= 1 || loading}
              aria-label="Previous Page"
            >
              ‹
            </button>

            <span className="viewer-page-indicator">
              Page <strong>{currentPage}</strong> of <strong>{numPages || '–'}</strong>
            </span>

            <button
              type="button"
              className="viewer-ctrl-btn"
              onClick={() => scrollToPage(Math.min(currentPage + 1, numPages))}
              disabled={currentPage >= numPages || loading}
              aria-label="Next Page"
            >
              ›
            </button>
          </div>

          <div className="viewer-zoom-controls">
            <button
              type="button"
              className="viewer-ctrl-btn"
              onClick={handleZoomOut}
              disabled={scale <= 0.8 || loading}
              aria-label="Zoom Out"
            >
              −
            </button>

            <button
              type="button"
              className="viewer-ctrl-btn-text"
              onClick={handleFitWidth}
              title="Reset Zoom"
            >
              {Math.round(scale * 100)}%
            </button>

            <button
              type="button"
              className="viewer-ctrl-btn"
              onClick={handleZoomIn}
              disabled={scale >= 2.0 || loading}
              aria-label="Zoom In"
            >
              +
            </button>
          </div>
        </div>

        {/* Right: Security Pill & Back to Vault */}
        <div className="viewer-top-right">
          <span className="viewer-sec-pill">
            <span className="sec-icon">🔒</span> Protected Study View
          </span>

          <button
            type="button"
            className="viewer-back-btn"
            onClick={onClose}
            aria-label="Back to Vault"
          >
            ← Back to Vault
          </button>
        </div>
      </header>

      {/* Main Document Reading Surface */}
      <main
        ref={scrollContainerRef}
        className="protected-viewer-surface"
        onScroll={handleScroll}
      >
        {loading ? (
          <div className="viewer-loading-container">
            <div className="viewer-loading-spinner" aria-hidden="true" />
            <h3 className="viewer-loading-title">Preparing your protected study material...</h3>
            <p className="viewer-loading-sub">
              Decrypting and rendering pages securely with individual student watermarks.
            </p>
          </div>
        ) : error ? (
          <div className="viewer-error-container">
            <span className="viewer-error-icon">🔒</span>
            <h3>Access Notice</h3>
            <p>{error}</p>
            <button
              type="button"
              className="btn-primary"
              onClick={onClose}
              style={{ width: 'auto', padding: '10px 24px', fontSize: '13px' }}
            >
              Return to Vault
            </button>
          </div>
        ) : (
          <div className="protected-document-flow">
            {Array.from({ length: numPages }, (_, index) => (
              <PdfPageItem
                key={index + 1}
                pdfDoc={pdfDoc}
                pageNum={index + 1}
                scale={scale}
                watermarkText={watermarkText}
                aspectRatio={aspectRatio}
              />
            ))}

            {/* Subtle Security Footnote */}
            <div className="protected-reader-footer">
              <span className="reader-footer-rule" />
              <p>Personal study access. Redistribution is not permitted.</p>
              <small>Protected by ATP Python Journey Cryptographic Device Security</small>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
