document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const repoName = 'SolarEX-Final-recreate';
  const pathParts = currentPath.split('/').filter(Boolean);
  const repoIndex = pathParts.indexOf(repoName);
  const routeParts = repoIndex >= 0 ? pathParts.slice(repoIndex + 1) : pathParts;
  const isFile