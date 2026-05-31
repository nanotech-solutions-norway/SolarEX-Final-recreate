(() => {
  const init = () => {
    if (document.body.dataset.visualAuditReady === 'true') return;
    document.body.dataset.visualAuditReady = 'true';
    document.querySelectorAll('.visual-audit-section,.visual-page-breaker').forEach((node) => node.remove());
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
