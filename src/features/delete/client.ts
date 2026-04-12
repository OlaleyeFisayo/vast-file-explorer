import { clientInstance } from "../../shared/variables";

export async function deleteItems(paths: string[]): Promise<void> {
  await clientInstance.post("/batch-delete", { paths });
}

export async function deleteItem(path: string): Promise<void> {
  await clientInstance.post("/delete", { path });
}
