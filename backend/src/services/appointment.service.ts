import { pool } from "../config/db";

export interface AppointmentInput {
  userId: string;            // UUID
  doctorId: string;          // UUID
  appointmentDate: string;   // DATE string (YYYY-MM-DD)
  symptoms: string;
  severity: "low" | "medium" | "high" | "critical";
}

const WITH_DOCTOR = `
  a.id,
  a.user_id,
  a.doctor_id,
  a.appointment_date,
  a.symptoms,
  a.severity,
  a.ai_summary,
  a.status,
  a.created_at,
  d.name            AS doctor_name,
  d.specialization  AS doctor_specialization
`;

export const createAppointment = async (data: AppointmentInput) => {
  const { userId, doctorId, appointmentDate, symptoms, severity } = data;

  const result = await pool.query(
    `INSERT INTO appointments (user_id, doctor_id, appointment_date, symptoms, severity)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, user_id, doctor_id, appointment_date, symptoms, severity,
               ai_summary, status, created_at`,
    [userId, doctorId, appointmentDate, symptoms, severity]
  );

  // fetch joined row so caller gets doctor_name too
  const row = result.rows[0];
  const joined = await pool.query(
    `SELECT ${WITH_DOCTOR}
     FROM appointments a
     JOIN doctors d ON d.id = a.doctor_id
     WHERE a.id = $1`,
    [row.id]
  );
  return joined.rows[0];
};

export const getAppointmentsByUser = async (userId: string) => {
  const result = await pool.query(
    `SELECT ${WITH_DOCTOR}
     FROM appointments a
     JOIN doctors d ON d.id = a.doctor_id
     WHERE a.user_id = $1
     ORDER BY a.appointment_date DESC`,
    [userId]
  );
  return result.rows;
};

export const getAllAppointments = async () => {
  const result = await pool.query(
    `SELECT ${WITH_DOCTOR}
     FROM appointments a
     JOIN doctors d ON d.id = a.doctor_id
     ORDER BY a.appointment_date DESC`
  );
  return result.rows;
};

