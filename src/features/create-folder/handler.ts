import type { RequestHandler } from "express";

import z4 from "zod/v4";

import { createFolder } from "./logic";

const createFolderSchema = z4.object({
  name: z4.string(),
  dirPath: z4.string().optional(),
});

export const createFolderHandler: RequestHandler = async (req, res) => {
  const result = createFolderSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z4.flattenError(result.error));
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
    throw new Error(error);
  }
};
