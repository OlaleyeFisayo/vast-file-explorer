import { mkdir } from "node:fs/promises";
import path from "node:path";

import { globalOptions } from "../../../shared/variables";

export async function createFolder(name: string, dirPath?: string): Promise<void> {
  const targetDir = dirPath ?? globalOptions.rootPath;
  const fullFilePath = path.join(targetDir!, name);

  try {
    await mkdir(fullFilePath);
  }
  catch (error: any) {
    if (error.code === "EEXIST") {
      throw new Error(`Folder already exists: ${name}`);
    }
    throw new Error(`Failed to create folder ${name} at ${targetDir}: ${error.message}`, { cause: error });
  }
}
