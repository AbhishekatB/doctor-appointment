import { useState } from "react";
import { useDoctors } from "../../hooks/useDoctors";
import DoctorCard from "../../components/DoctorCard";
import "./Doctors.css";

const Doctors: React.FC = () => {
  const [availableOnly, setAvailableOnly] = useState(true);
  const [search, setSearch] = useState("");
  const { doctors, loading, error } = useDoctors(availableOnly);

  const filtered = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="doctors-page">
      <div className="doctors-header">
        <h1>Find a Doctor</h1>
        <p>Browse qualified specialists and book your appointment instantly.</p>
      </div>

      <div className="doctors-controls">
        <input
          className="doctors-search"
          type="text"
          placeholder="Search by name or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label className="doctors-toggle">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
          />
          Available only
        </label>
      </div>

      {loading && <div className="doctors-state">Loading doctors...</div>}
      {error   && <div className="doctors-state error">{error}</div>}
      {!loading && !error && filtered.length === 0 && (
        <div className="doctors-state">No doctors found.</div>
      )}

      <div className="doctors-grid">
        {filtered.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </div>
  );
};

export default Doctors;
