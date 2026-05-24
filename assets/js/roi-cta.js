(() => {
  const initSolarEXRoiCtas = () => {
    if (document.body.dataset.roiCtaReady === 'true') return;
    document.body.dataset.roiCtaReady = 'true';

    const repoName = 'SolarEX-Final-recreate';
    const parts = window.location.pathname.split('/').filter(Boolean);
    const repoIndex = parts.indexOf(repoName);
    const routeParts = repoIndex >= 0 ? parts.slice(repoIndex + 1) : parts;
    const isFileRoute = routeParts.length && /\.[a-z0-9]+$/i.test(routeParts[routeParts.length - 1]);
    const depth = isFileRoute ? Math.max(routeParts.length - 1, 0) : routeParts.length;
    const prefix = '../'.repeat(depth);
    const repoBase = repoIndex >= 0 ? `/${repoName}/` : '';
    const route = (path) => repoBase ? `${repoBase}${path}` : `${prefix}${path}`;
    const routePath = routeParts.join('/').replace(/\/$/, '') || 'home';
    const roiHref = route('roi-calculator/');
    const technicalHref = route('technical-review/');

    const addNavLink = () => {
      document.querySelectorAll('[data-nav], .site-nav:not(.seo-static-nav):not(.roi-nav)').forEach((nav) => {
        if (nav.querySelector('[data-roi-menu-link]')) return;
        const contact = nav.querySelector('.nav-cta, a[href*="contact"]');
        const link = document.createElement('a');
        link.href = roiHref;
        link.className = 'nav-roi-link';
        link.dataset.roiMenuLink = 'true';
        link.textContent = 'ROI Calculator';
        if (contact) contact.insertAdjacentElement('beforebegin', link);
        else nav.appendChild(link);
      });
      document.querySelectorAll('.seo-static-nav').forEach((nav) => {
        if (nav.querySelector('[data-roi-menu-link]')) return;
        const cta = nav.querySelector('.nav-cta');
        const link = document.createElement('a');
        link.href = roiHref;
        link.dataset.roiMenuLink = 'true';
        link.className = 'nav-roi-link';
        link.textContent = 'ROI Calculator';
        if (cta) cta.insertAdjacentElement('beforebegin', link);
        else nav.appendChild(link);
      });
    };

    const addFooterLink = () => {
      document.querySelectorAll('.site-footer,.roi-footer').forEach((footer) => {
        if (footer.querySelector('[data-roi-footer-link]')) return;
        const conversionCol = Array.from(footer.querySelectorAll('div')).find((div) => /conversion|contact|tools/i.test(div.querySelector('h3')?.textContent || ''));
        const target = conversionCol || footer.querySelector('.footer-grid > div:last-child,.roi-footer-grid > div:last-child') || footer;
        const link = document.createElement('a');
        link.href = roiHref;
        link.dataset.roiFooterLink = 'true';
        link.className = 'roi-footer-link';
        link.textContent = 'ROI Calculator';
        target.appendChild(link);
      });
    };

    const shouldAddPageCta = () => {
      if (routePath === 'roi-calculator' || routePath === 'contact/thanks') return false;
      return ['home','quartz','titan','technology','projects','documentation','faq','contact','applications','markets','markets/europe','markets/middle-east','markets/nordics','industries/solar-asset-owners','industries/epc-installers','industries/om-teams','partners','case-studies','technical-review'].includes(routePath);
    };

    const ctaCopy = () => {
      if (routePath.includes('quartz')) return ['Calculate Quartz SiO₂ project value.', 'Use the ROI calculator to screen Quartz assumptions for coated area, sunlight hours, energy value and service-life context.'];
      if (routePath.includes('titan')) return ['Calculate Titan TiO₂ project value.', 'Use the ROI calculator to screen Titan study-uplift assumptions before technical review.'];
      if (routePath.includes('projects') || routePath.includes('case-studies')) return ['Translate evidence into an ROI scenario.', 'Use project context, annual energy value and coating assumptions to create a screening-level commercial model.'];
      if (routePath.includes('documentation')) return ['Use documents with an ROI scenario.', 'Combine technical documentation with a calculator scenario before procurement or pilot decisions.'];
      if (routePath.includes('technology')) return ['Compare pathway value with ROI inputs.', 'Select Quartz or Titan, then calculate the commercial scenario using site-specific assumptions.'];
      return ['Estimate SolarEX ROI for your site.', 'Model annual gain, payback and local-currency value for Quartz SiO₂ or Titan TiO₂ before requesting a technical review.'];
    };

    const addPageCta = () => {
      if (!shouldAddPageCta() || document.querySelector('[data-roi-cross-cta]')) return;
      const main = document.querySelector('main');
      if (!main) return;
      const [title, text] = ctaCopy();
      const section = document.createElement('section');
      section.className = 'roi-cross-cta reveal';
      section.dataset.roiCrossCta = 'true';
      section.innerHTML = `
        <div class="container">
          <div class="roi-cta-panel">
            <div><div class="kicker">ROI scenario tool</div><h2>${title}</h2><p>${text}</p></div>
            <div class="roi-cta-actions"><a class="btn primary" href="${roiHref}">Open ROI Calculator</a><a class="btn secondary" href="${technicalHref}">Request Technical Review</a></div>
          </div>
        </div>`;
      const footer = main.querySelector('.site-footer, .roi-footer') || document.querySelector('.site-footer,.roi-footer');
      if (footer && footer.parentElement === main) main.insertBefore(section, footer);
      else main.appendChild(section);
    };

    const run = () => { addNavLink(); addFooterLink(); addPageCta(); };
    run();
    new MutationObserver(run).observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSolarEXRoiCtas, { once: true });
  else initSolarEXRoiCtas();
})();
