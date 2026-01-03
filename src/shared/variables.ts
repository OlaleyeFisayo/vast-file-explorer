import type {
  FileTreeNode,
  VastFileExplorerOptions,
} from "./types";

export const vastFileExplorerOptionsDefault: VastFileExplorerOptions = {
  rootPath: "./",
  hiddenFiles: ["node_modules", ".git", "dist"],
};

export const searchIndex = new Map<string, FileTreeNode>();
export const uiTree = new Map<string, FileTreeNode>();
