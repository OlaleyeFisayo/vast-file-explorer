import type { RequestHandler } from "express";

import z from "zod/v4";

import { FileTree } from "../../core/variables";
import { expandDirectory } from "./logic";

const expandDirectorySchema = z.object({ path: z.string() });

export const expandDirectoryHandler: RequestHandler = async (req, res) => {
  const result = expandDirectorySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.flattenError(result.error));
    return;
  }

  const { path } = result.data;

  await expandDirectory(path);

  res.json(FileTree);
};
