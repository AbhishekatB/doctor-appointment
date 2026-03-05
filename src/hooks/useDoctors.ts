import { useEffect, useState } from "react";
import { fetchDoctors } from "../api/doctor";
import type { Doctor } from "../types/doctor";

export const useDoctors = (availableOnly = true) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchDoctors(availableOnly)
      .then((data) => { if (!cancelled) setDoctors(data); })
      .catch((err) => {
        if (!cancelled)
          setError(err?.response?.data?.message ?? "Failed to load doctors");
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [availableOnly]);

  return { doctors, loading, error };
};
