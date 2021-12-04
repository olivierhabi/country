import { createList, getAllCountries } from "../services/list";
import { NextApiRequest, NextApiResponse } from "next";
import { UserData, ResponseUser, ResponseError, User } from "../types";

export const createListed = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const data = await createList(req.body);
    return res.status(201).json({
      status: "success",
      message: "Added country successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: `Something Went wrong in ${error}`,
    });
  }
};

export const getCreatedList = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const countries = (await getAllCountries()) as Array<
      null[] | string[] | any
    >;
    const myList: Array<string> = [];
    if (countries.length !== 0) {
      for (var i = 0; i < countries.length; i++) {
        console.log(typeof countries[i].country);
        myList.push(countries[i].country.cca2);
      }
    }
    return res.status(200).json({
      status: "success",
      message: "Added countries successfully",
      data: countries,
      cca2list: myList,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: `Something Went wrong in ${error}`,
    });
  }
};
