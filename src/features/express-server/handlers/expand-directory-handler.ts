import type { RequestHandler } from "express";

import { z } from "zod";

import { expandDirectory } from "../../file-explorer/helpers/expand-directory";
import { FileTree } from "../../file-explorer/variables";

const expandDirectorySchema = z.object({ path: z.string() });

export const expandDirectoryHandler: RequestHandler = async (req, res) => {
  const result = expandDirectorySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.prettifyError(result.error));
    return;
  }

  const { path } = result.data;

  await expandDirectory(path);

  res.json(FileTree);
};
