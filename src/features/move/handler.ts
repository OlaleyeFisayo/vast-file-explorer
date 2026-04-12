import type { RequestHandler } from "express";

import z from "zod/v4";

import {
  moveItem,
  moveItems,
} from "./logic";

const batchMoveSchema = z.object({
  items: z.array(z.object({
    sourcePath: z.string(),
    destinationDir: z.string().optional(),
  })),
});

export const batchMoveHandler: RequestHandler = async (req, res) => {
  const result = batchMoveSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.flattenError(result.error));
    return;
  }

  try {
    await moveItems(result.data.items);
    res.json({ message: "Items moved successfully" });
  }
  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const moveSchema = z.object({
  sourcePath: z.string(),
  destinationDir: z.string().optional(),
});

export const moveHandler: RequestHandler = async (req, res) => {
  const result = moveSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.flattenError(result.error));
    return;
  }

  const {
    sourcePath,
    destinationDir,
  } = result.data;
  try {
    await moveItem(sourcePath, destinationDir);
    res.json({ message: "Item moved successfully" });
  }
  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
