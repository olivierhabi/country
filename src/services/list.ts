import { prisma } from "../helpers/prismaClient";
import { NewUser, UserData, NewUserResponse } from "../types/index";

export interface Welcome {
  country: Country;
  user: string;
  status: string;
}

export interface Country {}

export const createList = async (props: Welcome) => {
  try {
    const data = await prisma.list.create({
      data: {
        country: props.country,
        userEmail: props.user,
        status: props.status,
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

export const getAllCountries = async (type: string | undefined) => {
  try {
    return await prisma.list.findMany({
      where: {
        status: {
          contains: type,
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

export const deleteCountry = async (id: number) => {
  const IdNumber = Number(id);
  try {
    const result = await prisma.list.delete({
      where: { id: IdNumber },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
export const getCountryById = async (id: number) => {
  try {
    return await prisma.list.findUnique({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    throw error;
  }
};
