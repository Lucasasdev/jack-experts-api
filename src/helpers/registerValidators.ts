import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

export const isValidEmail = (email: string): boolean => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const isValidPassword = (password: string): boolean => {
  const maxLength = 8;
  return password.length >= maxLength;
};

export const isEmailExist = async (email: string): Promise<boolean> => {
  const count = await prismaClient.user.count({
    where: {
      email: email,
    },
  });
  return count > 0;
};
