import type { FileTreeNode } from "../../core/types";

import { clientInstance } from "../../shared/variables";

export async function getFileTree(): Promise<FileTreeNode[]> {
  const response = await clientInstance.get<FileTreeNode[]>("/");
  return response.data;
}
