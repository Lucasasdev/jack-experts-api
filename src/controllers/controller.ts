import { Request, Response } from "express";
import * as repository from "../repositories/repository";
import { Task, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import {
  isValidPassword,
  isValidEmail,
  isEmailExist,
} from "../helpers/registerValidators";

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

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (await isEmailExist(email)) {
      return res.status(400).json({ message: "Email already exist" });
    }

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
    return res.json({
      auth: true,
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
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

export const getTasks = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId || typeof userId !== "number") {
      return res
        .status(401)
        .json({ message: "userId must be a integer number" });
    }

    const tasks = await repository.getTasks(userId);

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const id = Number(req.params.id);
    const { title, description } = req.body;

    if (typeof userId !== "number") {
      return res.sendStatus(401);
    }

    if (id === 0 || typeof id !== "number") {
      return res.status(400).json({ message: "Invalid task number" });
    }

    const task = await repository.updateTask({
      userId,
      id,
      title,
      description,
    });

    return res.status(200).json({ message: "Task updated!", task });
  } catch (error) {
    console.error(error);

    return res.sendStatus(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const id = Number(req.params.id);

    if (typeof userId !== "number") {
      return res.sendStatus(401);
    }

    if (id === 0 || typeof id !== "number") {
      return res.status(400).json({ message: "Invalid task number" });
    }

    const task = await repository.deleteTask({ id, userId });

    if (!task) {
      return res.sendStatus(400);
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};
