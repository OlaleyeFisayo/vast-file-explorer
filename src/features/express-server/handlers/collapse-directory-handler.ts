import type { RequestHandler } from "express";

import z4 from "zod/v4";

import { collapseDirectory } from "../../file-explorer/helpers/collapse-directory";
import { FileTree } from "../../file-explorer/variables";

const collapseDirectorySchema = z4.object({ path: z4.string() });

export const collapseDirectoryHandler: RequestHandler = async (req, res) => {
  const result = collapseDirectorySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z4.flattenError(result.error));
    return;
  }

  const { path } = result.data;

  await collapseDirectory(path);

  res.json(FileTree);
};
