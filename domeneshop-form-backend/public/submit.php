<?php
// SolarEX form submission endpoint for Domeneshop PHP hosting.
// Upload this file to /www/solarex_forms/submit.php or similar.

require_once __DIR__ . '/../src/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    apply_cors();
    http_response_code(204);
    exit;
}

apply_cors();
json_response_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

$config = app_config();
$pdo = db();
$raw = file_get_contents('php://input');
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';

if (stripos($contentType, 'application/json') !== false) {
    $input = json_decode($raw, true);
    if (!is_array($input)) {
        respond(400, ['ok' => false, 'error' => 'invalid_json']);
    }
} else {
    $input = $_POST;
}

$honeypot = trim((string)($input['website'] ?? $input['_honey'] ?? ''));
if ($honeypot !== '') {
    respond(200, ['ok' => true, 'message' => 'accepted']);
}

$formKey = normalize_form_key((string)($input['form_key'] ?? ''));
if ($formKey === '') {
    respond(400, ['ok' => false, 'error' => 'missing_form_key']);
}

check_rate_limit($pdo, $config);

$form = get_form($pdo, $formKey);
if (!$form || (int)$form['enabled'] !== 1) {
    respond(404, ['ok' => false, 'error' => 'form_not_found_or_disabled']);
}

$clean = sanitize_payload($input);
$name = field_value($clean, ['Name', 'name']);
$company = field_value($clean, ['Company', 'company']);
$email = field_value($clean, ['Email', 'email']);
$phone = field_value($clean, ['Phone', 'phone']);
$message = field_value($clean, ['Technical request', 'Commercial request', 'Documentation context', 'Message', 'message']);

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, ['ok' => false, 'error' => 'valid_email_required']);
}
if (!$message) {
    respond(400, ['ok' => false, 'error' => 'message_required']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$sourceUrl = (string)($clean['source_url'] ?? ($_SERVER['HTTP_REFERER'] ?? ''));
$ipHash = hash_client_value(client_ip(), $config);
$uaHash = hash_client_value($_SERVER['HTTP_USER_AGENT'] ?? '', $config);
$subject = $config['mail']['subject_prefix'] . ' — ' . $form['form_name'];
$messageSummary = mb_substr($message, 0, 1200);

$pdo->beginTransaction();
try {
    $stmt = $pdo->prepare('INSERT INTO solarex_form_submissions (form_id, name, company, email, phone, subject, message_summary, payload_json, source_url, origin, ip_hash, user_agent_hash) VALUES (:form_id, :name, :company, :email, :phone, :subject, :message_summary, :payload_json, :source_url, :origin, :ip_hash, :user_agent_hash)');
    $stmt->execute([
        ':form_id' => (int)$form['id'],
        ':name' => $name,
        ':company' => $company,
        ':email' => $email,
        ':phone' => $phone,
        ':subject' => $subject,
        ':message_summary' => $messageSummary,
        ':payload_json' => json_encode($clean, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        ':source_url' => $sourceUrl,
        ':origin' => $origin,
        ':ip_hash' => $ipHash,
        ':user_agent_hash' => $uaHash,
    ]);
    $submissionId = (int)$pdo->lastInsertId();

    $fieldStmt = $pdo->prepare('INSERT INTO solarex_form_fields (submission_id, field_key, field_label, field_value) VALUES (:submission_id, :field_key, :field_label, :field_value)');
    foreach ($clean as $key => $value) {
        if (str_starts_with((string)$key, '_')) continue;
        if ($key === 'form_key' || $key === 'source_url') continue;
        $fieldStmt->execute([
            ':submission_id' => $submissionId,
            ':field_key' => safe_key((string)$key),
            ':field_label' => (string)$key,
            ':field_value' => is_scalar($value) ? (string)$value : json_encode($value, JSON_UNESCAPED_UNICODE),
        ]);
    }

    $pdo->commit();
} catch (Throwable $e) {
    $pdo->rollBack();
    error_log('SolarEX form DB error: ' . $e->getMessage());
    respond(500, ['ok' => false, 'error' => 'database_error']);
}

if (!empty($config['mail']['enabled'])) {
    send_notification_mail($config, $form, $clean, $submissionId, $email);
}

respond(200, ['ok' => true, 'submission_id' => $submissionId, 'message' => 'submission_received']);
