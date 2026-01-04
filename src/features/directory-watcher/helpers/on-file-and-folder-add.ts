import {
  realpath,
  stat,
} from "node:fs/promises";
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
  const realFilePath = await realpath(filePath);
  const fileName = path.basename(realFilePath);

  if (userOptions?.hiddenFiles?.includes(fileName))
    return;

  const parentDir = path.dirname(realFilePath);
  const fileStat = await stat(realFilePath);
  const isDirectory = fileStat.isDirectory();

  let newNode: FileTreeNode;

  if (isDirectory) {
    newNode = {
      name: fileName,
      path: realFilePath,
      type: "directory",
      expanded: false,
      childExpanded: false,
      children: new Map(),
    };
  }
  else {
    newNode = {
      name: fileName,
      path: realFilePath,
      type: "file",
    };
  }

  SearchIndex.set(realFilePath, newNode);

  const resolvedRoot = await realpath(path.resolve(userOptions.rootPath || process.cwd()));

  if (path.resolve(parentDir) === resolvedRoot) {
    FileTree.set(realFilePath, newNode);
    const sorted = sortFileTreeNodesMap(FileTree);
    FileTree.clear();
    for (const [key, value] of sorted) {
      FileTree.set(key, value);
    }
    return;
  }

  const resolvedParentDir = await realpath(parentDir);
  const parentNode = SearchIndex.get(resolvedParentDir);
  if (parentNode && parentNode.type === "directory" && parentNode.expanded) {
    parentNode.children.set(realFilePath, newNode);
    parentNode.children = sortFileTreeNodesMap(parentNode.children);
  }
}
