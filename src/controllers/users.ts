import bcryptjs from "bcryptjs";
import { getUserByMail, createNewUser, createList } from "../services/users";
import { NextApiRequest, NextApiResponse } from "next";
import { UserData, ResponseUser, ResponseError, User } from "../types";

export const signupUser = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseUser | ResponseError>
) => {
  try {
    const { email, password } = req.body;
    const search = (await getUserByMail(email)) as UserData;
    if (search) {
      return res.status(403).json({
        status: "403",
        message: "Email already exists",
      });
    }
    const hashedPassword = (await bcryptjs.hashSync(password, 10)) as string;
    const user = (await createNewUser({ email, hashedPassword })) as User;
    return res.status(201).json({
      status: "success",
      message: "Signed up successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: `Something Went wrong in ${error}`,
    });
  }
};
