import type { RequestHandler } from "express";

import z4 from "zod/v4";

import { createFile } from "./logic";

const createFileSchema = z4.object({
  name: z4.string(),
  dirPath: z4.string().optional(),

});

export const createFileHandler: RequestHandler = async (req, res) => {
  const result = createFileSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z4.flattenError(result.error));
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
    throw new Error(error);
  }
};
