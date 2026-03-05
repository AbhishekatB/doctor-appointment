import { Router } from "express";
import { listDoctors, getDoctor } from "../controllers/doctors.controller";

const router = Router();

// GET /api/doctors?available=true
router.get("/", listDoctors);

// GET /api/doctors/:id
router.get("/:id", getDoctor);

export default router;
