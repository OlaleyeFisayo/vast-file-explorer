import fs from "node:fs/promises";
import path from "node:path";

import type { FileTreeNode } from "../../core/types";

import { SearchIndex } from "../../core/variables";
import { globalOptions } from "../../shared/variables";

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

    const resolvedRoot = await fs.realpath(path.resolve(globalOptions.rootPath!));

    for (const entry of entries) {
      if (globalOptions?.hiddenFiles?.includes(entry.name))
        continue;

      const fullPath = path.join(absoluteDirPath, entry.name);
      const isDirectory = entry.isDirectory();

      let node = SearchIndex.get(fullPath);
      const existingType = node?.type;

      if (!node || (isDirectory && existingType !== "directory") || (!isDirectory && existingType !== "file")) {
        const absolutePathNode = fullPath;
        const relativePathNode = path.relative(resolvedRoot, fullPath);

        if (isDirectory) {
          node = {
            name: entry.name,
            path: fullPath,
            absolutePath: absolutePathNode,
            relativePath: relativePathNode,
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
            absolutePath: absolutePathNode,
            relativePath: relativePathNode,
            type: "file",
          };
        }
        SearchIndex.set(node.path, node);
      }

      currentLevel.push(node);
    }
  }
  catch (error) {
    console.error(`Error reading directory ${absoluteDirPath}:`, error);
  }

  return currentLevel;
}
