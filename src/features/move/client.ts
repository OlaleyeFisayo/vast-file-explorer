import { clientInstance } from "../../shared/variables";

export async function move(sourcePath: string, destinationDir?: string): Promise<void> {
  await clientInstance.post("/move", {
    sourcePath,
    destinationDir,
  });
}
