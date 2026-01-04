import { realpath } from "node:fs/promises";
import path from "node:path";

import { SearchIndex } from "../variables";

export async function collapseDirectory(dirPath: string): Promise<void> {
  const absoluteDirPath = await realpath(path.resolve(dirPath));
  const parentNode = SearchIndex.get(absoluteDirPath);
  if (!parentNode || parentNode.type !== "directory") {
    return;
  }
  parentNode.expanded = false;
}
