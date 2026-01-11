import type { RequestHandler } from "express";

import z4 from "zod/v4";

import { copyFolderItem } from "./logic";

const copyFolderSchema = z4.object({
  sourcePath: z4.string(),
  destinationDir: z4.string().optional(),
});

export const copyFolderHandler: RequestHandler = async (req, res) => {
  const result = copyFolderSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z4.flattenError(result.error));
    return;
  }

  const {
    sourcePath,
    destinationDir,
  } = result.data;
  try {
    await copyFolderItem(sourcePath, destinationDir);
    res.json({ message: "Folder Copied Successfully" });
  }
  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
