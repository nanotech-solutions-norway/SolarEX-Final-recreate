document.addEventListener('DOMContentLoaded', () => {
  const overrideHref = 'https://nanotech-solutions-norway.github.io/SolarEX-Final-recreate/assets/css/solarex-overrides.css?v=20260523-mobile-menu-1';

  if (!document.querySelector('link[data-solarex-overrides]')) {
    const overrides = document.createElement('link');
    overrides.rel = 'stylesheet';
    overrides.href = overrideHref;
    overrides.setAttribute('data-solarex-overrides', 'true');
    document.head.appendChild(overrides);
  }

  const currentPath = window.location.pathname;
  const isContact = currentPath.includes('/contact/');
  const prefix = currentPath.endsWith('/') && currentPath.split('/').filter(Boolean).length > 1 ? '../' : '';
  const contactPath = isContact ? '#technical-form' : `${prefix}contact/#technical-form`;

  const normalizeHref = (path) => prefix + path;

  const nav = document.querySelector('[data-nav]');
  if (nav && !nav.dataset.cleaned) {
    nav.dataset.cleaned = 'true';
    nav.innerHTML = `
      <a href="${normalizeHref('index.html')}">Home</a>
      <div class="nav-group is-open">
        <button class="nav-group-toggle" type="button" aria-expanded="true">Solutions</button>
        <div class="nav-group-menu">
          <a href="${normalizeHref('quartz/')}">Quartz SiO₂</a>
          <a href="${normalizeHref('titan/')}">Titan TiO₂</a>
          <a href="${normalizeHref('technology/')}">Technology</a>
        </div>
      </div>
      <div class="nav-group is-open">
        <button class="nav-group-toggle" type="button" aria-expanded="true">Evidence</button>
        <div class="nav-group-menu">
          <a href="${normalizeHref('projects/')}">Projects</a>
          <a href="${normalizeHref('documentation/')}">Documentation</a>
          <a href="${normalizeHref('faq/')}">FAQ</a>
        </div>
      </div>
      <a class="nav-cta" href="${contactPath}">Contact</a>
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

  document.querySelectorAll('.btn, button').forEach((element) => {
    element.addEventListener('pointerdown', () => element.classList.add('is-clicked'));
    ['pointerup', 'pointercancel', 'pointerleave', 'blur'].forEach((eventName) => {
      element.addEventListener(eventName, () => element.classList.remove('is-clicked'));
    });
  });

  document.querySelectorAll('.card, .stat, .step, .source-visual, .form-tab-card, .contact-form, .table-wrap, .form-note, .contact-method').forEach((element) => {
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

    nav.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (event) => {
      if (isMobileMenu() && nav.classList.contains('is-open') && !event.target.closest('.site-header')) {
        closeMobileMenu();
      }
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

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        element.textContent = prefix + target.toFixed(decimals) + suffix;
      }
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
