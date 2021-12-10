import nextConnect from "next-connect";
import { deleteFromList } from "../../../src/controllers/list";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nextConnect()
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    await deleteFromList(req, res);
  });

export default handler;
