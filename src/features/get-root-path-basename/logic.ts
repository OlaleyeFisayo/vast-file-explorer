import path from "node:path";

import { globalOptions } from "../../shared/variables";

export function getRootPathBasenameLogic(): { rootPathBasename: string } {
  return { rootPathBasename: path.basename(path.resolve(globalOptions.rootPath as string)) };
}
