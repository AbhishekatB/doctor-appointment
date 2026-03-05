-- Run this SQL to set up your database tables

CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  password   TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS doctors (
  id               SERIAL PRIMARY KEY,
  name             VARCHAR(100) NOT NULL,
  specialization   VARCHAR(100) NOT NULL,
  experience       INTEGER NOT NULL,          -- years
  consultation_fee NUMERIC(10,2) NOT NULL,
  rating           NUMERIC(3,2) DEFAULT 0,
  available        BOOLEAN DEFAULT TRUE,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS appointments (
  id               SERIAL PRIMARY KEY,
  user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  doctor_id        INTEGER NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  appointment_date TIMESTAMPTZ NOT NULL,
  symptoms         TEXT NOT NULL,
  severity         VARCHAR(20) NOT NULL CHECK (severity IN ('low','medium','high','critical')),
  ai_summary       TEXT,
  status           VARCHAR(20) NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending','confirmed','cancelled','completed')),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Sample doctors (run after creating the table)
INSERT INTO doctors (name, specialization, experience, consultation_fee, rating, available)
VALUES
  ('Dr. Ananya Sharma',   'Cardiologist',       12, 800.00, 4.8, TRUE),
  ('Dr. Rohan Mehta',     'Dermatologist',       8, 600.00, 4.6, TRUE),
  ('Dr. Priya Nair',      'Neurologist',        15, 1000.00, 4.9, TRUE),
  ('Dr. Vikram Patel',    'Orthopedic Surgeon', 10, 750.00, 4.7, TRUE),
  ('Dr. Swati Joshi',     'Pediatrician',        6, 500.00, 4.5, TRUE),
  ('Dr. Arjun Kapoor',    'General Physician',   4, 400.00, 4.3, TRUE)
ON CONFLICT DO NOTHING;
