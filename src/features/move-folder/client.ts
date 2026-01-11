import { clientInstance } from "../../shared/variables";

export async function moveFolder(sourcePath: string, destinationDir?: string): Promise<void> {
  await clientInstance.post("/move-folder", {
    sourcePath,
    destinationDir,
  });
}
