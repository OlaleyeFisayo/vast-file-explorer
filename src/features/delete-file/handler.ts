import type { RequestHandler } from "express";

import z from "zod/v4";

import { deleteFile } from "./logic";

const deleteFileSchema = z.object({ path: z.string() });

export const deleteFileHandler: RequestHandler = async (req, res) => {
  const result = deleteFileSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.flattenError(result.error));
    return;
  }

  const { path } = result.data;
  try {
    await deleteFile(path);
    res.json({ message: "File Deleted Successfully" });
  }
  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
