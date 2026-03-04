import path from "node:path";

import { globalOptions } from "../../shared/variables";

export function getRootInfoLogic(): { basename: string; rootPath: string } {
  const rootPath = path.resolve(globalOptions.rootPath as string);
  const basename = path.basename(rootPath);
  return {
    basename,
    rootPath,
  };
}
