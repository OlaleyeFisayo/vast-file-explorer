import { clientInstance } from "../../../shared/variables";

export async function createFolder(name: string, dirPath?: string): Promise<void> {
  await clientInstance.post("/folder", {
    name,
    dirPath,
  });
}
