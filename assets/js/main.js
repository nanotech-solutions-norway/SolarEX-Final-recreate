document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const repoName = 'SolarEX-Final-recreate';
  const pathParts = currentPath.split('/').filter(Boolean);
  const repoIndex = pathParts.indexOf(repoName);
  const routeParts = repoIndex >= 0 ? pathParts.slice(repoIndex + 1) : pathParts;
  const isFileRoute = routeParts.length > 0 && /\.[a-z0-9]+$/i.test(routeParts[routeParts.length - 1]);
  const directoryDepth = isFileRoute ? Math.max(routeParts.length - 1, 0) : routeParts.length;
  const relativePrefix = '../'.repeat(directoryDepth);
  const repoBase = repoIndex >= 0 ? `/${repoName}/` : '';
  const assetPath = (path) => repoBase ? `${repoBase}${path}` : `${relativePrefix}${path}`;
  const routePrefix = relativePrefix;

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

  loadCss(assetPath('assets/css/solarex-overrides.css?v=20260526-table-links-1'), 'data-solarex-overrides');
  loadCss(assetPath('assets/css/visual-upgrade.css?v=20260526-table-links-1'), 'data-solarex-visual-css');
  loadCss(assetPath('assets/css/solarex-cleanup.css?v=20260526-table-links-1'), 'data-solarex-cleanup-css');
  loadCss(assetPath('assets/css/table-enhancements.css?v=20260526-table-links-1'), 'data-solarex-table-css');
  loadScript(assetPath('assets/js/visual-upgrade.js?v=20260526-table-links-1'), 'data-solarex-visual-js');
  loadScript(assetPath('assets/js/visual-audit-upgrades.js?v=20260526-table-links-1'), 'data-solarex-visual-audit-js');
  loadScript(assetPath('assets/js/table-enhancements.js?v=20260526-table-links-1'), 'data-solarex-table-js');
  loadScript(assetPath('assets/js/solarex-cleanup.js?v=20260526-table-links-1'), 'data-solarex-cleanup-js');

  const routePath = routeParts.join('/').replace(/\/$/, '');
  const isContactIndex = routePath === 'contact';
  const contactPath = isContactIndex ? '#technical-form' : `${routePrefix}contact/#technical-form`;
  const normalizeHref = (path) => routePrefix + path;

  const nav = document.querySelector('[data-nav]');
  if (nav && !nav.dataset.cleaned) {
    nav.dataset.cleaned = 'true';
    nav.innerHTML = `
      <a class="mobile-menu-logo" href="${normalizeHref('index.html')}" aria-label="SolarEX home">SolarEX</a>
      <a class="nav-home desktop-only" href="${normalizeHref('index.html')}">Home</a>
      <div class="nav-group">
        <button class="nav-group-toggle" type="button" aria-expanded="false">Platform</button>
        <div class="nav-group-menu">
          <a href="${normalizeHref('technology/')}">Technology</a>
          <a href="${normalizeHref('quartz/')}">Quartz SiO₂</a>
          <a href="${normalizeHref('titan/')}">Titan TiO₂</a>
        </div>
      </div>
      <div class="nav-group">
        <button class="nav-group-toggle" type="button" aria-expanded="false">Applications</button>
        <div class="nav-group-menu">
          <a href="${normalizeHref('applications/pv-soiling-loss-mitigation/')}">PV Soiling Loss</a>
          <a href="${normalizeHref('applications/anti-soiling-coating/')}">Anti-Soiling Coating</a>
          <a href="${normalizeHref('applications/cleaning-cost-reduction/')}">Cleaning Cost Reduction</a>
        </div>
      </div>
      <div class="nav-group">
        <button class="nav-group-toggle" type="button" aria-expanded="false">Evidence</button>
        <div class="nav-group-menu">
          <a href="${normalizeHref('projects/')}">Projects</a>
          <a href="${normalizeHref('roi-calculator/')}">ROI Calculator</a>
          <a href="${normalizeHref('documentation/')}">Documentation</a>
          <a href="${normalizeHref('faq/')}">FAQ</a>
        </div>
      </div>
      <a class="nav-cta" href="${contactPath}">Technical Review</a>
      <a class="lang-flag" href="${normalizeHref('index.html')}" aria-label="English language">🇬🇧</a>
    `;
  }

  const isMobileMenu = () => window.matchMedia('(max-width: 980px)').matches;

  document.querySelectorAll('.nav-group-toggle').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const group = button.closest('.nav-group');
      const isOpen = group.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(isOpen));
      if (!isMobileMenu()) {
        document.querySelectorAll('.nav-group').forEach((other) => {
          if (other !== group) {
            other.classList.remove('is-open');
            other.querySelector('.nav-group-toggle')?.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  });

  document.querySelectorAll('.site-footer').forEach((footer) => {
    if (!footer.querySelector('.footer-language')) {
      const firstColumn = footer.querySelector('.footer-grid > div:first-child') || footer;
      const lang = document.createElement('div');
      lang.className = 'footer-language';
      lang.innerHTML = `<a href="${normalizeHref('index.html')}" aria-label="English language"><span>🇬🇧</span><span>English</span></a>`;
      firstColumn.appendChild(lang);
    }
  });

  document.querySelectorAll('a[href^="mailto:info@solarex.no"], a[href="mailto:info@solarex.no"]').forEach((link) => {
    link.href = contactPath;
    link.textContent = 'Contact SolarEX';
    link.classList.add('btn', 'secondary', 'email-cta');
    link.removeAttribute('target');
    link.removeAttribute('rel');
  });

  const removeEmailText = (root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.includes('info@solarex.no')) return NodeFilter.FILTER_REJECT;
        if (node.parentElement && node.parentElement.closest('script,style')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      node.nodeValue = node.nodeValue
        .replace(/Contact:\s*info@solarex\.no\.?/gi, 'Use the contact form for SolarEX requests.')
        .replace(/info@solarex\.no/gi, 'SolarEX contact form');
    });
  };
  removeEmailText(document.body);

  const svgFav = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#171B21"/><path d="M25 80h78L88 42H40z" fill="none" stroke="#66A8EE" stroke-width="8"/><circle cx="94" cy="30" r="12" fill="#FFD21A"/><text x="17" y="110" font-family="Arial" font-size="24" font-weight="800" fill="#D6E5EF">Solar</text><text x="77" y="110" font-family="Arial" font-size="24" font-weight="800" fill="#FFD21A">EX</text></svg>';
  if (!document.querySelector('link[rel="icon"]')) {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    favicon.href = 'data:image/svg+xml,' + encodeURIComponent(svgFav);
    document.head.appendChild(favicon);
  }

  const clickableSelector = '.btn, button, .card, .stat, .step, .source-visual, .form-tab-card, .contact-form, .table-wrap, .form-note, .contact-method, .visual-card, .diagram-card, .chart-card, .workflow-card';
  document.querySelectorAll(clickableSelector).forEach((element) => {
    element.addEventListener('pointerdown', () => element.classList.add('is-clicked'));
    ['pointerup', 'pointercancel', 'pointerleave', 'blur'].forEach((eventName) => {
      element.addEventListener(eventName, () => element.classList.remove('is-clicked'));
    });
  });

  const menuButton = document.querySelector('[data-menu-toggle]');
  const closeMobileMenu = () => {
    if (!nav || !menuButton) return;
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  };

  if (menuButton && nav) {
    menuButton.textContent = '';
    menuButton.setAttribute('aria-label', 'Open menu');
    menuButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      if (isOpen && isMobileMenu()) {
        document.querySelectorAll('.nav-group').forEach((group) => {
          group.classList.add('is-open');
          group.querySelector('.nav-group-toggle')?.setAttribute('aria-expanded', 'true');
        });
      }
    });
    nav.addEventListener('click', (event) => event.stopPropagation());
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));
    document.addEventListener('click', (event) => {
      if (isMobileMenu() && nav.classList.contains('is-open') && !event.target.closest('.site-header')) closeMobileMenu();
      if (!event.target.closest('.nav-group') && !isMobileMenu()) {
        document.querySelectorAll('.nav-group').forEach((group) => {
          group.classList.remove('is-open');
          group.querySelector('.nav-group-toggle')?.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const countMetric = (element) => {
    if (element.dataset.done) return;
    element.dataset.done = '1';
    const target = parseFloat(element.dataset.count || '0');
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const decimals = parseInt(element.dataset.decimals || '0', 10);
    if (reduceMotion) {
      element.textContent = prefix + target.toFixed(decimals) + suffix;
      return;
    }
    const start = performance.now();
    const duration = 1200;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else element.textContent = prefix + target.toFixed(decimals) + suffix;
    };
    requestAnimationFrame(tick);
  };
  const revealElement = (element) => {
    element.classList.add('is-visible');
    element.querySelectorAll('[data-count]').forEach(countMetric);
  };
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach(revealElement);
  }
});