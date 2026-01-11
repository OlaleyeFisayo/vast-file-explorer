import type { FileTreeNode } from "../../core/types";

import { clientInstance } from "../../shared/variables";

export async function expandDirectory(path: string): Promise<FileTreeNode[]> {
  const response = await clientInstance.post<FileTreeNode[]>("/expand", { path });
  return response.data;
}
