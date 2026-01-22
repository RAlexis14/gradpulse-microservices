-- ===============================
-- DOMAIN: ACADEMIC
-- Tables + seed data
-- ===============================

\connect academic_db;

CREATE TABLE IF NOT EXISTS academic_profiles (
    student_id INT PRIMARY KEY,
    career VARCHAR(150) NOT NULL,
    credits INT NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data (aligned with users_db ids 1..21)
-- Careers (short names): Industrial Design, Computing, Information Systems
INSERT INTO academic_profiles (student_id, career, credits, status)
VALUES
    (1,  'Information Systems', 210, 'ACTIVE'),
    (2,  'Computing',           180, 'ACTIVE'),
    (3,  'Industrial Design',   160, 'ACTIVE'),
    (4,  'Information Systems', 120, 'ACTIVE'),
    (5,  'Computing',            90, 'ACTIVE'),
    (6,  'Industrial Design',    60, 'ACTIVE'),
    (7,  'Information Systems',   0, 'ACTIVE'),
    (8,  'Computing',            30, 'ACTIVE'),
    (9,  'Industrial Design',   200, 'ACTIVE'),
    (10, 'Information Systems', 195, 'ACTIVE'),
    (11, 'Computing',            75, 'ACTIVE'),
    (12, 'Industrial Design',   110, 'ACTIVE'),
    (13, 'Information Systems', 140, 'ACTIVE'),
    (14, 'Computing',           160, 'ACTIVE'),
    (15, 'Industrial Design',    85, 'ACTIVE'),
    (16, 'Information Systems', 155, 'ACTIVE'),
    (17, 'Computing',           105, 'ACTIVE'),
    (18, 'Industrial Design',   130, 'ACTIVE'),
    (19, 'Information Systems',  45, 'ACTIVE'),
    (20, 'Computing',           170, 'ACTIVE'),
    (21, 'Industrial Design',    95, 'ACTIVE')
ON CONFLICT (student_id) DO NOTHING;
