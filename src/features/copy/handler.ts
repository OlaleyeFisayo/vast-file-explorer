import type { RequestHandler } from "express";

import z from "zod/v4";

import {
  copyItem,
  copyItems,
} from "./logic";

const batchCopySchema = z.object({
  items: z.array(z.object({
    sourcePath: z.string(),
    destinationDir: z.string().optional(),
  })),
});

export const batchCopyHandler: RequestHandler = async (req, res) => {
  const result = batchCopySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.flattenError(result.error));
    return;
  }

  try {
    await copyItems(result.data.items);
    res.json({ message: "Items copied successfully" });
  }
  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const copySchema = z.object({
  sourcePath: z.string(),
  destinationDir: z.string().optional(),
});

export const copyHandler: RequestHandler = async (req, res) => {
  const result = copySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(z.flattenError(result.error));
    return;
  }

  const {
    sourcePath,
    destinationDir,
  } = result.data;
  try {
    await copyItem(sourcePath, destinationDir);
    res.json({ message: "Item copied successfully" });
  }
  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
