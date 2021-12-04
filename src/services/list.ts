import { prisma } from "../helpers/prismaClient";
import { NewUser, UserData, NewUserResponse } from "../types/index";

export const createList = async (country: object) => {
  try {
    const data = await prisma.list.create({
      data: {
        country: country,
      },
      select: {
        id: true,
        country: true,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllCountries = async () => {
  try {
    return await prisma.list.findMany();
  } catch (error) {
    throw error;
  }
};

// export const getAllCountries = async () => {
//   try {
//     return await prisma.list.findMany();
//   } catch (error) {
//     throw error;
//   }
// };
