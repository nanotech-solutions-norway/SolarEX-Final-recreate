<?php
// Copy this file to config.local.php and update all values.
// Do not upload config.local.php to GitHub.

return [
    'db' => [
        'host' => 'YOUR_DATABASE_HOST.mysql.domeneshop.no',
        'name' => 'YOUR_DATABASE_NAME',
        'user' => 'YOUR_DATABASE_USERNAME',
        'pass' => 'YOUR_DATABASE_PASSWORD',
        'charset' => 'utf8mb4',
    ],

    'security' => [
        // Generate a long random value and keep it private.
        // Example command locally: php -r "echo bin2hex(random_bytes(32));"
        'secret_key' => 'CHANGE_ME_TO_A_LONG_RANDOM_SECRET',

        // Allowed website origins. Add live custom domain when ready.
        'allowed_origins' => [
            'https://nanotech-solutions-norway.github.io',
            'https://www.solarex.no',
            'https://solarex.no',
        ],

        // Rate limit per IP hash.
        'rate_limit_window_minutes' => 15,
        'rate_limit_max_submissions' => 5,
    ],

    'mail' => [
        // Uses PHP mail() by default. For higher reliability, use SMTP/PHPMailer later.
        'enabled' => true,
        'to' => 'info@solarex.no',
        'from' => 'no-reply@solarex.no',
        'reply_to_field' => 'Email',
        'subject_prefix' => 'SolarEX website form',
    ],

    'privacy' => [
        // Keep personal data only as long as commercially necessary.
        'retention_days' => 730,
    ],
];
