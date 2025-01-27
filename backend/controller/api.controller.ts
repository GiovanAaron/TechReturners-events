import { Request, Response } from "express";
import { fetchAllUsers, fetchUserById, postUser } from "../models/index";

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
