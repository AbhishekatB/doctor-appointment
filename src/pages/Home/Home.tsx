import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <h1 style={s.title}>
          Welcome back, <span style={s.accent}>{user?.name ?? "there"}</span> 👋
        </h1>
        <p style={s.subtitle}>
          Find a specialist, book an appointment, and manage your health — all in one place.
        </p>
        <div style={s.actions}>
          <button style={s.primary} onClick={() => navigate("/doctors")}>
            Browse Doctors
          </button>
          <button style={s.secondary} onClick={() => navigate("/my-appointments")}>
            My Appointments
          </button>
        </div>
      </div>

      <div style={s.cards}>
        {[
          { icon: "🩺", title: "Find Specialists", desc: "Search by specialization and book with top-rated doctors." },
          { icon: "📅", title: "Easy Scheduling",  desc: "Pick a date & time that works for you in seconds." },
          { icon: "📋", title: "Track History",    desc: "View all your past and upcoming appointments." },
        ].map((c) => (
          <div key={c.title} style={s.card}>
            <div style={s.icon}>{c.icon}</div>
            <h3 style={s.cardTitle}>{c.title}</h3>
            <p  style={s.cardDesc}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const s: Record<string, React.CSSProperties> = {
  page:      { maxWidth: 1000, margin: "0 auto", padding: "48px 20px 60px" },
  hero:      { textAlign: "center", marginBottom: 48 },
  title:     { fontSize: "2.2rem", fontWeight: 800, color: "#1a1a2e", margin: "0 0 12px" },
  accent:    { background: "linear-gradient(135deg,#667eea,#764ba2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  subtitle:  { color: "#666", fontSize: 16, maxWidth: 480, margin: "0 auto 28px" },
  actions:   { display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" },
  primary:   { padding: "12px 28px", borderRadius: 24, border: "none", background: "linear-gradient(135deg,#667eea,#764ba2)", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" },
  secondary: { padding: "12px 28px", borderRadius: 24, border: "1.5px solid #667eea", background: "transparent", color: "#667eea", fontWeight: 700, fontSize: 15, cursor: "pointer" },
  cards:     { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 20 },
  card:      { background: "#fff", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,.08)", textAlign: "center" },
  icon:      { fontSize: 36, marginBottom: 14 },
  cardTitle: { margin: "0 0 8px", fontSize: 17, fontWeight: 700, color: "#1a1a2e" },
  cardDesc:  { color: "#666", fontSize: 14, lineHeight: 1.6, margin: 0 },
};

export default Home;
