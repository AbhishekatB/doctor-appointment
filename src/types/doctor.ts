// ─── Doctor (matches `doctors` table) ───────────────────────────────────────
export interface Doctor {
  id: string;                // UUID
  name: string;
  specialization: string;
  experience: number;        // years
  consultation_fee: number;
  rating: number;
  available: boolean;
  created_at: string;
}

// ─── Appointment (matches `appointments` table) ──────────────────────────────
export type AppointmentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type AppointmentStatus   = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Appointment {
  id: string;                // UUID
  user_id: string;           // UUID
  doctor_id: string;         // UUID
  appointment_date: string;  // DATE string (YYYY-MM-DD)
  symptoms: string | null;
  severity: AppointmentSeverity | null;
  ai_summary: string | null;
  status: AppointmentStatus;
  created_at: string;
  // joined fields returned by API
  doctor_name?: string;
  doctor_specialization?: string;
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export interface AuthUser {
  id: string;                // UUID
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

