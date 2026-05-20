# SolarEX Domeneshop Form Backend

This package creates one shared SQL-backed form backend for all SolarEX website forms.

## Domain architecture

- Public SolarEX website: `https://www.solarex.no`
- SQL/form backend domain: `https://www.nanotech-solutions.com`
- Database ownership/hosting context: nanotech-solutions.com Domeneshop account/domain setup

The SolarEX website can submit form data cross-domain to the nanotech-solutions.com backend as long as CORS is configured to allow `https://www.solarex.no` and `https://solarex.no`.

## One database for multiple forms

Use one database only. Each form is separated by `form_key`, so additional forms can be added without creating another Domeneshop database.

Current form keys:

- `technical_review`
- `commercial_discussion`
- `documentation_pilot`

Additional forms can be added later:

```sql
INSERT INTO solarex_forms (form_key, form_name, description, enabled)
VALUES ('new_form_key', 'New Form Name', 'Purpose of this form', 1);
```

## Files

- `sql/001_schema.sql` — MySQL/MariaDB schema and seed rows for the three current SolarEX forms.
- `config/config.example.php` — copy to `config/config.local.php` and fill in database credentials and secret values.
- `src/bootstrap.php` — shared PHP functions for DB connection, CORS, rate limiting, sanitization and email notification.
- `public/submit.php` — public form submission API endpoint.
- `public/health.php` — database/API health check endpoint.
- `public/export.csv.php` — protected CSV export endpoint.

## Recommended Domeneshop server path under nanotech-solutions.com

Upload the backend to the nanotech-solutions.com web area, not to the solarex.no website directory.

Practical layout:

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

Expected backend endpoints:

```text
https://www.nanotech-solutions.com/solarex_forms/public/health.php
https://www.nanotech-solutions.com/solarex_forms/public/submit.php
https://www.nanotech-solutions.com/solarex_forms/public/export.csv.php
```

The SolarEX frontend remains at:

```text
https://www.solarex.no/
```

## Setup steps

1. In Domeneshop, use the MySQL/MariaDB database assigned under the nanotech-solutions.com domain/account context.
2. Open phpMyAdmin for that database.
3. Select the target database.
4. Import `sql/001_schema.sql`.
5. Copy `config/config.example.php` to `config/config.local.php`.
6. Fill in database host, database name, database username, database password and a random secret key.
7. Confirm allowed origins include:
   - `https://www.solarex.no`
   - `https://solarex.no`
   - `https://www.nanotech-solutions.com`
   - `https://nanotech-solutions.com`
8. Upload `public/`, `src/`, and `config/` to `/www/solarex_forms/` in the nanotech-solutions.com hosting area.
9. Open the health endpoint:

```text
https://www.nanotech-solutions.com/solarex_forms/public/health.php
```

Expected response:

```json
{"ok":true,"service":"solarex_forms","database":"connected"}
```

10. After health passes, update the SolarEX frontend form JavaScript to post to:

```text
https://www.nanotech-solutions.com/solarex_forms/public/submit.php
```

## Frontend payload requirement

Every form submission must include one of the following:

```text
form_key=technical_review
form_key=commercial_discussion
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
- Keep the database and API under nanotech-solutions.com; keep public website content under solarex.no.

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
https://www.nanotech-solutions.com/solarex_forms/public/export.csv.php?token=GENERATED_TOKEN
```

## Frontend JavaScript endpoint

Use this endpoint in the live contact form script:

```javascript
const ENDPOINT = 'https://www.nanotech-solutions.com/solarex_forms/public/submit.php';
```

Submit JSON:

```javascript
await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  body: JSON.stringify(payload)
});
```
