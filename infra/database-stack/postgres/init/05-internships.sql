-- ===============================
-- DOMAIN: INTERNSHIPS
-- Tables + realistic seed data
-- DB: internships_db
-- ===============================

\connect internships_db;

CREATE TABLE IF NOT EXISTS internship_hours (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    hours INT NOT NULL CHECK (hours > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_internship_hours_student_id
ON internship_hours(student_id);

-- Seed: hours logs for students 1..21
-- (Realistic variety, multiple entries per student)
INSERT INTO internship_hours (student_id, hours) VALUES
(1, 40), (1, 20),
(2, 60),
(3, 30), (3, 25),
(4, 50),
(5, 15), (5, 10),
(6, 80),
(7, 20),
(8, 35),
(9, 45),
(10, 60),
(11, 25),
(12, 30), (12, 20),
(13, 55),
(14, 40),
(15, 15),
(16, 70),
(17, 30),
(18, 20),
(19, 10),
(20, 50),
(21, 25)
ON CONFLICT DO NOTHING;
