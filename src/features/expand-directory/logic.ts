import { realpath } from "node:fs/promises";
import path from "node:path";

import { SearchIndex } from "../../core/variables";
import { getFileTree } from "../get-file-tree/logic";

export async function expandDirectory(dirPath: string): Promise<void> {
  const absoluteDirPath = await realpath(path.resolve(dirPath));
  const parentNode = SearchIndex.get(absoluteDirPath);

  if (!parentNode || parentNode.type !== "directory") {
    return;
  }

  if (parentNode.childExpanded) {
    parentNode.expanded = true;
  }

  try {
    const childrenList = await getFileTree(absoluteDirPath);

    parentNode.children = childrenList;
    parentNode.expanded = true;
    parentNode.childExpanded = true;
  }
  catch (error) {
    console.error(`Error expanding directory ${absoluteDirPath}:`, error);
  }
}
