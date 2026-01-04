import { stat } from "node:fs/promises";
import path from "node:path";

import type { VastFileExplorerOptions } from "../../../shared/types";
import type { FileTreeNode } from "../../file-explorer/types";

import {
} from "../../../shared/variables";
import { sortFileTreeNodesMap } from "../../file-explorer/helpers/sort-file-tree-nodes";
import {
  FileTree,
  SearchIndex,
} from "../../file-explorer/variables";

export async function onFileAndFolderAdd(filePath: string, userOptions: VastFileExplorerOptions): Promise<void> {
  const fileName = path.basename(filePath);

  if (userOptions?.hiddenFiles?.includes(fileName))
    return;

  const parentDir = path.dirname(filePath);
  const fileStat = await stat(filePath);
  const isDirectory = fileStat.isDirectory();

  let newNode: FileTreeNode;

  if (isDirectory) {
    newNode = {
      name: fileName,
      path: filePath,
      type: "directory",
      expanded: false,
      childExpanded: false,
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

  SearchIndex.set(filePath, newNode);

  if (path.resolve(parentDir) === path.resolve(userOptions.rootPath!)) {
    FileTree.set(filePath, newNode);
    const sorted = sortFileTreeNodesMap(FileTree);
    FileTree.clear();
    for (const [key, value] of sorted) {
      FileTree.set(key, value);
    }
    return;
  }

  const parentNode = SearchIndex.get(parentDir);
  if (parentNode && parentNode.type === "directory") {
    parentNode.children.set(filePath, newNode);
    parentNode.children = sortFileTreeNodesMap(parentNode.children);
  }
}
