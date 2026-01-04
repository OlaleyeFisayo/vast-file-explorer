import type { VastFileExplorerOptions } from "../../../shared/types";

import { FileTree } from "../variables";
import { getFileTree } from "./get-file-tree";

export async function initializeFileTree(userOptions: VastFileExplorerOptions): Promise<void> {
  const tree = await getFileTree(userOptions.rootPath!, { hiddenFiles: userOptions.hiddenFiles });

  FileTree.length = 0;
  FileTree.push(...tree);
}
