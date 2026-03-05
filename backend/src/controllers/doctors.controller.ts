import { Request, Response } from "express";
import {
  getAllDoctors,
  getAvailableDoctors,
  getDoctorById,
} from "../services/doctors.service";

export const listDoctors = async (req: Request, res: Response) => {
  try {
    const { available } = req.query;
    const doctors =
      available === "true" ? await getAvailableDoctors() : await getAllDoctors();
    res.json(doctors);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getDoctor = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Invalid doctor ID" });

  try {
    const doctor = await getDoctorById(id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
