import { clientInstance } from "../../shared/variables";

export async function getRootInfo(): Promise<{ basename: string; rootPath: string }> {
  const response = await clientInstance.get<{ basename: string; rootPath: string }>("/root-info");
  return response.data;
}
