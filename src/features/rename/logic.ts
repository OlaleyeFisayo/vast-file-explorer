import {
  lstat,
  rename,
} from "node:fs/promises";
import path from "node:path";

export async function renameItem(currentPath: string, newName: string): Promise<void> {
  const parentDir = path.dirname(currentPath);
  const newPath = path.join(parentDir, newName);

  const [sourceCheck, destCheck] = await Promise.allSettled([
    lstat(currentPath),
    lstat(newPath),
  ]);

  if (sourceCheck.status === "rejected") {
    const error = sourceCheck.reason as any;
    if (error.code === "ENOENT") {
      throw new Error(`Item does not exist: ${currentPath}`);
    }
    throw error;
  }

  const sourceStat = sourceCheck.value;

  if (destCheck.status === "fulfilled") {
    const destStat = destCheck.value;
    const isSameFile = sourceStat.ino === destStat.ino && sourceStat.dev === destStat.dev;

    if (!isSameFile) {
      const type = destStat.isDirectory() ? "folder" : "file";
      throw new Error(`A ${type} with the same name already exists at the destination: ${newPath}`);
    }
  }
  else {
    const error = destCheck.reason as any;
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  try {
    await rename(currentPath, newPath);
  }
  catch (error: any) {
    throw new Error(`Failed to rename item ${currentPath} to ${newPath}: ${error.message}`, { cause: error });
  }
}
