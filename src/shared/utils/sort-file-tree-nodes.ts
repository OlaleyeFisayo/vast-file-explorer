import type { FileTreeNode } from "../types";

export function sortFileTreeNodesMap(map: Map<string, FileTreeNode>): Map<string, FileTreeNode> {
  const sortedEntries = Array.from(map.entries()).sort(([, a], [, b]) => {
    const isADirectory = a.type === "directory";
    const isBDirectory = b.type === "directory";

    if (isADirectory && !isBDirectory)
      return -1;
    if (!isADirectory && isBDirectory)
      return 1;

    return a.name.localeCompare(b.name);
  });

  return new Map(sortedEntries);
}
