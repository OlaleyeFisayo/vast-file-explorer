import type { RequestHandler } from "express";

import z from "zod/v4";

import { createFolder } from "./logic";

const createFolderSchema = z.object({
  name: z.string(),
  dirPath: z.string().optional(),
});

export const createFolderHandler: RequestHandler = async (req, res) => {
  const result = createFolderSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.flattenError(result.error));
    return;
  }

  const {
    name,
    dirPath,
  } = result.data;
  try {
    await createFolder(name, dirPath);
    res.json({ message: "Folder Created Successfully" });
  }
  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
