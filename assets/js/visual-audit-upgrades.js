(() => {
  const initVisualAuditUpgrades = () => {
    if (document.body.dataset.visualAuditReady === 'true') return;
    document.body.dataset.visualAuditReady = 'true';

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
    const routePath = routeParts.join('/').replace(/\/$/, '') || 'home';
    document.body.dataset.routePath = routePath;

    const main = document.querySelector('main');
    const hero = main?.querySelector('.hero');
    if (!main || !hero) return;

    const removeLegacyVisualSections = () => {
      document.querySelectorAll('.section').forEach((section) => {
        const kicker = section.querySelector('.kicker')?.textContent?.toLowerCase() || '';
        const heading = section.querySelector('h2')?.textContent?.toLowerCase() || '';
        if (
          kicker.includes('source visual') ||
          heading.includes('source visual') ||
          heading.includes('gamma') ||
          section.classList.contains('visual-audit-section')
        ) section.remove();
      });
    };

    const section = (html, extraClass = '') => {
      const node = document.createElement('section');
      node.className = `section visual-audit-section reveal ${extraClass}`.trim();
      node.innerHTML = html;
      return node;
    };

    const imageFigure = (src, alt, caption, w = 1200, h = 720, extra = '') => `
      <figure class="source-visual mechanism-visual visual-recommendation-figure ${extra}">
        <img src="${assetPath(src)}" alt="${alt}" width="${w}" height="${h}" loading="lazy">
        <figcaption class="visual-caption">${caption}</figcaption>
      </figure>`;

    const insertAfterHero = (node) => hero.insertAdjacentElement('afterend', node);
    const insertBeforeFinalCta = (node) => {
      const ctas = Array.from(main.querySelectorAll('.section .card.blue h2'));
      const final = ctas.reverse().find((h) => /request|start|choose|recommended/i.test(h.textContent || ''))?.closest('.section');
      if (final) final.insertAdjacentElement('beforebegin', node);
      else main.appendChild(node);
    };

    const chartBlock = (title, items) => `
      <div class="visual-chart-grid" aria-label="${title}">
        ${items.map((item) => `<article class="visual-chart-node"><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join('')}
      </div>`;

    const processRadar = () => `
      <div class="radial-process">
        <div class="radial-process-visual" aria-label="Application process radar"></div>
        <div class="radial-process-list">
          <article class="step-card"><h3>Site assessment</h3><p>Confirm location, soiling profile, access, glass condition and cleaning model.</p></article>
          <article class="step-card"><h3>Surface preparation</h3><p>Clean and prepare the glass before any coating route is applied.</p></article>
          <article class="step-card"><h3>Controlled application</h3><p>Apply the selected Quartz or Titan route according to pathway-specific instructions.</p></article>
          <article class="step-card"><h3>Cure / verify</h3><p>Let the surface set, then verify coverage and pilot-monitoring requirements.</p></article>
        </div>
      </div>`;

    const documentationBreaker = () => {
      const node = document.createElement('section');
      node.className = 'visual-page-breaker reveal is-visible';
      node.innerHTML = `
        <img class="page-breaker-image" src="${assetPath('assets/img/visual-system/solarex-documentation-breaker.svg')}" alt="Photorealistic-style PV glass close-up used as SolarEX documentation page breaker" width="1855" height="816" loading="lazy">
        <div class="page-breaker-caption"><div class="kicker">SolarEX Documentation</div><h2>Technical precision, claims discipline and structured evidence.</h2></div>`;
      return node;
    };

    removeLegacyVisualSections();

    if (routePath === 'home') {
      insertAfterHero(section(`
        <div class="container">
          <div class="kicker">Problem-to-pathway visual</div>
          <h2>From soiled PV glass to a qualified SolarEX route.</h2>
          <div class="media-split">
            ${imageFigure('assets/img/visual-system/solarex-hero-soiling-rinse.svg','PV glass soiling transitions into SolarEX route selection and treated surface recovery logic','Home keeps the primary route-selection visual. Other pages now use different mechanisms, workflows and evidence visuals to avoid repetition.',1400,860)}
            <div class="card blue"><h3>Dominant above-fold action</h3><p>Use the technical review as the primary sales path. The expected buyer output is a pathway recommendation, missing-data checklist and pilot/ROI next step.</p><a class="btn secondary" href="${relativePrefix}contact/#technical-form">Request site pathway review</a></div>
          </div>
        </div>`));
    }

    if (routePath === 'quartz') {
      insertAfterHero(section(`
        <div class="container"><div class="kicker">Quartz mechanism visual</div><h2>Passive SiO₂ easy-clean behavior with a dedicated Quartz visual.</h2><div class="media-split">
          ${imageFigure('assets/img/visual-system/quartz-sio2-attached-visual.svg','Passive SiO₂ easy-clean surface visual showing no UV required, hydrophobic oleophobic behavior and reduced adhesion','Quartz uses the attached SiO₂-style visual: passive surface architecture, water beading and reduced adhesion for dust/mineral-dominant contexts.',1600,900)}
          <div class="card"><h3>Quartz-specific chart layout</h3><p>This page no longer repeats the Home bar chart. The chart below uses a staggered decision layout aligned to Quartz selection factors.</p>${chartBlock('Quartz selection chart', [['No UV required','Route remains relevant in lower-UV regions.'], ['Mineral dust','Best first screen for dust, salt and inorganic particles.'], ['Easy recovery','Supports rain or cleaning-assisted release.'], ['O&M economics','Validate water, labor and cleaning interval inputs.']])}</div>
        </div></div>`));
    }

    if (routePath === 'titan') {
      insertAfterHero(section(`
        <div class="container"><div class="kicker">Titan mechanism visual</div><h2>Active TiO₂ photocatalysis with unique Titan visuals.</h2><div class="media-split">
          ${imageFigure('assets/img/visual-system/titan-photocatalysis-attached-visual.svg','Photocatalytic TiO₂ self-cleaning surface visual with UV, organic pollutants, CO₂, H₂O and hydrophilicity','Titan uses the attached photocatalysis-style visual: UV-supported active surface behavior, organic contaminant decomposition and hydrophilic rinse response.',1600,900)}
          ${imageFigure('assets/img/visual-system/titan-uv-optics-attached-visual.svg','TiO₂ optical surface comparison under UV radiation with scattering, reflection and absorption pathways','Secondary Titan visual: UV and optical-pathway explanation. It differentiates Titan from the Quartz easy-clean route.',1600,690)}
        </div>
        <div style="margin-top:22px">${imageFigure('assets/img/visual-system/titan-mechanism-summary-line.svg','Mechanism summary line showing TiO₂ nanoparticles, UV absorption, ROS generation, decomposition and rinse-off','Mechanism summary image placed on the Titan page where it supports the TiO₂ sequence most directly.',1200,330)}</div>
        </div>`));
    }

    if (routePath === 'technology') {
      insertAfterHero(section(`
        <div class="container"><div class="kicker">Technology comparison visual</div><h2>Separate Quartz and Titan before selecting a commercial route.</h2><p class="lead">This page now uses a different comparison layout from Home. The purpose is to explain mechanism separation, not reuse the same bar-chart visual.</p>
          ${imageFigure('assets/img/visual-system/solarex_technology_route_matrix.svg','SolarEX Quartz and Titan technology comparison matrix','Technology-specific route matrix: Quartz and Titan are distinct PV glass engineering routes selected by mechanism and site fit.',1200,720)}
          ${chartBlock('Technology comparison chart', [['Surface state','Quartz changes adhesion; Titan adds UV-triggered activity.'], ['Trigger dependency','Quartz is passive; Titan requires suitable UV.'], ['Contamination fit','Mineral/inorganic versus organic/biological priority.'], ['Evidence gate','Pilot design confirms site-specific suitability.']])}
        </div>`));
    }

    if (routePath === 'projects' || routePath === 'case-studies') {
      insertAfterHero(section(`
        <div class="container"><div class="kicker">Evidence and pilot visual</div><h2>Project evidence should read as controlled pilot logic.</h2>
          ${imageFigure('assets/img/visual-system/solarex_projects_pilot_review.svg','SolarEX projects coating evidence and pilot review workflow','Projects-specific pilot review visual: evidence, monitoring, control strings and commercial review are treated as one decision system.',1200,720)}
          ${chartBlock('Evidence review chart', [['Baseline','Capture pre-treatment operating condition.'], ['Control','Compare treated and untreated sections.'], ['Monitor','Track production, cleaning and weather context.'], ['Review','Classify result as scale, repeat or no-go.']])}
        </div>`));
    }

    if (routePath === 'applications/pv-soiling-loss-mitigation') {
      insertAfterHero(section(`<div class="container"><div class="kicker">Soiling taxonomy visual</div><h2>Identify the soiling class before selecting a route.</h2>${imageFigure('assets/img/visual-system/solarex_soiling_taxonomy_v01.svg','PV soiling taxonomy graphic with Quartz and Titan route tags','Soiling-class visual: mineral dust, salt/pollen, organic film and biological fouling require different route-selection logic.')}</div>`));
    }

    if (routePath === 'applications/anti-soiling-coating') {
      insertAfterHero(section(`<div class="container"><div class="kicker">Application workflow visual</div><h2>Anti-soiling performance depends on preparation, application and verification.</h2>${processRadar()}</div>`));
    }

    if (routePath === 'applications/cleaning-cost-reduction') {
      insertAfterHero(section(`<div class="container"><div class="kicker">Cleaning-cost visual</div><h2>Cleaning economics require water, labor, access and yield context.</h2>${imageFigure('assets/img/visual-system/solarex_cleaning_cost_waterfall_v01.svg','SolarEX cleaning cost waterfall visual showing water, labor, access, downtime, abrasion and yield recovery','Commercial visual: coating-assisted mitigation should be modelled with local O&amp;M inputs, not positioned as cleaning elimination.')}</div>`));
    }

    if (routePath === 'roi-calculator') {
      insertAfterHero(section(`<div class="container"><div class="kicker">ROI input-output visual</div><h2>Use the calculator as a screening model, then validate with pilot data.</h2>${chartBlock('ROI input chart', [['Coated area','m² and route-specific coverage assumptions.'], ['Energy value','Local currency, tariff and annual yield basis.'], ['O&M cost','Water, labor, access and cleaning interval inputs.'], ['Pilot proof','Treated/control monitoring before scale-up.']])}</div>`));
    }

    if (routePath === 'markets' || routePath === 'markets/europe' || routePath === 'markets/middle-east' || routePath === 'markets/nordics') {
      insertAfterHero(section(`<div class="container"><div class="kicker">Regional operating-context visual</div><h2>Regional context changes route selection and evidence framing.</h2>${imageFigure('assets/img/visual-system/solarex_regional_context_v01.svg','Regional operating context cards for Europe, Middle East/GCC and Nordics','Regional visual: Europe, Middle East/GCC and Nordics require different soiling, UV, water and pilot assumptions.')}</div>`));
    }

    if (routePath === 'partners') {
      insertAfterHero(section(`<div class="container"><div class="kicker">Partner enablement visual</div><h2>Partner execution requires controlled documentation and evidence packages.</h2>${imageFigure('assets/img/visual-system/solarex_partner_enablement_v01.svg','SolarEX partner enablement workflow for distributors, EPC installers and O and M providers','Enablement visual: partner channels need product-route documentation, pilot packages, application guidance and evidence controls.')}</div>`));
    }

    if (routePath === 'documentation') {
      insertAfterHero(documentationBreaker());
      insertAfterHero(section(`<div class="container"><div class="kicker">Documentation router visual</div><h2>Route each question to the correct document pack.</h2>${imageFigure('assets/img/diagrams/documentation-flow.svg','SolarEX documentation workflow from technical review to pilot support','Documentation visual: route buyer questions toward Quartz, Titan, ROI, pilot or application support files.')}</div>`));
    }

    if (routePath === 'faq') {
      insertAfterHero(section(`<div class="container"><div class="kicker">FAQ decision visual</div><h2>Answer fit questions through route logic.</h2>${imageFigure('assets/img/diagrams/faq-decision-tree.svg','SolarEX FAQ decision tree for Quartz SiO₂ and Titan TiO₂ selection','FAQ visual: UV availability, contamination type and cleaning objective should guide the answer before product selection.')}</div>`));
    }

    if (routePath === 'contact') {
      insertBeforeFinalCta(section(`
        <div class="container"><div class="kicker">Form confidence panel</div><h2>What happens after submission.</h2>${processRadar()}<div class="visual-warning" style="margin-top:20px"><strong>Privacy and confidence:</strong> share non-confidential project details first. Sensitive production data can be handled after direct follow-up. No obligation — technical screening only.</div></div>`));
    }

    document.querySelectorAll('.visual-audit-section,.visual-page-breaker').forEach((el) => el.classList.add('is-visible'));
    document.dispatchEvent(new CustomEvent('solarex:layout-changed'));
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initVisualAuditUpgrades, { once: true });
  else initVisualAuditUpgrades();
})();