import nextConnect from "next-connect";
// import { getModuleById, updateModuleById, deleteModuleById } from '../../../controllers/module';
// import { isAdmin } from '../../../middleware/accesss';
import { deleteFromList } from "../../../src/controllers/list";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nextConnect()
  // .get(async (req, res) => {
  //     await getModuleById(req, res);
  // })
  // .put(async (req, res) => {
  //     await updateModuleById(req, res);
  // })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("========================================================")
    await deleteFromList(req, res);
    // await deleteModuleById(req, res);
  });

export default handler;
