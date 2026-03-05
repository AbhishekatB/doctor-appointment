import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar: React.FC = () => {
  const { user, token, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={s.nav}>
      <Link to="/" style={s.brand}>🏥 DocBook</Link>

      <div style={s.links}>
        {token ? (
          <>
            <Link to="/doctors" style={s.link}>Doctors</Link>
            <Link to="/my-appointments" style={s.link}>My Appointments</Link>
            <span style={s.user}>👤 {user?.name}</span>
            <button onClick={handleLogout} style={s.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"    style={s.link}>Login</Link>
            <Link to="/register" style={s.linkBtn}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const s: Record<string, React.CSSProperties> = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    height: 60,
    background: "#fff",
    boxShadow: "0 1px 8px rgba(0,0,0,.08)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  brand: {
    fontWeight: 800,
    fontSize: 20,
    color: "#667eea",
    textDecoration: "none",
  },
  links: { display: "flex", alignItems: "center", gap: 20 },
  link: { textDecoration: "none", color: "#444", fontSize: 14, fontWeight: 500 },
  linkBtn: {
    textDecoration: "none",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "#fff",
    padding: "7px 16px",
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 600,
  },
  user: { fontSize: 13, color: "#555" },
  logoutBtn: {
    background: "none",
    border: "1px solid #ddd",
    borderRadius: 20,
    padding: "6px 14px",
    fontSize: 13,
    cursor: "pointer",
    color: "#555",
  },
};

export default Navbar;
