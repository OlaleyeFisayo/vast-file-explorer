import {
  readdir,
  realpath,
  stat,
} from "node:fs/promises";
import path from "node:path";

import type { FileTreeNode } from "../../core/types";

import { globalOptions } from "../../shared/variables";

export async function searchFiles(query: string): Promise<FileTreeNode[]> {
  const rootPath = globalOptions.rootPath;
  if (!rootPath) {
    throw new Error("Root path is not configured.");
  }

  try {
    const stats = await stat(rootPath);
    if (!stats.isDirectory()) {
      throw new Error(`Root path is not a directory: ${rootPath}`);
    }
  }
  catch (error: any) {
    if (error.code === "ENOENT") {
      throw new Error(`Root path does not exist: ${rootPath}`);
    }
    throw error;
  }

  const results: FileTreeNode[] = [];
  const lowerQuery = query.toLowerCase();
  const resolvedRoot = await realpath(path.resolve(rootPath));

  async function traverse(currentPath: string): Promise<void> {
    let entries;
    try {
      entries = await readdir(currentPath, { withFileTypes: true });
    }
    catch (error: any) {
      if (currentPath === rootPath || currentPath === resolvedRoot) {
        throw new Error(`Failed to read root directory contents: ${error.message}`);
      }
      return;
    }

    for (const entry of entries) {
      if (globalOptions?.hiddenFiles?.includes(entry.name))
        continue;

      const fullPath = path.join(currentPath, entry.name);

      const nameMatches = entry.name.toLowerCase().includes(lowerQuery);

      if (nameMatches) {
        try {
          const absolutePath = await realpath(fullPath);
          const relativePath = path.relative(resolvedRoot, absolutePath);

          const node: FileTreeNode = {
            name: entry.name,
            path: fullPath,
            absolutePath,
            relativePath,
            type: entry.isDirectory() ? "directory" : "file",
            ...(entry.isDirectory()
              ? {
                  expanded: false,
                  childExpanded: false,
                  children: [],
                }
              : {}),
          } as FileTreeNode;

          results.push(node);
        }
        catch (e: any) {
          throw new Error(e);
        }
      }

      if (entry.isDirectory()) {
        await traverse(fullPath);
      }
    }
  }

  await traverse(resolvedRoot);
  return results;
}
