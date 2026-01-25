import {
  cp,
  lstat,
  rm,
} from "node:fs/promises";
import path from "node:path";

import { globalOptions } from "../../shared/variables";

export async function moveItem(sourcePath: string, destinationDir?: string): Promise<void> {
  const targetDir = destinationDir ?? globalOptions.rootPath;

  try {
    await lstat(sourcePath);
  }
  catch (error: any) {
    if (error.code === "ENOENT") {
      throw new Error(`Source item does not exist: ${sourcePath}`);
    }
    throw error;
  }

  const itemName = path.basename(sourcePath);
  const destinationPath = path.join(targetDir!, itemName);

  try {
    const destStats = await lstat(destinationPath);
    const type = destStats.isDirectory() ? "folder" : "file";
    throw new Error(`A ${type} with the name "${itemName}" already exists at the destination.`);
  }
  catch (error: any) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  try {
    await cp(sourcePath, destinationPath, { recursive: true });
    await rm(sourcePath, {
      recursive: true,
      force: true,
    });
  }
  catch (error: any) {
    throw new Error(`Failed to move item from ${sourcePath} to ${destinationPath}: ${error.message}`, { cause: error });
  }
}
