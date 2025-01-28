import { Request, Response } from "express";
import {
  fetchAllUsers,
  fetchUserById,
  postUser,
  updateUser,
  eraseUserById
} from "../models/index";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await fetchAllUsers();
    res.status(200).send({ users });
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
    res.status(200).send({ user });
  } catch (error: any) {
    res.status(error.status).send({ error: error.msg });
  }
};

export const createUser = async (req: Request, res: Response, next: any) => {
  try {
    const userDetails = req.body;

    const newUser = await postUser(userDetails);

    res.status(201).send({ newUser });
  } catch (error: any) {
    next(error);
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
    console.log(erasedUser)
    res.status(200).send({ erasedUser });
  } catch (error: any) {
    res.status(error.status).send({ error: error.msg });
  }
};