import type { FileTreeNode } from "../types";

import fileTree from "../..";

export function addToFileTree(nodes: Array<FileTreeNode>): void {
  nodes.forEach(node => fileTree.set(node.path, node));
};
