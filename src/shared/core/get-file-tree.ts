import fs from "node:fs/promises";
import path from "node:path";

import type { vastFileExplorerOptions } from "../types";

type GetFileTreeOptions = {
  hiddenFiles: vastFileExplorerOptions["hiddenFiles"];
};

type FileTreeNode = {
  name: string;
  path: string;
  type: "file" | "directory";
};

export async function getFileTree(dirPath: string, options?: GetFileTreeOptions): Promise<FileTreeNode[]> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const fileTree: FileTreeNode[] = [];
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const node: FileTreeNode = {
        name: entry.name,
        path: fullPath,
        type: entry.isDirectory() ? "directory" : "file",
      };

      if (options?.hiddenFiles && options.hiddenFiles.length > 0 && options.hiddenFiles.includes(entry.name)) {
        continue;
      }

      fileTree.push(node);
    }

    const sortedFileTree = fileTree.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === "directory" ? -1 : 1;
    });

    return sortedFileTree;
  }
  catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}
