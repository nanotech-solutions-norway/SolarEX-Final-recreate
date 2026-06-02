(() => {
  const init = () => {
    if (document.body.dataset.finalUiAlignmentReady === 'true') return;
    document.body.dataset.finalUiAlignmentReady = 'true';

    const path = window.location.pathname.replace(/\/SolarEX-Final-recreate\//, '/').replace(/\/index\.html$/, '/');
    const route = path === '/' ? 'home' : path.split('/').filter(Boolean).join('-');
    const nav = document.querySelector('[data-nav], #roiNav');

    if (nav && !nav.dataset.finalMenuAligned) {
      nav.dataset.finalMenuAligned = 'true';
      const technical = nav.querySelector('.nav-cta');
      technical?.remove();
      const contactLink = nav.querySelector('.nav-contact');
      if (contactLink) contactLink.remove();
      const roi = nav.querySelector('.nav-group-menu a[href$="roi-calculator/"]');
      const roiTop = document.createElement('a');
      roiTop.className = 'nav-roi-top';
      roiTop.href = roi?.href || (path.includes('/SolarEX-Final-recreate/') ? '/SolarEX-Final-recreate/roi-calculator/' : 'roi-calculator/');
      roiTop.textContent = 'ROI Calculator';
      const contactGroup = document.createElement('div');
      contactGroup.className = 'nav-group nav-contact-group';
      const hrefBase = (() => {
        const repo = 'SolarEX-Final-recreate';
        const parts = window.location.pathname.split('/').filter(Boolean);
        const repoIndex = parts.indexOf(repo);
        const routeParts = repoIndex >= 0 ? parts.slice(repoIndex + 1) : parts;
        const isFileRoute = routeParts.length > 0 && /\.[a-z0-9]+$/i.test(routeParts[routeParts.length - 1]);
        const depth = isFileRoute ? Math.max(routeParts.length - 1, 0) : routeParts.length;
        return repoIndex >= 0 ? `/${repo}/` : '../'.repeat(depth);
      })();
      contactGroup.innerHTML = `<button class="nav-group-toggle" type="button" aria-expanded="false">Contact</button><div class="nav-group-menu"><a href="${hrefBase}contact/">Contact page</a><a href="${hrefBase}contact/#technical-form">Technical Review</a><a href="${hrefBase}contact/#commercial-form">Commercial Request</a><a href="${hrefBase}contact/#documentation-form">Documentation Request</a></div>`;
      const lang = nav.querySelector('.lang-flag');
      if (!nav.querySelector('.nav-roi-top')) nav.insertBefore(roiTop, lang || null);
      if (!nav.querySelector('.nav-contact-group')) nav.insertBefore(contactGroup, lang || null);
      roi?.remove();
      contactGroup.querySelector('.nav-group-toggle')?.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const open = contactGroup.classList.toggle('is-open');
        contactGroup.querySelector('.nav-group-toggle')?.setAttribute('aria-expanded', String(open));
      });
    }

    if (route === 'technology') {
      document.querySelectorAll('.table-wrap table').forEach((table) => {
        const header = table.querySelector('thead tr');
        if (!header || header.children.length !== 3 || table.dataset.techEnhanced === 'true') return;
        const body = table.querySelector('tbody');
        if (!body) return;
        const rows = [
          ['Cleaning logic','Reduced adhesion + easier cleaning','Organic breakdown + rinse sheeting'],
          ['Operational dependency','Cleaning log + treated control','UV baseline + interval monitoring']
        ];
        rows.forEach((cells) => {
          const tr = document.createElement('tr');
          tr.className = 'added-tech-row';
          tr.innerHTML = cells.map((cell) => `<td>${cell}</td>`).join('');
          body.appendChild(tr);
        });
        table.dataset.techEnhanced = 'true';
      });
    }

    document.querySelectorAll('.solarex-page-breaker::after').forEach?.(() => {});
    document.querySelectorAll('.solarex-page-breaker,.visual-page-breaker').forEach((el) => el.removeAttribute('data-caption'));

    document.querySelectorAll('.solarex-feature-image').forEach((el) => {
      if (el.dataset.barsApplied === 'true') return;
      el.dataset.barsApplied = 'true';
      el.innerHTML = `<div class="solarex-feature-bars"><div class="solarex-feature-bar-row"><strong>Route fit</strong><span class="solarex-feature-track"><i class="solarex-feature-fill" style="--w:88%"></i></span></div><div class="solarex-feature-bar-row"><strong>Surface logic</strong><span class="solarex-feature-track"><i class="solarex-feature-fill" style="--w:76%"></i></span></div><div class="solarex-feature-bar-row"><strong>Pilot readiness</strong><span class="solarex-feature-track"><i class="solarex-feature-fill" style="--w:82%"></i></span></div></div>`;
    });

    const ensureLightbox = () => {
      let box = document.querySelector('.solarex-lightbox');
      if (box) return box;
      box = document.createElement('div');
      box.className = 'solarex-lightbox';
      box.hidden = true;
      box.innerHTML = '<div class="solarex-lightbox-panel" role="dialog" aria-modal="true"><button class="solarex-lightbox-close" type="button" aria-label="Close">×</button><div class="solarex-lightbox-content"></div></div>';
      document.body.appendChild(box);
      box.querySelector('.solarex-lightbox-close').addEventListener('click', () => closeLightbox());
      box.addEventListener('click', (event) => { if (event.target === box) closeLightbox(); });
      document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });
      return box;
    };
    const closeLightbox = () => {
      const box = document.querySelector('.solarex-lightbox');
      if (!box) return;
      box.hidden = true;
      document.body.classList.remove('solarex-popup-open');
      box.querySelector('.solarex-lightbox-content').innerHTML = '';
    };
    const openClone = (source) => {
      const box = ensureLightbox();
      const content = box.querySelector('.solarex-lightbox-content');
      content.innerHTML = '';
      const clone = source.cloneNode(true);
      clone.querySelectorAll('a,button,input,select,textarea').forEach((node) => node.setAttribute('tabindex', '-1'));
      content.appendChild(clone);
      box.hidden = false;
      document.body.classList.add('solarex-popup-open');
    };
    document.querySelectorAll('.table-wrap,.source-visual,.solarex-visual-panel,.solarex-chart-panel').forEach((el) => {
      if (el.dataset.popupBound === 'true' || el.dataset.popupDisabled === 'true') return;
      el.dataset.popupBound = 'true';
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.addEventListener('click', (event) => {
        if (event.target.closest('a,button,input,select,textarea')) return;
        openClone(el);
      });
      el.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openClone(el);
        }
      });
    });

    document.querySelectorAll('.reveal,.visual-reveal,.solarex-visual-module,.solarex-chart-panel,.card,.stat').forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        setTimeout(() => el.classList.add('is-visible'), 40);
      }
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
