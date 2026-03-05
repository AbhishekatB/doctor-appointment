import { Router } from "express";
import {
  bookAppointment,
  getMyAppointments,
  listAllAppointments,
} from "../controllers/appointment.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// POST /api/appointments — book an appointment (auth required)
router.post("/", authenticate, bookAppointment);

// GET /api/appointments/mine — get logged-in user's appointments
router.get("/mine", authenticate, getMyAppointments);

// GET /api/appointments/all — admin: all appointments
router.get("/all", authenticate, listAllAppointments);

export default router;

