import type { FileTreeNode } from "../../types";

import { SearchIndex } from "../../variables";

export function removeDescendantsFromIndex(node: FileTreeNode): void {
  if (node.type === "directory") {
    for (const child of node.children) {
      removeDescendantsFromIndex(child);
      SearchIndex.delete(child.path);
    }
  }
}
