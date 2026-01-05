import type { FileTreeNode } from "../../features/file-explorer/types";

import { clientInstance } from "../../shared/variables";

export async function expandDirectory(path: string): Promise<FileTreeNode[]> {
  const response = await clientInstance.post<FileTreeNode[]>("/expand", { path });
  return response.data;
}
