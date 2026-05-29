document.addEventListener('DOMContentLoaded', () => {
  const rawPath = window.location.pathname.replace(/^\/SolarEX-Final-recreate\//, '/').replace(/\/index\.html$/, '/');
  const route = rawPath === '/' ? 'home' : rawPath.split('/').filter(Boolean).join('-');
  const prefix = (() => {
    const parts = rawPath.split('/').filter(Boolean);
    return parts.length ? '../'.repeat(parts.length) : '';
  })();
  const base = window.location.pathname.includes('/SolarEX-Final-recreate/') ? '/SolarEX-Final-recreate/' : prefix;
  const img = (name) => base + 'assets/img/' + name;

  const nav = document.querySelector('[data-nav], #roiNav');
  const menuButton = document.querySelector('[data-menu-toggle], #roiMenuToggle');
  if (nav && !nav.querySelector('.nav-contact')) {
    const contact = document.createElement('a');
    contact.className = 'nav-contact';
    contact.href = prefix + 'contact/';
    contact.textContent = 'Contact';
    const cta = nav.querySelector('.nav-cta');
    if (cta) cta.insertAdjacentElement('beforebegin', contact);
    else nav.appendChild(contact);
  }
  const syncMobileMenuState = () => {
    const open = Boolean(nav && nav.classList.contains('is-open')) || menuButton?.getAttribute('aria-expanded') === 'true';
    document.body.classList.toggle('mobile-menu-open', open);
  };
  if (nav || menuButton) {
    syncMobileMenuState();
    if (nav) new MutationObserver(syncMobileMenuState).observe(nav, { attributes: true, attributeFilter: ['class'] });
    if (menuButton) new MutationObserver(syncMobileMenuState).observe(menuButton, { attributes: true, attributeFilter: ['aria-expanded'] });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav?.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        menuButton?.setAttribute('aria-expanded', 'false');
        syncMobileMenuState();
      }
    });
  }

  if (route === 'home') {
    const hero = document.querySelector('main .hero');
    const lead = hero?.querySelector('.lead');
    if (lead) lead.textContent = 'SolarEX helps asset owners, EPCs and O&M teams select the correct PV-glass coating pathway between UV-independent SiO2 Quartz for passive easy-clean protection and UV-supported TiO2 Titan for active photocatalytic contamination control.';
    hero?.querySelectorAll('p.mini').forEach((node) => {
      if ((node.textContent || '').includes('Request a SolarEX pathway review')) node.remove();
    });
  }

  if (document.body.classList.contains('roi-page')) return;
  document.body.classList.add('solarex-page-' + route);
  const map = {
    home:['SolarEX-Technology-SolarEX-Quartz-and-Titan-05-26-2026_03_29_PM.png','PV glass surface engineering','SolarEX turns site contamination into a Quartz or Titan decision route.','bars'],
    technology:['SolarEX-Technology-SolarEX-Quartz-and-Titan-05-26-2026_03_29_PM.png','Mechanism summary — Quartz vs Titan','One decision model separates passive SiO2 from active TiO2.','process'],
    quartz:['43d420f8-eddc-42d9-a9c9-fffdffe9dd58.png','SiO2 Quartz surface behavior','Passive SiO2 treatment supports reduced adhesion and easier surface recovery.','bars'],
    titan:['Photocatalyzis_02-v4.png','TiO2 photocatalytic mechanism','Titan uses UV-supported TiO2 chemistry and hydrophilic rinse behavior.','process','Photocatalyzis_01-v5.png'],
    projects:['SolarEX-Projects-Coating-Evidence-and-Pilot-Review-05-26-2026_03_30_PM.png','Evidence and pilot review','Proof blocks are separated by evidence class and pilot-readiness.','radial'],
    documentation:['SolarEX-Documentation-—-Technical-Files-Evidence-and-Application-Guidance-05-26-2026_03_35_PM.png','Technical files, evidence and application guidance','Documentation is routed by buyer role, pathway and project stage.','process'],
    faq:['pathway-selection-flow.svg','Question-to-pathway visual guide','FAQ answers route buyers from mechanism questions to site review.','bars'],
    contact:['SolarEX-Projects-Coating-Evidence-and-Pilot-Review-05-26-2026_03_30_PM.png','Request routing and response path','Technical, commercial and documentation requests are routed into clear next steps.','process'],
    'applications-pv-soiling-loss-mitigation':['592d3453-fede-4326-8b6a-e4d06156f93b.png','PV soiling loss profile','Soiling type determines Quartz, Titan or mixed pilot review.','bars'],
    'applications-anti-soiling-coating':['6acda610-eb05-4500-b844-5b1439afa690.png','Anti-soiling route comparison','Coating selection is mechanism-led, not generic.','process'],
    'applications-cleaning-cost-reduction':['49cf5c05-bc71-4802-b352-9cb720a3ad1b.png','Cleaning-cost stack','Water, labor, access and yield recovery drive the commercial screen.','bars'],
    'case-studies':['SolarEX-Projects-Coating-Evidence-and-Pilot-Review-05-26-2026_03_30_PM.png','Case-context evidence map','Method, result, limitation and next action stay attached.','radial'],
    markets:['cf95d05c-877b-4f47-a3fb-398dab8e9d7b.png','Regional market fit','Europe, Middle East/GCC and Nordics require different first-review routes.','radial'],
    'markets-europe':['c153eeb2-c1d2-4daa-bdc3-1b8b71a0cf0b.png','Europe operating context','Pollen, salt, grime and rainfall cycles support Quartz-first review.','bars'],
    'markets-middle-east':['606c77b9-22eb-4188-abb9-d3d91f85401a.png','GCC dust and water logistics','Dust, water constraints and cleaning frequency define the GCC value case.','process'],
    'markets-nordics':['9578b00e-53c3-4446-8f05-1a7e56628504.png','Nordic seasonal review','Lower UV, pollen, grime and rain cycles support UV-independent Quartz review.','bars'],
    partners:['adab2dea-31b6-4101-87bd-874d19a1a5a3.png','Partner enablement map','Qualified partners need route discipline, application support and evidence-led sales.','process']
  };
  const data = map[route] || map.home;
  document.body.style.setProperty('--solarex-hero-image', 'url("' + img(data[0]) + '")');
  document.body.style.setProperty('--solarex-breaker-image', 'linear-gradient(90deg, rgba(7,12,18,.76), rgba(7,12,18,.25)), url("' + img(data[0]) + '")');
  document.body.style.setProperty('--solarex-feature-image', 'url("' + img(data[4] || data[0]) + '")');
  const hero = document.querySelector('main .hero');
  if (!hero) return;
  const heroStats = hero.querySelector('.stats');
  if (heroStats) heroStats.remove();
  const cards = [['SiO2','Quartz','Passive easy-clean review for dust, pollen and mineral-dominated soiling.'],['TiO2','Titan','Active photocatalytic review for UV-supported organic and biological contamination.'],['ROI','Decision output','Site-fit pathway, pilot structure and commercial scenario screen.'],['QA','Evidence class','Monitored Study, Technical Parameter, ROI Scenario or Pilot Hypothesis.']];
  if (!document.querySelector('.solarex-outside-hero-strip')) {
    const strip = document.createElement('section');
    strip.className = 'solarex-outside-hero-strip reveal';
    strip.innerHTML = cards.map(c => '<article class="solarex-route-card"><strong>'+c[0]+'</strong><span>'+c[1]+'</span><p>'+c[2]+'</p></article>').join('');
    hero.insertAdjacentElement('afterend', strip);
  }
  const chart = data[3] === 'process' ? '<div class="solarex-process-chart"><div class="solarex-process-node"><strong>1. Input</strong><span>Site context</span></div><div class="solarex-process-node"><strong>2. Mechanism</strong><span>Quartz or Titan</span></div><div class="solarex-process-node"><strong>3. Pilot</strong><span>Treated/control</span></div><div class="solarex-process-node"><strong>4. Decision</strong><span>Scale-up route</span></div></div>' : data[3] === 'radial' ? '<div class="solarex-radial-chart"><span>Evidence</span><span>ROI</span><span>Pilot</span><span>Market</span></div>' : '<div class="solarex-chart-stack"><div class="solarex-chart-row"><div class="solarex-chart-label">Mechanism</div><div class="solarex-chart-track"><div class="solarex-chart-fill" style="--w:92%"></div></div></div><div class="solarex-chart-row"><div class="solarex-chart-label">Site fit</div><div class="solarex-chart-track"><div class="solarex-chart-fill" style="--w:78%"></div></div></div><div class="solarex-chart-row"><div class="solarex-chart-label">O&M value</div><div class="solarex-chart-track"><div class="solarex-chart-fill" style="--w:66%"></div></div></div><div class="solarex-chart-row"><div class="solarex-chart-label">Pilot ready</div><div class="solarex-chart-track"><div class="solarex-chart-fill" style="--w:86%"></div></div></div></div>';
  if (!document.querySelector('.solarex-visual-module')) {
    const mod = document.createElement('section');
    mod.className = 'solarex-visual-module reveal';
    mod.innerHTML = '<div class="solarex-visual-panel"><h2>'+data[1]+'</h2><p>'+data[2]+'</p><div class="solarex-feature-image" role="img" aria-label="'+data[1]+'" data-fallback="'+data[1]+'"></div></div><div class="solarex-chart-panel"><h2>Decision chart</h2><p>Route-specific visual summary with a layout selected for this page.</p>'+chart+'</div>';
    hero.nextElementSibling.insertAdjacentElement('afterend', mod);
  }
  if (!document.querySelector('.solarex-page-breaker')) {
    const breaker = document.createElement('section');
    breaker.className = 'solarex-page-breaker reveal';
    breaker.setAttribute('data-caption', data[2]);
    const target = document.querySelector('main .section:nth-of-type(4)') || document.querySelector('main .section:last-of-type') || hero;
    target.insertAdjacentElement('afterend', breaker);
  }
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); }), {threshold:.18});
  document.querySelectorAll('.solarex-visual-module,.solarex-chart-panel,.solarex-page-breaker,.solarex-outside-hero-strip').forEach(el => obs.observe(el));
});
