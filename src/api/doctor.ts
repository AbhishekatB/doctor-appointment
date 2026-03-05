import axios from "axios";
import type {
  AuthResponse,
  Doctor,
  Appointment,
  AppointmentSeverity,
} from "../types/doctor";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

export const api = axios.create({ baseURL: BASE_URL });

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ── Auth ──────────────────────────────────────────────────────────────────── */

export const loginApi = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", { email, password });
  return data;
};

export const registerApi = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/register", { name, email, password });
  return data;
};

/* ── Doctors ───────────────────────────────────────────────────────────────── */

export const fetchDoctors = async (availableOnly = true): Promise<Doctor[]> => {
  const { data } = await api.get<Doctor[]>("/doctors", {
    params: availableOnly ? { available: "true" } : {},
  });
  return data;
};

export const fetchDoctorById = async (id: string): Promise<Doctor> => {
  const { data } = await api.get<Doctor>(`/doctors/${id}`);
  return data;
};

/* ── Appointments ──────────────────────────────────────────────────────────── */

export interface BookingPayload {
  doctorId: string;          // UUID
  appointmentDate: string;   // DATE string (YYYY-MM-DD)
  symptoms: string;
  severity: AppointmentSeverity;
}

export const bookAppointmentApi = async (
  payload: BookingPayload
): Promise<Appointment> => {
  const { data } = await api.post<Appointment>("/appointments", payload);
  return data;
};

export const fetchMyAppointments = async (): Promise<Appointment[]> => {
  const { data } = await api.get<Appointment[]>("/appointments/mine");
  return data;
};


export const getAppointmentsByEmailApi = async (
  email: string
): Promise<Appointment[]> => {
  const { data } = await api.get<Appointment[]>(`/appointments?email=${encodeURIComponent(email)}`);
  return data;
};
