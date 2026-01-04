import type { Plugin } from "vite";

import type { VastFileExplorerOptions } from "../shared/types";

import { rootDirectoryWatcher } from "../features/directory-watcher";
import { expressServer } from "../features/express-server";
import { initializeFileTree } from "../features/file-explorer/helpers/initialize-file-tree";
import { vastFileExplorerOptionsDefault } from "../shared/variables";

export function vastFileExplorer(userOptions?: VastFileExplorerOptions): Plugin {
  const options = {
    ...vastFileExplorerOptionsDefault,
    ...userOptions,
  };

  return {
    name: "vast-file-explorer",
    async configureServer(server) {
      await initializeFileTree(options);
      server.middlewares.use(expressServer);
      rootDirectoryWatcher(server, options);
    },
  };
};
