import type { VastFileExplorerOptions } from "../../../shared/types";

import { FileExplorer } from "../variables";
import { getFileTree } from "./get-file-tree";

export async function initializeFileTree(userOptions: VastFileExplorerOptions): Promise<void> {
  const tree = await getFileTree(userOptions.rootPath!, { hiddenFiles: userOptions.hiddenFiles });

  FileExplorer.clear();
  for (const [key, value] of tree) {
    FileExplorer.set(key, value);
  }
}
