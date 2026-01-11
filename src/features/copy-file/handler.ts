import type { RequestHandler } from "express";

import z4 from "zod/v4";

import { copyFileItem } from "./logic";

const copyFileSchema = z4.object({
  sourcePath: z4.string(),
  destinationDir: z4.string().optional(),
});

export const copyFileHandler: RequestHandler = async (req, res) => {
  const result = copyFileSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z4.flattenError(result.error));
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
