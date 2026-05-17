# SolarEX Final Recreate

Static GitHub Pages reconstruction of the SolarEX Gamma website.

## Build source

- Gamma design/layout template: `https://gamma.app/docs/kst698k5l904eln`
- Attached instruction source: `02_25, 17.05.2026 – Website Reconstruction Report.docx`
- Attached content sources: `solat.zip` and `silar.zip`

## Implemented website structure

- Home
- Quartz
- Titan
- Technology
- Projects
- Documentation
- FAQ
- Contact

## Technical model

The repository uses a lightweight static-site generator in `sitegen.py`. The GitHub Pages workflow runs the generator and publishes the resulting `_site` artifact.

No backend, private keys, API tokens, or server-side code are included.

## Core implementation rules applied

- Contact email standardized as `info@solarex.no`.
- Chemical formulas rendered as `SiO₂` and `TiO₂`.
- Product language follows SolarEX source content: Quartz is the passive SiO₂ pathway; Titan is the active TiO₂ pathway.
- Documentation access is request-based, matching the Gamma direction.
- Design language follows the Gamma project: dark solar-tech background, blue emphasis cards, rounded panels, technical proof blocks, pathway comparison tables, CTA sections, reveal animations, and count-up metrics.

## Deployment

1. Open repository **Settings → Pages**.
2. Select **GitHub Actions** as publishing source.
3. Run the `Deploy to GitHub Pages` workflow or push to `main`.
4. The workflow generates `_site` and publishes it through GitHub Pages.
