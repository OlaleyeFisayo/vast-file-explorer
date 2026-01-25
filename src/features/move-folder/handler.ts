import type { RequestHandler } from "express";

import z from "zod/v4";

import { moveFolderItem } from "./logic";

const moveFolderSchema = z.object({
  sourcePath: z.string(),
  destinationDir: z.string().optional(),
});

export const moveFolderHandler: RequestHandler = async (req, res) => {
  const result = moveFolderSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.flattenError(result.error));
    return;
  }

  const {
    sourcePath,
    destinationDir,
  } = result.data;
  try {
    await moveFolderItem(sourcePath, destinationDir);
    res.json({ message: "Folder Moved Successfully" });
  }
  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
