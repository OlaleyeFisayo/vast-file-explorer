import type { Plugin } from "vite";

import type { VastFileExplorerOptions } from "../shared/types";

import { rootDirectoryWatcher } from "../features/directory-watcher";
import { initializeFileTree } from "../features/file-explorer/helpers/initialize-file-tree";
import expressServer from "../features/server";
import { setGlobalOptions } from "../shared/variables";

export function vastFileExplorer(userOptions: VastFileExplorerOptions = {}): Plugin {
  setGlobalOptions(userOptions);

  return {
    name: "vast-file-explorer",
    async configureServer(server) {
      await initializeFileTree();
      server.middlewares.use(expressServer);
      rootDirectoryWatcher(server);
    },
  };
};
