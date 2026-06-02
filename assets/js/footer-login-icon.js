(() => {
  const init = () => {
    if (document.body.dataset.footerLoginIconReady === 'true') return;
    document.body.dataset.footerLoginIconReady = 'true';
    const loginHref = 'https://forms.nanotech-solutions.com/solarex_admin/';
    const iconSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/></svg><span>Admin login</span>';
    document.querySelectorAll('.site-footer').forEach((footer) => {
      if (footer.querySelector('.footer-login-icon')) return;
      const row = document.createElement('div');
      row.className = 'footer-login-row';
      const link = document.createElement('a');
      link.className = 'footer-login-icon';
      link.href = loginHref;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'SolarEX admin login');
      link.title = 'Admin login';
      link.innerHTML = iconSvg;
      row.appendChild(link);
      footer.appendChild(row);
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
