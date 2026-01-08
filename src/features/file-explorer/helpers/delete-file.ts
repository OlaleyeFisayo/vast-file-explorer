import { unlink } from "node:fs/promises";

export async function deleteFile(path: string): Promise<void> {
  try {
    await unlink(path);
  }
  catch (error: any) {
    if (error.code === "ENOENT") {
      throw new Error(`File does not exist: ${path}`);
    }
    throw new Error(`Failed to delete file at ${path}: ${error.message}`, { cause: error });
  }
}
