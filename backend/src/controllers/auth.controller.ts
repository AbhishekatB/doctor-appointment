import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.services";
import { registerSchema, loginSchema } from "../validations/auth.validation";

export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error);
  }

  try {
    const user = await registerUser(
      parsed.data.name,
      parsed.data.email,
      parsed.data.password
    );

    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error);
  }

  try {
    const result = await loginUser(
      parsed.data.email,
      parsed.data.password
    );

    res.json(result);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};