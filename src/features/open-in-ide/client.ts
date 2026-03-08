import { clientInstance } from "../../shared/variables";

export async function openInIde(path: string): Promise<void> {
  await clientInstance.post("/open-in-ide", { path });
}
