import type { Plugin } from "vite";

import type { VastFileExplorerOptions } from "../shared/types";

import { initializeFileTree } from "../core/initialize";
import { rootDirectoryWatcher } from "../core/watcher/index";
import expressServer from "../server/index";
import { setGlobalOptions } from "../shared/variables";

export function vastFileExplorer(userOptions: VastFileExplorerOptions = {}): Plugin {
  setGlobalOptions(userOptions);

  return {
    name: "@vast/file-explorer",
    async configureServer(server) {
      await initializeFileTree();
      server.middlewares.use(expressServer);
      rootDirectoryWatcher(server);
    },
  };
};
