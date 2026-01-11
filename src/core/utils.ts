import type { FileTreeNode } from "./types";

export function sortFileTreeNodes(nodes: FileTreeNode[]): FileTreeNode[] {
  return [...nodes].sort((a, b) => {
    const isADirectory = a.type === "directory";
    const isBDirectory = b.type === "directory";

    if (isADirectory && !isBDirectory)
      return -1;
    if (!isADirectory && isBDirectory)
      return 1;

    return a.name.localeCompare(b.name);
  });
}
