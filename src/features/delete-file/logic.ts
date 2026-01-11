import {
  realpath,
  unlink,
} from "node:fs/promises";

export async function deleteFile(path: string): Promise<void> {
  const filePath = await realpath(path);
  try {
    await unlink(filePath);
  }
  catch (error: any) {
    if (error.code === "ENOENT") {
      throw new Error(`File does not exist: ${filePath}`);
    }
    throw new Error(`Failed to delete file at ${filePath}: ${error.message}`, { cause: error });
  }
}
