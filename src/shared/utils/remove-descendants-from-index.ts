import type { FileTreeNode } from "../types";

import { searchIndex } from "../variables";

export function removeDescendantsFromIndex(node: FileTreeNode): void {
  if (node.type === "directory") {
    for (const child of node.children.values()) {
      removeDescendantsFromIndex(child);
      searchIndex.delete(child.path);
    }
  }
}
