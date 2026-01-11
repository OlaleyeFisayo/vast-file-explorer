import { clientInstance } from "../../shared/variables";

export async function moveFile(sourcePath: string, destinationDir?: string): Promise<void> {
  await clientInstance.post("/move-file", {
    sourcePath,
    destinationDir,
  });
}
