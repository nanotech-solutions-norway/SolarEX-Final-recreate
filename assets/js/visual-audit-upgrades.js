(() => {
  const initVisualSiteAlignmentLoader = () => {
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
    document.body.dataset.visualPage = routePath.split('/')[0] || 'home';

    document.querySelectorAll('.visual-audit-section,.visual-page-breaker').forEach((node) => node.remove());

    if (!document.querySelector('script[data-solarex-site-visual-alignment]')) {
      const script = document.createElement('script');
      script.defer = true;
      script.src = assetPath('assets/js/visual-site-alignment.js?v=20260529-visual-instruction-alignment-1');
      script.setAttribute('data-solarex-site-visual-alignment', 'true');
      document.head.appendChild(script);
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initVisualSiteAlignmentLoader, { once: true });
  else initVisualSiteAlignmentLoader();
})();
