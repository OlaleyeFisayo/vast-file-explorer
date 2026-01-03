import { statSync } from "node:fs";
import path from "node:path";

import type {
  FileTreeNode,
  VastFileExplorerOptions,
} from "../../types";

import { sortFileTreeNodesMap } from "../../utils/sort-file-tree-nodes";
import {
  searchIndex,
  uiTree,
} from "../../variables";

export function onFileAndFolderAdd(filePath: string, userOptions: VastFileExplorerOptions): void {
  const fileName = path.basename(filePath);

  if (userOptions?.hiddenFiles?.includes(fileName))
    return;

  const parentDir = path.dirname(filePath);
  const isDirectory = statSync(filePath).isDirectory();

  let newNode: FileTreeNode;

  if (isDirectory) {
    newNode = {
      name: fileName,
      path: filePath,
      type: "directory",
      expanded: false,
      children: new Map(),
    };
  }
  else {
    newNode = {
      name: fileName,
      path: filePath,
      type: "file",
    };
  }

  searchIndex.set(filePath, newNode);

  if (path.resolve(parentDir) === path.resolve(userOptions.rootPath!)) {
    uiTree.set(filePath, newNode);
    const sorted = sortFileTreeNodesMap(uiTree);
    uiTree.clear();
    for (const [key, value] of sorted) {
      uiTree.set(key, value);
    }
    return;
  }

  const parentNode = searchIndex.get(parentDir);
  if (parentNode && parentNode.type === "directory") {
    parentNode.children.set(filePath, newNode);
    parentNode.children = sortFileTreeNodesMap(parentNode.children);
  }
}
