import {
  realpath,
  stat,
} from "node:fs/promises";
import path from "node:path";

import type { FileTreeNode } from "../../types";

import { isHidden } from "../../../shared/utils/hidden-files-checker";
import { globalOptions } from "../../../shared/variables";
import { sortFileTreeNodes } from "../../utils";
import {
  FileTree,
  SearchIndex,
} from "../../variables";

export async function onFileAndFolderAdd(filePath: string): Promise<void> {
  const realFilePath = await realpath(filePath);
  const fileName = path.basename(realFilePath);
  const parentDir = path.dirname(realFilePath);
  const fileStat = await stat(realFilePath);
  const isDirectory = fileStat.isDirectory();

  const resolvedRoot = await realpath(path.resolve(globalOptions.rootPath!));
  const absolutePathNode = realFilePath;
  const relativePathNode = path.relative(resolvedRoot, realFilePath);

  if (isHidden(relativePathNode))
    return;

  let newNode: FileTreeNode;

  if (isDirectory) {
    newNode = {
      name: fileName,
      path: realFilePath,
      parentPath: parentDir,
      absolutePath: absolutePathNode,
      key: relativePathNode,
      type: "directory",
      expanded: false,
      childExpanded: false,
      children: [],
    };
  }
  else {
    newNode = {
      name: fileName,
      path: realFilePath,
      parentPath: parentDir,
      absolutePath: absolutePathNode,
      key: relativePathNode,
      type: "file",
      extension: path.extname(fileName).slice(1),
    };
  }

  SearchIndex.set(realFilePath, newNode);

  if (path.resolve(parentDir) === resolvedRoot) {
    const existingIndex = FileTree.findIndex(node => node.path === realFilePath);
    if (existingIndex !== -1) {
      FileTree[existingIndex] = newNode;
    }
    else {
      FileTree.push(newNode);
    }

    const sorted = sortFileTreeNodes(FileTree);
    FileTree.length = 0;
    FileTree.push(...sorted);
    return;
  }

  const resolvedParentDir = await realpath(parentDir);
  const parentNode = SearchIndex.get(resolvedParentDir);
  if (parentNode && parentNode.type === "directory" && parentNode.expanded) {
    const existingIndex = parentNode.children.findIndex(node => node.path === realFilePath);
    if (existingIndex !== -1) {
      parentNode.children[existingIndex] = newNode;
    }
    else {
      parentNode.children.push(newNode);
    }

    parentNode.children = sortFileTreeNodes(parentNode.children);
  }
}
