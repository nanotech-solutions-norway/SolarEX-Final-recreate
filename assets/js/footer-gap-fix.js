(() => {
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const getDocumentY = (rect) => rect.top + window.scrollY;

  const getLastMeaningfulContentBottom = (section) => {
    if (!section) return 0;
    const selectors = [
      '.card', '.card.blue', '.table-wrap', '.source-visual', '.mechanism-visual', '.responsive-chart',
      '.form-shell', '.contact-form', '.stats', '.grid', '.timeline', '.btn-row', '.visual-warning',
      '.selector-output', '.visual-audit-section .container', '.container > *:last-child'
    ].join(',');
    const candidates = Array.from(section.querySelectorAll(selectors));
    let bottom = getDocumentY(section.getBoundingClientRect());
    candidates.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        bottom = Math.max(bottom, getDocumentY(rect) + rect.height);
      }
    });
    return bottom;
  };

  const fixSolarEXFooterGap = () => {
    const main = document.querySelector('main');
    const footer = document.querySelector('.site-footer');
    if (!main || !footer) return;

    footer.style.marginTop = '';
    footer.classList.remove('footer-gap-pulled');

    const sections = Array.from(main.querySelectorAll(':scope > .section'));
    sections.forEach((section) => {
      const visibleText = (section.textContent || '').replace(/\s+/g, ' ').trim();
      const hasVisibleMedia = section.querySelector('img,svg,video,canvas,iframe,table,form,.card,.stat,.step,.source-visual,.visual-card,.table-wrap,.btn-row');
      const rect = section.getBoundingClientRect();
      if (!visibleText && !hasVisibleMedia) {
        section.classList.add('footer-gap-empty');
        section.setAttribute('aria-hidden', 'true');
      }
      if (rect.height > 260 && !visibleText && !hasVisibleMedia) {
        section.classList.add('footer-gap-empty');
        section.setAttribute('aria-hidden', 'true');
      }
    });

    const visibleSections = sections.filter((section) => !section.classList.contains('footer-gap-empty'));
    visibleSections.forEach((section) => section.classList.remove('footer-proximity-section'));
    const last = visibleSections[visibleSections.length - 1];
    if (!last) return;

    last.classList.add('footer-proximity-section');
    main.classList.add('footer-gap-compact');

    const footerTop = getDocumentY(footer.getBoundingClientRect());
    const lastContentBottom = getLastMeaningfulContentBottom(last);
    const gap = footerTop - lastContentBottom;
    const desiredGap = window.matchMedia('(max-width: 980px)').matches ? 34 : 44;

    if (gap > desiredGap + 36) {
      const pull = clamp(gap - desiredGap, 0, 720);
      footer.style.marginTop = `-${pull}px`;
      footer.classList.add('footer-gap-pulled');
      main.dataset.footerGapAdjusted = String(Math.round(gap));
    } else {
      main.dataset.footerGapAdjusted = '0';
    }
  };

  const scheduleFooterGapFix = () => {
    fixSolarEXFooterGap();
    window.requestAnimationFrame(fixSolarEXFooterGap);
    window.setTimeout(fixSolarEXFooterGap, 160);
    window.setTimeout(fixSolarEXFooterGap, 520);
    window.setTimeout(fixSolarEXFooterGap, 1100);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleFooterGapFix, { once: true });
  } else {
    scheduleFooterGapFix();
  }
  window.addEventListener('load', scheduleFooterGapFix, { once: true });
  window.addEventListener('resize', () => window.requestAnimationFrame(fixSolarEXFooterGap));
})();
