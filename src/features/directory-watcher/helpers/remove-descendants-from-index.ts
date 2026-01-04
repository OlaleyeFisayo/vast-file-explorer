import type { FileTreeNode } from "../../file-explorer/types";

import { SearchIndex } from "../../file-explorer/variables";

export function removeDescendantsFromIndex(node: FileTreeNode): void {
  if (node.type === "directory") {
    for (const child of node.children) {
      removeDescendantsFromIndex(child);
      SearchIndex.delete(child.path);
    }
  }
}
