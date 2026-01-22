\connect community_db;

CREATE TABLE IF NOT EXISTS community_hours_log (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    hours INT NOT NULL CHECK (hours > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_community_hours_student_id
ON community_hours_log(student_id);

INSERT INTO community_hours_log (student_id, hours) VALUES
(1, 40),
(1, 30),
(2, 20),
(2, 25),
(3, 10),
(4, 50),
(5, 15),
(6, 60),
(7, 5),
(8, 35),
(9, 45),
(10, 70),
(11, 25),
(12, 30),
(13, 55),
(14, 80),
(15, 10),
(16, 20),
(17, 30),
(18, 15),
(19, 25),
(20, 40),
(21, 5)
ON CONFLICT DO NOTHING;
