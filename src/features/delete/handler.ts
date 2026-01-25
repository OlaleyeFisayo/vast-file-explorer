import type { RequestHandler } from "express";

import z from "zod/v4";

import { deleteItem } from "./logic";

const deleteSchema = z.object({ path: z.string() });

export const deleteHandler: RequestHandler = async (req, res) => {
  const result = deleteSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.flattenError(result.error));
    return;
  }

  const { path } = result.data;
  try {
    await deleteItem(path);
    res.json({ message: "Item Deleted Successfully" });
  }
  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
