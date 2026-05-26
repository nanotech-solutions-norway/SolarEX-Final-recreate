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
        if (kicker.includes('source visual') || heading.includes('source visual') || heading.includes('gamma')) {
          section.remove();
        }
      });
    };

    const section = (html) => {
      const node = document.createElement('section');
      node.className = 'section visual-audit-section reveal';
      node.innerHTML = html;
      return node;
    };

    const insertAfterHero = (node) => hero.insertAdjacentElement('afterend', node);
    const insertBeforeFinalCta = (node) => {
      const ctas = Array.from(main.querySelectorAll('.section .card.blue h2'));
      const final = ctas.reverse().find((h) => /request|start|choose/i.test(h.textContent || ''))?.closest('.section');
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
            <figure class="source-visual mechanism-visual">
              <img src="${assetPath('assets/img/visual-system/solarex-hero-soiling-rinse.svg')}" alt="PV glass soiling transitions into SolarEX route selection and treated surface recovery logic" width="1400" height="860" loading="eager">
              <figcaption class="visual-caption">Visual role: connect the buyer problem to the next action. SolarEX first reviews site soiling, then routes the project to Quartz SiO₂, Titan TiO₂, mixed review, further testing or no-go.</figcaption>
            </figure>
            <div class="card blue">
              <h3>Dominant above-fold action</h3>
              <p>Use the technical review as the primary sales path. The expected buyer output is a pathway recommendation, missing-data checklist and pilot/ROI next step.</p>
              <a class="btn secondary" href="${relativePrefix}contact/#technical-form">Request site pathway review</a>
            </div>
          </div>
        </div>`));
    }

    if (routePath === 'quartz') {
      insertAfterHero(section(`
        <div class="container">
          <div class="kicker">Quartz mechanism visual</div>
          <h2>Passive SiO₂ easy-clean behavior, shown as a buyer-readable mechanism.</h2>
          <div class="media-split">
            <figure class="source-visual mechanism-visual">
              <img src="${assetPath('assets/img/visual-system/quartz-easy-clean-mechanism.svg')}" alt="SolarEX Quartz SiO₂ passive easy-clean mechanism with water beading and reduced contaminant adhesion" width="1200" height="720" loading="lazy">
              <figcaption class="visual-caption">Quartz visual summary: UV-independent SiO₂ surface architecture supports reduced contaminant adhesion and easier cleaning. It does not remove the need for O&amp;M.</figcaption>
            </figure>
            <figure class="source-visual responsive-chart">
              <img src="${assetPath('assets/img/visual-system/quartz-roi-responsive-chart.svg')}" alt="Quartz Europe ROI scenario chart with approximate 147 day payback point under source assumptions" width="1200" height="720" loading="lazy">
              <figcaption class="visual-caption">ROI visual summary: the chart is an indicative scenario under source assumptions. Confirm with treated/control monitoring and local O&amp;M economics.</figcaption>
            </figure>
          </div>
        </div>`));
    }

    if (routePath === 'titan') {
      insertAfterHero(section(`
        <div class="container">
          <div class="kicker">Titan mechanism visual</div>
          <h2>Active TiO₂ photocatalysis requires suitable UV exposure.</h2>
          <div class="media-split">
            <figure class="source-visual mechanism-visual">
              <img src="${assetPath('assets/img/visual-system/titan-photocatalysis-mechanism.svg')}" alt="SolarEX Titan TiO₂ four step mechanism: UV exposure, ROS formation, organic decomposition and hydrophilic rinse" width="1200" height="720" loading="lazy">
              <figcaption class="visual-caption">Titan visual summary: Titan is the active route for UV-supported organic, biological and atmospheric contamination control.</figcaption>
            </figure>
            <div class="visual-warning">
              <h3>UV suitability warning</h3>
              <p>Titan should not be selected as a generic replacement for Quartz. If UV availability is low or mineral dust dominates, route the project to Quartz or further technical review.</p>
              <a class="btn secondary" href="${relativePrefix}technology/">Open pathway selector</a>
            </div>
          </div>
        </div>`));
    }

    if (routePath === 'technology') {
      insertAfterHero(section(`
        <div class="container">
          <div class="kicker">Visual pathway selector</div>
          <h2>Screen the route before a commercial commitment.</h2>
          <p class="lead">This selector is a visual qualification aid. It does not replace technical review, but it shows how UV, contamination, region and O&amp;M objective drive the first SolarEX recommendation.</p>
          <div class="selector-grid">
            <div class="selector-card"><h3>1. UV level</h3><p>Low / seasonal UV favors Quartz. Stable UV can support Titan review.</p></div>
            <div class="selector-card"><h3>2. Contamination</h3><p>Mineral dust and salt favor Quartz. Organic and biological films may favor Titan.</p></div>
            <div class="selector-card"><h3>3. Cleaning objective</h3><p>Cleaning burden, water use and abrasion risk shape pilot design.</p></div>
            <div class="selector-card"><h3>4. Region</h3><p>Nordics, Europe, Middle East and high-UV sites require different evidence framing.</p></div>
          </div>
          <div class="selector-output"><h3>Output: Quartz, Titan, mixed review or insufficient data</h3><p>The recommended next step is a technical review with site photos, soiling profile, UV context, cleaning logs and ROI assumptions.</p><a class="btn secondary" href="${relativePrefix}contact/#technical-form">Request pathway review</a></div>
        </div>`));
    }

    if (routePath === 'projects') {
      insertAfterHero(section(`
        <div class="container">
          <div class="kicker">Case-study visual system</div>
          <h2>Evidence should read as case-study logic, not isolated values.</h2>
          <div class="grid three">
            <article class="card blue"><h3>Titan PV³ study</h3><p><strong>Pathway:</strong> Titan TiO₂. <strong>Method:</strong> 63 coated modules, 360 monitored days, 15-minute data. <strong>Result:</strong> +5.15% average uplift in context. <strong>Limitation:</strong> site-specific UV and contamination fit required.</p><a class="btn secondary" href="${relativePrefix}contact/#technical-form">Request comparable pilot</a></article>
            <article class="card"><h3>Quartz Europe ROI scenario</h3><p><strong>Pathway:</strong> Quartz SiO₂. <strong>Method:</strong> scenario model. <strong>Result:</strong> ~147-day payback under source assumptions. <strong>Limitation:</strong> confirm with local O&amp;M economics.</p><a class="btn secondary" href="${relativePrefix}roi-calculator/">Start ROI screen</a></article>
            <article class="card"><h3>Middle East dust / water logic</h3><p><strong>Pathway:</strong> Quartz-first review. <strong>Context:</strong> high dust, high irradiation, water constraints. <strong>Next step:</strong> treated/control pilot and cleaning-log validation.</p><a class="btn secondary" href="${relativePrefix}contact/#technical-form">Request regional pilot</a></article>
          </div>
        </div>`));
    }

    if (routePath === 'contact') {
      insertBeforeFinalCta(section(`
        <div class="container">
          <div class="kicker">Form confidence panel</div>
          <h2>What happens after submission.</h2>
          <div class="grid four">
            <article class="card blue"><h3>1. Intake review</h3><p>SolarEX screens location, UV context, contamination profile, scale and objective.</p></article>
            <article class="card"><h3>2. Data request</h3><p>Missing site photos, cleaning logs, production data or module layout are identified.</p></article>
            <article class="card"><h3>3. Pathway output</h3><p>Quartz, Titan, mixed review, further testing or no-go is recommended.</p></article>
            <article class="card"><h3>4. Next step</h3><p>Documentation pack, ROI screen, pilot design or commercial follow-up is proposed.</p></article>
          </div>
          <div class="visual-warning" style="margin-top:20px"><strong>Privacy and confidence:</strong> share non-confidential project details first. Sensitive production data can be handled after direct follow-up. No obligation — technical screening only.</div>
        </div>`));
    }

    document.querySelectorAll('.visual-audit-section').forEach((el) => el.classList.add('is-visible'));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVisualAuditUpgrades, { once: true });
  } else {
    initVisualAuditUpgrades();
  }
})();
