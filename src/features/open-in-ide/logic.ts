import { exec } from "node:child_process";
import path from "node:path";

import { globalOptions } from "../../shared/variables";

export async function openInIde(filePath: string): Promise<void> {
  const {
    defaultIde,
    rootPath,
  } = globalOptions;

  if (!defaultIde)
    throw new Error("To use open in ide, set defaultIde in your plugin options.");

  const relativePath = path.relative(rootPath!, filePath);

  switch (defaultIde) {
    case "vscode":
      exec(`code . "${relativePath}"`, { cwd: rootPath });
      break;
    default:
      throw new Error(`Unsupported IDE: ${defaultIde}`);
  }
}
