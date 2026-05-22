document.addEventListener('DOMContentLoaded', () => {
  const overrideHref = 'https://nanotech-solutions-norway.github.io/SolarEX-Final-recreate/assets/css/solarex-overrides.css?v=20260522-visual-1';

  if (!document.querySelector('link[data-solarex-overrides]')) {
    const overrides = document.createElement('link');
    overrides.rel = 'stylesheet';
    overrides.href = overrideHref;
    overrides.setAttribute('data-solarex-overrides', 'true');
    document.head.appendChild(overrides);
  }

  const svgFav = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#171B21"/><path d="M25 80h78L88 42H40z" fill="none" stroke="#66A8EE" stroke-width="8"/><circle cx="94" cy="30" r="12" fill="#FFD21A"/><text x="17" y="110" font-family="Arial" font-size="24" font-weight="800" fill="#D6E5EF">Solar</text><text x="77" y="110" font-family="Arial" font-size="24" font-weight="800" fill="#FFD21A">EX</text></svg>';

  if (!document.querySelector('link[rel="icon"]')) {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    favicon.href = 'data:image/svg+xml,' + encodeURIComponent(svgFav);
    document.head.appendChild(favicon);
  }

  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
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
