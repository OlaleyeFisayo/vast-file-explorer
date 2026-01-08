import { clientInstance } from "../../../shared/variables";

export async function createFile(name: string, dirPath?: string): Promise<void> {
  await clientInstance.post("/", {
    name,
    dirPath,
  });
}
