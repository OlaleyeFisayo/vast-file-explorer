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
