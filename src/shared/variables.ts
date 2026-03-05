import axios from "axios";
import ignore from "ignore";

import type { FileExplorerOptions } from "./types";

export const fileExplorerOptionsDefault: FileExplorerOptions = {
  rootPath: "./",
  hiddenFiles: [],
  respectGitIgnore: true,
};

export const serverBaseURL = "/_brickly-file-explorer";

export const clientInstance = axios.create({
  baseURL: serverBaseURL,
  headers: { "Content-Type": "application/json" },
});

export const globalOptions: FileExplorerOptions = {};

export const hiddenFilesChecker = { instance: ignore() };
