import {
  realpath,
  rm,
} from "node:fs/promises";

export async function deleteItem(path: string): Promise<void> {
  const itemPath = await realpath(path);
  try {
    await rm(itemPath, {
      recursive: true,
      force: true,
    });
  }
  catch (error: any) {
    if (error.code === "ENOENT") {
      throw new Error(`Item does not exist: ${itemPath}`);
    }
    throw new Error(`Failed to delete item at ${itemPath}: ${error.message}`, { cause: error });
  }
}
