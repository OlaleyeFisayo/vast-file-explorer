import path from "node:path";

import type { VastFileExplorerOptions } from "../../../shared/types";

import { SearchIndex } from "../variables";
import { getFileTree } from "./get-file-tree";

type ExpandDirectoryOptions = {
  hiddenFiles: VastFileExplorerOptions["hiddenFiles"];
};

export async function expandDirectory(dirPath: string, options?: ExpandDirectoryOptions): Promise<void> {
  const absoluteDirPath = path.resolve(dirPath);
  const parentNode = SearchIndex.get(absoluteDirPath);

  if (!parentNode || parentNode.type !== "directory") {
    return;
  }

  if (parentNode.childExpanded) {
    parentNode.expanded = true;
  }

  try {
    const childrenMap = await getFileTree(absoluteDirPath, options);

    parentNode.children = childrenMap;
    parentNode.expanded = true;
    parentNode.childExpanded = true;
  }
  catch (error) {
    console.error(`Error expanding directory ${absoluteDirPath}:`, error);
  }
}
