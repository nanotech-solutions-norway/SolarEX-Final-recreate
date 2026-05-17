# SolarEX Reconstruction Source Inventory

## Controlling implementation instruction

- `02_25, 17.05.2026 – Website Reconstruction Report.docx` — used as the reconstruction discipline layer. It is generic and assumes missing source material; in this project, actual Gamma and SolarEX files supersede placeholder assumptions.

## Primary visual and layout source

- Gamma project: `https://gamma.app/docs/kst698k5l904eln`
- Recreated page model: Home, Quartz, Titan, Technology, Projects, Documentation, FAQ, Contact.
- Applied design cues: dark premium solar-tech palette, blue emphasis cards, rounded panels, proof/stat blocks, pathway comparison tables, CTA blocks, compact footer, reveal animations, and count-up style metrics.

## Content source bundles

### `solat.zip` — PPTX source files

- `SolarEX - Solar Cell Coating - Quartz Edition - Norge (NO) v2.5.pptx`
- `SolarEX - Solar Cell Coating - Quartz Edition - Europe (ENG) v2.5.pptx`
- `SolarEX - Solar Cell Coating - Quartz Edition - Middle East (ENG) v2.5.pptx`
- `SolarEX - Solar Cell Coating - Titan Edition (EN) v4.0.pptx`
- `SolarEX - Quartz - Solar Cell Coating - SiO₂ Edition - InterCos PV plant - Hochdorf (EN) v2.0.pptx`
- `SolarEX - Quartz - InterCos PV plant (EN) v2.1.pptx`

### `silar.zip` — PDF source files

- Quartz and Titan application instructions.
- Quartz Europe, Middle East, Norway and InterCos/Hochdorf references.
- Titan product and solar module study documents.
- SolarEX SiO₂ and Titan TiO₂ FAQ.

## Implementation decisions

- The repo is static-only and GitHub Pages compatible.
- PDF/PPTX binaries are not published publicly in this rebuild; the Documentation page is request-based, consistent with the Gamma direction.
- Contact email is standardized as `info@solarex.no`.
- Chemical formulas are rendered as `SiO₂` and `TiO₂`.
- No backend, secrets, API tokens, or private form-handling code are included.
