import { clientInstance } from "../../shared/variables";

export async function openInFileManager(path: string): Promise<void> {
  await clientInstance.post("/open-in-file-manager", { path });
}
