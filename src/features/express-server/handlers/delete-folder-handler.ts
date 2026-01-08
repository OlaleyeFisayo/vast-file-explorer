import type { RequestHandler } from "express";

import z4 from "zod/v4";

import { deleteFolder } from "../../file-explorer/helpers/delete-folder";

const deleteFolderSchema = z4.object({ path: z4.string() });

export const deleteFolderHandler: RequestHandler = async (req, res) => {
  const result = deleteFolderSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z4.flattenError(result.error));
    return;
  }

  const { path } = result.data;
  try {
    await deleteFolder(path);
    res.json({ message: "Folder Deleted Successfully" });
  }
  catch (error: any) {
    throw new Error(error);
  }
};
