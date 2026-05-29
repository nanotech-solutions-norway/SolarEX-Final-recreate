# SolarEX Admin Dashboard Package

Version timestamp: 15:58, 29.05.2026

This folder documents the SolarEX admin-dashboard deployment package and the current GitHub-side integration.

## Current GitHub-side deployment

The public SolarEX site loads `assets/js/footer-legal-fix.js` through `assets/js/main.js`. That JavaScript file now injects a small footer login link:

```text
Admin → https://forms.nanotech-solutions.com/solarex_admin/login.php
```

## Runtime limitation

GitHub Pages does not execute PHP or provide MySQL/MariaDB runtime. Therefore, the actual PHP admin dashboard must be uploaded to Domeneshop hosting.

## Development login

```text
Username: admin
Password: admin
```

This login is intentionally simple for initial creation and must be replaced before production.

## Domeneshop upload folders

```text
/private/solarex_admin_private/
/www/solarex_admin/
/www/solarex_forms/
```

## SQL import order

```text
sql/schema.sql
sql/seed_email_templates.sql
```

## Email engine

Prepared but not connected. Automated thank-you emails and newsletters stay disabled until the dedicated email engine is provided.
