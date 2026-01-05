import axios from "axios";

import type { VastFileExplorerOptions } from "./types";

export const vastFileExplorerOptionsDefault: VastFileExplorerOptions = {
  rootPath: "./",
  hiddenFiles: ["node_modules", ".git", "dist"],
};

export const serverBaseURL = "/_vast-file-explorer";

export const clientInstance = axios.create({
  baseURL: serverBaseURL,
  headers: { "Content-Type": "application/json" },
});

// eslint-disable-next-line import/no-mutable-exports
export let globalOptions: VastFileExplorerOptions = {};

export function setGlobalOptions(options: VastFileExplorerOptions): void {
  globalOptions = {
    ...vastFileExplorerOptionsDefault,
    ...options,
  };
}
