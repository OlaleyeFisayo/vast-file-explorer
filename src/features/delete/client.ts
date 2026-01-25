import { clientInstance } from "../../shared/variables";

export async function deleteItem(path: string): Promise<void> {
  await clientInstance.post("/delete", { path });
}
