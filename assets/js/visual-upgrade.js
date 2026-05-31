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
    if (routePath === 'roi-calculator' || routePath === 'contact/thanks') return;

    const routeMap = {
      '': 'home', 'index.html': 'home',
      'technology': 'technology', 'quartz': 'quartz', 'titan': 'titan', 'projects': 'projects',
      'documentation': 'documentation', 'faq': 'faq', 'contact': 'contact',
      'applications/pv-soiling-loss-mitigation': 'pvSoiling',
      'applications/anti-soiling-coating': 'antiSoiling',
      'applications/cleaning-cost-reduction': 'cleaningCost',
      'case-studies': 'caseStudies', 'markets': 'markets', 'markets/europe': 'europe',
      'markets/middle-east': 'middleEast', 'markets/nordics': 'nordics', 'partners': 'partners'
    };
    const page = routeMap[routePath] || 'home';
    const isHome = page === 'home';
    document.body.dataset.visualPage = page;
    document.body.dataset.routePath = routePath || 'home';
    document.body.classList.add(`solarex-page-${page}`);

    const diag = (name) => assetPath(`assets/img/diagrams/${name}`);
    const photo = {
      pv: `linear-gradient(115deg,rgba(8,14,22,.88),rgba(8,14,22,.58)),radial-gradient(circle at 78% 22%,rgba(255,210,26,.26),transparent 17%),linear-gradient(18deg,rgba(102,168,238,.16) 0 3px,transparent 3px 36px),linear-gradient(160deg,#182838,#07111d)`,
      q: `linear-gradient(115deg,rgba(8,14,22,.90),rgba(8,14,22,.56)),radial-gradient(circle at 78% 24%,rgba(102,168,238,.32),transparent 18%),linear-gradient(160deg,#1a2b38,#07111d)`,
      t: `linear-gradient(115deg,rgba(8,14,22,.90),rgba(8,14,22,.55)),radial-gradient(circle at 76% 22%,rgba(92,201,123,.30),transparent 20%),linear-gradient(160deg,#142c25,#07111d)`,
      field: `linear-gradient(115deg,rgba(8,14,22,.88),rgba(8,14,22,.58)),linear-gradient(12deg,rgba(102,168,238,.20) 0 2px,transparent 2px 34px),radial-gradient(circle at 80% 20%,rgba(255,210,26,.25),transparent 18%),linear-gradient(160deg,#142433,#07111d)`,
      docs: `linear-gradient(115deg,rgba(8,14,22,.88),rgba(8,14,22,.58)),repeating-linear-gradient(0deg,rgba(214,229,239,.10) 0 1px,transparent 1px 42px),linear-gradient(160deg,#172231,#07111d)`
    };
    const configs = {
      home: ['Surface-engineering route selection','A visual decision layer separates Quartz, Titan, ROI screening and evidence classification.',photo.pv,`url('${diag('pathway-selection-flow.svg')}'),${photo.pv}`,'routeCards','SolarEX routes site data into Quartz, Titan, ROI and evidence review.'],
      technology: ['Quartz and Titan comparison architecture','Passive SiO2 and active TiO2 are separated before documentation, ROI or pilot planning.',photo.pv,`url('${diag('technology-selection-matrix.svg')}'),${photo.pv}`,'quadrant','Quartz and Titan are selected by mechanism.'],
      quartz: ['Passive SiO2 easy-clean surface architecture','UV-independent surface behavior for dust and mineral soiling review.',photo.q,`url('${diag('quartz-passive-layer.svg')}'),${photo.q}`,'barStack','Quartz is the passive UV-independent route.'],
      titan: ['Active TiO2 photocatalytic pathway','UV-supported surface chemistry for organic and atmospheric fouling review.',photo.t,`url('${diag('titan-active-uv-rinse.svg')}'),${photo.t}`,'timeline','Titan depends on UV-supported surface chemistry.'],
      projects: ['Pilot evidence and monitored review','Evidence is separated into monitored study, field observation, ROI scenario and pilot hypothesis.',photo.field,`url('${diag('pilot-evidence-stack.svg')}'),${photo.field}`,'process','Pilot evidence connects method, limitation and next action.'],
      documentation: ['Technical files, evidence and application guidance','Documentation routes by role, pathway, evidence class and project stage.',photo.docs,`url('${diag('documentation-flow.svg')}'),${photo.docs}`,'matrix','Documentation routes by role and pathway.'],
      faq: ['FAQ decision tree','Questions route buyers to mechanism, evidence, ROI or review.',photo.docs,`url('${diag('faq-decision-tree.svg')}'),${photo.docs}`,'stair','Common questions lead to review.'],
      contact: ['Request routing workflow','Technical, commercial and document requests are separated.',photo.docs,`url('${diag('contact-routing-flow.svg')}'),${photo.docs}`,'process','Requests route into managed workflows.'],
      pvSoiling: ['PV soiling-loss mitigation map','Contamination type determines Quartz, Titan or mixed review.',photo.field,photo.field,'wave','Soiling mitigation begins with contamination type.'],
      antiSoiling: ['Anti-soiling route selection','Mechanism fit is checked before coating selection.',photo.pv,photo.pv,'quadrant','Anti-soiling review compares mechanism fit.'],
      cleaningCost: ['Cleaning-cost stack visual','Water, labor, access and recovered output define the commercial screen.',photo.field,photo.field,'barStackAlt','Cleaning economics are evaluated as a cost stack.'],
      caseStudies: ['Evidence-class case context','Case studies separate monitored evidence, scenarios and hypotheses.',photo.docs,photo.docs,'matrix','Evidence is labelled by method and next action.'],
      markets: ['Regional operating-fit map','Europe, GCC and Nordics have different soiling, UV, water and O&M logic.',photo.pv,photo.pv,'regionCards','Regional context determines review route.'],
      europe: ['European PV operating context','Pollen, salt, grime and rainfall cycles support Quartz-first review.',photo.q,photo.q,'timeline','European evaluation starts with seasonal soiling.'],
      middleEast: ['GCC dust and water logistics','Dust and water logistics shape GCC review.',photo.field,photo.field,'radial','High-dust regions require pilot controls.'],
      nordics: ['Nordic seasonal PV context','Lower UV, pollen and grime support UV-independent Quartz review.',photo.q,photo.q,'stair','High-latitude route selection starts with Quartz review.'],
      partners: ['Partner qualification and enablement','Partner visuals focus on access, claims discipline and pilot-to-scale support.',photo.docs,photo.docs,'process','Partners need evidence-led selling materials.']
    };
    const [title, intro, heroBg, featureBg, chartType, caption] = configs[page] || configs.home;
    document.body.style.setProperty('--solarex-hero-image', heroBg);
    document.body.style.setProperty('--solarex-breaker-image', featureBg);
    document.body.style.setProperty('--solarex-feature-image', featureBg);

    const main = document.querySelector('main');
    const hero = main?.querySelector('.hero');
    if (!main || !hero || document.querySelector('[data-visual-upgrade-section]')) return;

    if (isHome) {
      const routeStrip = document.createElement('section');
      routeStrip.className = 'solarex-outside-hero-strip visual-reveal';
      routeStrip.setAttribute('aria-label', 'SolarEX route summary cards');
      routeStrip.innerHTML = `<article class="solarex-route-card"><strong>SiO2</strong><span>Quartz</span><p>Passive easy-clean review for dust and mineral soiling.</p></article><article class="solarex-route-card"><strong>TiO2</strong><span>Titan</span><p>Active review for UV-supported contamination.</p></article><article class="solarex-route-card"><strong>ROI</strong><span>Decision output</span><p>Site-fit pathway and commercial screen.</p></article><article class="solarex-route-card"><strong>QA</strong><span>Evidence class</span><p>Study, parameter, scenario or pilot hypothesis.</p></article>`;
      hero.insertAdjacentElement('afterend', routeStrip);
    } else {
      document.querySelectorAll('.solarex-outside-hero-strip').forEach((node) => node.remove());
    }

    const breaker = document.createElement('section');
    breaker.className = 'solarex-page-breaker visual-reveal';
    breaker.setAttribute('data-caption', caption);
    breaker.setAttribute('aria-label', caption);

    const section = document.createElement('section');
    section.className = 'solarex-visual-module visual-reveal';
    section.setAttribute('data-visual-upgrade-section', page);
    section.setAttribute('aria-labelledby', 'solarex-visual-title');
    section.innerHTML = `<article class="solarex-visual-panel"><div class="kicker">Page-specific visual system</div><h2 id="solarex-visual-title">${title}</h2><p>${intro}</p><div class="solarex-feature-image" role="img" aria-label="${title}"></div></article><article class="solarex-chart-panel" data-chart-type="${chartType}"><div class="kicker">Unique chart layout</div><h2>${chartTitle(chartType)}</h2>${chartMarkup(chartType)}</article>`;

    const anchor = isHome ? document.querySelector('.solarex-outside-hero-strip') || hero : hero;
    anchor.insertAdjacentElement('afterend', breaker);
    breaker.insertAdjacentElement('afterend', section);

    const reveal = (element) => element.classList.add('is-visible');
    if ('IntersectionObserver' in window && !reducedMotion) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) { reveal(entry.target); observer.unobserve(entry.target); } });
      }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
      document.querySelectorAll('.visual-reveal,.solarex-visual-module,.solarex-chart-panel,.solarex-page-breaker,.solarex-outside-hero-strip').forEach((el) => observer.observe(el));
    } else {
      document.querySelectorAll('.visual-reveal,.solarex-visual-module,.solarex-chart-panel,.solarex-page-breaker,.solarex-outside-hero-strip').forEach(reveal);
    }
  };

  const chartTitle = (type) => ({ routeCards:'Route outcome cards', barStack:'Quartz mechanism emphasis', barStackAlt:'Cleaning-cost stack', process:'Validation process', radial:'Operating-pressure map', matrix:'Evidence-class matrix', timeline:'Mechanism sequence', quadrant:'Selection quadrant', wave:'Soiling profile pattern', stair:'Decision ladder', regionCards:'Regional fit cards' }[type] || 'Decision chart');
  const chartMarkup = (type) => {
    if (type === 'barStack') return `<div class="solarex-chart-stack"><div class="solarex-chart-row"><span class="solarex-chart-label">Adhesion</span><i class="solarex-chart-track"><b class="solarex-chart-fill" style="--w:88%"></b></i></div><div class="solarex-chart-row"><span class="solarex-chart-label">UV need</span><i class="solarex-chart-track"><b class="solarex-chart-fill" style="--w:8%"></b></i></div><div class="solarex-chart-row"><span class="solarex-chart-label">Easy-clean</span><i class="solarex-chart-track"><b class="solarex-chart-fill" style="--w:82%"></b></i></div></div>`;
    if (type === 'barStackAlt') return `<div class="solarex-chart-stack"><div class="solarex-chart-row"><span class="solarex-chart-label">Water</span><i class="solarex-chart-track"><b class="solarex-chart-fill" style="--w:76%"></b></i></div><div class="solarex-chart-row"><span class="solarex-chart-label">Labor</span><i class="solarex-chart-track"><b class="solarex-chart-fill" style="--w:68%"></b></i></div><div class="solarex-chart-row"><span class="solarex-chart-label">Access</span><i class="solarex-chart-track"><b class="solarex-chart-fill" style="--w:58%"></b></i></div></div>`;
    if (type === 'process' || type === 'regionCards') return `<div class="solarex-process-chart"><div class="solarex-process-node"><strong>Assess</strong><span>Site profile.</span></div><div class="solarex-process-node"><strong>Route</strong><span>Quartz or Titan.</span></div><div class="solarex-process-node"><strong>Pilot</strong><span>Treated/control.</span></div><div class="solarex-process-node"><strong>Decide</strong><span>Scale-up route.</span></div></div>`;
    if (type === 'radial') return `<div class="solarex-radial-chart"><span>Dust</span><span>Water</span><span>Abrasion</span><span>Cleaning</span></div>`;
    if (type === 'matrix') return `<div class="solarex-matrix-chart"><div class="solarex-matrix-cell"><strong>Study</strong><span>Context result.</span></div><div class="solarex-matrix-cell"><strong>Parameter</strong><span>Measured property.</span></div><div class="solarex-matrix-cell"><strong>Scenario</strong><span>ROI screen.</span></div><div class="solarex-matrix-cell"><strong>Pilot</strong><span>Validation route.</span></div></div>`;
    if (type === 'timeline' || type === 'stair') return `<div class="solarex-timeline-chart"><div class="solarex-timeline-step"><strong>Question</strong><span>Site problem.</span></div><div class="solarex-timeline-step"><strong>Route</strong><span>Quartz or Titan.</span></div><div class="solarex-timeline-step"><strong>Evidence</strong><span>Support class.</span></div><div class="solarex-timeline-step"><strong>Action</strong><span>Review or pilot.</span></div></div>`;
    if (type === 'quadrant') return `<div class="solarex-quadrant-chart"><div><strong>Low UV</strong><span>Quartz-first.</span></div><div><strong>Organic film</strong><span>Titan if UV supports.</span></div><div><strong>Dust / salt</strong><span>Easy-clean fit.</span></div><div><strong>Mixed fouling</strong><span>Pilot review.</span></div></div>`;
    if (type === 'wave') return `<div class="solarex-wave-chart"><i style="--h:38%"></i><i style="--h:62%"></i><i style="--h:78%"></i><i style="--h:55%"></i><i style="--h:88%"></i><i style="--h:46%"></i><i style="--h:70%"></i></div>`;
    return `<div class="visual-chart-grid"><div class="visual-chart-node"><h3>SiO2</h3><p>Quartz route.</p></div><div class="visual-chart-node"><h3>TiO2</h3><p>Titan route.</p></div></div>`;
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSolarEXVisualUpgrade, { once: true });
  else initSolarEXVisualUpgrade();
})();
