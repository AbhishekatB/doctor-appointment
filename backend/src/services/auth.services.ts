import bcrypt from "bcrypt";
import { pool } from "../config/db";
import { generateToken } from "../utils/jwt";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
    [name, email, hashedPassword]
  );

  return result.rows[0];
};

export const loginUser = async (email: string, password: string) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  const user = result.rows[0];
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user.id);

  return { token, user: { id: user.id, name: user.name, email: user.email } };
};