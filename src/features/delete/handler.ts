import type { RequestHandler } from "express";

import z from "zod/v4";

import {
  deleteItem,
  deleteItems,
} from "./logic";

const batchDeleteSchema = z.object({ paths: z.array(z.string()) });

export const batchDeleteHandler: RequestHandler = async (req, res) => {
  const result = batchDeleteSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.flattenError(result.error));
    return;
  }

  try {
    await deleteItems(result.data.paths);
    res.json({ message: "Items deleted successfully" });
  }
  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

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
