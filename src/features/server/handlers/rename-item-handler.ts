import type { RequestHandler } from "express";

import z4 from "zod/v4";

import { renameItem } from "../../file-explorer/helpers/rename-item";

const renameItemSchema = z4.object({
  path: z4.string(),
  newName: z4.string(),
});

export const renameItemHandler: RequestHandler = async (req, res) => {
  const result = renameItemSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z4.flattenError(result.error));
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
