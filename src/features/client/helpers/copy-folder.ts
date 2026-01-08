import { clientInstance } from "../../../shared/variables";

export async function copyFolder(sourcePath: string, destinationDir?: string): Promise<void> {
  await clientInstance.post("/copy-folder", {
    sourcePath,
    destinationDir,
  });
}
