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
      technology:['Choose the correct SolarEX pathway.','Compare Quartz and Titan by site conditions and pilot need.'],
      quartz:['Quartz: UV-independent SiO2 easy-clean protection.','Passive SiO2 behavior for dust, salt, pollen and mineral soiling.'],
      titan:['Titan: active TiO2 photocatalytic surface behavior.','UV-supported TiO2 route for organic and atmospheric contamination.'],
      projects:['Evidence, pilot logic and coating review.','Review study context, ROI scenarios and treated/control pilot structure.'],
      documentation:['SolarEX technical files and application guidance.','Access pathway documents, application guidance and review support.'],
      faq:['SolarEX technical FAQ.','Answers on Quartz, Titan, UV, cleaning, evidence and pilot validation.'],
      contact:['Request SolarEX technical review.','Submit site conditions, contamination profile or documentation request.'],
      'roi-calculator':['Calculate a first-pass SolarEX value case.','Model area, location, sunlight, electricity value and coating pathway.']
    };

    const routeCopy = () => {
      if (copyMap[routePath]) return copyMap[routePath];
      if (routePath.startsWith('applications/pv-soiling')) return ['Reduce PV soiling losses with pathway review.','Match contamination type and O&M objective to the correct route.'];
      if (routePath.startsWith('applications/anti-soiling')) return ['Anti-soiling coating selected by mechanism fit.','Review passive and active surface behavior before selection.'];
      if (routePath.startsWith('applications/cleaning-cost')) return ['Screen cleaning-cost reduction potential.','Convert water, labor and access into a practical review pathway.'];
      if (routePath.startsWith('case-studies')) return ['SolarEX case studies and evidence context.','Separate study evidence, ROI scenarios and pilot hypotheses.'];
      if (routePath.startsWith('markets/middle-east')) return ['SolarEX for GCC and Middle East PV sites.','Evaluate dust, water logistics and route-specific pilot validation.'];
      if (routePath.startsWith('markets/europe')) return ['SolarEX for European PV operations.','Review pollen, salt, grime and mineral-soiling conditions.'];
      if (routePath.startsWith('markets/nordics')) return ['SolarEX for Nordic PV conditions.','Use UV-independent Quartz review for lower-UV seasonal sites.'];
      if (routePath.startsWith('markets')) return ['SolarEX market-fit by operating region.','Compare regions by soiling, UV, water and O&M context.'];
      if (routePath.startsWith('partners')) return ['SolarEX partner qualification.','Review commercial fit, support capability and evidence-led sales.'];
      return copyMap.home;
    };

    const applyHeroCopy = () => {
      if (!isMobile()) return;
      const hero = document.querySelector('.roi-hero, main .hero');
      if (!hero) return;
      const [headline, leadText] = routeCopy();
      const h1 = hero.querySelector('h1');
      let lead = hero.querySelector('.lead');
      if (!lead) {
        lead = document.createElement('p');
        lead.className = 'lead';
        (h1 || hero.querySelector('.eyebrow') || hero.firstElementChild)?.insertAdjacentElement('afterend', lead);
      }
      if (h1 && h1.textContent !== headline) h1.textContent = headline;
      if (lead.textContent !== leadText) lead.textContent = leadText;
      lead.dataset.mobileHeroLead = 'true';

      hero.querySelectorAll('.lead').forEach((node) => {
        if (node !== lead) node.remove();
      });
      hero.querySelectorAll('p').forEach((node) => {
        if (node !== lead && !node.classList.contains('eyebrow')) node.remove();
      });
      hero.querySelectorAll('.mini,.stats,.roi-hero-panel,.tag').forEach((node) => node.remove());

      const actions = hero.querySelector('.btn-row,.roi-actions');
      if (actions) {
        Array.from(actions.querySelectorAll('a,button')).forEach((item, index) => {
          item.style.display = index > 1 ? 'none' : '';
        });
      }
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

    applyHeroCopy();
    window.addEventListener('resize', applyHeroCopy, { passive: true });
    [50,150,350,700,1200,2000,3500].forEach((delay) => setTimeout(applyHeroCopy, delay));

    const hero = document.querySelector('.roi-hero, main .hero');
    if (hero && 'MutationObserver' in window) {
      let scheduled = false;
      new MutationObserver(() => {
        if (!isMobile() || scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
          scheduled = false;
          applyHeroCopy();
        });
      }).observe(hero, { childList: true, subtree: true, characterData: true });
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
