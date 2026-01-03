import fs from "node:fs/promises";
import path from "node:path";

import type {
  FileTreeNode,
  vastFileExplorerOptions,
} from "../types";

import { searchIndex } from "../variables";

type GetFileTreeOptions = {
  hiddenFiles: vastFileExplorerOptions["hiddenFiles"];
};

export async function getFileTree(dirPath: string, options?: GetFileTreeOptions): Promise<Map<string, FileTreeNode>> {
  const currentLevel = new Map<string, FileTreeNode>();

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    entries.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory())
        return -1;
      if (!a.isDirectory() && b.isDirectory())
        return 1;
      return a.name.localeCompare(b.name);
    });

    for (const entry of entries) {
      if (options?.hiddenFiles?.includes(entry.name))
        continue;

      const parentPath = entry.parentPath;
      const relativePath = path.join(parentPath, entry.name);
      const isDirectory = entry.isDirectory();

      let node: FileTreeNode;
      if (isDirectory) {
        const childrenMap = await getFileTree(relativePath, options);
        node = {
          name: entry.name,
          path: relativePath,
          type: "directory",
          expanded: false,
          children: childrenMap,
        };
      }
      else {
        node = {
          name: entry.name,
          path: relativePath,
          type: "file",
        };
      }

      currentLevel.set(node.path, node);
      searchIndex.set(node.path, node);
    }
  }
  catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }

  return currentLevel;
}
