import { clientInstance } from "../../shared/variables";

export async function openInEditor(path: string): Promise<void> {
  await clientInstance.post("/open-in-editor", { path });
}
