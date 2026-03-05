import { useNavigate } from "react-router-dom";
import type { Doctor } from "../types/doctor";

interface Props {
  doctor: Doctor;
}

const severityColors: Record<string, string> = {};

const DoctorCard: React.FC<Props> = ({ doctor }) => {
  const navigate = useNavigate();

  const stars = "★".repeat(Math.round(doctor.rating)) +
    "☆".repeat(5 - Math.round(doctor.rating));

  return (
    <div style={s.card}>
      <div style={s.avatar}>
        {doctor.name.charAt(0)}
      </div>

      <div style={s.body}>
        <h3 style={s.name}>{doctor.name}</h3>
        <span style={s.spec}>{doctor.specialization}</span>

        <div style={s.meta}>
          <span title="Experience">🩺 {doctor.experience} yrs exp</span>
          <span title="Consultation fee">💵 ₹{Number(doctor.consultation_fee).toLocaleString()}</span>
        </div>

        <div style={s.metaRow}>
          <span style={s.stars} title="Rating">{stars} {Number(doctor.rating).toFixed(1)}</span>
          <span style={doctor.available ? s.badgeGreen : s.badgeRed}>
            {doctor.available ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      <button
        style={s.btn}
        disabled={!doctor.available}
        onClick={() => navigate(`/booking/${doctor.id}`)}
      >
        Book Now
      </button>
    </div>
  );
};

const s: Record<string, React.CSSProperties> = {
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
    background: "#fff",
    transition: "transform .15s",
    cursor: "default",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "#fff",
    fontSize: 24,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  body: { display: "flex", flexDirection: "column", gap: 6 },
  name: { margin: 0, fontSize: 16, fontWeight: 700, color: "#1a1a2e" },
  spec: {
    fontSize: 13,
    color: "#667eea",
    fontWeight: 600,
    background: "#f0f0ff",
    padding: "2px 8px",
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  meta: { display: "flex", gap: 12, fontSize: 13, color: "#555", flexWrap: "wrap" },
  metaRow: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  stars: { color: "#f59e0b", fontSize: 13 },
  badgeGreen: {
    fontSize: 11, fontWeight: 600, color: "#15803d",
    background: "#dcfce7", padding: "2px 8px", borderRadius: 20,
  },
  badgeRed: {
    fontSize: 11, fontWeight: 600, color: "#991b1b",
    background: "#fee2e2", padding: "2px 8px", borderRadius: 20,
  },
  btn: {
    marginTop: 4,
    padding: "10px 0",
    borderRadius: 8,
    border: "none",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    opacity: 1,
  },
};

export default DoctorCard;
