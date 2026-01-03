import type {
  FileTreeNode,
  vastFileExplorerOptions,
} from "./types";

export const vastFileExplorerOptionsDefault: vastFileExplorerOptions = {
  rootPath: "./",
  hiddenFiles: ["node_modules", ".git", "dist"],
};

export const searchIndex = new Map<string, FileTreeNode>();
