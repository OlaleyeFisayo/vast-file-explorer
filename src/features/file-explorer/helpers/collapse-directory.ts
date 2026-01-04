import path from "node:path";

import { SearchIndex } from "../variables";

export function collapseDirectory(dirPath: string): void {
  const absoluteDirPath = path.resolve(dirPath);
  const parentNode = SearchIndex.get(absoluteDirPath);
  if (!parentNode || parentNode.type !== "directory") {
    return;
  }
  parentNode.expanded = false;
}
