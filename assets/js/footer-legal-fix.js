// SolarEX footer admin-login icon injector and footer legal utility.
// This file is loaded by assets/js/main.js.
document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('.site-footer, footer');
  if (!footer || footer.querySelector('.solarex-footer-admin-link')) return;

  const link = document.createElement('a');
  link.className = 'solarex-footer-admin-link';
  link.href = 'https://forms.nanotech-solutions.com/solarex_admin/login.php';
  link.rel = 'nofollow noopener';
  link.setAttribute('aria-label', 'SolarEX admin login');
  link.setAttribute('title', 'Admin login');
  link.innerHTML = `
    <svg class="solarex-footer-admin-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 0 1 6 0v3H9Zm3 4.25a1.75 1.75 0 0 1 1 3.19V19h-2v-1.56a1.75 1.75 0 0 1 1-3.19Z"/>
    </svg>
  `;

  const target = footer.querySelector('.footer-grid > div:last-child') || footer;
  target.appendChild(link);

  const style = document.createElement('style');
  style.setAttribute('data-solarex-footer-admin-link', 'true');
  style.textContent = `
    .solarex-footer-admin-link{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      width:1.65rem;
      height:1.65rem;
      margin-top:.85rem;
      border-radius:999px;
      opacity:.38;
      color:inherit;
      text-decoration:none;
      vertical-align:middle;
      transition:opacity .18s ease, transform .18s ease, background-color .18s ease;
    }
    .solarex-footer-admin-link:hover,
    .solarex-footer-admin-link:focus{
      opacity:.86;
      transform:translateY(-1px);
      background-color:rgba(255,255,255,.08);
      outline:none;
    }
    .solarex-footer-admin-link:focus-visible{
      outline:2px solid currentColor;
      outline-offset:3px;
    }
    .solarex-footer-admin-icon{
      width:1rem;
      height:1rem;
      display:block;
      fill:currentColor;
    }
  `;
  document.head.appendChild(style);
});
