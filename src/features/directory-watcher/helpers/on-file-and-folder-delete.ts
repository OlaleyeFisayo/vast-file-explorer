import { realpath } from "node:fs/promises";
import path from "node:path";

import type { VastFileExplorerOptions } from "../../../shared/types";

import {
  FileTree,
  SearchIndex,
} from "../../file-explorer/variables";
import { removeDescendantsFromIndex } from "./remove-descendants-from-index";

export async function onFileAndFolderDelete(filePath: string, userOptions: VastFileExplorerOptions): Promise<void> {
  const parentDir = path.dirname(filePath);
  const resolvedParent = await realpath(parentDir);
  const targetPath = path.join(resolvedParent, path.basename(filePath));

  const nodeToDelete = SearchIndex.get(targetPath);

  if (!nodeToDelete)
    return;

  if (nodeToDelete.type === "directory") {
    removeDescendantsFromIndex(nodeToDelete);
  }
  SearchIndex.delete(targetPath);

  const resolvedRoot = await realpath(path.resolve(userOptions.rootPath || process.cwd()));

  if (path.dirname(targetPath) === resolvedRoot) {
    const index = FileTree.findIndex(node => node.path === targetPath);
    if (index !== -1) {
      FileTree.splice(index, 1);
    }
    return;
  }

  const resolvedParentDir = await realpath(parentDir);
  const parentNode = SearchIndex.get(resolvedParentDir);
  if (parentNode && parentNode.type === "directory") {
    const index = parentNode.children.findIndex(node => node.path === targetPath);
    if (index !== -1) {
      parentNode.children.splice(index, 1);
    }
  }
}
