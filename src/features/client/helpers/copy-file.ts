import { clientInstance } from "../../../shared/variables";

export async function copyFile(sourcePath: string, destinationDir?: string): Promise<void> {
  await clientInstance.post("/copy-file", {
    sourcePath,
    destinationDir,
  });
}
