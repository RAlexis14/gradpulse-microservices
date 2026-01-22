-- ===============================
-- DOMAIN: LANGUAGES
-- DB: languages_db
-- Tables + seed data
-- ===============================

\connect languages_db;

CREATE TABLE IF NOT EXISTS english_levels (
    student_id INT PRIMARY KEY,
    level VARCHAR(10) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enforce valid levels
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'chk_english_level_valid'
    ) THEN
        ALTER TABLE english_levels
        ADD CONSTRAINT chk_english_level_valid
        CHECK (level IN ('A1.1','A1.2','A2.1','A2.2','B1.1'));
    END IF;
END $$;

-- Seed data aligned with users ids (1..21)
INSERT INTO english_levels (student_id, level) VALUES
(1, 'A2.2'),
(2, 'A2.1'),
(3, 'A1.2'),
(4, 'A1.1'),
(5, 'B1.1'),
(6, 'A2.2'),
(7, 'A1.1'),
(8, 'A1.2'),
(9, 'A2.1'),
(10, 'A2.2'),
(11, 'A1.2'),
(12, 'A2.1'),
(13, 'A1.1'),
(14, 'A2.2'),
(15, 'B1.1'),
(16, 'A2.1'),
(17, 'A1.2'),
(18, 'A1.1'),
(19, 'A2.2'),
(20, 'A2.1'),
(21, 'A1.2')
ON CONFLICT (student_id) DO UPDATE
SET level = EXCLUDED.level,
    updated_at = CURRENT_TIMESTAMP;
