import {
  lstat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

import { globalOptions } from "../../../shared/variables";

export async function createFile(name: string, dirPath?: string): Promise<void> {
  const targetDir = dirPath ?? globalOptions.rootPath;
  const fullFilePath = path.join(targetDir!, name);
  try {
    await writeFile(fullFilePath, "", { flag: "wx" });
  }
  catch (error: any) {
    if (error.code === "EEXIST") {
      const stats = await lstat(fullFilePath).catch(() => null);
      const type = stats?.isDirectory() ? "folder" : "file";
      throw new Error(`A ${type} with the name "${name}" already exists at this location.`);
    }
    throw new Error(`Failed to create File ${name} at ${targetDir}: ${error.message}`, { cause: error });
  }
}
