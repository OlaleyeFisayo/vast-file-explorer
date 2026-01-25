import type { RequestHandler } from "express";

import z from "zod/v4";

import { copyFileItem } from "./logic";

const copyFileSchema = z.object({
  sourcePath: z.string(),
  destinationDir: z.string().optional(),
});

export const copyFileHandler: RequestHandler = async (req, res) => {
  const result = copyFileSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.flattenError(result.error));
    return;
  }

  const {
    sourcePath,
    destinationDir,
  } = result.data;
  try {
    await copyFileItem(sourcePath, destinationDir);
    res.json({ message: "File Copied Successfully" });
  }
  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
