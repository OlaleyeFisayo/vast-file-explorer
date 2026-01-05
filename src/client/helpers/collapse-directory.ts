import type { FileTreeNode } from "../../features/file-explorer/types";

import { clientInstance } from "../../shared/variables";

export async function collapseDirectory(path: string): Promise<FileTreeNode[]> {
  const response = await clientInstance.post<FileTreeNode[]>("/collapse", { path });
  return response.data;
}
