document.addEventListener('DOMContentLoaded', function () {
  if (document.body.classList.contains('roi-page')) return;
  var route = (document.body.dataset.routePath || 'home');
  var base = location.pathname.indexOf('/SolarEX-Final-recreate/') >= 0 ? '/SolarEX-Final-recreate/' : '../'.repeat(Math.max(location.pathname.split('/').filter(Boolean).length, 0));
  var img = function (name) { return base + 'assets/img/' + name; };
  var visualMap = {
    home: ['SolarEX-Technology-SolarEX-Quartz-and-Titan-05-26-2026_03_29_PM.png', 'bars'],
    technology: ['SolarEX-Technology-SolarEX-Quartz-and-Titan-05-26-2026_03_29_PM.png', 'process'],
    quartz: ['43d420f8-eddc-42d9-a9c9-fffdffe9dd58.png', 'matrix'],
    titan: ['Photocatalyzis_02-v4.png', 'timeline', 'Photocatalyzis_01-v5.png'],
    projects: ['SolarEX-Projects-Coating-Evidence-and-Pilot-Review-05-26-2026_03_30_PM.png', 'radial'],
    documentation: ['SolarEX-Documentation-—-Technical-Files-Evidence-and-Application-Guidance-05-26-2026_03_35_PM.png', 'process'],
    faq: ['pathway-selection-flow.svg', 'quadrant'],
    contact: ['SolarEX-Projects-Coating-Evidence-and-Pilot-Review-05-26-2026_03_30_PM.png', 'process'],
    'applications/pv-soiling-loss-mitigation': ['592d3453-fede-4326-8b6a-e4d06156f93b.png', 'bars'],
    'applications/anti-soiling-coating': ['6acda610-eb05-4500-b844-5b1439afa690.png', 'process'],
    'applications/cleaning-cost-reduction': ['49cf5c05-bc71-4802-b352-9cb720a3ad1b.png', 'wave'],
    'case-studies': ['SolarEX-Projects-Coating-Evidence-and-Pilot-Review-05-26-2026_03_30_PM.png', 'radial'],
    markets: ['cf95d05c-877b-4f47-a3fb-398dab8e9d7b.png', 'radial'],
    'markets/europe': ['c153eeb2-c1d2-4daa-bdc3-1b8b71a0cf0b.png', 'bars'],
    'markets/middle-east': ['606c77b9-22eb-4188-abb9-d3d91f85401a.png', 'process'],
    'markets/nordics': ['9578b00e-53c3-4446-8f05-1a7e56628504.png', 'matrix'],
    partners: ['adab2dea-31b6-4101-87bd-874d19a1a5a3.png', 'timeline']
  };
  var data = visualMap[route] || visualMap[route.replace(/-/g, '/')] || visualMap.home;
  document.body.style.setProperty('--solarex-hero-image', 'url("' + img(data[0]) + '")');
  document.body.style.setProperty('--solarex-breaker-image', 'linear-gradient(90deg, rgba(7,12,18,.78), rgba(7,12,18,.24)), url("' + img(data[0]) + '")');
  document.body.style.setProperty('--solarex-feature-image', 'url("' + img(data[2] || data[0]) + '")');
  function chartHtml(type) {
    if (type === 'matrix') return '<div class="solarex-matrix-chart"><div class="solarex-matrix-cell"><strong>Surface</strong><span>Adhesion control</span></div><div class="solarex-matrix-cell"><strong>Trigger</strong><span>UV independent</span></div><div class="solarex-matrix-cell"><strong>Soiling</strong><span>Mineral / pollen</span></div><div class="solarex-matrix-cell"><strong>Output</strong><span>Cleaning recovery</span></div></div>';
    if (type === 'timeline') return '<div class="solarex-timeline-chart"><div class="solarex-timeline-step"><strong>UV</strong><span>Activation</span></div><div class="solarex-timeline-step"><strong>TiO2</strong><span>Photocatalysis</span></div><div class="solarex-timeline-step"><strong>Surface</strong><span>Rinse behavior</span></div><div class="solarex-timeline-step"><strong>Pilot</strong><span>Monitoring</span></div></div>';
    if (type === 'quadrant') return '<div class="solarex-quadrant-chart"><div><strong>Quartz</strong><span>Passive route</span></div><div><strong>Titan</strong><span>Active route</span></div><div><strong>Evidence</strong><span>Proof class</span></div><div><strong>Review</strong><span>Site fit</span></div></div>';
    if (type === 'wave') return '<div class="solarex-wave-chart"><i style="--h:42%"></i><i style="--h:68%"></i><i style="--h:54%"></i><i style="--h:84%"></i><i style="--h:61%"></i><i style="--h:74%"></i></div>';
    return null;
  }
  var replacement = chartHtml(data[1]);
  if (replacement) {
    document.querySelectorAll('.solarex-chart-panel').forEach(function (panel) {
      var old = panel.querySelector('.solarex-chart-stack,.solarex-process-chart,.solarex-radial-chart,.solarex-matrix-chart,.solarex-timeline-chart,.solarex-quadrant-chart,.solarex-wave-chart');
      if (old) old.outerHTML = replacement;
    });
  }
  document.querySelectorAll('.solarex-outside-hero-strip').forEach(function (strip) {
    var hero = document.querySelector('main .hero');
    if (hero && strip.compareDocumentPosition(hero) & Node.DOCUMENT_POSITION_FOLLOWING) return;
    if (hero) hero.insertAdjacentElement('afterend', strip);
  });
});
