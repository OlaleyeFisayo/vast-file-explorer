import path from "node:path";

import type { VastFileExplorerOptions } from "../../../shared/types";

import {
  FileExplorer,
  SearchIndex,
} from "../../file-explorer/variables";
import { removeDescendantsFromIndex } from "./remove-descendants-from-index";

export function onFileAndFolderDelete(filePath: string, userOptions: VastFileExplorerOptions): void {
  const nodeToDelete = SearchIndex.get(filePath);

  if (!nodeToDelete)
    return;

  if (nodeToDelete.type === "directory") {
    removeDescendantsFromIndex(nodeToDelete);
  }
  SearchIndex.delete(filePath);

  const parentDir = path.dirname(filePath);

  if (path.resolve(parentDir) === path.resolve(userOptions.rootPath!)) {
    FileExplorer.delete(filePath);
    return;
  }

  const parentNode = SearchIndex.get(parentDir);
  if (parentNode && parentNode.type === "directory") {
    parentNode.children.delete(filePath);
  }
}
