import fs from "node:fs/promises";
import path from "node:path";

import type {
  FileTreeNode,
  vastFileExplorerOptions,
} from "../types";

type GetFileTreeOptions = {
  hiddenFiles: vastFileExplorerOptions["hiddenFiles"];
};

export async function getFileTree(dirPath: string, options?: GetFileTreeOptions): Promise<FileTreeNode[]> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const fileTree: FileTreeNode[] = [];
    for (const entry of entries) {
      const parentPath = entry.parentPath;
      const fullPath = path.join(parentPath, entry.name);
      const isDirectory = entry.isDirectory();
      const node: FileTreeNode = {
        name: entry.name,
        path: fullPath,
        ...(isDirectory
          ? {
              type: "directory",
              children: [],
              expanded: false,
            }
          : { type: "file" }),
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
