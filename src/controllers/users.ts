import bcryptjs from "bcryptjs";
import { getUserByMail, createNewUser } from "../services/users";
import { NextApiRequest, NextApiResponse } from "next";
import { UserData, ResponseUser, ResponseError, User } from "../types";

export const signupUser = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseUser | ResponseError>
) => {
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
};
