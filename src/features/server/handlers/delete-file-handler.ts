import type { RequestHandler } from "express";

import z4 from "zod/v4";

import { deleteFile } from "../../file-explorer/helpers/delete-file";

const deleteFileSchema = z4.object({ path: z4.string() });

export const deleteFileHandler: RequestHandler = async (req, res) => {
  const result = deleteFileSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z4.flattenError(result.error));
    return;
  }

  const { path } = result.data;
  try {
    await deleteFile(path);
    res.json({ message: "File Deleted Successfully" });
  }
  catch (error: any) {
    throw new Error(error);
  }
};
