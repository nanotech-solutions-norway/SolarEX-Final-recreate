(() => {
  const init = () => {
    if (document.body.dataset.solarexCleanupReady === 'true') return;
    document.body.dataset.solarexCleanupReady = 'true';

    const repoName = 'SolarEX-Final-recreate';
    const parts = window.location.pathname.split('/').filter(Boolean);
    const repoIndex = parts.indexOf(repoName);
    const routeParts = repoIndex >= 0 ? parts.slice(repoIndex + 1) : parts;
    const isFileRoute = routeParts.length && /\.[a-z0-9]+$/i.test(routeParts[routeParts.length - 1]);
    const depth = isFileRoute ? Math.max(routeParts.length - 1, 0) : routeParts.length;
    const prefix = '../'.repeat(depth);
    const repoBase = repoIndex >= 0 ? `/${repoName}/` : '';
    const asset = (path) => repoBase ? `${repoBase}${path}` : `${prefix}${path}`;
    const route = (path) => repoBase ? `${repoBase}${path}` : `${prefix}${path}`;

    const loadCss = (href, marker) => {
      if (document.querySelector(`link[${marker}]`)) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.setAttribute(marker, 'true');
      document.head.appendChild(link);
    };
    const loadScript = (src, marker) => {
      if (document.querySelector(`script[${marker}]`)) return;
      const script = document.createElement('script');
      script.defer = true;
      script.src = src;
      script.setAttribute(marker, 'true');
      document.head.appendChild(script);
    };

    const safeVersion = '20260529-link-freeze-fix-1';
    loadCss(asset(`assets/css/strategy-optimization.css?v=${safeVersion}`), 'data-solarex-strategy-css');
    loadCss(asset(`assets/css/roi-cta.css?v=${safeVersion}`), 'data-solarex-roi-cta-css');
    loadCss(asset(`assets/css/driver-bars.css?v=${safeVersion}`), 'data-solarex-driver-bars-css');
    loadScript(asset(`assets/js/strategy-optimization.js?v=${safeVersion}`), 'data-solarex-strategy-js');
    loadScript(asset(`assets/js/roi-cta.js?v=${safeVersion}`), 'data-solarex-roi-cta-js');
    loadScript(asset(`assets/js/driver-bars.js?v=${safeVersion}`), 'data-solarex-driver-bars-js');

    const enhanceOnce = () => {
      document.querySelectorAll('body > .skip-link + div[style*="border-bottom"]').forEach((el) => el.remove());
      document.querySelectorAll('.box-header-icon,.auto-card-link,.visual-label-hotspots,.visual-chip-row').forEach((el) => el.remove());
      document.querySelectorAll('.lang-flag').forEach((link) => {
        link.textContent = '';
        link.setAttribute('aria-label', 'English language');
      });
      document.querySelectorAll('.site-footer .footer-language a span:first-child').forEach((span) => {
        span.classList.add('footer-gb-flag');
        span.textContent = '';
      });
      document.querySelectorAll('figure.source-visual, .source-visual').forEach((figure) => {
        const img = figure.querySelector('img');
        if (!img || figure.querySelector('a[href]')) return;
        const text = (figure.textContent || '').toLowerCase();
        const wrapper = document.createElement('a');
        wrapper.className = 'source-image-link';
        wrapper.href = text.includes('droplet') || text.includes('glass') || text.includes('quartz') ? route('quartz/') : route('technology/');
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
      });
      document.querySelectorAll('.card,.stat,.step,.form-tab-card,.visual-card,.diagram-card,.chart-card,.workflow-card').forEach((card) => {
        card.querySelectorAll('.box-header-icon,.auto-card-link').forEach((el) => el.remove());
        const active = Boolean(card.closest('a[href]') || card.querySelector('a[href],button,input,select,textarea'));
        card.classList.toggle('has-action-card', active);
      });
    };

    enhanceOnce();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
