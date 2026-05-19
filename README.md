# SolarEX Final Recreate

Clean SolarEX-only static GitHub Pages rebuild.

## Active deployment model

- GitHub Pages source: `Deploy from a branch`
- Branch: `main`
- Folder: `/root`
- Public URL: `https://nanotech-solutions-norway.github.io/SolarEX-Final-recreate/`

## Source basis

- Gamma project: `https://gamma.app/docs/kst698k5l904eln`
- Uploaded SolarEX source files and reconstruction instructions in the current ChatGPT project thread
- Current build uses static HTML/CSS/JS only; no backend, no secrets, no build step

## Pages

- `index.html` — Home
- `quartz/index.html` — SolarEX Quartz / passive SiO₂
- `titan/index.html` — SolarEX Titan / active TiO₂
- `technology/index.html` — mechanism comparison and selection logic
- `projects/index.html` — evidence and pilot review
- `documentation/index.html` — documentation map
- `faq/index.html` — technical FAQ
- `contact/index.html` — technical review and commercial inquiry

## Standing content rules

- Contact email: `info@solarex.no`
- Chemical formula notation: `SiO₂` and `TiO₂`
- Quartz is presented as passive, SiO₂-based, hydrophobic/oleophobic and UV-independent
- Titan is presented as active, TiO₂-based, photocatalytic and UV-dependent
- Performance claims remain context-specific and tied to study/model assumptions

## Validation focus

- Internal links must resolve under the GitHub project path `/SolarEX-Final-recreate/`
- No old Gamma internal links should remain in navigation
- No old renderer shell or obsolete generator should remain active
- Main/root GitHub Pages publishing should work without GitHub Actions
