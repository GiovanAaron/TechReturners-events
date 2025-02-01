
import jwt from "jsonwebtoken";

export const generateToken = (userId: number, JWT_SECRET: string) => {
  return jwt.sign({ user_id: userId }, JWT_SECRET);
};

export const getUserByRole = (users: any, role: string) => {
    return users.find((user: any)  => user.access_type === role);
  };