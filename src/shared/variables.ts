import axios from "axios";
import fs from "node:fs";
import path from "node:path";

import type { FileExplorerOptions } from "./types";

export const fileExplorerOptionsDefault: FileExplorerOptions = {
  rootPath: "./",
  hiddenFiles: [
    "node_modules",
    ".git",
    "dist",
    ".husky",
    ".vscode",
  ],
};

export const serverBaseURL = "/_brickly-file-explorer";

export const clientInstance = axios.create({
  baseURL: serverBaseURL,
  headers: { "Content-Type": "application/json" },
});

// eslint-disable-next-line import/no-mutable-exports
export let globalOptions: FileExplorerOptions = {};

export function setGlobalOptions(options: FileExplorerOptions): void {
  const cwd = process.cwd();
  const rootPath = path.resolve(cwd, options.rootPath ?? "./");

  if (!rootPath.startsWith(cwd)) {
    throw new Error("rootPath must be within the project's directory.");
  }

  if (!fs.existsSync(rootPath) || !fs.statSync(rootPath).isDirectory()) {
    throw new Error("rootPath must be a valid directory.");
  }

  globalOptions = {
    ...fileExplorerOptionsDefault,
    ...options,
  };
}
