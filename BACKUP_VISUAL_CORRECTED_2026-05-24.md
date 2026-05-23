# SolarEX fallback backup manifest — visual corrected state

Created: 2026-05-24 Europe/Oslo

## Rollback target

Use commit `0e1bea3854049db16deedaa0d6df85ed7f6ec432` as the corrected visual-state fallback point.

## Scope preserved at this fallback point

- Previous auto-injected header icons removed.
- Auto CTA buttons inside visual cards removed.
- Visual label chips/hotspot label overlays removed.
- Pathway suitability chart expanded to five bars.
- SiO₂ Quartz and TiO₂ Titan benefit cards added with balanced representation.
- Modal behavior, flag rendering, centered captions, image routing and non-link animation suppression retained.

## Restore instruction

To restore this state, revert later commits until repository `main` matches commit `0e1bea3854049db16deedaa0d6df85ed7f6ec432`, or create a new branch from that commit and redeploy GitHub Pages from it.
