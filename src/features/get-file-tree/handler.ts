import type { RequestHandler } from "express";

import { FileTree } from "../../core/variables";

export const getFileTreeHandler: RequestHandler = async (req, res) => {
  res.json(FileTree);
};
