import { Request, Response } from "express";
import * as repository from "../repositories/repository";
import { Task, User } from "@prisma/client";
import jwt from "jsonwebtoken";

export interface UserPayload {
  userId: number;
  iat: number;
  exp: number;
}

export interface CustomRequest extends Request {
  user?: UserPayload;
}

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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as User;
    const user = await repository.login(email);

    if (!user || password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id },
      String(process.env.JWT_SECRET),
      {
        expiresIn: 1200,
      },
    );
    return res.json({ auth: true, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createTask = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { title, description } = req.body as Task;

    if (typeof userId !== "number") {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const task = await repository.createTask({ title, description, userId });

    if (!task) {
      return res.sendStatus(400);
    }

    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
