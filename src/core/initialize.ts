import { getFileTree } from "../features/get-file-tree/logic";
import { globalOptions } from "../shared/variables";
import { FileTree } from "./variables";

export async function initializeFileTree(): Promise<void> {
  const tree = await getFileTree(globalOptions.rootPath!);

  FileTree.length = 0;
  FileTree.push(...tree);
}
