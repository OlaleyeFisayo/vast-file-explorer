import type { FileTreeNode } from "../../core/types";

import { clientInstance } from "../../shared/variables";

export async function searchFiles(query: string): Promise<FileTreeNode[]> {
  const response = await clientInstance.get<FileTreeNode[]>("/search", { params: { query } });
  return response.data;
}
