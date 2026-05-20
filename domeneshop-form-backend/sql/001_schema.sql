-- SolarEX managed contact forms database schema
-- Target: MySQL / MariaDB on Domeneshop
-- Use ONE database for all SolarEX forms. Each form is separated by form_key.

CREATE TABLE IF NOT EXISTS solarex_forms (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  form_key VARCHAR(64) NOT NULL,
  form_name VARCHAR(160) NOT NULL,
  description VARCHAR(255) NULL,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_sol_form_key (form_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS solarex_form_submissions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  form_id INT UNSIGNED NOT NULL,
  status ENUM('new','reviewed','archived','spam') NOT NULL DEFAULT 'new',
  name VARCHAR(190) NULL,
  company VARCHAR(190) NULL,
  email VARCHAR(254) NULL,
  phone VARCHAR(80) NULL,
  subject VARCHAR(190) NULL,
  message_summary TEXT NULL,
  payload_json JSON NULL,
  source_url VARCHAR(500) NULL,
  origin VARCHAR(255) NULL,
  ip_hash CHAR(64) NULL,
  user_agent_hash CHAR(64) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_submission_form_created (form_id, created_at),
  KEY idx_submission_email (email),
  KEY idx_submission_status_created (status, created_at),
  CONSTRAINT fk_submission_form FOREIGN KEY (form_id) REFERENCES solarex_forms(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS solarex_form_fields (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  submission_id BIGINT UNSIGNED NOT NULL,
  field_key VARCHAR(120) NOT NULL,
  field_label VARCHAR(160) NULL,
  field_value MEDIUMTEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_field_submission (submission_id),
  KEY idx_field_key (field_key),
  CONSTRAINT fk_field_submission FOREIGN KEY (submission_id) REFERENCES solarex_form_submissions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS solarex_form_rate_limits (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  ip_hash CHAR(64) NOT NULL,
  window_start DATETIME NOT NULL,
  submissions_count INT UNSIGNED NOT NULL DEFAULT 1,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_rate_window (ip_hash, window_start)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO solarex_forms (form_key, form_name, description, enabled) VALUES
('technical_review', 'Technical Review Form', 'Quartz/Titan pathway, application, contamination and pilot review inquiries', 1),
('commercial_discussion', 'Commercial Discussion Form', 'Procurement, partnership, volume and commercial inquiries', 1),
('documentation_pilot', 'Documentation / Pilot Support Form', 'Documentation, study, ROI and pilot validation requests', 1)
ON DUPLICATE KEY UPDATE form_name = VALUES(form_name), description = VALUES(description), enabled = VALUES(enabled);
