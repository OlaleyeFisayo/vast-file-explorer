import type { Plugin } from "vite";

import type { FileExplorerOptions } from "../shared/types";

import { initializeFileTree } from "../core/initialize";
import { rootDirectoryWatcher } from "../core/watcher/index";
import expressServer from "../server/index";
import { setGlobalOptions } from "../shared/variables";

export function fileExplorer(userOptions: FileExplorerOptions = {}): Plugin {
  setGlobalOptions(userOptions);

  return {
    name: "@brickly/file-explorer",
    async configureServer(server) {
      await initializeFileTree();
      server.middlewares.use(expressServer);
      rootDirectoryWatcher(server);
    },
  };
};
