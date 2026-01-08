import { writeFile } from "node:fs/promises";
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
      throw new Error(`File already exits: ${name}`);
    }
    throw new Error(`Failed to create File ${name} at ${targetDir} ${error.message}`, { cause: error });
  }
}
