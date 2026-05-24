(() => {
  const initDriverBarClarity = () => {
    if (document.body.dataset.driverBarClarityReady === 'true') return;
    document.body.dataset.driverBarClarityReady = 'true';

    const routeParts = window.location.pathname.split('/').filter(Boolean);
    const repoName = 'SolarEX-Final-recreate';
    const repoIndex = routeParts.indexOf(repoName);
    const pageParts = repoIndex >= 0 ? routeParts.slice(repoIndex + 1) : routeParts;
    const routePath = pageParts.join('/').replace(/\/$/, '') || 'home';
    const page = ['quartz','titan','technology','projects','documentation','faq','contact'].includes(routePath) ? routePath : 'home';

    const sets = {
      home: [
        ['Soiling adhesion relevance','How much contaminant adhesion and cleaning recovery drive pathway choice.',72,'High'],
        ['UV activation relevance','How much the route depends on UV as an active mechanism.',52,'Medium'],
        ['Pilot validation relevance','How important treated/control validation is before scale-up.',76,'High'],
        ['Rain / rinse relevance','How much natural rinse behavior supports the selected pathway.',64,'Medium'],
        ['Organic fouling relevance','How strongly organic or biological contamination affects route selection.',42,'Selective']
      ],
      quartz: [
        ['Dust / mineral adhesion relevance','Quartz is mainly selected where passive SiO₂ reduces adhesion and supports easier cleaning.',86,'Very high'],
        ['UV activation relevance','Quartz is UV-independent; UV is not a core activation requirement.',8,'Low'],
        ['Pilot validation relevance','Pilot review is useful when project scale, ROI or claims require local confirmation.',68,'Medium-high'],
        ['Water / rinse relevance','Water or rain can support cleaning recovery, but Quartz does not rely on UV-triggered hydrophilicity.',56,'Medium'],
        ['Organic fouling relevance','Quartz can help easy-clean behavior, but organic decomposition is not its main mechanism.',34,'Low-medium']
      ],
      titan: [
        ['Surface adhesion relevance','Titan still benefits from surface-condition control, but adhesion reduction is not the only selection driver.',58,'Medium'],
        ['UV activation relevance','Titan requires sufficient UV exposure for TiO₂ photocatalytic activity.',90,'Very high'],
        ['Pilot validation relevance','UV, organic fouling and rinse behavior should be validated against local conditions.',82,'High'],
        ['Water / rinse relevance','Titan is selected where hydrophilic rinse behavior can support contaminant removal.',84,'High'],
        ['Organic fouling relevance','Titan is strongest where organic, biological or atmospheric fouling is material.',88,'Very high']
      ],
      technology: [
        ['Contamination-profile relevance','The soiling profile is the main input for Quartz vs Titan selection.',84,'High'],
        ['UV availability relevance','UV availability decides whether Titan is technically suitable.',78,'High'],
        ['Pilot validation relevance','The more commercial risk involved, the more local validation matters.',76,'High'],
        ['Cleaning-method relevance','Water, brush, rinse and O&M access affect practical route fit.',66,'Medium-high'],
        ['Organic fouling relevance','Organic fouling shifts the decision toward Titan only where UV conditions support it.',62,'Medium-high']
      ],
      projects: [
        ['Baseline-data relevance','Evidence quality depends on clear baseline yield and site conditions.',86,'Very high'],
        ['Matched-control relevance','Treated/control comparison is central to interpreting results.',88,'Very high'],
        ['Pilot validation relevance','Projects should be read as site-context evidence, not universal proof.',92,'Very high'],
        ['O&M-log relevance','Cleaning events and maintenance records explain observed changes.',76,'High'],
        ['ROI-context relevance','Commercial interpretation depends on energy value, coating area and asset economics.',80,'High']
      ],
      documentation: [
        ['Application-data relevance','Surface preparation, coverage and curing data determine correct use.',78,'High'],
        ['Route-selection relevance','Documents should clarify whether Quartz or Titan is technically appropriate.',74,'High'],
        ['Pilot validation relevance','Documentation should support baseline, control and monitoring plans.',70,'Medium-high'],
        ['Claims-control relevance','File sets must separate technical parameters from commercial scenarios.',82,'High'],
        ['Commercial-review relevance','Buyers need documents that support procurement and pilot decisions.',76,'High']
      ],
      faq: [
        ['Selection-question relevance','Most FAQ value comes from helping users choose Quartz, Titan or pilot review.',82,'High'],
        ['UV-question relevance','UV dependency is a key FAQ distinction between Quartz and Titan.',76,'High'],
        ['Evidence-question relevance','Users need clarity on which results are study data, scenarios or pilot hypotheses.',78,'High'],
        ['Application-question relevance','Application and maintenance questions affect buyer confidence.',68,'Medium-high'],
        ['ROI-question relevance','Commercial users need a fast path from FAQ to ROI calculation.',72,'High']
      ],
      contact: [
        ['Technical-review relevance','The form should capture enough site data to select Quartz, Titan or pilot review.',84,'High'],
        ['Commercial-review relevance','ROI, project scale and procurement context drive follow-up quality.',80,'High'],
        ['Documentation relevance','Document requests should identify correct product and project context.',72,'High'],
        ['Pilot-data relevance','Baseline, control and monitoring inputs improve response quality.',76,'High'],
        ['ROI-screening relevance','Calculator results help qualify commercial discussions before review.',78,'High']
      ]
    };

    const updateCharts = () => {
      document.querySelectorAll('.chart-card').forEach((card) => {
        const title = card.querySelector('h3')?.textContent?.trim().toLowerCase() || '';
        if (!title.includes('pathway suitability drivers') || card.dataset.driverClarityApplied === 'true') return;
        card.dataset.driverClarityApplied = 'true';
        card.setAttribute('aria-label','Open SolarEX route-selection driver chart');
        const rows = sets[page] || sets.home;
        const h3 = card.querySelector('h3');
        h3.textContent = page === 'quartz' ? 'Quartz route-selection drivers' : page === 'titan' ? 'Titan route-selection drivers' : 'Route-selection driver relevance';
        const note = document.createElement('p');
        note.className = 'driver-chart-note';
        note.textContent = 'Bars show how strongly each factor should influence SolarEX route selection for this page context. They are qualitative suitability scores, not energy-yield or coating-performance claims.';
        h3.insertAdjacentElement('afterend', note);
        const scale = document.createElement('div');
        scale.className = 'driver-scale';
        scale.innerHTML = '<span>Low</span><span>Medium</span><span>High</span>';
        note.insertAdjacentElement('afterend', scale);
        card.querySelectorAll('.chart-row').forEach((row) => row.remove());
        rows.forEach(([label, desc, width, score]) => {
          const row = document.createElement('div');
          row.className = 'driver-row';
          row.innerHTML = `<div class="driver-copy"><strong>${label}</strong><small>${desc}</small></div><i class="chart-track"><b class="chart-bar" style="--bar-width:${width}%"></b></i><span class="driver-score">${score}</span>`;
          card.appendChild(row);
        });
        const legend = document.createElement('div');
        legend.className = 'driver-legend';
        legend.innerHTML = '<strong>Interpretation:</strong> higher bars mean the factor is more important for choosing the SolarEX route on this page. They do not represent guaranteed output increase, cleaning reduction or lifetime performance.';
        card.appendChild(legend);
      });
    };

    updateCharts();
    new MutationObserver(updateCharts).observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initDriverBarClarity, { once: true });
  else initDriverBarClarity();
})();
