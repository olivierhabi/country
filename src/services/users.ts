import { prisma } from "../helpers/prismaClient";
import { NewUser, UserData, NewUserResponse } from "../types/index";

export const getUserByMail = async (
  email: string
): Promise<UserData | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        emailVerified: true,
        country: true,
        birthdate: true,
        firstName: true,
        lastName: true,
      },
    });
    if (user) {
      return user;
    }
    return null;
  } catch (error) {
    throw error;
  }
};
export const createNewUser = async (newUser: NewUser<NewUserResponse>) => {
  try {
    const data = await prisma.user.create({
      data: {
        email: newUser.email,
        password: newUser.hashedPassword,
        country: newUser.country,
        birthdate: newUser.birthdate,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      select: {
        id: true,
        email: true,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
export const createList = async (country: object) => {
  try {
    const data = await prisma.list.create({
      data: {
        country: country,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
