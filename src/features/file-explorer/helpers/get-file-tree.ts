import fs from "node:fs/promises";
import path from "node:path";

import type { FileTreeNode } from "../types";

import { globalOptions } from "../../../shared/variables";
import { SearchIndex } from "../variables";

export async function getFileTree(dirPath: string): Promise<FileTreeNode[]> {
  const absoluteDirPath = await fs.realpath(path.resolve(dirPath));
  const currentLevel: FileTreeNode[] = [];

  try {
    const entries = await fs.readdir(absoluteDirPath, { withFileTypes: true });

    entries.sort((a, b) => {
      const isADirectory = a.isDirectory();
      const isBDirectory = b.isDirectory();
      if (isADirectory && !isBDirectory)
        return -1;
      if (!isADirectory && isBDirectory)
        return 1;
      return a.name.localeCompare(b.name);
    });

    for (const entry of entries) {
      if (globalOptions?.hiddenFiles?.includes(entry.name))
        continue;

      const fullPath = path.join(absoluteDirPath, entry.name);
      const isDirectory = entry.isDirectory();

      let node: FileTreeNode;
      if (isDirectory) {
        node = {
          name: entry.name,
          path: fullPath,
          type: "directory",
          expanded: false,
          childExpanded: false,
          children: [],
        };
      }
      else {
        node = {
          name: entry.name,
          path: fullPath,
          type: "file",
        };
      }

      currentLevel.push(node);
      SearchIndex.set(node.path, node);
    }
  }
  catch (error) {
    console.error(`Error reading directory ${absoluteDirPath}:`, error);
  }

  return currentLevel;
}
