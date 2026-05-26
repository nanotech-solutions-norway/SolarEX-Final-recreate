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
    const main = document.querySelector('main');
    const hero = main?.querySelector('.hero');
    if (!main || !hero) return;

    const removeSourceVisualSections = () => {
      document.querySelectorAll('.section').forEach((section) => {
        const kicker = section.querySelector('.kicker')?.textContent?.toLowerCase() || '';
        const heading = section.querySelector('h2')?.textContent?.toLowerCase() || '';
        if (kicker.includes('source visual') || heading.includes('source visual') || heading.includes('gamma')) section.remove();
      });
    };

    const section = (html) => {
      const node = document.createElement('section');
      node.className = 'section visual-audit-section reveal';
      node.innerHTML = html;
      return node;
    };

    const imageFigure = (src, alt, caption, w = 1200, h = 720) => `
      <figure class="source-visual mechanism-visual visual-recommendation-figure">
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

    removeSourceVisualSections();

    if (routePath === 'home') {
      insertAfterHero(section(`
        <div class="container">
          <div class="kicker">Problem-to-pathway visual</div>
          <h2>From soiled PV glass to a qualified SolarEX route.</h2>
          <div class="media-split">
            ${imageFigure('assets/img/visual-system/solarex-hero-soiling-rinse.svg','PV glass soiling transitions into SolarEX route selection and treated surface recovery logic','Visual role: connect the buyer problem to the next action. SolarEX first reviews site soiling, then routes the project to Quartz SiO₂, Titan TiO₂, mixed review, further testing or no-go.',1400,860)}
            <div class="card blue"><h3>Dominant above-fold action</h3><p>Use the technical review as the primary sales path. The expected buyer output is a pathway recommendation, missing-data checklist and pilot/ROI next step.</p><a class="btn secondary" href="${relativePrefix}contact/#technical-form">Request site pathway review</a></div>
          </div>
        </div>`));
    }

    if (routePath === 'quartz') {
      insertAfterHero(section(`
        <div class="container"><div class="kicker">Quartz mechanism visual</div><h2>Passive SiO₂ easy-clean behavior, shown as a buyer-readable mechanism.</h2><div class="media-split">
          ${imageFigure('assets/img/visual-system/quartz-easy-clean-mechanism.svg','SolarEX Quartz SiO₂ passive easy-clean mechanism with water beading and reduced contaminant adhesion','Quartz visual summary: UV-independent SiO₂ surface architecture supports reduced contaminant adhesion and easier cleaning. It does not remove the need for O&amp;M.')}
          ${imageFigure('assets/img/visual-system/quartz-roi-responsive-chart.svg','Quartz Europe ROI scenario chart with approximate 147 day payback point under source assumptions','ROI visual summary: indicative scenario under source assumptions. Confirm with treated/control monitoring and local O&amp;M economics.')}
        </div></div>`));
    }

    if (routePath === 'titan') {
      insertAfterHero(section(`
        <div class="container"><div class="kicker">Titan mechanism visual</div><h2>Active TiO₂ photocatalysis requires suitable UV exposure.</h2><div class="media-split">
          ${imageFigure('assets/img/visual-system/titan-photocatalysis-mechanism.svg','SolarEX Titan TiO₂ four step mechanism: UV exposure, ROS formation, organic decomposition and hydrophilic rinse','Titan visual summary: Titan is the active route for UV-supported organic, biological and atmospheric contamination control.')}
          <div class="visual-warning"><h3>UV suitability warning</h3><p>Titan should not be selected as a generic replacement for Quartz. If UV availability is low or mineral dust dominates, route the project to Quartz or further technical review.</p><a class="btn secondary" href="${relativePrefix}technology/">Open pathway selector</a></div>
        </div></div>`));
    }

    if (routePath === 'technology') {
      insertAfterHero(section(`
        <div class="container"><div class="kicker">Visual pathway selector</div><h2>Screen the route before a commercial commitment.</h2><p class="lead">This selector is a visual qualification aid. It shows how UV, contamination, region and O&amp;M objective drive the first SolarEX recommendation.</p>
          ${imageFigure('assets/img/diagrams/pathway-selection-flow.svg','SolarEX Quartz and Titan pathway selector with route-assessment summary','Decision-support visual: Quartz and Titan are separated by UV dependency, contamination profile and evidence-gate logic.')}
          <div class="selector-grid" style="margin-top:18px"><div class="selector-card"><h3>1. UV level</h3><p>Low / seasonal UV favors Quartz. Stable UV can support Titan review.</p></div><div class="selector-card"><h3>2. Contamination</h3><p>Mineral dust and salt favor Quartz. Organic and biological films may favor Titan.</p></div><div class="selector-card"><h3>3. Cleaning objective</h3><p>Cleaning burden, water use and abrasion risk shape pilot design.</p></div><div class="selector-card"><h3>4. Region</h3><p>Nordics, Europe, Middle East and high-UV sites require different evidence framing.</p></div></div>
          <div class="selector-output"><h3>Output: Quartz, Titan, mixed review or insufficient data</h3><p>The recommended next step is a technical review with site photos, soiling profile, UV context, cleaning logs and ROI assumptions.</p><a class="btn secondary" href="${relativePrefix}contact/#technical-form">Request pathway review</a></div>
        </div>`));
    }

    if (routePath === 'projects' || routePath === 'case-studies') {
      insertAfterHero(section(`
        <div class="container"><div class="kicker">Evidence visual system</div><h2>Evidence should read as controlled pilot logic, not isolated values.</h2>
          ${imageFigure('assets/img/visual-system/solarex_pilot_validation_model_v01.svg','SolarEX pilot validation model with treated and control strings, monitoring and ROI decision output','Pilot-design visual: source/study context, matched controls, cleaning logs and commercial review must remain attached to claims.')}
          <div class="grid three" style="margin-top:18px"><article class="card blue"><h3>Titan PV³ study</h3><p><strong>Pathway:</strong> Titan TiO₂. <strong>Method:</strong> 63 coated modules, 360 monitored days, 15-minute data. <strong>Result:</strong> +5.15% average uplift in context. <strong>Limitation:</strong> site-specific UV and contamination fit required.</p><a class="btn secondary" href="${relativePrefix}contact/#technical-form">Request comparable pilot</a></article><article class="card"><h3>Quartz Europe ROI scenario</h3><p><strong>Pathway:</strong> Quartz SiO₂. <strong>Method:</strong> scenario model. <strong>Result:</strong> ~147-day payback under source assumptions. <strong>Limitation:</strong> confirm with local O&amp;M economics.</p><a class="btn secondary" href="${relativePrefix}roi-calculator/">Start ROI screen</a></article><article class="card"><h3>Middle East dust / water logic</h3><p><strong>Pathway:</strong> Quartz-first review. <strong>Context:</strong> high dust, high irradiation, water constraints. <strong>Next step:</strong> treated/control pilot and cleaning-log validation.</p><a class="btn secondary" href="${relativePrefix}contact/#technical-form">Request regional pilot</a></article></div>
        </div>`));
    }

    if (routePath === 'applications/pv-soiling-loss-mitigation') {
      insertAfterHero(section(`<div class="container"><div class="kicker">Soiling taxonomy visual</div><h2>Identify the soiling class before selecting a route.</h2>${imageFigure('assets/img/visual-system/solarex_soiling_taxonomy_v01.svg','PV soiling taxonomy graphic with Quartz and Titan route tags','Soiling-class visual: mineral dust, salt/pollen, organic film and biological fouling require different route-selection logic.')}</div>`));
    }

    if (routePath === 'applications/anti-soiling-coating') {
      insertAfterHero(section(`<div class="container"><div class="kicker">Anti-soiling decision visual</div><h2>SolarEX is a two-route anti-soiling platform.</h2>${imageFigure('assets/img/diagrams/pathway-selection-flow.svg','SolarEX anti-soiling route selector comparing Quartz SiO₂ and Titan TiO₂','Comparison visual: Quartz and Titan are not interchangeable; route selection depends on mechanism and site context.')}</div>`));
    }

    if (routePath === 'applications/cleaning-cost-reduction') {
      insertAfterHero(section(`<div class="container"><div class="kicker">Cleaning-cost visual</div><h2>Cleaning economics require water, labor, access and yield context.</h2>${imageFigure('assets/img/visual-system/solarex_cleaning_cost_waterfall_v01.svg','SolarEX cleaning cost waterfall visual showing water, labor, access, downtime, abrasion and yield recovery','Commercial visual: coating-assisted mitigation should be modelled with local O&amp;M inputs, not positioned as cleaning elimination.')}</div>`));
    }

    if (routePath === 'roi-calculator') {
      insertAfterHero(section(`<div class="container"><div class="kicker">ROI input-output visual</div><h2>Use the calculator as a screening model, then validate with pilot data.</h2>${imageFigure('assets/img/visual-system/solarex_cleaning_cost_waterfall_v01.svg','SolarEX ROI input-output model for cleaning cost and yield recovery assumptions','ROI visual: water, labor, access and energy value are commercial inputs that require local validation.')}</div>`));
    }

    if (routePath === 'markets' || routePath === 'markets/europe' || routePath === 'markets/middle-east' || routePath === 'markets/nordics') {
      insertAfterHero(section(`<div class="container"><div class="kicker">Regional operating-context visual</div><h2>Regional context changes route selection and evidence framing.</h2>${imageFigure('assets/img/visual-system/solarex_regional_context_v01.svg','Regional operating context cards for Europe, Middle East/GCC and Nordics','Regional visual: Europe, Middle East/GCC and Nordics require different soiling, UV, water and pilot assumptions.')}</div>`));
    }

    if (routePath === 'partners') {
      insertAfterHero(section(`<div class="container"><div class="kicker">Partner enablement visual</div><h2>Partner execution requires controlled documentation and evidence packages.</h2>${imageFigure('assets/img/visual-system/solarex_partner_enablement_v01.svg','SolarEX partner enablement workflow for distributors, EPC installers and O and M providers','Enablement visual: partner channels need product-route documentation, pilot packages, application guidance and evidence controls.')}</div>`));
    }

    if (routePath === 'documentation') {
      insertAfterHero(section(`<div class="container"><div class="kicker">Documentation router visual</div><h2>Route each question to the correct document pack.</h2>${imageFigure('assets/img/diagrams/documentation-flow.svg','SolarEX documentation workflow from technical review to pilot support','Documentation visual: route buyer questions toward Quartz, Titan, ROI, pilot or application support files.')}</div>`));
    }

    if (routePath === 'faq') {
      insertAfterHero(section(`<div class="container"><div class="kicker">FAQ decision visual</div><h2>Answer fit questions through route logic.</h2>${imageFigure('assets/img/diagrams/faq-decision-tree.svg','SolarEX FAQ decision tree for Quartz SiO₂ and Titan TiO₂ selection','FAQ visual: UV availability, contamination type and cleaning objective should guide the answer before product selection.')}</div>`));
    }

    if (routePath === 'contact') {
      insertBeforeFinalCta(section(`
        <div class="container"><div class="kicker">Form confidence panel</div><h2>What happens after submission.</h2><div class="grid four"><article class="card blue"><h3>1. Intake review</h3><p>SolarEX screens location, UV context, contamination profile, scale and objective.</p></article><article class="card"><h3>2. Data request</h3><p>Missing site photos, cleaning logs, production data or module layout are identified.</p></article><article class="card"><h3>3. Pathway output</h3><p>Quartz, Titan, mixed review, further testing or no-go is recommended.</p></article><article class="card"><h3>4. Next step</h3><p>Documentation pack, ROI screen, pilot design or commercial follow-up is proposed.</p></article></div><div class="visual-warning" style="margin-top:20px"><strong>Privacy and confidence:</strong> share non-confidential project details first. Sensitive production data can be handled after direct follow-up. No obligation — technical screening only.</div></div>`));
    }

    document.querySelectorAll('.visual-audit-section').forEach((el) => el.classList.add('is-visible'));
    document.dispatchEvent(new CustomEvent('solarex:layout-changed'));
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initVisualAuditUpgrades, { once: true });
  else initVisualAuditUpgrades();
})();