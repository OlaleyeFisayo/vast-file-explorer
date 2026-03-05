import ignore from "ignore";
import fs from "node:fs";
import path from "node:path";

import type { FileExplorerOptions } from "../types";

import {
  fileExplorerOptionsDefault,
  globalOptions,
  hiddenFilesChecker,
} from "../variables";

export function setGlobalOptions(options: FileExplorerOptions): void {
  const cwd = process.cwd();
  const rootPath = path.resolve(cwd, options.rootPath ?? "./");

  if (!rootPath.startsWith(cwd)) {
    throw new Error("rootPath must be within the project's directory.");
  }

  if (!fs.existsSync(rootPath) || !fs.statSync(rootPath).isDirectory()) {
    throw new Error("rootPath must be a valid directory.");
  }

  const merged: FileExplorerOptions = {
    ...fileExplorerOptionsDefault,
    ...options,
  };

  const checker = ignore();

  if (merged.respectGitIgnore) {
    const gitignorePath = path.join(rootPath, ".gitignore");
    if (fs.existsSync(gitignorePath)) {
      checker.add(fs.readFileSync(gitignorePath, "utf-8"));
    }
  }

  if (merged.hiddenFiles?.length) {
    checker.add(merged.hiddenFiles);
  }

  Object.assign(globalOptions, merged);
  hiddenFilesChecker.instance = checker;
}
