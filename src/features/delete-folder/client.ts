import { clientInstance } from "../../shared/variables";

export async function deleteFolder(path: string): Promise<void> {
  await clientInstance.post("/delete-folder", { path });
}
