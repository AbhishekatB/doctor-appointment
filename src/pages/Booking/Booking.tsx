import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { bookAppointmentApi, fetchDoctorById } from "../../api/doctor";
import type { Doctor, AppointmentSeverity } from "../../types/doctor";
import "./Booking.css";

/* ── Schema ─────────────────────────────────────────────────────────────────── */
const bookingSchema = z.object({
  appointmentDate: z.string().min(1, "Please select a date & time"),
  symptoms:        z.string().min(3, "Please describe your symptoms"),
  severity:        z.enum(["low", "medium", "high", "critical"] as const),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const SEVERITY_OPTIONS: { value: AppointmentSeverity; label: string; color: string }[] = [
  { value: "low",      label: "Low – Minor / routine",     color: "#15803d" },
  { value: "medium",   label: "Medium – Moderate concern", color: "#d97706" },
  { value: "high",     label: "High – Significant pain",   color: "#dc2626" },
  { value: "critical", label: "Critical – Emergency",      color: "#7c3aed" },
];

/* ── Component ──────────────────────────────────────────────────────────────── */
const Booking: React.FC = () => {
  const { id: doctorId = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [doctorLoading, setDoctorLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormData>({ resolver: zodResolver(bookingSchema) });

  useEffect(() => {
    if (!doctorId) return;
    fetchDoctorById(doctorId)
      .then(setDoctor)
      .catch(() => setDoctor(null))
      .finally(() => setDoctorLoading(false));
  }, [doctorId]);

  const onSubmit = async (data: BookingFormData) => {
    setServerError("");
    try {
      await bookAppointmentApi({ ...data, doctorId });
      setSuccess(true);
      reset();
    } catch (err: any) {
      const errors = err?.response?.data?.errors;
      if (errors) {
        const first = Object.values(errors)[0];
        setServerError(Array.isArray(first) ? first[0] : String(first));
      } else {
        setServerError(err?.response?.data?.message ?? "Booking failed.");
      }
    }
  };

  if (doctorLoading) return <div className="booking-state">Loading doctor info…</div>;
  if (!doctor)       return <div className="booking-state error">Doctor not found.</div>;

  return (
    <div className="booking-page">
      {/* Doctor summary card */}
      <div className="booking-doctor-card">
        <div className="booking-doctor-avatar">{doctor.name.charAt(0)}</div>
        <div className="booking-doctor-info">
          <h2>{doctor.name}</h2>
          <span className="booking-spec">{doctor.specialization}</span>
          <div className="booking-meta">
            <span>🩺 {doctor.experience} yrs exp</span>
            <span>💵 ₹{Number(doctor.consultation_fee).toLocaleString()}</span>
            <span>⭐ {Number(doctor.rating).toFixed(1)}</span>
          </div>
        </div>
      </div>

      {success ? (
        <div className="booking-success">
          <div className="booking-success-icon">✓</div>
          <h3>Appointment Booked!</h3>
          <p>Your appointment with <strong>{doctor.name}</strong> has been confirmed.</p>
          <div className="booking-success-actions">
            <button onClick={() => setSuccess(false)}>Book Another</button>
            <button className="outline" onClick={() => navigate("/doctors")}>Back to Doctors</button>
          </div>
        </div>
      ) : (
        <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="booking-form-title">Book Appointment</h3>

          {/* Date */}
          <div className="form-field">
            <label htmlFor="appointmentDate">Appointment Date *</label>
            <input
              id="appointmentDate"
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              {...register("appointmentDate")}
            />
            {errors.appointmentDate && (
              <span className="field-error">{errors.appointmentDate.message}</span>
            )}
          </div>

          {/* Symptoms */}
          <div className="form-field">
            <label htmlFor="symptoms">Symptoms *</label>
            <textarea
              id="symptoms"
              rows={4}
              placeholder="Describe your symptoms in detail…"
              {...register("symptoms")}
            />
            {errors.symptoms && (
              <span className="field-error">{errors.symptoms.message}</span>
            )}
          </div>

          {/* Severity */}
          <div className="form-field">
            <label>Severity *</label>
            <div className="severity-grid">
              {SEVERITY_OPTIONS.map((opt) => (
                <label key={opt.value} className="severity-option">
                  <input type="radio" value={opt.value} {...register("severity")} />
                  <span style={{ "--dot": opt.color } as React.CSSProperties}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.severity && (
              <span className="field-error">{errors.severity.message}</span>
            )}
          </div>

          {serverError && <div className="booking-error">{serverError}</div>}

          <button type="submit" className="booking-submit" disabled={isSubmitting}>
            {isSubmitting ? "Confirming…" : "Confirm Appointment"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Booking;

