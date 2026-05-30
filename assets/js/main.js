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
  const assetVersion = '20260530-mobile-one-sentence-hero-1';

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

  [
    ['assets/css/solarex-overrides.css', 'data-solarex-overrides'],
    ['assets/css/visual-upgrade.css', 'data-solarex-visual-css'],
    ['assets/css/mobile-ux-hardening.css', 'data-solarex-mobile-ux-css'],
    ['assets/css/solarex-cleanup.css', 'data-solarex-cleanup-css'],
    ['assets/css/table-enhancements.css', 'data-solarex-table-css'],
    ['assets/css/footer-gap-fix.css', 'data-solarex-footer-gap-css'],
    ['assets/css/roi-cta.css', 'data-solarex-roi-cta-css-main'],
    ['assets/css/footer-legal-fix.css', 'data-solarex-footer-legal-css'],
    ['assets/css/contrast-audit-fix.css', 'data-solarex-contrast-css'],
    ['assets/css/benefit-alignment-fix.css', 'data-solarex-benefit-align-css']
  ].forEach(([path, marker]) => loadCss(assetPath(`${path}?v=${assetVersion}`), marker));

  [
    ['assets/js/visual-upgrade.js', 'data-solarex-visual-js'],
    ['assets/js/visual-audit-upgrades.js', 'data-solarex-visual-audit-js'],
    ['assets/js/mobile-ux-hardening.js', 'data-solarex-mobile-ux-js'],
    ['assets/js/table-enhancements.js', 'data-solarex-table-js'],
    ['assets/js/footer-gap-fix.js', 'data-solarex-footer-gap-js'],
    ['assets/js/footer-legal-fix.js', 'data-solarex-footer-legal-js'],
    ['assets/js/solarex-cleanup.js', 'data-solarex-cleanup-js']
  ].forEach(([path, marker]) => loadScript(assetPath(`${path}?v=${assetVersion}`), marker));

  const routePath = routeParts.join('/').replace(/\/$/, '');
  const isContactIndex = routePath === 'contact';
  const contactPath = isContactIndex ? '#technical-form' : `${routePrefix}contact/#technical-form`;
  const normalizeHref = (path) => routePrefix + path;
  const nav = document.querySelector('[data-nav], #roiNav');

  if (nav && !nav.dataset.cleaned) {
    nav.dataset.cleaned = 'true';
    nav.innerHTML = `
      <a class="mobile-menu-logo" href="${normalizeHref('index.html')}" aria-label="SolarEX home">SolarEX</a>
      <a class="nav-home desktop-only" href="${normalizeHref('index.html')}">Home</a>
      <div class="nav-group"><button class="nav-group-toggle" type="button" aria-expanded="false">Platform</button><div class="nav-group-menu"><a href="${normalizeHref('technology/')}">Technology</a><a href="${normalizeHref('quartz/')}">Quartz SiO₂</a><a href="${normalizeHref('titan/')}">Titan TiO₂</a></div></div>
      <div class="nav-group"><button class="nav-group-toggle" type="button" aria-expanded="false">Applications</button><div class="nav-group-menu"><a href="${normalizeHref('applications/pv-soiling-loss-mitigation/')}">PV Soiling Loss</a><a href="${normalizeHref('applications/anti-soiling-coating/')}">Anti-Soiling Coating</a><a href="${normalizeHref('applications/cleaning-cost-reduction/')}">Cleaning Cost Reduction</a></div></div>
      <div class="nav-group"><button class="nav-group-toggle" type="button" aria-expanded="false">Evidence</button><div class="nav-group-menu"><a href="${normalizeHref('projects/')}">Projects</a><a href="${normalizeHref('case-studies/')}">Case Studies</a><a href="${normalizeHref('documentation/')}">Documentation</a><a href="${normalizeHref('faq/')}">FAQ</a><a href="${normalizeHref('roi-calculator/')}">ROI Calculator</a></div></div>
      <div class="nav-group"><button class="nav-group-toggle" type="button" aria-expanded="false">Markets</button><div class="nav-group-menu"><a href="${normalizeHref('markets/')}">Markets Hub</a><a href="${normalizeHref('markets/europe/')}">Europe</a><a href="${normalizeHref('markets/middle-east/')}">Middle East / GCC</a><a href="${normalizeHref('markets/nordics/')}">Nordics</a><a href="${normalizeHref('partners/')}">Partners</a></div></div>
      <a class="nav-contact" href="${normalizeHref('contact/')}">Contact</a>
      <a class="nav-cta" href="${contactPath}">Technical Review</a>
      <a class="lang-flag" href="${normalizeHref('index.html')}" aria-label="English language">🇬🇧</a>`;
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

  const menuButton = document.querySelector('[data-menu-toggle], #roiMenuToggle');
  const closeMobileMenu = () => {
    if (!nav || !menuButton) return;
    nav.classList.remove('is-open');
    document.body.classList.remove('mobile-menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  };
  if (menuButton && nav) {
    if (menuButton.hasAttribute('data-menu-toggle')) menuButton.textContent = '';
    menuButton.setAttribute('aria-label', 'Open menu');
    menuButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = nav.classList.toggle('is-open');
      document.body.classList.toggle('mobile-menu-open', isOpen && isMobileMenu());
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

  document.querySelectorAll('a[href^="mailto:info@solarex.no"], a[href="mailto:info@solarex.no"]').forEach((link) => {
    link.href = contactPath;
    link.textContent = 'Contact SolarEX';
    link.classList.add('btn', 'secondary', 'email-cta');
    link.removeAttribute('target');
    link.removeAttribute('rel');
  });

  document.querySelectorAll('.btn,button,.card,.stat,.step,.source-visual,.form-tab-card,.contact-form,.table-wrap,.form-note,.contact-method,.visual-card,.diagram-card,.chart-card,.workflow-card').forEach((element) => {
    element.addEventListener('pointerdown', () => element.classList.add('is-clicked'));
    ['pointerup', 'pointercancel', 'pointerleave', 'blur'].forEach((eventName) => element.addEventListener(eventName, () => element.classList.remove('is-clicked')));
  });

  const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll('.reveal,.visual-reveal,.chart-card,.pathway-driver-card').forEach((el) => {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add('is-visible');
  });
});
