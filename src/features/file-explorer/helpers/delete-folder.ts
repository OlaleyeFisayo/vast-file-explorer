import { rm } from "node:fs/promises";

export async function deleteFolder(path: string): Promise<void> {
  try {
    await rm(path, {
      recursive: true,
      force: true,
    });
  }
  catch (error: any) {
    if (error.code === "ENOENT") {
      throw new Error(`Folder does not exist: ${path}`);
    }
    throw new Error(`Failed to delete folder at ${path}: ${error.message}`, { cause: error });
  }
}
