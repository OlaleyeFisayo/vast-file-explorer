import fileTree from "../..";
import { addToFileTree } from "../utils/add-to-file-tree";
import { getFileTree } from "./get-file-tree";

export async function expandDirectory(dirPath: string): Promise<void> {
  const node = fileTree.get(dirPath);

  if (node && node.type === "directory" && !node.expanded) {
    const childNode = await getFileTree(dirPath);

    node.expanded = true;
    node.children = childNode;

    addToFileTree(childNode);
  }
  else {
    console.error("Error this is not a directory");
  }
}
