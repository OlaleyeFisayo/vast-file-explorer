import type { RequestHandler } from "express";

import z from "zod/v4";

import { openInFileManager } from "./logic";

const openInFileManagerSchema = z.object({ path: z.string() });

export const openInFileManagerHandler: RequestHandler = async (req, res) => {
  const result = openInFileManagerSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.flattenError(result.error));
    return;
  }

  const { path } = result.data;
  try {
    await openInFileManager(path);
    res.status(200).json({ message: "Request completed" });
  }
  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
