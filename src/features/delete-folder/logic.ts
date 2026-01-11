import {
  realpath,
  rm,
} from "node:fs/promises";

export async function deleteFolder(path: string): Promise<void> {
  const folderPath = await realpath(path);
  try {
    await rm(folderPath, {
      recursive: true,
      force: true,
    });
  }
  catch (error: any) {
    if (error.code === "ENOENT") {
      throw new Error(`Folder does not exist: ${folderPath}`);
    }
    throw new Error(`Failed to delete folder at ${folderPath}: ${error.message}`, { cause: error });
  }
}
