# SolarEX Admin Dashboard URL Fit Hotfix — 12:50, 02.06.2026

## Scope

This hotfix corrects the Dashboard `System status` cards where the full `Admin URL` and `Forms URL` values overflowed the card container.

## Runtime target

Domeneshop PHP hosting:

```text
/www/solarex_admin/dashboard.php
/www/solarex_admin/assets/admin.css
```

## Required PHP dashboard change

In `/www/solarex_admin/dashboard.php`, replace the System Status cards from full URL values:

```php
render_card('Admin URL', cfg('app.admin_base_url'), 'Footer login target');
render_card('Forms URL', cfg('app.forms_base_url'), 'Public endpoints');
```

with compact card values and full URLs as smaller notes:

```php
render_card('Admin URL', 'solarex_admin', cfg('app.admin_base_url'));
render_card('Forms URL', 'solarex_forms', cfg('app.forms_base_url'));
```

## Required CSS addition

Append `admin-url-fit-hotfix.css` to `/www/solarex_admin/assets/admin.css`, or replace `admin.css` with the packaged corrected version.

## FTP package

A corrected upload ZIP was generated for Domeneshop:

```text
SolarEX_Admin_URL_Fit_Hotfix_1250_02062026.zip
```

## Validation

After upload, reload:

```text
https://forms.nanotech-solutions.com/solarex_admin/dashboard.php
```

Expected result:

- `Admin URL` value displays as `solarex_admin`.
- `Forms URL` value displays as `solarex_forms`.
- Full URLs appear as smaller wrapped note text.
- No text exits the KPI cards.
