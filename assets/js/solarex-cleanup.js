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
    loadCss(asset('assets/css/strategy-optimization.css?v=20260524-strategy-1'), 'data-solarex-strategy-css');
    loadScript(asset('assets/js/strategy-optimization.js?v=20260524-strategy-1'), 'data-solarex-strategy-js');

    const ensureModal = () => {
      let modal = document.querySelector('.visual-modal');
      if (modal) return modal;
      modal = document.createElement('div');
      modal.className = 'visual-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-hidden', 'true');
      modal.innerHTML = '<div class="visual-modal-panel" role="document"><button class="visual-modal-close" type="button" aria-label="Close enlarged visual">×</button><div class="visual-modal-content"></div><div class="visual-modal-caption"></div></div>';
      document.body.appendChild(modal);
      const close = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        modal.querySelector('.visual-modal-content').innerHTML = '';
      };
      modal.querySelector('.visual-modal-close').addEventListener('click', close);
      modal.addEventListener('click', (event) => { if (event.target === modal) close(); });
      document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.classList.contains('is-open')) close(); });
      return modal;
    };

    const openImageModal = (img) => {
      if (!img || !img.src) return;
      const modal = ensureModal();
      const content = modal.querySelector('.visual-modal-content');
      const caption = modal.querySelector('.visual-modal-caption');
      content.innerHTML = '';
      const clone = document.createElement('img');
      clone.src = img.currentSrc || img.src;
      clone.alt = img.alt || 'SolarEX visual';
      content.appendChild(clone);
      caption.textContent = img.dataset.modalCaption || img.alt || 'SolarEX visual';
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      modal.querySelector('.visual-modal-close').focus({ preventScroll: true });
    };

    const openCardModal = (card) => {
      const modal = ensureModal();
      const content = modal.querySelector('.visual-modal-content');
      const caption = modal.querySelector('.visual-modal-caption');
      content.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.className = 'visual-modal-html';
      const clone = card.cloneNode(true);
      clone.removeAttribute('tabindex');
      clone.removeAttribute('role');
      wrapper.appendChild(clone);
      content.appendChild(wrapper);
      caption.textContent = card.querySelector('h3,h2')?.textContent?.trim() || 'SolarEX graph';
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      modal.querySelector('.visual-modal-close').focus({ preventScroll: true });
    };

    const enhance = () => {
      document.querySelectorAll('body > .skip-link + div[style*="border-bottom"]').forEach((el) => el.remove());
      document.querySelectorAll('.hero .mini').forEach((el) => {
        const text = (el.textContent || '').toLowerCase();
        if (text.includes('clear mechanism selection') || text.includes('structured application logic') || text.includes('evidence-led pilot review') || text.includes('contact:')) el.remove();
      });
      document.querySelectorAll('.box-header-icon,.auto-card-link,.visual-label-hotspots,.visual-chip-row').forEach((el) => el.remove());
      document.querySelectorAll('.lang-flag').forEach((link) => { link.textContent = ''; link.setAttribute('aria-label', 'English language'); });
      document.querySelectorAll('.site-footer .footer-language a span:first-child').forEach((span) => { span.classList.add('footer-gb-flag'); span.textContent = ''; });

      document.querySelectorAll('.visual-asset.has-modal-action, img.has-modal-action, .source-visual.has-modal-action img').forEach((img) => {
        if (img.dataset.modalReady === 'true') return;
        img.dataset.modalReady = 'true';
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.addEventListener('click', (event) => { event.preventDefault(); event.stopPropagation(); openImageModal(img); });
        img.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openImageModal(img); } });
      });

      document.querySelectorAll('.chart-card.has-modal-action').forEach((card) => {
        if (card.dataset.modalReady === 'true') return;
        card.dataset.modalReady = 'true';
        card.addEventListener('click', (event) => { if (!event.target.closest('a,button')) openCardModal(card); });
        card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openCardModal(card); } });
      });

      document.querySelectorAll('figure.source-visual, .source-visual').forEach((figure) => {
        const text = (figure.textContent || '').toLowerCase();
        const img = figure.querySelector('img');
        if (!img) return;
        if (text.includes('source graph') || text.includes('monthly total energy') || (img.alt || '').toLowerCase().includes('graph')) {
          figure.classList.add('has-modal-action');
          img.classList.add('has-modal-action');
          img.dataset.modalCaption = img.dataset.modalCaption || 'SolarEX source graph';
        } else if (!figure.querySelector('a[href]')) {
          const wrapper = document.createElement('a');
          wrapper.className = 'source-image-link';
          wrapper.href = text.includes('droplet') || text.includes('glass') || text.includes('quartz') ? route('quartz/') : route('technology/');
          img.parentNode.insertBefore(wrapper, img);
          wrapper.appendChild(img);
        }
      });

      document.querySelectorAll('.card,.stat,.step,.form-tab-card,.visual-card,.diagram-card,.chart-card,.workflow-card').forEach((card) => {
        card.querySelectorAll('.box-header-icon,.auto-card-link').forEach((el) => el.remove());
        const active = Boolean(card.closest('a[href]') || card.querySelector('a[href],button,input,select,textarea') || card.classList.contains('has-modal-action'));
        card.classList.toggle('has-action-card', active);
      });
    };

    enhance();
    new MutationObserver(enhance).observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
