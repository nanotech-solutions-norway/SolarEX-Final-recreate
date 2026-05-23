document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const path = window.location.pathname;
  const page = (() => {
    if (path.includes('/quartz/')) return 'quartz';
    if (path.includes('/titan/')) return 'titan';
    if (path.includes('/technology/')) return 'technology';
    if (path.includes('/projects/')) return 'projects';
    if (path.includes('/documentation/')) return 'documentation';
    if (path.includes('/faq/')) return 'faq';
    if (path.includes('/contact/')) return 'contact';
    return 'home';
  })();

  document.body.dataset.visualPage = page;

  const prefix = page === 'home' ? '' : '../';
  const visualBase = `${prefix}assets/img/visual/`;
  const diagramBase = `${prefix}assets/img/diagrams/`;

  const copy = {
    home: {
      title: 'Mechanism-led visual decision layer',
      img: `${diagramBase}pathway-selection-flow.svg`,
      alt: 'SolarEX pathway selection diagram comparing Quartz SiO₂ and Titan TiO₂',
      intro: 'SolarEX should be read as a two-route PV glass platform, not as a generic coating claim. The correct route is selected by soiling profile, UV availability, O&M burden and validation objective.',
      chips: ['Quartz SiO₂', 'Titan TiO₂', 'Cleaning burden', 'Pilot evidence']
    },
    quartz: {
      title: 'Passive SiO₂ easy-clean mechanism',
      img: `${diagramBase}quartz-passive-layer.svg`,
      alt: 'Quartz SiO₂ passive surface layer diagram showing water beading and reduced adhesion',
      intro: 'Quartz is the passive route. It visualizes SiO₂ surface architecture, reduced adhesion tendency and UV-independent easy-clean behavior for dust, pollen, salt and mineral-dominated soiling.',
      chips: ['Passive', 'UV-independent', 'Hydrophobic / oleophobic', 'Reduced adhesion']
    },
    titan: {
      title: 'Active TiO₂ UV and rinse mechanism',
      img: `${diagramBase}titan-active-uv-rinse.svg`,
      alt: 'Titan TiO₂ UV activation diagram showing photocatalysis and hydrophilic rinse behavior',
      intro: 'Titan is the active route. It visualizes UV-triggered TiO₂ photocatalysis, organic contaminant breakdown and hydrophilic rinse behavior for UV-sufficient environments.',
      chips: ['Active', 'UV-dependent', 'Photocatalytic', 'Hydrophilic rinse']
    },
    technology: {
      title: 'Technology selection matrix',
      img: `${diagramBase}technology-selection-matrix.svg`,
      alt: 'SolarEX technology selection matrix for Quartz SiO₂ and Titan TiO₂',
      intro: 'Technology selection should translate site data into a route recommendation: surface architecture, trigger dependency, contamination profile, cleaning logic and validation needs.',
      chips: ['Surface architecture', 'Trigger dependency', 'Contamination fit', 'Validation needs']
    },
    projects: {
      title: 'Pilot evidence architecture',
      img: `${diagramBase}pilot-evidence-stack.svg`,
      alt: 'SolarEX pilot evidence stack diagram for baseline, control, monitoring and review',
      intro: 'Project references become decision-grade only when mapped to baseline data, matched controls, monitoring intervals, cleaning logs and pathway-specific interpretation.',
      chips: ['Baseline', 'Matched control', 'Monitoring', 'Commercial review']
    },
    documentation: {
      title: 'Documentation workflow map',
      img: `${diagramBase}documentation-flow.svg`,
      alt: 'SolarEX documentation workflow from technical review to pilot support',
      intro: 'Documentation should route users from technical review to application guidance, pilot planning and commercial evaluation without forcing public email exposure.',
      chips: ['TDS / overview', 'Application guide', 'Pilot plan', 'Evidence summary']
    },
    faq: {
      title: 'FAQ decision tree',
      img: `${diagramBase}faq-decision-tree.svg`,
      alt: 'SolarEX FAQ decision tree for selecting Quartz SiO₂ or Titan TiO₂',
      intro: 'FAQ scanning improves when common questions are grouped as a decision tree: UV availability, soiling profile, cleaning objective and pilot validation.',
      chips: ['Which pathway?', 'What validates?', 'How to apply?', 'What to measure?']
    },
    contact: {
      title: 'Contact conversion workflow',
      img: `${diagramBase}contact-routing-flow.svg`,
      alt: 'SolarEX contact routing flow for technical review, commercial discussion and documentation support',
      intro: 'Contact should behave as a conversion hub: route technical, commercial and documentation requests through validated forms, then register internally for follow-up.',
      chips: ['Technical review', 'Commercial discussion', 'Documentation / pilot', 'SQL routing']
    }
  };

  const selected = copy[page];
  const main = document.querySelector('main');
  const hero = main?.querySelector('.hero');
  if (!main || !hero || document.querySelector('[data-visual-upgrade-section]')) return;

  const section = document.createElement('section');
  section.className = 'visual-section visual-reveal';
  section.setAttribute('data-visual-upgrade-section', page);
  section.setAttribute('aria-labelledby', 'visual-upgrade-title');
  section.innerHTML = `
    <div class="container">
      <div class="visual-media-card">
        <div class="diagram-card">
          <img class="visual-asset" src="${selected.img}" alt="${selected.alt}" loading="lazy" width="1200" height="720">
        </div>
        <div class="visual-media-copy">
          <div class="kicker">Visual upgrade layer</div>
          <h2 id="visual-upgrade-title">${selected.title}</h2>
          <p class="lead">${selected.intro}</p>
          <div class="visual-chip-row">${selected.chips.map((chip) => `<span class="visual-chip">${chip}</span>`).join('')}</div>
        </div>
      </div>
      <div class="visual-grid three" style="margin-top:24px">
        <article class="chart-card visual-reveal">
          <h3>Cleaning burden drivers</h3>
          <div class="chart-row"><span>Adhesion tendency</span><i class="chart-track"><b class="chart-bar" style="--bar-width:${page === 'titan' ? '58%' : '72%'}"></b></i></div>
          <div class="chart-row"><span>UV dependency</span><i class="chart-track"><b class="chart-bar" style="--bar-width:${page === 'quartz' ? '8%' : page === 'titan' ? '86%' : '52%'}"></b></i></div>
          <div class="chart-row"><span>Pilot relevance</span><i class="chart-track"><b class="chart-bar" style="--bar-width:76%"></b></i></div>
        </article>
        <article class="workflow-card visual-reveal">
          <h3>Decision workflow</h3>
          <div class="visual-checklist">
            <p>Classify contamination profile.</p>
            <p>Confirm UV and climate context.</p>
            <p>Select Quartz SiO₂, Titan TiO₂ or pilot review.</p>
          </div>
        </article>
        <article class="workflow-card visual-reveal">
          <h3>Claims control</h3>
          <div class="visual-checklist">
            <p>Use context-specific evidence.</p>
            <p>Avoid universal performance promises.</p>
            <p>Route conversion through forms.</p>
          </div>
        </article>
      </div>
    </div>`;

  hero.insertAdjacentElement('afterend', section);

  if (page === 'contact') {
    const routing = document.createElement('section');
    routing.className = 'visual-section contact-pathway-visual visual-reveal';
    routing.innerHTML = `
      <div class="container">
        <div class="kicker">Conversion routing</div>
        <h2>Three managed request paths.</h2>
        <div class="visual-grid three">
          <a class="visual-card" href="#technical-form"><h3>Technical review</h3><p>Pathway selection, contamination profile, UV review and pilot logic.</p></a>
          <a class="visual-card" href="#commercial-form"><h3>Commercial discussion</h3><p>Procurement, partnership, volume planning and project qualification.</p></a>
          <a class="visual-card" href="#documentation-form"><h3>Documentation / pilot support</h3><p>Application files, study context, ROI material and validation framework.</p></a>
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

  const reveal = (element) => {
    element.classList.add('is-visible');
    element.querySelectorAll('[data-count-target]').forEach((node) => {
      if (node.dataset.countDone) return;
      node.dataset.countDone = '1';
      const target = Number(node.dataset.countTarget || 0);
      const suffix = node.dataset.countSuffix || '';
      const decimals = Number(node.dataset.countDecimals || 0);
      if (reducedMotion) {
        node.textContent = `${target.toFixed(decimals)}${suffix}`;
        return;
      }
      const start = performance.now();
      const duration = 900;
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        node.textContent = `${(target * eased).toFixed(decimals)}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };

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
});
