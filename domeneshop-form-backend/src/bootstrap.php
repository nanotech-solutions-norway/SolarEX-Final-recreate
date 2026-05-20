<?php

function app_config(): array {
    static $config = null;
    if ($config !== null) return $config;
    $file = __DIR__ . '/../config/config.local.php';
    if (!is_file($file)) $file = __DIR__ . '/../config/config.example.php';
    $config = require $file;
    return $config;
}

function db(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;
    $cfg = app_config()['db'];
    $dsn = 'mysql:host=' . $cfg['host'] . ';dbname=' . $cfg['name'] . ';charset=' . ($cfg['charset'] ?? 'utf8mb4');
    $pdo = new PDO($dsn, $cfg['user'], $cfg['pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    return $pdo;
}

function apply_cors(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = app_config()['security']['allowed_origins'] ?? [];
    if ($origin && in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
}

function json_response_headers(): void {
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
}

function respond(int $status, array $payload): void {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function normalize_form_key(string $key): string {
    $key = strtolower(trim($key));
    return preg_replace('/[^a-z0-9_\-]/', '', $key) ?: '';
}

function safe_key(string $key): string {
    $key = strtolower(trim($key));
    $key = preg_replace('/[^a-z0-9_\-]+/', '_', $key);
    return trim($key, '_') ?: 'field';
}

function sanitize_payload(array $input): array {
    $out = [];
    foreach ($input as $key => $value) {
        $label = mb_substr(trim((string)$key), 0, 160);
        if ($label === '') continue;
        $out[$label] = mb_substr(trim(strip_tags((string)$value)), 0, 10000);
    }
    return $out;
}

function field_value(array $payload, array $keys): ?string {
    foreach ($keys as $key) {
        if (isset($payload[$key]) && trim((string)$payload[$key]) !== '') return trim((string)$payload[$key]);
    }
    return null;
}

function client_ip(): string {
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

function hash_client_value(string $value, array $config): string {
    return hash_hmac('sha256', $value, $config['security']['secret_key'] ?? 'change-me');
}

function check_rate_limit(PDO $pdo, array $config): void {
    $ipHash = hash_client_value(client_ip(), $config);
    $windowMinutes = (int)($config['security']['rate_limit_window_minutes'] ?? 15);
    $max = (int)($config['security']['rate_limit_max_submissions'] ?? 5);
    $minute = (int)(floor((int)date('i') / $windowMinutes) * $windowMinutes);
    $windowStart = (new DateTimeImmutable('now'))->setTime((int)date('H'), $minute, 0)->format('Y-m-d H:i:s');
    $stmt = $pdo->prepare('INSERT INTO solarex_form_rate_limits (ip_hash, window_start, submissions_count) VALUES (:ip_hash, :window_start, 1) ON DUPLICATE KEY UPDATE submissions_count = submissions_count + 1');
    $stmt->execute([':ip_hash' => $ipHash, ':window_start' => $windowStart]);
    $check = $pdo->prepare('SELECT submissions_count FROM solarex_form_rate_limits WHERE ip_hash = :ip_hash AND window_start = :window_start');
    $check->execute([':ip_hash' => $ipHash, ':window_start' => $windowStart]);
    if ((int)$check->fetchColumn() > $max) respond(429, ['ok' => false, 'error' => 'rate_limit_exceeded']);
}

function get_form(PDO $pdo, string $formKey): ?array {
    $stmt = $pdo->prepare('SELECT * FROM solarex_forms WHERE form_key = :form_key LIMIT 1');
    $stmt->execute([':form_key' => $formKey]);
    $row = $stmt->fetch();
    return $row ?: null;
}

function send_notification_mail(array $config, array $form, array $payload, int $submissionId, string $replyToEmail): void {
    if (empty($config['mail']['enabled'])) return;
    $to = $config['mail']['to'];
    $from = $config['mail']['from'];
    $subject = ($config['mail']['subject_prefix'] ?? 'SolarEX website form') . ' - ' . $form['form_name'] . ' #' . $submissionId;
    $lines = ['New SolarEX website form submission', 'Submission ID: ' . $submissionId, 'Form: ' . $form['form_name'], ''];
    foreach ($payload as $key => $value) {
        if (str_starts_with((string)$key, '_')) continue;
        $lines[] = $key . ': ' . $value;
    }
    $headers = 'From: SolarEX Website <' . $from . "\r\n" . 'Reply-To: ' . $replyToEmail . "\r\n" . 'Content-Type: text/plain; charset=UTF-8';
    @mail($to, $subject, implode("\n", $lines), $headers);
}
