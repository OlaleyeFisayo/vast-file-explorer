import { hiddenFilesChecker } from "../variables";

export function isHidden(relativePath: string): boolean {
  return hiddenFilesChecker.instance.ignores(relativePath);
}
