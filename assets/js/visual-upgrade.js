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
      home: ['Surface-engineering route selection','A visual decision layer separates the passive SiO₂ route, active TiO₂ route, ROI screening and evidence classification before scale-up.',photo.pv,`url('${diag('pathway-selection-flow.svg')}'),${photo.pv}`,'routeCards','SolarEX routes site data into Quartz, Titan, ROI and evidence review.'],
      technology: ['Quartz and Titan comparison architecture','Technology selection makes passive SiO₂ and active TiO₂ differences visible before documentation, ROI or pilot planning.',photo.pv,`url('${diag('technology-selection-matrix.svg')}'),${photo.pv}`,'quadrant','Quartz and Titan are selected by mechanism, not generic coating preference.'],
      quartz: ['Passive SiO₂ easy-clean surface architecture','Quartz uses the SiO₂ visual layer to show UV-independent surface-energy modification and easier recovery for dust and mineral soiling.',photo.q,`url('${diag('quartz-passive-layer.svg')}'),${photo.q}`,'barStack','Quartz is the passive UV-independent route for lower adhesion and easier recovery.'],
      titan: ['Active TiO₂ photocatalytic pathway','Titan uses photocatalysis visuals to show UV activation, organic-contaminant breakdown and hydrophilic rinse behavior.',photo.t,`url('${diag('titan-active-uv-rinse.svg')}'),${photo.t}`,'timeline','Titan depends on UV-supported active surface chemistry and site-specific validation.'],
      projects: ['Pilot evidence and monitored review','Project evidence is separated into monitored study, field observation, ROI scenario and pilot hypothesis.',photo.field,`url('${diag('pilot-evidence-stack.svg')}'),${photo.field}`,'process','Pilot evidence is useful only when method, limitation and next action stay connected.'],
      documentation: ['Technical files, evidence and application guidance','Documentation uses a full-width page-breaker to separate the evidence library from controlled document access.',photo.docs,`url('${diag('documentation-flow.svg')}'),${photo.docs}`,'matrix','Documentation routes by role, pathway, evidence class and project stage.'],
      faq: ['FAQ decision tree','FAQ content is presented as a decision path: soiling profile, UV dependency, cleaning objective and evidence threshold.',photo.docs,`url('${diag('faq-decision-tree.svg')}'),${photo.docs}`,'stair','Common questions lead users to Quartz, Titan, ROI, evidence or review.'],
      contact: ['Request routing workflow','Contact is treated as a conversion workflow: technical review, commercial inquiry and documentation support stay separated.',photo.docs,`url('${diag('contact-routing-flow.svg')}'),${photo.docs}`,'process','Requests are routed into technical, commercial and document-review workflows.'],
      pvSoiling: ['PV soiling-loss mitigation map','Dust, salt, pollen, organic film and mixed fouling route into different review paths.',photo.field,photo.field,'wave','Soiling mitigation begins with contamination type, not a generic coating promise.'],
      antiSoiling: ['Anti-soiling route selection','The anti-soiling page uses a mechanism-first visual rather than repeating the same route-selection bars.',photo.pv,photo.pv,'quadrant','Anti-soiling review compares mechanism fit, UV dependency and cleaning model.'],
      cleaningCost: ['Cleaning-cost stack visual','Cleaning cost is broken into water, labor, access, abrasion and recovered output for commercial review.',photo.field,photo.field,'barStackAlt','Cleaning economics are evaluated as a cost stack, not as a universal reduction claim.'],
      caseStudies: ['Evidence-class case context','Case studies separate monitored evidence from scenario models and pilot hypotheses.',photo.docs,photo.docs,'matrix','Evidence is labelled by method, use case, limitation and next action.'],
      markets: ['Regional operating-fit map','Europe, GCC and Nordics each have different soiling, UV, water and O&M logic.',photo.pv,photo.pv,'regionCards','Regional context determines whether Quartz, Titan or pilot review is the correct route.'],
      europe: ['European PV operating context','Europe is visualized around pollen, salt, grime, rainfall-cycle recovery and selective Titan review.',photo.q,photo.q,'timeline','European evaluation starts with seasonal soiling, rainfall and Quartz-first review.'],
      middleEast: ['GCC dust and water logistics','The GCC page uses dust and water logistics so it does not repeat Europe or Quartz chart layouts.',photo.field,photo.field,'radial','High-dust regions require water, abrasion, cleaning and pilot controls to be visible.'],
      nordics: ['Nordic seasonal PV context','Nordics visual logic emphasizes lower UV, pollen, grime, rain-cycle recovery and Norway-led support.',photo.q,photo.q,'stair','High-latitude route selection starts with UV-independent Quartz review.'],
      partners: ['Partner qualification and enablement','Partner visuals focus on regional access, technical sales capability, claim discipline and pilot-to-scale support.',photo.docs,photo.docs,'process','Partners need controlled claims, route logic and evidence-led selling materials.']
    };

    const selected = configs[page] || configs.home;
    const [title, intro, heroBg, featureBg, chartType, caption] = selected;
    document.body.style.setProperty('--solarex-hero-image', heroBg);
    document.body.style.setProperty('--solarex-breaker-image', featureBg);
    document.body.style.setProperty('--solarex-feature-image', featureBg);

    const main = document.querySelector('main');
    const hero = main?.querySelector('.hero');
    if (!main || !hero || document.querySelector('[data-visual-upgrade-section]')) return;

    const routeStrip = document.createElement('section');
    routeStrip.className = 'solarex-outside-hero-strip visual-reveal';
    routeStrip.setAttribute('aria-label', 'SolarEX route summary cards');
    routeStrip.innerHTML = `<article class="solarex-route-card"><strong>SiO₂</strong><span>Quartz</span><p>Passive easy-clean review for dust, pollen and mineral-dominant soiling.</p></article><article class="solarex-route-card"><strong>TiO₂</strong><span>Titan</span><p>Active photocatalytic review for UV-supported organic and biological contamination.</p></article><article class="solarex-route-card"><strong>ROI</strong><span>Decision output</span><p>Site-fit pathway, pilot structure and commercial scenario screen.</p></article><article class="solarex-route-card"><strong>QA</strong><span>Evidence class</span><p>Monitored Study, Technical Parameter, ROI Scenario or Pilot Hypothesis.</p></article>`;

    const breaker = document.createElement('section');
    breaker.className = 'solarex-page-breaker visual-reveal';
    breaker.setAttribute('data-caption', caption);
    breaker.setAttribute('aria-label', caption);

    const section = document.createElement('section');
    section.className = 'solarex-visual-module visual-reveal';
    section.setAttribute('data-visual-upgrade-section', page);
    section.setAttribute('aria-labelledby', 'solarex-visual-title');
    section.innerHTML = `<article class="solarex-visual-panel"><div class="kicker">Page-specific visual system</div><h2 id="solarex-visual-title">${title}</h2><p>${intro}</p><div class="solarex-feature-image" role="img" aria-label="${title}" data-loaded="false" data-fallback="${title}"></div></article><article class="solarex-chart-panel" data-chart-type="${chartType}"><div class="kicker">Unique chart layout</div><h2>${chartTitle(chartType)}</h2>${chartMarkup(chartType)}</article>`;

    hero.insertAdjacentElement('afterend', section);
    hero.insertAdjacentElement('afterend', breaker);
    hero.insertAdjacentElement('afterend', routeStrip);

    if (page === 'contact' && routePath === 'contact') {
      const routing = document.createElement('section');
      routing.className = 'visual-section contact-pathway-visual visual-reveal';
      routing.innerHTML = `<div class="container"><div class="kicker">Conversion routing</div><h2>Three managed request paths.</h2><div class="visual-grid three"><a class="visual-card has-action-card" href="#technical-form"><h3>Technical review</h3><p>Pathway selection, contamination profile, UV review and pilot logic.</p></a><a class="visual-card has-action-card" href="#commercial-form"><h3>Commercial discussion</h3><p>Procurement, partnership, volume planning and project qualification.</p></a><a class="visual-card has-action-card" href="#documentation-form"><h3>Documentation / pilot support</h3><p>Application files, study context, ROI material and validation framework.</p></a></div></div>`;
      document.querySelector('#technical-form')?.insertAdjacentElement('beforebegin', routing);
    }

    const reveal = (element) => element.classList.add('is-visible');
    if ('IntersectionObserver' in window && !reducedMotion) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) { reveal(entry.target); observer.unobserve(entry.target); } });
      }, { threshold: 0.12 });
      document.querySelectorAll('.visual-reveal,.solarex-visual-module,.solarex-chart-panel').forEach((el) => observer.observe(el));
    } else {
      document.querySelectorAll('.visual-reveal,.solarex-visual-module,.solarex-chart-panel').forEach(reveal);
    }
  };

  const chartTitle = (type) => ({ routeCards:'Route outcome cards', barStack:'Quartz mechanism emphasis', barStackAlt:'Cleaning-cost stack', process:'Validation process', radial:'Operating-pressure map', matrix:'Evidence-class matrix', timeline:'Mechanism sequence', quadrant:'Selection quadrant', wave:'Soiling profile pattern', stair:'Decision ladder', regionCards:'Regional fit cards' }[type] || 'Decision chart');
  const chartMarkup = (type) => {
    if (type === 'barStack') return `<div class="solarex-chart-stack"><div class="solarex-chart-row"><span class="solarex-chart-label">Adhesion</span><i class="solarex-chart-track"><b class="solarex-chart-fill" style="--w:88%"></b></i></div><div class="solarex-chart-row"><span class="solarex-chart-label">UV need</span><i class="solarex-chart-track"><b class="solarex-chart-fill" style="--w:8%"></b></i></div><div class="solarex-chart-row"><span class="solarex-chart-label">Easy-clean</span><i class="solarex-chart-track"><b class="solarex-chart-fill" style="--w:82%"></b></i></div></div>`;
    if (type === 'barStackAlt') return `<div class="solarex-chart-stack"><div class="solarex-chart-row"><span class="solarex-chart-label">Water</span><i class="solarex-chart-track"><b class="solarex-chart-fill" style="--w:76%"></b></i></div><div class="solarex-chart-row"><span class="solarex-chart-label">Labor</span><i class="solarex-chart-track"><b class="solarex-chart-fill" style="--w:68%"></b></i></div><div class="solarex-chart-row"><span class="solarex-chart-label">Access</span><i class="solarex-chart-track"><b class="solarex-chart-fill" style="--w:58%"></b></i></div><div class="solarex-chart-row"><span class="solarex-chart-label">Yield</span><i class="solarex-chart-track"><b class="solarex-chart-fill" style="--w:64%"></b></i></div></div>`;
    if (type === 'process' || type === 'regionCards') return `<div class="solarex-process-chart"><div class="solarex-process-node"><strong>Assess</strong><span>Site and contamination profile.</span></div><div class="solarex-process-node"><strong>Prepare</strong><span>Surface and method control.</span></div><div class="solarex-process-node"><strong>Apply</strong><span>Route-specific execution.</span></div><div class="solarex-process-node"><strong>Verify</strong><span>Evidence and go/no-go review.</span></div></div>`;
    if (type === 'radial') return `<div class="solarex-radial-chart"><span>Dust</span><span>Water</span><span>Abrasion</span><span>Cleaning</span></div>`;
    if (type === 'matrix') return `<div class="solarex-matrix-chart"><div class="solarex-matrix-cell"><strong>Monitored Study</strong><span>Study-context result.</span></div><div class="solarex-matrix-cell"><strong>Technical Parameter</strong><span>Measured product property.</span></div><div class="solarex-matrix-cell"><strong>ROI Scenario</strong><span>Assumption-based screen.</span></div><div class="solarex-matrix-cell"><strong>Pilot Hypothesis</strong><span>Site validation route.</span></div></div>`;
    if (type === 'timeline' || type === 'stair') return `<div class="solarex-timeline-chart"><div class="solarex-timeline-step"><strong>Question</strong><span>What is the site problem?</span></div><div class="solarex-timeline-step"><strong>Route</strong><span>Quartz, Titan or mixed review.</span></div><div class="solarex-timeline-step"><strong>Evidence</strong><span>What class supports it?</span></div><div class="solarex-timeline-step"><strong>Action</strong><span>Document, ROI or pilot.</span></div></div>`;
    if (type === 'quadrant') return `<div class="solarex-quadrant-chart"><div><strong>Low UV</strong><span>Quartz-first review.</span></div><div><strong>Organic film</strong><span>Titan review if UV supports.</span></div><div><strong>Dust / salt</strong><span>Passive easy-clean fit.</span></div><div><strong>Mixed fouling</strong><span>Pilot validation path.</span></div></div>`;
    if (type === 'wave') return `<div class="solarex-wave-chart"><i style="--h:38%"></i><i style="--h:62%"></i><i style="--h:78%"></i><i style="--h:55%"></i><i style="--h:88%"></i><i style="--h:46%"></i><i style="--h:70%"></i></div>`;
    return `<div class="visual-chart-grid"><div class="visual-chart-node"><h3>SiO₂</h3><p>Quartz route.</p></div><div class="visual-chart-node"><h3>TiO₂</h3><p>Titan route.</p></div><div class="visual-chart-node"><h3>ROI</h3><p>Commercial screen.</p></div><div class="visual-chart-node"><h3>QA</h3><p>Evidence class.</p></div></div>`;
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSolarEXVisualUpgrade, { once: true });
  else initSolarEXVisualUpgrade();
})();
