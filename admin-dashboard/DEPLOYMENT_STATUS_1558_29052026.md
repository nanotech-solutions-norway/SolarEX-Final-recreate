# SolarEX Admin Dashboard Deployment Status — 15:58, 29.05.2026

## Status

The SolarEX public GitHub site has been updated with an admin-login footer link injector.

## Repository

`nanotech-solutions-norway/SolarEX-Final-recreate`

## Active public-site update

The existing `assets/js/main.js` already loads:

```text
assets/js/footer-legal-fix.js
```

That previously missing file has now been added and injects a small footer link:

```text
Admin → https://forms.nanotech-solutions.com/solarex_admin/login.php
```

## Admin runtime model

The PHP admin dashboard itself must run on Domeneshop PHP hosting, not GitHub Pages. GitHub Pages will not execute PHP, MySQL, or server-side login logic.

## Development login

```text
Username: admin
Password: admin
```

This is a temporary creation/testing login only.

## Required next server-side step

Upload the generated PHP/MySQL admin package to Domeneshop:

```text
/private/solarex_admin_private/
/www/solarex_admin/
/www/solarex_forms/
```

Then import:

```text
sql/schema.sql
sql/seed_email_templates.sql
```

## Email engine

Prepared but intentionally not connected. Automated thank-you emails and newsletters remain disabled until the dedicated email engine is supplied.

## Current public footer behavior

The footer admin link is deliberately small, low-visibility, and marked `rel="nofollow noopener"`.
