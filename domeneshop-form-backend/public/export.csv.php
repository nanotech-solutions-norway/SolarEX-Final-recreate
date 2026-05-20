<?php
// Basic CSV export. Protect this file with HTTP Basic Auth or delete after export.
require_once __DIR__ . '/../src/bootstrap.php';
$token = $_GET['token'] ?? '';
$expected = hash_hmac('sha256', 'export', app_config()['security']['secret_key'] ?? 'change-me');
if (!hash_equals($expected, $token)) {
    http_response_code(403);
    echo 'Forbidden';
    exit;
}
$pdo = db();
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="solarex-form-submissions.csv"');
$out = fopen('php://output', 'w');
fputcsv($out, ['id','form_key','form_name','status','name','company','email','phone','subject','message_summary','source_url','origin','created_at']);
$sql = 'SELECT s.id, f.form_key, f.form_name, s.status, s.name, s.company, s.email, s.phone, s.subject, s.message_summary, s.source_url, s.origin, s.created_at FROM solarex_form_submissions s JOIN solarex_forms f ON f.id = s.form_id ORDER BY s.created_at DESC LIMIT 5000';
foreach ($pdo->query($sql) as $row) {
    fputcsv($out, $row);
}
