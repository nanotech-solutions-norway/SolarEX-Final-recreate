# SolarEX GitHub Rebuild QA Checklist

## Content and claim checks

- [ ] All primary pages are present: Home, Quartz, Titan, Technology, Projects, Documentation, FAQ, Contact.
- [ ] Email is standardized as `info@solarex.no`.
- [ ] Chemical formulas use `SiO₂` and `TiO₂`.
- [ ] Quartz is consistently described as passive, SiO₂-based, hydrophobic/oleophobic, and UV-independent.
- [ ] Titan is consistently described as active, TiO₂-based, photocatalytic, and UV-dependent.
- [ ] Titan +5.15% performance language remains study-specific.
- [ ] Quartz ROI and field evidence remain context-specific and tied to assumptions or reference context.

## Layout and UX checks

- [ ] Header navigation links to all pages.
- [ ] Footer navigation links to all main sections.
- [ ] CTA buttons link to the correct Google Forms or `mailto:info@solarex.no`.
- [ ] Mobile navigation opens and closes.
- [ ] Cards stack cleanly on mobile.
- [ ] Tables scroll horizontally on small screens.
- [ ] Reveal animations run without blocking content.
- [ ] Reduced-motion users can still read the site without dependency on animation.

## GitHub Pages checks

- [ ] Repository Pages settings use GitHub Actions as publishing source.
- [ ] `Deploy to GitHub Pages` workflow completes successfully.
- [ ] `_site/index.html` is generated during workflow execution.
- [ ] `robots.txt`, `sitemap.xml`, `404.html`, `llms.txt`, CSS, and JavaScript are present in the artifact.
- [ ] Custom domain and HTTPS are configured only after workflow deployment succeeds.

## Acceptance standard

The deployed website should match the Gamma project’s structure, tone, section logic, and premium technical-commercial visual direction closely enough for live review, while remaining maintainable as static GitHub Pages code.
