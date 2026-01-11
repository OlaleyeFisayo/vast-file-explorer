import { realpath } from "node:fs/promises";
import path from "node:path";

import { globalOptions } from "../../../shared/variables";
import {
  FileTree,
  SearchIndex,
} from "../../variables";
import { removeDescendantsFromIndex } from "./remove-descendants-from-index";

export async function onFileAndFolderDelete(filePath: string): Promise<void> {
  const parentDir = path.dirname(filePath);
  let resolvedParent: string;
  try {
    resolvedParent = await realpath(parentDir);
  }
  catch (error: any) {
    if (error.code === "ENOENT") {
      return;
    }
    throw error;
  }
  const targetPath = path.join(resolvedParent, path.basename(filePath));

  const nodeToDelete = SearchIndex.get(targetPath);

  if (!nodeToDelete)
    return;

  if (nodeToDelete.type === "directory") {
    removeDescendantsFromIndex(nodeToDelete);
  }
  SearchIndex.delete(targetPath);

  const resolvedRoot = await realpath(path.resolve(globalOptions.rootPath!));

  if (path.dirname(targetPath) === resolvedRoot) {
    const index = FileTree.findIndex(node => node.path === targetPath);
    if (index !== -1) {
      FileTree.splice(index, 1);
    }
    return;
  }

  const parentNode = SearchIndex.get(resolvedParent);
  if (parentNode && parentNode.type === "directory") {
    const index = parentNode.children.findIndex(node => node.path === targetPath);
    if (index !== -1) {
      parentNode.children.splice(index, 1);
    }
  }
}
