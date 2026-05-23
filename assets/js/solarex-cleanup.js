(() => {
  const initSolarEXCleanup = () => {
    if (document.body.dataset.solarexCleanupReady === 'true') return;
    document.body.dataset.solarexCleanupReady = 'true';

    /* Remove legacy top-strip injected in older page templates. */
    document.querySelectorAll('body > .skip-link + div[style*="border-bottom"]').forEach((element) => element.remove());

    /* Remove old hero contact microcopy/button trace shown before the contact-form routing model. */
    document.querySelectorAll('.hero .mini').forEach((element) => {
      const text = (element.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      if (
        text.includes('clear mechanism selection') ||
        text.includes('structured application logic') ||
        text.includes('evidence-led pilot review') ||
        text.includes('contact:') ||
        element.querySelector('a[href^="mailto:info@solarex.no"], .email-cta')
      ) {
        element.remove();
      }
    });

    /* Remove any remaining converted email CTA buttons from hero copy only. */
    document.querySelectorAll('.hero .email-cta').forEach((element) => element.remove());

    /* Mark cards that contain CTAs for equal-height CTA handling in side-by-side layouts. */
    document.querySelectorAll('.card, .visual-card, .diagram-card, .chart-card, .workflow-card').forEach((card) => {
      const ctas = card.querySelectorAll(':scope > .btn, :scope > a.btn, :scope > .btn-row .btn');
      if (ctas.length) card.classList.add('has-card-cta');
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSolarEXCleanup, { once: true });
  } else {
    initSolarEXCleanup();
  }
})();
