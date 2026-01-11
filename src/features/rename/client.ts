import { clientInstance } from "../../shared/variables";

export async function rename(path: string, newName: string): Promise<void> {
  await clientInstance.post("/rename", {
    path,
    newName,
  });
}
