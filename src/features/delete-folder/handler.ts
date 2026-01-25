import type { RequestHandler } from "express";

import z from "zod/v4";

import { deleteFolder } from "./logic";

const deleteFolderSchema = z.object({ path: z.string() });

export const deleteFolderHandler: RequestHandler = async (req, res) => {
  const result = deleteFolderSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.flattenError(result.error));
    return;
  }

  const { path } = result.data;
  try {
    await deleteFolder(path);
    res.json({ message: "Folder Deleted Successfully" });
  }
  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
