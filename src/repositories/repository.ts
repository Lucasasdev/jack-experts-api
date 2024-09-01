import { PrismaClient, User } from "@prisma/client";
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
