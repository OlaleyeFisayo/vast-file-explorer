import type { RequestHandler } from "express";

import z4 from "zod/v4";

import { searchFiles } from "./logic";

const searchSchema = z4.object({ query: z4.string().min(1) });

export const searchHandler: RequestHandler = async (req, res) => {
  const result = searchSchema.safeParse(req.query);

  if (!result.success) {
    res.status(400).json(z4.flattenError(result.error));
    return;
  }

  const { query } = result.data;

  try {
    const matches = await searchFiles(query);
    res.json(matches);
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
