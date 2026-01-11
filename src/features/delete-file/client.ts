import { clientInstance } from "../../shared/variables";

export async function deleteFile(path: string): Promise<void> {
  await clientInstance.post("/delete-file", { path });
}
