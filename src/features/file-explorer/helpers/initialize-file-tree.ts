import { globalOptions } from "../../../shared/variables";
import { FileTree } from "../variables";
import { getFileTree } from "./get-file-tree";

export async function initializeFileTree(): Promise<void> {
  const tree = await getFileTree(globalOptions.rootPath!);

  FileTree.length = 0;
  FileTree.push(...tree);
}
