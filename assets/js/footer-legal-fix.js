// SolarEX footer admin-link injector and footer legal utility.
// This file is loaded by assets/js/main.js.
document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('.site-footer, footer');
  if (!footer || footer.querySelector('.solarex-footer-admin-link')) return;

  const link = document.createElement('a');
  link.className = 'solarex-footer-admin-link';
  link.href = 'https://forms.nanotech-solutions.com/solarex_admin/login.php';
  link.rel = 'nofollow noopener';
  link.setAttribute('aria-label', 'SolarEX admin login');
  link.textContent = 'Admin';

  const target = footer.querySelector('.footer-grid > div:last-child') || footer;
  target.appendChild(link);

  const style = document.createElement('style');
  style.setAttribute('data-solarex-footer-admin-link', 'true');
  style.textContent = `
    .solarex-footer-admin-link{
      display:inline-block;
      margin-top:.85rem;
      font-size:.72rem;
      line-height:1;
      opacity:.38;
      color:inherit;
      text-decoration:none;
    }
    .solarex-footer-admin-link:hover,
    .solarex-footer-admin-link:focus{
      opacity:.86;
      text-decoration:underline;
    }
  `;
  document.head.appendChild(style);
});
