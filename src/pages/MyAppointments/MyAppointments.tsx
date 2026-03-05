import { useEffect, useState } from "react";
import { fetchMyAppointments } from "../../api/doctor";
import type { Appointment, AppointmentStatus, AppointmentSeverity } from "../../types/doctor";

const STATUS_COLORS: Record<AppointmentStatus, { bg: string; color: string }> = {
  pending:   { bg: "#fef9c3", color: "#854d0e" },
  confirmed: { bg: "#dcfce7", color: "#15803d" },
  cancelled: { bg: "#fee2e2", color: "#991b1b" },
  completed: { bg: "#e0e7ff", color: "#3730a3" },
};

const SEVERITY_COLORS: Record<AppointmentSeverity, string> = {
  low:      "#15803d",
  medium:   "#d97706",
  high:     "#dc2626",
  critical: "#7c3aed",
};

const MyAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    fetchMyAppointments()
      .then(setAppointments)
      .catch((err) => setError(err?.response?.data?.message ?? "Failed to load."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={s.state}>Loading your appointments…</div>;
  if (error)   return <div style={{ ...s.state, color: "#dc2626" }}>{error}</div>;
  if (appointments.length === 0)
    return <div style={s.state}>You have no appointments yet. <a href="/doctors">Book one now →</a></div>;

  return (
    <div style={s.page}>
      <h1 style={s.title}>My Appointments</h1>

      <div style={s.list}>
        {appointments.map((appt) => {
          const sc = STATUS_COLORS[appt.status] ?? STATUS_COLORS.pending;
          const sev = SEVERITY_COLORS[appt.severity ?? "low"] ?? "#999";

          return (
            <div key={appt.id} style={s.card}>
              <div style={s.cardLeft}>
                <div style={s.doctorName}>{appt.doctor_name}</div>
                <div style={s.spec}>{appt.doctor_specialization}</div>

                <div style={s.row}>
                  <span style={s.label}>📅 Date</span>
                  <span>
                    {new Date(appt.appointment_date + "T00:00:00").toLocaleDateString("en-IN", {
                      dateStyle: "medium",
                    })}
                  </span>
                </div>

                <div style={s.row}>
                  <span style={s.label}>🔴 Severity</span>
                  <span style={{ color: sev, fontWeight: 600 }}>{appt.severity}</span>
                </div>

                <div style={s.symptoms}>
                  <span style={s.label}>💊 Symptoms: </span>{appt.symptoms}
                </div>

                {appt.ai_summary && (
                  <div style={s.aiBox}>
                    <strong>🤖 AI Summary:</strong> {appt.ai_summary}
                  </div>
                )}
              </div>

              <div>
                <span style={{ ...s.badge, background: sc.bg, color: sc.color }}>
                  {appt.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const s: Record<string, React.CSSProperties> = {
  page:       { maxWidth: 780, margin: "0 auto", padding: "40px 20px 60px" },
  title:      { fontSize: "1.8rem", fontWeight: 800, color: "#1a1a2e", marginBottom: 28 },
  list:       { display: "flex", flexDirection: "column", gap: 16 },
  card:       { background: "#fff", borderRadius: 12, padding: "20px 24px", boxShadow: "0 2px 10px rgba(0,0,0,.08)", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" },
  cardLeft:   { display: "flex", flexDirection: "column", gap: 8, flex: 1 },
  doctorName: { fontWeight: 700, fontSize: 16, color: "#1a1a2e" },
  spec:       { fontSize: 13, color: "#667eea", fontWeight: 600 },
  row:        { display: "flex", gap: 12, fontSize: 13, color: "#555", flexWrap: "wrap", alignItems: "center" },
  label:      { color: "#999", fontWeight: 500 },
  symptoms:   { fontSize: 13, color: "#444", lineHeight: 1.5 },
  aiBox:      { fontSize: 13, background: "#f5f3ff", border: "1px solid #e0e7ff", borderRadius: 8, padding: "8px 12px", color: "#4338ca", lineHeight: 1.5 },
  badge:      { display: "inline-block", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, textTransform: "capitalize" },
  state:      { textAlign: "center", padding: "80px 20px", color: "#888", fontSize: 15 },
};

export default MyAppointments;
