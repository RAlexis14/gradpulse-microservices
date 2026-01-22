\connect library_db;

CREATE TABLE IF NOT EXISTS library_blocks (
  student_id INT PRIMARY KEY,
  has_blocks BOOLEAN NOT NULL DEFAULT FALSE,
  reason TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS library_clearances (
  student_id INT PRIMARY KEY,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed: algunos con bloqueos (para probar)
INSERT INTO library_blocks (student_id, has_blocks, reason) VALUES
(1, false, NULL),
(2, true,  'Overdue book: Data Structures'),
(3, false, NULL),
(4, true,  'Pending fine'),
(5, false, NULL),
(6, false, NULL),
(7, false, NULL),
(8, true,  'Overdue book: Databases I')
ON CONFLICT (student_id) DO UPDATE SET
  has_blocks = EXCLUDED.has_blocks,
  reason = EXCLUDED.reason,
  updated_at = CURRENT_TIMESTAMP;
