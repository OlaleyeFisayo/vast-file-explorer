import type { RequestHandler } from "express";

import z from "zod/v4";

import { renameItem } from "./logic";

const renameItemSchema = z.object({
  path: z.string(),
  newName: z.string(),
});

export const renameItemHandler: RequestHandler = async (req, res) => {
  const result = renameItemSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.flattenError(result.error));
    return;
  }

  const {
    path,
    newName,
  } = result.data;
  try {
    await renameItem(path, newName);
    res.json({ message: "Item Renamed Successfully" });
  }
  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
