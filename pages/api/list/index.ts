import nextConnect from "next-connect";
import { createListed, getCreatedList } from "../../../src/controllers/list";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nextConnect()
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    await createListed(req, res);
  })
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    await getCreatedList(req, res)
    res.status(200).json({ data: "This is data" });
  });

export default handler;
