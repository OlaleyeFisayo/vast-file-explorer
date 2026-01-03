import fs from "node:fs/promises";
import path from "node:path";

import type {
  FileTreeNode,
  vastFileExplorerOptions,
} from "../types";

type GetFileTreeOptions = {
  hiddenFiles: vastFileExplorerOptions["hiddenFiles"];
};

export async function getFileTree(dirPath: string, options?: GetFileTreeOptions): Promise<Map<string, FileTreeNode>> {
  const currentLevel = new Map<string, FileTreeNode>();

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
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

      const nodeKey = `${node.path}-${node.name}`;
      currentLevel.set(nodeKey, node);
    }
  }
  catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }

  return currentLevel;
}
