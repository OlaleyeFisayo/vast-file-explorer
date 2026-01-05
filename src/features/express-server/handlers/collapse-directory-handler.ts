import type { RequestHandler } from "express";

import { z } from "zod";

import { collapseDirectory } from "../../file-explorer/helpers/collapse-directory";
import { FileTree } from "../../file-explorer/variables";

const collapseDirectorySchema = z.object({ path: z.string() });

export const collapseDirectoryHandler: RequestHandler = async (req, res) => {
  const result = collapseDirectorySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.prettifyError(result.error));
    return;
  }

  const { path } = result.data;

  await collapseDirectory(path);

  res.json(FileTree);
};
