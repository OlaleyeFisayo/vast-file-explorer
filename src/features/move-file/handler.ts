import type { RequestHandler } from "express";

import z from "zod/v4";

import { moveFileItem } from "./logic";

const moveFileSchema = z.object({
  sourcePath: z.string(),
  destinationDir: z.string().optional(),
});

export const moveFileHandler: RequestHandler = async (req, res) => {
  const result = moveFileSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.flattenError(result.error));
    return;
  }

  const {
    sourcePath,
    destinationDir,
  } = result.data;
  try {
    await moveFileItem(sourcePath, destinationDir);
    res.json({ message: "File Moved Successfully" });
  }
  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
