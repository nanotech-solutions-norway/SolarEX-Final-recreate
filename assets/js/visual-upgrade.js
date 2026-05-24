(() => {
  const initSolarEXVisualUpgrade = () => {
    if (document.body.dataset.visualUpgradeReady === 'true') return;
    document.body.dataset.visualUpgradeReady = 'true';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    const routePath = routeParts.join('/').replace(/\/$/, '');

    const page = (() => {
      if (routePath === 'quartz') return 'quartz';
      if (routePath === 'titan') return 'titan';
      if (routePath === 'technology') return 'technology';
      if (routePath === 'projects') return 'projects';
      if (routePath === 'documentation') return 'documentation';
      if (routePath === 'faq') return 'faq';
      if (routePath === 'contact' || routePath === 'contact/thanks') return 'contact';
      return 'home';
    })();

    document.body.dataset.visualPage = page;

    const diagramBase = assetPath('assets/img/diagrams/');
    const copy = {
      home: {
        title: 'Mechanism-led visual decision layer',
        img: `${diagramBase}pathway-selection-flow.svg`,
        alt: 'SolarEX pathway selection diagram comparing Quartz SiO₂ and Titan TiO₂',
        intro: 'SolarEX should be read as a two-route PV glass platform, not as a generic coating claim. The correct route is selected by soiling profile, UV availability, O&M burden and validation objective.'
      },
      quartz: {
        title: 'Passive SiO₂ easy-clean mechanism',
        img: `${diagramBase}quartz-passive-layer.svg`,
        alt: 'Quartz SiO₂ passive surface layer diagram showing water beading and reduced adhesion',
        intro: 'Quartz is the passive route. It visualizes SiO₂ surface architecture, reduced adhesion tendency and UV-independent easy-clean behavior for dust, pollen, salt and mineral-dominated soiling.'
      },
      titan: {
        title: 'Active TiO₂ UV and rinse mechanism',
        img: `${diagramBase}titan-active-uv-rinse.svg`,
        alt: 'Titan TiO₂ UV activation diagram showing photocatalysis and hydrophilic rinse behavior',
        intro: 'Titan is the active route. It visualizes UV-triggered TiO₂ photocatalysis, organic contaminant breakdown and hydrophilic rinse behavior for UV-sufficient environments.'
      },
      technology: {
        title: 'Technology selection matrix',
        img: `${diagramBase}technology-selection-matrix.svg`,
        alt: 'SolarEX technology selection matrix for Quartz SiO₂ and Titan TiO₂',
        intro: 'Technology selection should translate site data into a route recommendation: surface architecture, trigger dependency, contamination profile, cleaning logic and validation needs.'
      },
      projects: {
        title: 'Pilot evidence architecture',
        img: `${diagramBase}pilot-evidence-stack.svg`,
        alt: 'SolarEX pilot evidence stack diagram for baseline, control, monitoring and review',
        intro: 'Project references become decision-grade only when mapped to baseline data, matched controls, monitoring intervals, cleaning logs and pathway-specific interpretation.'
      },
      documentation: {
        title: 'Documentation workflow map',
        img: `${diagramBase}documentation-flow.svg`,
        alt: 'SolarEX documentation workflow from technical review to pilot support',
        intro: 'Documentation should route users from technical review to application guidance, pilot planning and commercial evaluation without forcing public email exposure.'
      },
      faq: {
        title: 'FAQ decision tree',
        img: `${diagramBase}faq-decision-tree.svg`,
        alt: 'SolarEX FAQ decision tree for selecting Quartz SiO₂ or Titan TiO₂',
        intro: 'FAQ scanning improves when common questions are grouped as a decision tree: UV availability, soiling profile, cleaning objective and pilot validation.'
      },
      contact: {
        title: 'Contact conversion workflow',
        img: `${diagramBase}contact-routing-flow.svg`,
        alt: 'SolarEX contact routing flow for technical review, commercial discussion and documentation support',
        intro: 'Contact should behave as a conversion hub: route technical, commercial and documentation requests through validated forms, then register internally for follow-up.'
      }
    };

    const selected = copy[page];
    const main = document.querySelector('main');
    const hero = main?.querySelector('.hero');
    if (!main || !hero || routePath === 'contact/thanks' || document.querySelector('[data-visual-upgrade-section]')) return;

    const section = document.createElement('section');
    section.className = 'visual-section visual-reveal';
    section.setAttribute('data-visual-upgrade-section', page);
    section.setAttribute('aria-labelledby', 'visual-upgrade-title');
    section.innerHTML = `
      <div class="container">
        <div class="visual-media-card">
          <div class="diagram-card has-action-card has-modal-action">
            <div class="visual-diagram-panel">
              <img class="visual-asset has-modal-action" src="${selected.img}" alt="${selected.alt}" loading="lazy" width="1200" height="720" data-modal-caption="${selected.title}">
            </div>
          </div>
          <div class="visual-media-copy">
            <div class="kicker">Visual upgrade layer</div>
            <h2 id="visual-upgrade-title">${selected.title}</h2>
            <p class="lead">${selected.intro}</p>
          </div>
        </div>
        <div class="visual-grid three pathway-benefit-layout" style="margin-top:24px">
          <article class="workflow-card visual-reveal quartz-benefits-card">
            <h3>SiO₂ Quartz benefits</h3>
            <div class="visual-checklist">
              <p>Passive surface architecture for dust and mineral soiling.</p>
              <p>UV-independent route for lower-UV operating contexts.</p>
              <p>Easy-clean behavior through reduced surface adhesion.</p>
            </div>
          </article>
          <article class="workflow-card visual-reveal titan-benefits-card">
            <h3>TiO₂ Titan benefits</h3>
            <div class="visual-checklist">
              <p>Active photocatalytic pathway under suitable UV exposure.</p>
              <p>Hydrophilic rinse behavior for organic contaminant contexts.</p>
              <p>Best suited where UV, rain and contamination profile support the mechanism.</p>
            </div>
          </article>
          <article class="chart-card pathway-driver-card visual-reveal has-action-card has-modal-action" tabindex="0" role="button" aria-label="Open SolarEX pathway suitability graph">
            <h3>Route-selection driver relevance</h3>
            <p class="mini">Bars are qualitative route-selection scores. They do not represent guaranteed coating-performance claims.</p>
            <div class="chart-scale"><span>Low</span><span>Medium</span><span>High</span></div>
            <div class="chart-row"><span>Soiling adhesion relevance</span><i class="chart-track"><b class="chart-bar" style="--bar-width:${page === 'titan' ? '58%' : '72%'}"></b></i></div>
            <div class="chart-row"><span>UV activation relevance</span><i class="chart-track"><b class="chart-bar" style="--bar-width:${page === 'quartz' ? '8%' : page === 'titan' ? '86%' : '52%'}"></b></i></div>
            <div class="chart-row"><span>Pilot validation relevance</span><i class="chart-track"><b class="chart-bar" style="--bar-width:76%"></b></i></div>
            <div class="chart-row"><span>Rain / rinse relevance</span><i class="chart-track"><b class="chart-bar" style="--bar-width:${page === 'titan' ? '82%' : '64%'}"></b></i></div>
            <div class="chart-row"><span>Organic fouling relevance</span><i class="chart-track"><b class="chart-bar" style="--bar-width:${page === 'titan' ? '86%' : '42%'}"></b></i></div>
          </article>
        </div>
      </div>`;

    hero.insertAdjacentElement('afterend', section);

    if (page === 'contact' && routePath === 'contact') {
      const routing = document.createElement('section');
      routing.className = 'visual-section contact-pathway-visual visual-reveal';
      routing.innerHTML = `
        <div class="container">
          <div class="kicker">Conversion routing</div>
          <h2>Three managed request paths.</h2>
          <div class="visual-grid three">
            <a class="visual-card has-action-card" href="#technical-form"><h3>Technical review</h3><p>Pathway selection, contamination profile, UV review and pilot logic.</p></a>
            <a class="visual-card has-action-card" href="#commercial-form"><h3>Commercial discussion</h3><p>Procurement, partnership, volume planning and project qualification.</p></a>
            <a class="visual-card has-action-card" href="#documentation-form"><h3>Documentation / pilot support</h3><p>Application files, study context, ROI material and validation framework.</p></a>
          </div>
          <div class="chart-card contact-response-flow visual-reveal">
            <h3>Response workflow</h3>
            <div class="visual-success-pattern">
              <span>Form submission</span><span>SQL registration</span><span>Internal routing</span><span>Technical / commercial review</span><span>Follow-up</span>
            </div>
          </div>
        </div>`;
      document.querySelector('#technical-form')?.insertAdjacentElement('beforebegin', routing);
    }

    const reveal = (element) => element.classList.add('is-visible');

    if ('IntersectionObserver' in window && !reducedMotion) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.16 });
      document.querySelectorAll('.visual-reveal').forEach((el) => observer.observe(el));
    } else {
      document.querySelectorAll('.visual-reveal').forEach(reveal);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSolarEXVisualUpgrade, { once: true });
  } else {
    initSolarEXVisualUpgrade();
  }
})();