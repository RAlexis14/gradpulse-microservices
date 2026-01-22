-- ===============================
-- DOMAIN: USERS
-- Tables + seed data
-- ===============================

\connect users_db;

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ROLES TABLE
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- USER_ROLES TABLE
CREATE TABLE IF NOT EXISTS user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- ===============================
-- SEED DATA
-- ===============================

-- ROLES
INSERT INTO roles (name) VALUES
('STUDENT'),
('ADMIN')
ON CONFLICT DO NOTHING;

-- Users (password = "password123" hashed with bcrypt)
-- Keep a single stable hash so login works consistently for demo/QA
INSERT INTO users (email, password_hash, is_active) VALUES
('student1@uce.edu.ec', '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('admin@uce.edu.ec',    '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),

-- Extra students (demo-ready)
('student2@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student3@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student4@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student5@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student6@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student7@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student8@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student9@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student10@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student11@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student12@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student13@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student14@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student15@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student16@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student17@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student18@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student19@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student20@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
('student21@uce.edu.ec',  '$2b$12$DEeh1KAgiCXKJ4bSEATX/eaPZMIDjSzP29IzLhXYhxr7cUjDzDYd2', true),
ON CONFLICT DO NOTHING;

-- Assign roles
-- student1 as STUDENT
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.email = 'student1@uce.edu.ec' AND r.name = 'STUDENT'
ON CONFLICT DO NOTHING;

-- admin as ADMIN
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.email = 'admin@uce.edu.ec' AND r.name = 'ADMIN'
ON CONFLICT DO NOTHING;

-- all extra students as STUDENT
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.email IN (
  'student2@uce.edu.ec','student3@uce.edu.ec','student4@uce.edu.ec','student5@uce.edu.ec',
  'student6@uce.edu.ec','student7@uce.edu.ec','student8@uce.edu.ec','student9@uce.edu.ec',
  'student10@uce.edu.ec','student11@uce.edu.ec','student12@uce.edu.ec','student13@uce.edu.ec',
  'student14@uce.edu.ec','student15@uce.edu.ec','student16@uce.edu.ec','student17@uce.edu.ec',
  'student18@uce.edu.ec','student19@uce.edu.ec','student20@uce.edu.ec','student21@uce.edu.ec'
)
AND r.name = 'STUDENT'
ON CONFLICT DO NOTHING;
