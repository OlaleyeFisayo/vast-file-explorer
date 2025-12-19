import type {
  FileTreeNode,
  vastFileExplorerOptions,
} from "./types";

export const vastFileExplorerOptionsDefault: vastFileExplorerOptions = {
  rootPath: "./",
  hiddenFiles: [],
};

export const baseURI = "/vast-file-explorer";

export const fileTree: FileTreeNode[] = [];
