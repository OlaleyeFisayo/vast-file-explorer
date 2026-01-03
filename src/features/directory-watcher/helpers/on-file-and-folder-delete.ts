import path from "node:path";

import type { VastFileExplorerOptions } from "../../../shared/types";

import {
  searchIndex,
  uiTree,
} from "../../../shared/variables";
import { removeDescendantsFromIndex } from "./remove-descendants-from-index";

export function onFileAndFolderDelete(filePath: string, userOptions: VastFileExplorerOptions): void {
  const nodeToDelete = searchIndex.get(filePath);

  if (!nodeToDelete)
    return;

  if (nodeToDelete.type === "directory") {
    removeDescendantsFromIndex(nodeToDelete);
  }
  searchIndex.delete(filePath);

  const parentDir = path.dirname(filePath);

  if (path.resolve(parentDir) === path.resolve(userOptions.rootPath!)) {
    uiTree.delete(filePath);
    return;
  }

  const parentNode = searchIndex.get(parentDir);
  if (parentNode && parentNode.type === "directory") {
    parentNode.children.delete(filePath);
  }
}
