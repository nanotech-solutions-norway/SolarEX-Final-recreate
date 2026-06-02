<?php
declare(strict_types=1);

require_once __DIR__ . '/../../private/solarex_admin_private/src/bootstrap.php';

Auth::requireLogin();
render_header('Analytics');

if (!Database::available()) {
    db_setup_notice();
    render_footer();
    exit;
}

function analytics_count(string $sql, array $params = []): int
{
    $row = Database::fetchOne($sql, $params);
    return (int)($row['c'] ?? 0);
}

function analytics_daily(string $table, int $days = 30): array
{
    $rows = Database::fetchAll(
        "SELECT DATE(created_at) AS d, COUNT(*) AS c
         FROM {$table}
         WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL {$days} DAY)
         GROUP BY DATE(created_at)
         ORDER BY d ASC"
    );

    $map = [];
    foreach ($rows as $row) {
        $map[(string)$row['d']] = (int)$row['c'];
    }

    $out = [];
    for ($i = $days - 1; $i >= 0; $i--) {
        $date = date('Y-m-d', strtotime("-{$i} days"));
        $out[$date] = $map[$date] ?? 0;
    }

    return $out;
}

function analytics_bar(string $title, array $data): void
{
    $max = max(array_values($data) ?: [1]);
    $max = max($max, 1);

    echo '<section class="card chart-card">';
    echo '<h2>' . e($title) . '</h2>';
    echo '<div class="bar-chart bar-chart-wide" role="img" aria-label="' . e($title) . '">';

    foreach ($data as $label => $value) {
        $height = max(4, (int)round(((int)$value / $max) * 100));
        echo '<div class="bar-item">';
        echo '<div class="bar-track"><div class="bar-fill" style="height:' . $height . '%"></div></div>';
        echo '<div class="bar-value">' . (int)$value . '</div>';
        echo '<div class="bar-label">' . e(substr((string)$label, 5)) . '</div>';
        echo '</div>';
    }

    echo '</div>';
    echo '</section>';
}

function analytics_horizontal(string $title, array $data): void
{
    $max = max(array_values($data) ?: [1]);
    $max = max($max, 1);

    echo '<section class="card chart-card">';
    echo '<h2>' . e($title) . '</h2>';
    echo '<div class="h-chart">';

    foreach ($data as $label => $value) {
        $width = max(2, (int)round(((int)$value / $max) * 100));
        echo '<div class="h-row">';
        echo '<div class="h-label">' . e((string)$label) . '</div>';
        echo '<div class="h-track"><div class="h-fill" style="width:' . $width . '%"></div></div>';
        echo '<div class="h-value">' . (int)$value . '</div>';
        echo '</div>';
    }

    echo '</div>';
    echo '</section>';
}

function analytics_top_values(string $table, string $field, int $limit = 8): array
{
    $allowedTables = [
        'contact_messages',
        'technical_review_requests',
        'documentation_downloads',
        'email_outbox'
    ];

    $allowedFields = [
        'source_page',
        'product_interest',
        'document_key',
        'status'
    ];

    if (!in_array($table, $allowedTables, true) || !in_array($field, $allowedFields, true)) {
        return ['Invalid query' => 0];
    }

    $rows = Database::fetchAll(
        "SELECT COALESCE(NULLIF({$field}, ''), 'unknown') AS label, COUNT(*) AS c
         FROM {$table}
         GROUP BY COALESCE(NULLIF({$field}, ''), 'unknown')
         ORDER BY c DESC
         LIMIT " . (int)$limit
    );

    $out = [];
    foreach ($rows as $row) {
        $out[(string)$row['label']] = (int)$row['c'];
    }

    return $out ?: ['No data yet' => 0];
}

echo '<section class="grid kpis">';
render_card('Contact submissions', analytics_count("SELECT COUNT(*) AS c FROM contact_messages"));
render_card('Technical reviews', analytics_count("SELECT COUNT(*) AS c FROM technical_review_requests"));
render_card('ROI submissions', analytics_count("SELECT COUNT(*) AS c FROM roi_calculator_submissions"));
render_card('Documentation downloads', analytics_count("SELECT COUNT(*) AS c FROM documentation_downloads"));
render_card('Newsletter signups', analytics_count("SELECT COUNT(*) AS c FROM newsletter_subscribers"));
render_card('Email outbox items', analytics_count("SELECT COUNT(*) AS c FROM email_outbox"));
render_card('Templates active', analytics_count("SELECT COUNT(*) AS c FROM email_templates WHERE is_active = 1"));
render_card('Audit events', analytics_count("SELECT COUNT(*) AS c FROM admin_audit_log"));
echo '</section>';

echo '<section class="analytics-grid">';
analytics_bar('Contact submissions, last 30 days', analytics_daily('contact_messages', 30));
analytics_bar('Technical reviews, last 30 days', analytics_daily('technical_review_requests', 30));
analytics_bar('ROI submissions, last 30 days', analytics_daily('roi_calculator_submissions', 30));
analytics_horizontal('Top contact source pages', analytics_top_values('contact_messages', 'source_page'));
analytics_horizontal('Product interest from contacts', analytics_top_values('contact_messages', 'product_interest'));
analytics_horizontal('Technical review product interest', analytics_top_values('technical_review_requests', 'product_interest'));
analytics_horizontal('Top documentation downloads', analytics_top_values('documentation_downloads', 'document_key'));
analytics_horizontal('Email outbox status', analytics_top_values('email_outbox', 'status'));
echo '</section>';

echo '<section class="card">';
echo '<h2>Analytics note</h2>';
echo '<p class="muted">These charts use internal MySQL/MariaDB data from SolarEX forms, downloads, newsletters, and admin activity. GA4 and Domeneshop statistics can be connected later as external reporting inputs.</p>';
echo '</section>';

render_footer();
