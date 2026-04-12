import { exec } from "node:child_process";
import path from "node:path";

import { globalOptions } from "../../shared/variables";

export async function openInIde(filePath: string): Promise<void> {
  const {
    defaultIde,
    rootPath,
  } = globalOptions;

  if (!defaultIde)
    throw new Error("To use the open in IDE feature, make sure you set a default IDE in the brickly/file-explorer plugin.");

  const relativePath = path.relative(rootPath!, filePath);

  switch (defaultIde) {
    case "vscode":
      exec(`code . "${relativePath}"`, { cwd: rootPath });
      break;
    case "vscode-insiders":
      exec(`code-insiders . "${relativePath}"`, { cwd: rootPath });
      break;
    case "cursor":
      exec(`cursor . "${relativePath}"`, { cwd: rootPath });
      break;
    case "webstorm":
      exec(`webstorm . "${relativePath}"`, { cwd: rootPath });
      break;
    case "intellij-idea":
      exec(`idea . "${relativePath}"`, { cwd: rootPath });
      break;
    case "sublime-text":
      exec(`subl . "${relativePath}"`, { cwd: rootPath });
      break;
    case "zed":
      exec(`zed . "${relativePath}"`, { cwd: rootPath });
      break;
    case "atom":
      exec(`atom . "${relativePath}"`, { cwd: rootPath });
      break;
    case "vim":
      exec(`vim "${relativePath}"`, { cwd: rootPath });
      break;
    case "nvim":
      exec(`nvim "${relativePath}"`, { cwd: rootPath });
      break;
    default:
      throw new Error(`Unsupported IDE: ${defaultIde}`);
  }
}
