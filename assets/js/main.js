document.addEventListener('DOMContentLoaded', () => {
  const ADMIN_URL = 'https://forms.nanotech-solutions.com/solarex_admin/login.php';

  function removeStandaloneRoiNavItem() {
    document.querySelectorAll('header .site-nav a, .site-header .site-nav a, nav.site-nav a').forEach((link) => {
      const label = (link.textContent || '').trim().toLowerCase();
      const