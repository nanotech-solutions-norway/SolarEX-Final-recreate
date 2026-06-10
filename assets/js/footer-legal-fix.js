// SolarEX footer admin-login icon injector and footer legal utility.
// This file is loaded by assets/js/main.js.
document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('.site-footer, footer');
  if (!footer || footer.querySelector('.solarex-footer-admin-link')) return;

  const link = document.createElement('a');
  link.className = 'solarex-footer-admin-link';
