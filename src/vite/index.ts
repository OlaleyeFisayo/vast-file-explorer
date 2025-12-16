import type { Plugin } from "vite";

import type { vastFileExplorerOptions } from "../shared/types";

import { getFileTree } from "../shared/core/get-file-tree";
import { vastFileExplorerRoutes } from "../shared/server/routes";
import { vastFileExplorerOptionsDefault } from "../shared/variables";

export function vastFileExplorer(userOptions: vastFileExplorerOptions): Plugin {
  const options = {
    ...vastFileExplorerOptionsDefault,
    ...userOptions,
  };

  return {
    name: "vast-file-explorer",
    configureServer(server) {
      vastFileExplorerRoutes(server);
    },
    async buildStart() {
      const entries = await getFileTree(options.rootPath!, { hiddenFiles: options.hiddenFiles });
      console.log({ entries });
    },
  };
};
