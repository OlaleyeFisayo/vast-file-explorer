import type { FileTreeNode } from "../../features/file-explorer/types";

import { clientInstance } from "../../shared/variables";

export async function getFileTree(): Promise<FileTreeNode[]> {
  const response = await clientInstance.get<FileTreeNode[]>("/");
  return response.data;
}
