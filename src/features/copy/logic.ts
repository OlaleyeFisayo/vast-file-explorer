import {
  cp,
  lstat,
} from "node:fs/promises";
import path from "node:path";

import { globalOptions } from "../../shared/variables";

export async function copyItem(sourcePath: string, destinationDir?: string): Promise<void> {
  const targetDir: string = destinationDir ?? globalOptions.rootPath!;

  let sourceStats;
  try {
    sourceStats = await lstat(sourcePath);
  }
  catch (error: any) {
    if (error.code === "ENOENT") {
      throw new Error(`Source item does not exist: ${sourcePath}`);
    }
    throw error;
  }

  const itemName = path.basename(sourcePath);
  const destinationPath = path.join(targetDir!, itemName);

  if (path.resolve(sourcePath) === path.resolve(destinationPath)) {
    throw new Error("Source and destination are the same.");
  }

  if (sourceStats.isDirectory()) {
    const relativePath = path.relative(sourcePath, targetDir);
    if (!relativePath.startsWith("..") && !path.isAbsolute(relativePath)) {
      throw new Error("Cannot copy a directory into itself or one of its subdirectories.");
    }
  }

  try {
    const destStats = await lstat(destinationPath);
    const destType = destStats.isDirectory() ? "folder" : "file";
    throw new Error(`A ${destType} with the name "${itemName}" already exists at the destination.`);
  }
  catch (error: any) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  try {
    await cp(sourcePath, destinationPath, {
      recursive: true,
      errorOnExist: true,
    });
  }
  catch (error: any) {
    if (error.code === "ERR_FS_CP_EEXIST") {
      throw new Error(`An item with the name "${itemName}" already exists at the destination.`);
    }
    throw new Error(`Failed to copy item from ${sourcePath} to ${destinationPath}: ${error.message}`, { cause: error });
  }
}
