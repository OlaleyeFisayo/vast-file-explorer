import {
  constants,
  copyFile,
  lstat,
} from "node:fs/promises";
import path from "node:path";

import { globalOptions } from "../../shared/variables";

export async function copyFileItem(sourcePath: string, destinationDir?: string): Promise<void> {
  const targetDir = destinationDir ?? globalOptions.rootPath;
  try {
    const stats = await lstat(sourcePath);
    if (!stats.isFile()) {
      throw new Error(`Item at ${sourcePath} is not a file.`);
    }
  }
  catch (error: any) {
    if (error.code === "ENOENT") {
      throw new Error(`Source file does not exist: ${sourcePath}`);
    }
    throw error;
  }

  const fileName = path.basename(sourcePath);
  const destinationPath = path.join(targetDir!, fileName);

  try {
    const destStats = await lstat(destinationPath);
    const type = destStats.isDirectory() ? "folder" : "file";
    throw new Error(`A ${type} with the name "${fileName}" already exists at the destination.`);
  }
  catch (error: any) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  try {
    await copyFile(sourcePath, destinationPath, constants.COPYFILE_EXCL);
  }
  catch (error: any) {
    if (error.code === "EEXIST") {
      throw new Error(`A file with the name "${fileName}" already exists at the destination.`);
    }
    throw new Error(`Failed to copy file from ${sourcePath} to ${destinationPath}: ${error.message}`, { cause: error });
  }
}
