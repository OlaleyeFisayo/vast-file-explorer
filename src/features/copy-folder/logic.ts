import {
  cp,
  lstat,
} from "node:fs/promises";
import path from "node:path";

import { globalOptions } from "../../shared/variables";

export async function copyFolderItem(sourcePath: string, destinationDir?: string): Promise<void> {
  const targetDir = destinationDir ?? globalOptions.rootPath;
  try {
    const stats = await lstat(sourcePath);
    if (!stats.isDirectory()) {
      throw new Error(`Item at ${sourcePath} is not a folder.`);
    }
  }
  catch (error: any) {
    if (error.code === "ENOENT") {
      throw new Error(`Source folder does not exist: ${sourcePath}`);
    }
    throw error;
  }

  const folderName = path.basename(sourcePath);
  const destinationPath = path.join(targetDir!, folderName);

  try {
    const destStats = await lstat(destinationPath);
    const type = destStats.isDirectory() ? "folder" : "file";
    throw new Error(`A ${type} with the name "${folderName}" already exists at the destination.`);
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
      throw new Error(`A folder with the name "${folderName}" already exists at the destination.`);
    }
    throw new Error(`Failed to copy folder from ${sourcePath} to ${destinationPath}: ${error.message}`, { cause: error });
  }
}
