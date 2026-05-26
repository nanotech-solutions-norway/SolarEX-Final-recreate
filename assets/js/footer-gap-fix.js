(() => {
  const fixSolarEXFooterGap = () => {
    const main = document.querySelector('main');
    const footer = document.querySelector('.site-footer');
    if (!main || !footer) return;

    const sections = Array.from(main.querySelectorAll(':scope > .section'));
    sections.forEach((section) => {
      const visibleText = (section.textContent || '').replace(/\s+/g, ' ').trim();
      const hasVisibleMedia = section.querySelector('img,svg,video,canvas,iframe,table,form,.card,.stat,.step,.source-visual,.visual-card,.table-wrap');
      const rect = section.getBoundingClientRect();
      if (!visibleText && !hasVisibleMedia) {
        section.classList.add('footer-gap-empty');
        section.setAttribute('aria-hidden', 'true');
      }
      if (rect.height > 260 && !visibleText && !hasVisibleMedia) {
        section.classList.add('footer-gap-empty');
      }
    });

    const visibleSections = sections.filter((section) => !section.classList.contains('footer-gap-empty'));
    const last = visibleSections[visibleSections.length - 1];
    if (last) last.classList.add('footer-proximity-section');
    main.classList.add('footer-gap-compact');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixSolarEXFooterGap, { once: true });
  } else {
    fixSolarEXFooterGap();
  }
  window.addEventListener('load', fixSolarEXFooterGap, { once: true });
})();
