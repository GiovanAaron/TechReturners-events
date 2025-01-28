import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  fetchAllUsers,
  fetchUserById,
  createUser,
  updateUser,
  eraseUserById,
} from "../models/index";

const saltRounds = 10;
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await fetchAllUsers();

    users.forEach((user: any) => {
      delete user.password_hash;
    });

    res.status(200).send({ users });

    // res.status(200).send({ users });
  } catch (error: any) {
    res.status(500).send({ error: "Error fetching users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      res.status(400).send({ error: "Bad Request" });
      return;
    }
    const user = await fetchUserById(id);

    delete user.password_hash;

    res.status(200).send({ user });
  } catch (error: any) {
    res.status(error.status).send({ error: error.msg });
  }
};

// export const postUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { password, ...userDetails } = req.body;

//     // Check if password is provided
//     if (!password) {
//       return res.status(400).send({ error: "Password is required" });
//     }

//     // Hash the password using bcrypt
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Create a new user with hashed password
//     const newUser = await createUser({
//       ...userDetails,
//       password: hashedPassword,
//     });
//     res.status(201).send({ newUser });
//   } catch (error: any) {
//     // next(error);
//   }
// };

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, ...userDetails } = req.body;

    // Check if password is provided
    if (!password) {
       res.status(400).send({ error: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log(hashedPassword); // hashedPassword
    // Create a new user with hashed password
    const newUser = await createUser({
      ...userDetails,
      password_hash: hashedPassword,
    });
    res.status(201).send({ newUser });
  } catch (err) {
    next(err);
  }
};


export const patchUser = async (req: Request, res: Response, next: any) => {
  try {
    const { id } = req.params;

    const updatedRequest = req.body;

    const updatedUser = await updateUser(id, updatedRequest);

    res.status(200).send({ updatedUser });
  } catch (error: any) {
    next({ status: 500, msg: `PSQL error: ${error.code}` });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const erasedUser = await eraseUserById(id);
    console.log(erasedUser);
    res.status(200).send({ erasedUser });
  } catch (error: any) {
    res.status(error.status).send({ error: error.msg });
  }
};


// export const fetchUserByEmail = async (email: string) => {
//   try {
//     const result = await client.query(`SELECT * FROM Users WHERE email = $1`, [email]);
//     return result.rows[0];
//   } catch (error: any) {
//     throw error;
//   }
// };