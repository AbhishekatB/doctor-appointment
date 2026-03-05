import { pool } from "../config/db";

export const getAllDoctors = async () => {
  const result = await pool.query(
    `SELECT id, name, specialization, experience, consultation_fee, rating, available, created_at
     FROM doctors
     ORDER BY rating DESC`
  );
  return result.rows;
};

export const getAvailableDoctors = async () => {
  const result = await pool.query(
    `SELECT id, name, specialization, experience, consultation_fee, rating, available, created_at
     FROM doctors
     WHERE available = TRUE
     ORDER BY rating DESC`
  );
  return result.rows;
};

export const getDoctorById = async (id: string) => {
  const result = await pool.query(
    `SELECT id, name, specialization, experience, consultation_fee, rating, available, created_at
     FROM doctors
     WHERE id = $1`,
    [id]
  );
  return result.rows[0] ?? null;
};
