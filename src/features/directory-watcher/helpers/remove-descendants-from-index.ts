import type { FileTreeNode } from "../../file-tree/types";

import { searchIndex } from "../../file-tree/variables";

export function removeDescendantsFromIndex(node: FileTreeNode): void {
  if (node.type === "directory") {
    for (const child of node.children.values()) {
      removeDescendantsFromIndex(child);
      searchIndex.delete(child.path);
    }
  }
}
