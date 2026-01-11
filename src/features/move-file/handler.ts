import type { RequestHandler } from "express";

import z4 from "zod/v4";

import { moveFileItem } from "./logic";

const moveFileSchema = z4.object({
  sourcePath: z4.string(),
  destinationDir: z4.string().optional(),
});

export const moveFileHandler: RequestHandler = async (req, res) => {
  const result = moveFileSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z4.flattenError(result.error));
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
