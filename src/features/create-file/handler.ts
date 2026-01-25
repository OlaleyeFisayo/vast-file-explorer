import type { RequestHandler } from "express";

import z from "zod/v4";

import { createFile } from "./logic";

const createFileSchema = z.object({
  name: z.string(),
  dirPath: z.string().optional(),

});

export const createFileHandler: RequestHandler = async (req, res) => {
  const result = createFileSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.flattenError(result.error));
    return;
  }

  const {
    name,
    dirPath,
  } = result.data;
  try {
    await createFile(name, dirPath);
    res.json({ message: "File Created Successfully" });
  }
  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
