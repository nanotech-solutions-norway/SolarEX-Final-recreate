(() => {
  const init = () => {
    if (document.body.dataset.mobileUxHardeningReady === 'true') return;
    document.body.dataset.mobileUxHardeningReady = 'true';
    const isMobile = () => window.matchMedia('(max-width: 760px)').matches;
    const repoName = 'SolarEX-Final-recreate';
    const parts = window.location.pathname.split('/').filter(Boolean);
    const repoIndex = parts.indexOf(repoName);
    const routeParts = repoIndex >= 0 ? parts.slice(repoIndex + 1) : parts;
    const routePath = routeParts.join('/').replace(/\/index\.html$/, '').replace(/\/$/, '') || 'home';
    const copyMap = {
      home:['PV glass soiling control by site-fit surface engineering.','Choose Quartz for passive SiO2 easy-clean behavior or Titan for UV-supported TiO2 photocatalysis.'],
      technology:['Choose the correct SolarEX pathway.','Compare Quartz and Titan by UV dependency, contamination profile, cleaning model and pilot need.'],
      quartz:['Quartz: UV-independent SiO2 easy-clean protection.','Passive SiO2 behavior for dust, pollen, salt, bird lime, mineral soiling and easier cleaning.'],
      titan:['Titan: active TiO2 photocatalytic surface behavior.','UV-supported TiO2 route for organic, biological and atmospheric contamination contexts.'],
      projects:['Evidence, pilot logic and coating review.','Review study context, ROI scenarios and treated/control pilot structure before scale-up.'],
      documentation:['SolarEX technical files and application guidance.','Access pathway documents, application guidance, evidence notes and review support.'],
      faq:['SolarEX technical FAQ.','Answers on Quartz, Titan, UV dependency, cleaning, evidence, ROI and pilot validation.'],
      contact:['Request SolarEX technical review.','Submit site conditions, contamination profile, commercial objective or documentation request.'],
      'roi-calculator':['Calculate a first-pass SolarEX value case.','Model area, location, sunlight, electricity value and coating pathway as a screening scenario.']
    };
    const routeCopy = () => {
      if (copyMap[routePath]) return copyMap[routePath];
      if (routePath.startsWith('applications/pv-soiling')) return ['Reduce PV soiling losses with pathway review.','Match contamination type, UV context and O&M objective to Quartz, Titan or pilot validation.'];
      if (routePath.startsWith('applications/anti-soiling')) return ['Anti-soiling coating selected by mechanism fit.','Review passive and active surface behavior before coating selection or scale-up.'];
      if (routePath.startsWith('applications/cleaning-cost')) return ['Screen cleaning-cost reduction potential.','Convert water, labor, access and surface recovery into a practical review pathway.'];
      if (routePath.startsWith('case-studies')) return ['SolarEX case studies and evidence context.','Separate monitored studies, technical parameters, ROI scenarios and pilot hypotheses.'];
      if (routePath.startsWith('markets/middle-east')) return ['SolarEX for GCC and Middle East PV sites.','Evaluate dust, water logistics, cleaning burden and route-specific pilot validation.'];
      if (routePath.startsWith('markets/europe')) return ['SolarEX for European PV operations.','Review pollen, salt, grime, mineral soiling and rainfall-cycle cleaning logic.'];
      if (routePath.startsWith('markets/nordics')) return ['SolarEX for Nordic PV conditions.','Use UV-independent Quartz review where lower UV and seasonal contamination dominate.'];
      if (routePath.startsWith('markets')) return ['SolarEX market-fit by operating region.','Compare regions by soiling, UV, water and O&M context.'];
      if (routePath.startsWith('partners')) return ['SolarEX partner qualification.','Review commercial fit, support, application discipline and evidence-led sales.'];
      return copyMap.home;
    };
    const compactHero = () => {
      if (!isMobile()) return;
      const hero = document.querySelector('.roi-hero, main .hero');
      if (!hero) return;
      const [headline, leadText] = routeCopy();
      const h1 = hero.querySelector('h1');
      const lead = hero.querySelector('.lead');
      if (h1) h1.textContent = headline;
      if (lead) lead.textContent = leadText;
      hero.querySelectorAll('.lead').forEach((node, index) => { if (index > 0) node.remove(); });
      hero.querySelectorAll('p').forEach((node) => { if (!node.classList.contains('lead') && !node.classList.contains('eyebrow')) node.remove(); });
      hero.querySelectorAll('.stats,.roi-hero-panel').forEach((node) => node.remove());
      const actions = hero.querySelector('.btn-row,.roi-actions');
      if (actions) Array.from(actions.querySelectorAll('a,button')).forEach((item, index) => { if (index > 1) item.style.display = 'none'; });
    };
    const nav = document.querySelector('[data-nav], #roiNav');
    const menuButton = document.querySelector('[data-menu-toggle], #roiMenuToggle');
    const closeMenu = () => {
      if (!nav || !menuButton) return;
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded','false');
      menuButton.setAttribute('aria-label','Open menu');
      document.body.classList.remove('mobile-menu-open');
    };
    const openMenu = () => {
      if (!nav || !menuButton) return;
      nav.classList.add('is-open');
      menuButton.setAttribute('aria-expanded','true');
      menuButton.setAttribute('aria-label','Close menu');
      if (isMobile()) document.body.classList.add('mobile-menu-open');
    };
    if (nav && menuButton && !menuButton.dataset.mobileUxBound) {
      menuButton.dataset.mobileUxBound = 'true';
      menuButton.addEventListener('click', (event) => {
        if (!isMobile()) return;
        event.preventDefault();
        event.stopPropagation();
        nav.classList.contains('is-open') ? closeMenu() : openMenu();
      }, true);
      nav.querySelectorAll('a[href]').forEach((link) => link.addEventListener('click', closeMenu));
      document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
    }
    compactHero();
    window.addEventListener('resize', compactHero, { passive: true });
    setTimeout(compactHero, 150);
    setTimeout(compactHero, 500);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
