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

    document.querySelectorAll('.solarex-page-breaker,.visual-page-breaker').forEach((el) => {
      el.removeAttribute('data-caption');
      el.setAttribute('aria-label', 'SolarEX visual divider');
    });

    const copyByRoute = {
      quartz: ['Passive SiO2 route profile','Quartz is designed for UV-independent easy-clean surface behavior where dust, salt, pollen, bird lime, mineral residue and cleaning burden define the business case. Use the feature bars as a compact route-fit screen before pilot design.'],
      technology: ['Mechanism-led selection profile','The visual screen summarizes route fit before the formal Quartz/Titan table. Use it to check UV dependency, contamination class and O&M objective before moving into pilot validation.'],
      titan: ['Active TiO2 route profile','Titan is selected where UV exposure and organic or atmospheric contamination support active photocatalysis and hydrophilic rinse behavior. Validate UV and treated/control monitoring before scale-up.'],
      projects: ['Evidence-readiness profile','The visual screen separates monitored study data, technical parameters, ROI scenarios and pilot hypotheses so procurement decisions stay tied to evidence class.'],
      documentation: ['Documentation routing profile','Use the visual screen to identify whether the next step is product documentation, application guidance, evidence review or project-specific support.'],
      contact: ['Request-routing profile','Use the visual screen to route the request to technical review, commercial discussion, documentation support or pilot planning.'],
      'applications-pv-soiling-loss-mitigation': ['Soiling-loss screen','Review contamination type, cleaning method, UV context and route fit before selecting Quartz, Titan or a mixed validation path.'],
      'applications-anti-soiling-coating': ['Anti-soiling route screen','Match passive and active mechanisms to site conditions before moving into documentation or pilot validation.'],
      'applications-cleaning-cost-reduction': ['Cleaning-cost screen','The bars summarize water, labor, access, abrasion and recovery logic before translating the site into a commercial scenario.'],
      'case-studies': ['Case-evidence screen','Use the visual screen to separate study context, route relevance, limitation and next action.'],
      markets: ['Regional route screen','Regional fit is determined by soiling, UV exposure, water logistics and O&M structure.'],
      'markets-europe': ['Europe route screen','European sites usually require review of pollen, salt, grime, rain cycles and seasonal operating conditions.'],
      'markets-middle-east': ['GCC route screen','Dust, high irradiation, water logistics and cleaning mobilization define the regional review path.'],
      'markets-nordics': ['Nordic route screen','Lower UV, seasonal grime, rain cycles and high-latitude context support Quartz-first review.'],
      partners: ['Partner-readiness screen','Partner fit depends on technical selling discipline, documentation handling, application support and pilot-to-scale capability.']
    };

    document.querySelectorAll('.solarex-feature-image').forEach((el) => {
      if (el.dataset.barsApplied === 'true') return;
      el.dataset.barsApplied = 'true';
      const [title, text] = copyByRoute[route] || ['Route-fit screen','This compact feature view summarizes route fit, surface logic, O&M value and pilot readiness before moving into a project-specific review.'];
      el.innerHTML = `<p class="solarex-feature-note"><strong>${title}.</strong> ${text}</p><div class="solarex-feature-bars"><div class="solarex-feature-bar-row"><strong>Route fit</strong><span class="solarex-feature-track"><i class="solarex-feature-fill" style="--w:88%"></i></span></div><div class="solarex-feature-bar-row"><strong>Surface logic</strong><span class="solarex-feature-track"><i class="solarex-feature-fill" style="--w:76%"></i></span></div><div class="solarex-feature-bar-row"><strong>O&M value</strong><span class="solarex-feature-track"><i class="solarex-feature-fill" style="--w:70%"></i></span></div><div class="solarex-feature-bar-row"><strong>Evidence class</strong><span class="solarex-feature-track"><i class="solarex-feature-fill" style="--w:64%"></i></span></div><div class="solarex-feature-bar-row"><strong>Pilot readiness</strong><span class="solarex-feature-track"><i class="solarex-feature-fill" style="--w:82%"></i></span></div><div class="solarex-feature-bar-row"><strong>Scale-up screen</strong><span class="solarex-feature-track"><i class="solarex-feature-fill" style="--w:58%"></i></span></div></div>`;
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
