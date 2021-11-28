import nextConnect from "next-connect";
import { signupUser } from "../../../src/controllers/users";
import { validateSignUp } from "../../../src/middleware/validation/users";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nextConnect().post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    await validateSignUp(req, res);
    await signupUser(req, res);
  }
);

export default handler;
