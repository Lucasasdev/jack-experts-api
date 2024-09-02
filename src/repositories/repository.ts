import { PrismaClient, Task, User } from "@prisma/client";
const prismaClient = new PrismaClient();

export const registerUser = async ({
  name,
  email,
  password,
}: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> => {
  const registedUser = await prismaClient.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  return registedUser;
};

export const login = async (email: string) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};

export const createTask = async ({
  title,
  description,
  userId,
}: Omit<
  Task,
  "id" | "createdAt" | "updatedAt" | "isCompleted"
>): Promise<Task> => {
  const task = await prismaClient.task.create({
    data: {
      title: title,
      description: description,
      userId: userId,
    },
  });
  return task;
};

export const getTasks = async (userId: number): Promise<Task[]> => {
  const tasks = prismaClient.task.findMany({
    where: {
      userId: userId,
    },
  });
  return tasks;
};

export const updateTask = async ({
  id,
  userId,
  title,
  description,
}: Omit<Task, "createdAt" | "updatedAt" | "isCompleted">) => {
  const task = prismaClient.task.update({
    where: {
      id: id,
      userId: userId,
    },
    data: {
      title: title,
      description: description,
    },
  });
  return task;
};
