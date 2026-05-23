(() => {
  const initSolarEXStrategyOptimization = () => {
    if (document.body.dataset.strategyOptimizationReady === 'true') return;
    document.body.dataset.strategyOptimizationReady = 'true';

    const currentPath = window.location.pathname;
    const repoName = 'SolarEX-Final-recreate';
    const pathParts = currentPath.split('/').filter(Boolean);
    const repoIndex = pathParts.indexOf(repoName);
    const routeParts = repoIndex >= 0 ? pathParts.slice(repoIndex + 1) : pathParts;
    const isFileRoute = routeParts.length > 0 && /\.[a-z0-9]+$/i.test(routeParts[routeParts.length - 1]);
    const directoryDepth = isFileRoute ? Math.max(routeParts.length - 1, 0) : routeParts.length;
    const relativePrefix = '../'.repeat(directoryDepth);
    const repoBase = repoIndex >= 0 ? `/${repoName}/` : '';
    const href = (path) => repoBase ? `${repoBase}${path}` : `${relativePrefix}${path}`;
    const routePath = routeParts.join('/').replace(/\/$/, '');
    const page = routePath || 'home';

    const setMeta = () => {
      const meta = {
        home: ['SolarEX PV Glass Coatings | SiO₂ Quartz & TiO₂ Titan', 'Compare SolarEX Quartz SiO₂ and Titan TiO₂ PV glass coatings for soiling control, cleaning optimization, pilot validation and commercial review.'],
        quartz: ['SolarEX Quartz SiO₂ Coating | Passive Easy-Clean PV Glass', 'SolarEX Quartz is a passive SiO₂ PV glass coating for UV-independent easy-clean behavior, reduced adhesion and dust or mineral soiling contexts.'],
        titan: ['SolarEX Titan TiO₂ Coating | Active Photocatalytic PV Glass', 'SolarEX Titan is an active TiO₂ photocatalytic PV glass coating for UV-supported organic contaminant breakdown and hydrophilic rinse behavior.'],
        technology: ['PV Glass Coating Technology | SolarEX Quartz vs Titan', 'Understand SolarEX surface-engineering technology, route selection, UV dependency, contamination fit and validation logic for PV glass.'],
        projects: ['SolarEX Project Evidence | PV Coating Pilot Validation', 'Review SolarEX project evidence, monitoring logic, ROI assumptions and pilot-validation structure for PV glass coating decisions.'],
        documentation: ['SolarEX Documentation | TDS, Application and Pilot Support', 'Find SolarEX documentation pathways for technical review, application guidance, safety context, pilot planning and commercial evaluation.'],
        faq: ['SolarEX FAQ | Quartz SiO₂ and Titan TiO₂ PV Coatings', 'Answers to common questions about SolarEX Quartz, Titan, pathway selection, application, evidence, cleaning and pilot validation.'],
        contact: ['Contact SolarEX | Technical Review and Commercial Discussion', 'Request SolarEX technical review, commercial discussion or documentation support through managed contact forms.']
      };
      const key = meta[page] ? page : page.startsWith('contact') ? 'contact' : 'home';
      const [title, desc] = meta[key];
      document.title = title;
      let description = document.querySelector('meta[name="description"]');
      if (!description) {
        description = document.createElement('meta');
        description.name = 'description';
        document.head.appendChild(description);
      }
      description.content = desc;
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = `https://www.solarex.no/${page === 'home' ? '' : routePath.replace(/index\.html$/,'')}`;
    };

    const injectStructuredData = () => {
      if (document.querySelector('script[data-solarex-schema]')) return;
      const data = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'SolarEX',
        url: 'https://www.solarex.no/',
        description: 'PV glass surface-engineering platform with passive SiO₂ Quartz and active TiO₂ Titan coating pathways.',
        sameAs: [],
        makesOffer: [
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'SolarEX Quartz SiO₂ PV glass coating' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'SolarEX Titan TiO₂ PV glass coating' } }
        ]
      };
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.solarexSchema = 'true';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    const enhanceFooter = () => {
      document.querySelectorAll('.site-footer').forEach((footer) => {
        if (footer.dataset.strategyFooter === 'true') return;
        footer.dataset.strategyFooter = 'true';
        footer.classList.add('strategy-footer');
        footer.innerHTML = `
          <div class="footer-grid">
            <div>
              <a class="brand" href="${href('index.html')}">Solar<span>EX</span></a>
              <p class="mini">PV glass surface engineering for commercial solar assets.</p>
              <div class="footer-language"><a href="${href('index.html')}" aria-label="English language"><span class="footer-gb-flag"></span><span>English</span></a></div>
            </div>
            <div><h3>Products</h3><a href="${href('quartz/')}">Quartz SiO₂</a><a href="${href('titan/')}">Titan TiO₂</a><a href="${href('technology/')}">Technology comparison</a></div>
            <div><h3>Proof</h3><a href="${href('projects/')}">Projects and evidence</a><a href="${href('documentation/')}">Documentation</a><a href="${href('faq/')}">FAQ</a></div>
            <div><h3>Use cases</h3><a href="${href('technology/#selection')}">Pathway selection</a><a href="${href('projects/#pilot')}">Pilot validation</a><a href="${href('documentation/#application')}">Application guidance</a></div>
            <div><h3>Contact</h3><a href="${href('contact/#technical-form')}">Technical review</a><a href="${href('contact/#commercial-form')}">Commercial discussion</a><a href="${href('contact/#documentation-form')}">Documentation / pilot support</a></div>
            <div class="footer-legal-row"><span>© 2026 SolarEX. All rights reserved.</span><span>Claims are pathway-specific and should be validated against site conditions before material procurement decisions.</span></div>
          </div>`;
      });
    };

    const strategyModules = {
      home: `
        <section class="strategy-section reveal" data-strategy-section="router">
          <div class="container">
            <div class="kicker">Strategy layer</div>
            <h2>Route by buyer intent, not by generic coating category.</h2>
            <p class="lead">SolarEX now separates product selection, proof, documentation and conversion paths so users can move from technical fit to pilot review with less friction.</p>
            <div class="strategy-router">
              <a href="${href('technology/')}"><h3>Compare mechanisms</h3><p>SiO₂ Quartz vs TiO₂ Titan route selection.</p></a>
              <a href="${href('projects/')}"><h3>Review evidence</h3><p>Study context, monitoring logic and ROI assumptions.</p></a>
              <a href="${href('contact/#technical-form')}"><h3>Request review</h3><p>Route technical, commercial or documentation requests.</p></a>
            </div>
          </div>
        </section>`,
      quartz: `
        <section class="strategy-section reveal"><div class="container"><div class="kicker">Quartz decision support</div><h2>Passive route for UV-independent easy-clean surface behavior.</h2><div class="strategy-grid three"><article class="strategy-card"><h3>Primary fit</h3><p>Dust, pollen, salt and mineral-dominated soiling where reduced adhesion and cleaning recovery are the main objectives.</p></article><article class="strategy-card"><h3>Proof link</h3><p>Quartz value should be evaluated with site-specific soiling, cleaning and ROI assumptions.</p><a class="btn secondary" href="${href('projects/')}">Review evidence</a></article><article class="strategy-card"><h3>Next action</h3><p>Use documentation and technical review before material application decisions.</p><a class="btn secondary" href="${href('documentation/')}">Open documentation</a></article></div></div></section>`,
      titan: `
        <section class="strategy-section reveal"><div class="container"><div class="kicker">Titan decision support</div><h2>Active route where UV-supported photocatalysis is technically relevant.</h2><div class="strategy-grid three"><article class="strategy-card"><h3>Primary fit</h3><p>Organic, biological and atmospheric contamination where UV availability supports TiO₂ surface activation.</p></article><article class="strategy-card"><h3>Proof link</h3><p>Study data should remain connected to monitoring context, baseline conditions and treated/control comparison.</p><a class="btn secondary" href="${href('projects/')}">Review projects</a></article><article class="strategy-card"><h3>Next action</h3><p>Confirm UV, climate and contamination profile before selecting the Titan route.</p><a class="btn secondary" href="${href('contact/#technical-form')}">Start review</a></article></div></div></section>`,
      technology: `
        <section id="selection" class="strategy-section reveal"><div class="container"><div class="kicker">Selection architecture</div><h2>Make the pathway decision inspectable.</h2><div class="strategy-mini-map"><div><strong>Surface route</strong><span>Quartz = passive SiO₂. Titan = active TiO₂.</span></div><div><strong>Trigger dependency</strong><span>Quartz does not depend on UV activation. Titan requires UV-supported photocatalytic conditions.</span></div><div><strong>Validation need</strong><span>Commercial scale-up should follow pilot or treated/control evidence where material decisions are significant.</span></div></div></div></section>`,
      projects: `
        <section id="pilot" class="strategy-section reveal"><div class="container"><div class="kicker">Proof architecture</div><h2>Keep evidence separate, contextual and useful for decision-making.</h2><div class="strategy-grid three"><article class="strategy-card"><h3>Baseline</h3><p>Document initial yield, soiling profile and cleaning schedule before treatment.</p></article><article class="strategy-card"><h3>Matched control</h3><p>Compare coated and uncoated areas using interval monitoring and cleaning logs.</p></article><article class="strategy-card"><h3>Commercial review</h3><p>Translate monitored behavior into ROI, O&M and procurement decision context.</p></article></div></div></section>`,
      documentation: `
        <section id="application" class="strategy-section reveal"><div class="container"><div class="kicker">Documentation architecture</div><h2>Route technical files by decision task.</h2><div class="strategy-grid four"><article class="strategy-card"><h3>Product overview</h3><p>Mechanism, pathway and suitability.</p></article><article class="strategy-card"><h3>Application</h3><p>Preparation, consumption and cure logic.</p></article><article class="strategy-card"><h3>Pilot planning</h3><p>Baseline, control and monitoring structure.</p></article><article class="strategy-card"><h3>Commercial review</h3><p>Evidence package, ROI context and next action.</p></article></div></div></section>`,
      faq: `
        <section class="strategy-section reveal"><div class="container"><div class="kicker">FAQ optimization</div><h2>Answer the next likely buyer question.</h2><div class="strategy-grid three"><article class="strategy-card"><h3>Which product?</h3><p>Use Quartz for passive, UV-independent easy-clean goals; use Titan where UV-supported active behavior is suitable.</p></article><article class="strategy-card"><h3>What validates it?</h3><p>Matched control, monitoring interval, cleaning log, baseline and commercial objective.</p></article><article class="strategy-card"><h3>Where next?</h3><p>Go from FAQ to technology, documentation or technical review.</p><a class="btn secondary" href="${href('contact/#technical-form')}">Start review</a></article></div></div></section>`,
      contact: `
        <section class="strategy-section reveal"><div class="container"><div class="kicker">Conversion optimization</div><h2>Structured request routing.</h2><p class="lead">The contact page keeps forms as the conversion surface and routes users by technical, commercial and documentation intent.</p><div class="strategy-proof-strip"><span>Technical review</span><span>Commercial discussion</span><span>Documentation / pilot support</span><span>No public email dependency</span></div></div></section>`
    };

    const injectStrategyModule = () => {
      const main = document.querySelector('main');
      if (!main || document.querySelector('[data-strategy-section]')) return;
      const key = strategyModules[page] ? page : page.startsWith('contact') ? 'contact' : null;
      if (!key) return;
      const footer = document.querySelector('.site-footer');
      const template = document.createElement('template');
      template.innerHTML = strategyModules[key].trim();
      main.insertBefore(template.content.firstElementChild, footer || null);
    };

    const run = () => {
      setMeta();
      injectStructuredData();
      injectStrategyModule();
      enhanceFooter();
    };
    run();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSolarEXStrategyOptimization, { once: true });
  } else {
    initSolarEXStrategyOptimization();
  }
})();
