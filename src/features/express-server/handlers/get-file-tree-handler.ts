import type { RequestHandler } from "express";

import { FileTree } from "../../file-explorer/variables";

export const getFileTreeHandler: RequestHandler = async (req, res) => {
  res.json(FileTree);
};
