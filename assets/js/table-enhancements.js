(() => {
  const initSolarEXTableEnhancements = () => {
    if (document.body.dataset.tableEnhancementsReady === 'true') return;
    document.body.dataset.tableEnhancementsReady = 'true';

    const currentPath = window.location.pathname;
    const repoName = 'SolarEX-Final-recreate';
    const pathParts = currentPath.split('/').filter(Boolean);
    const repoIndex = pathParts.indexOf(repoName);
    const routeParts = repoIndex >= 0 ? pathParts.slice(repoIndex + 1) : pathParts;
    const isFileRoute = routeParts.length > 0 && /\.[a-z0-9]+$/i.test(routeParts[routeParts.length - 1]);
    const directoryDepth = isFileRoute ? Math.max(routeParts.length - 1, 0) : routeParts.length;
    const relativePrefix = '../'.repeat(directoryDepth);

    const pageMap = new Map([
      ['Home', 'index.html'],
      ['Quartz', 'quartz/'],
      ['Titan', 'titan/'],
      ['Technology', 'technology/'],
      ['Projects', 'projects/'],
      ['Project', 'projects/'],
      ['Evidence', 'projects/'],
      ['Documentation', 'documentation/'],
      ['FAQ', 'faq/'],
      ['Contact', 'contact/#technical-form'],
      ['Technical review', 'contact/#technical-form'],
      ['Technical Request', 'contact/#technical-form'],
      ['Commercial Request', 'contact/#commercial-form'],
      ['Commercial discussion', 'contact/#commercial-form'],
      ['ROI Calculator', 'roi-calculator/'],
      ['ROI', 'roi-calculator/'],
      ['Pilot review', 'projects/'],
      ['Pilot', 'projects/'],
      ['Europe', 'markets/europe/'],
      ['Middle East', 'markets/middle-east/'],
      ['Nordics', 'markets/nordics/']
    ]);

    const normalizeHref = (path) => relativePrefix + path;

    const replaceText = (root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
          if (node.parentElement && node.parentElement.closest('script,style,a')) return NodeFilter.FILTER_REJECT;
          if (/v3\.0|v 3\.0|source package/i.test(node.nodeValue)) return NodeFilter.FILTER_ACCEPT;
          return NodeFilter.FILTER_REJECT;
        }
      });
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach((node) => {
        node.nodeValue = node.nodeValue
          .replace(/SolarEX\s+v3\.0\s+source package/gi, 'SolarEX documentation package')
          .replace(/v3\.0/gi, '')
          .replace(/\s{2,}/g, ' ');
      });
    };

    const classifyRow = (row) => {
      const text = row.textContent.toLowerCase();
      const hasQuartz = /quartz|sio₂|sio2|passive/.test(text);
      const hasTitan = /titan|tio₂|tio2|photocatalytic|uv activation|uv-supported/.test(text);
      const hasBoth = /both|compare|technology|all buyer|mixed|route review|pathway selection|graph and visual|spreadsheet|evidence data/.test(text);
      row.classList.remove('route-quartz', 'route-titan', 'route-both', 'route-neutral');
      if ((hasQuartz && hasTitan) || hasBoth) row.classList.add('route-both');
      else if (hasQuartz) row.classList.add('route-quartz');
      else if (hasTitan) row.classList.add('route-titan');
      else row.classList.add('route-neutral');
    };

    const addRouteKey = (wrap) => {
      if (!wrap || wrap.previousElementSibling?.classList?.contains('route-key')) return;
      const key = document.createElement('div');
      key.className = 'route-key';
      key.innerHTML = '<span class="q"><i></i>Quartz / SiO₂</span><span class="t"><i></i>Titan / TiO₂</span><span class="b"><i></i>Both / route review</span><span class="n"><i></i>Neutral / evidence</span>';
      wrap.insertAdjacentElement('beforebegin', key);
    };

    const linkCellText = (cell) => {
      if (!cell || cell.querySelector('a')) return;
      const original = cell.textContent.trim();
      if (!original) return;
      let parts = original.split(/(,|\/| and | & )/i);
      let changed = false;
      const frag = document.createDocumentFragment();
      parts.forEach((part) => {
        const token = part.trim();
        const matched = Array.from(pageMap.keys()).find((key) => token.toLowerCase() === key.toLowerCase());
        if (matched) {
          const a = document.createElement('a');
          a.className = 'table-route-link';
          a.href = normalizeHref(pageMap.get(matched));
          a.textContent = token;
          frag.appendChild(a);
          changed = true;
        } else {
          frag.appendChild(document.createTextNode(part));
        }
      });
      if (changed) {
        cell.textContent = '';
        cell.appendChild(frag);
      }
    };

    document.querySelectorAll('main .table-wrap').forEach((wrap) => {
      const table = wrap.querySelector('table');
      if (!table) return;
      addRouteKey(wrap);
      const headers = Array.from(table.querySelectorAll('thead th')).map((th) => th.textContent.toLowerCase());
      const placementIndex = headers.findIndex((header) => /placement|supporting page|target page|website|page|route/.test(header));
      table.querySelectorAll('tbody tr').forEach((row) => {
        classifyRow(row);
        if (placementIndex >= 0 && row.cells[placementIndex]) linkCellText(row.cells[placementIndex]);
        else Array.from(row.cells).forEach((cell) => {
          if (/Quartz|Titan|Technology|Projects|Documentation|FAQ|Contact|ROI|Europe|Middle East|Nordics/.test(cell.textContent)) linkCellText(cell);
        });
      });
    });

    replaceText(document.body);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSolarEXTableEnhancements, { once: true });
  } else {
    initSolarEXTableEnhancements();
  }
})();
