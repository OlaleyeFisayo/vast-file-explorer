import { clientInstance } from "../../shared/variables";

export async function copyItems(items: { sourcePath: string; destinationDir?: string }[]): Promise<void> {
  await clientInstance.post("/batch-copy", { items });
}

export async function copy(sourcePath: string, destinationDir?: string): Promise<void> {
  await clientInstance.post("/copy", {
    sourcePath,
    destinationDir,
  });
}
