<?php
require_once __DIR__ . '/../src/bootstrap.php';
apply_cors();
json_response_headers();
try {
    $pdo = db();
    $pdo->query('SELECT 1');
    respond(200, ['ok' => true, 'service' => 'solarex_forms', 'database' => 'connected']);
} catch (Throwable $e) {
    error_log('SolarEX health error: ' . $e->getMessage());
    respond(500, ['ok' => false, 'service' => 'solarex_forms', 'database' => 'error']);
}
