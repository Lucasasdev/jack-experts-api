import { Request, Response } from "express";
import * as repository from "../repositories/repository";
import { User } from "@prisma/client";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as User;
    const user = await repository.registerUser({
      name,
      email,
      password,
    });

    if (user) {
      return res.sendStatus(201);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
