import type { RequestHandler } from "express";

import z4 from "zod/v4";

import { FileTree } from "../../core/variables";
import { expandDirectory } from "./logic";

const expandDirectorySchema = z4.object({ path: z4.string() });

export const expandDirectoryHandler: RequestHandler = async (req, res) => {
  const result = expandDirectorySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z4.flattenError(result.error));
    return;
  }

  const { path } = result.data;

  await expandDirectory(path);

  res.json(FileTree);
};
