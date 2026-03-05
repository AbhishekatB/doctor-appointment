import { Request, Response } from "express";
import { z } from "zod";
import {
  createAppointment,
  getAppointmentsByUser,
  getAllAppointments,
} from "../services/appointment.service";

const bookingSchema = z.object({
  doctorId:        z.string().uuid("Invalid doctor ID"),
  appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  symptoms:        z.string().min(3, "Please describe your symptoms"),
  severity:        z.enum(["low", "medium", "high", "critical"]),
});

export const bookAppointment = async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId as string | undefined;
  if (!userId) return res.status(401).json({ message: "Authentication required" });

  const parsed = bookingSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
  }

  try {
    const appointment = await createAppointment({ userId, ...parsed.data });
    res.status(201).json(appointment);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyAppointments = async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId as string | undefined;
  if (!userId) return res.status(401).json({ message: "Authentication required" });

  try {
    const appointments = await getAppointmentsByUser(userId);
    res.json(appointments);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const listAllAppointments = async (_req: Request, res: Response) => {
  try {
    const appointments = await getAllAppointments();
    res.json(appointments);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

