import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { fetchUserByEmail } from "../models/index"; // Adjust to your actual model function

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Store securely in .env file
const JWT_EXPIRATION = "1h"; // Token expiration (e.g., 1 hour)

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    console.log(email)

    // Fetch the user by email
    const user = await fetchUserByEmail(email);
    if (!user) {
       res.status(404).send({ error: "User not found" });
    }

    // Compare passwords using bcrypt


    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {

        console.log("invalid password")
       res.status(401).send({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        access_type: user.access_type, // Include role/permissions
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    // Send token to the client
    res.status(200).send({ token, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
};