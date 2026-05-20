# SolarEX Domeneshop Form Backend

This package creates one shared SQL database structure for all SolarEX website forms. Each form is separated by `form_key`, so additional forms can be added without creating another Domeneshop database.

## Files

- `sql/001_schema.sql` — MySQL/MariaDB schema and seed rows for the three current SolarEX forms.
- `config/config.example.php` — copy to `config/config.local.php` and fill in database credentials and secret values.
- `src/bootstrap.php` — shared PHP functions for DB connection, CORS, rate limiting, sanitization and email notification.
- `public/submit.php` — public form submission API endpoint.
- `public/health.php` — database/API health check endpoint.
- `public/export.csv.php` — protected CSV export endpoint.

## Recommended server path

Upload the full `domeneshop-form-backend` folder outside public webroot if possible, and expose only the files in `public/`.

Practical Domeneshop shared-hosting layout:

```text
/www/solarex_forms/
  public/
    submit.php
    health.php
    export.csv.php
  src/
    bootstrap.php
  config/
    config.local.php
```

Live endpoints would then be:

```text
https://www.solarex.no/solarex_forms/public/health.php
https://www.solarex.no/solarex_forms/public/submit.php
```

If you prefer cleaner URLs, add a rewrite later, but do not rely on `.htaccess` until confirmed on the host.

## Database design

Use one database only. The schema supports multiple forms through `solarex_forms.form_key`:

- `technical_review`
- `commercial_discussion`
- `documentation_pilot`

Additional forms can be added like this:

```sql
INSERT INTO solarex_forms (form_key, form_name, description, enabled)
VALUES ('new_form_key', 'New Form Name', 'Purpose of this form', 1);
```

## Setup steps

1. Create or select one MySQL/MariaDB database in Domeneshop.
2. Open phpMyAdmin.
3. Select the target database.
4. Import `sql/001_schema.sql`.
5. Copy `config/config.example.php` to `config/config.local.php`.
6. Fill in database host, database name, database username, database password and secret key.
7. Upload `public/`, `src/`, and `config/` to the server path.
8. Open `health.php` in the browser.
9. Confirm JSON response: `{"ok":true,"service":"solarex_forms","database":"connected"}`.
10. Update frontend form JavaScript to post to `https://www.solarex.no/solarex_forms/public/submit.php`.

## Frontend payload requirement

Every form submission must include:

```text
form_key=technical_review
```

or:

```text
form_key=commercial_discussion
```

or:

```text
form_key=documentation_pilot
```

The endpoint accepts either JSON or regular form POST.

## Security notes

- Do not commit or expose `config.local.php`.
- Use a long random `secret_key`.
- Keep export endpoint token private.
- Use CORS allow-list only for approved domains.
- Keep rate limiting enabled.
- Use HTTPS only.
- Review retention requirements for GDPR and delete old submissions when no longer needed.

## CSV export token

The export URL requires a token calculated as:

```php
hash_hmac('sha256', 'export', SECRET_KEY)
```

Example local command:

```bash
php -r "echo hash_hmac('sha256', 'export', 'YOUR_SECRET_KEY');"
```

Then access:

```text
https://www.solarex.no/solarex_forms/public/export.csv.php?token=GENERATED_TOKEN
```

## Frontend JavaScript example

Use this endpoint in the live contact form script:

```javascript
const ENDPOINT = 'https://www.solarex.no/solarex_forms/public/submit.php';
```

Submit JSON:

```javascript
await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  body: JSON.stringify(payload)
});
```
