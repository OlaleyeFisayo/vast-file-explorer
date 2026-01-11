import type { RequestHandler } from "express";

import z4 from "zod/v4";

import { moveFolderItem } from "./logic";

const moveFolderSchema = z4.object({
  sourcePath: z4.string(),
  destinationDir: z4.string().optional(),
});

export const moveFolderHandler: RequestHandler = async (req, res) => {
  const result = moveFolderSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z4.flattenError(result.error));
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
