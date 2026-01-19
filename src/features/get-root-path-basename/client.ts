import { clientInstance } from "../../shared/variables";

export async function getRootPathBasename(): Promise<string> {
  const response = await clientInstance.get<{ rootPathBasename: string }>("/root-path-basename");
  return response.data.rootPathBasename;
}
