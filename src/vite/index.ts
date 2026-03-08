import type { Plugin } from "vite";

import type { FileExplorerOptions } from "../shared/types";

import { initializeFileTree } from "../core/initialize";
import { rootDirectoryWatcher } from "../core/watcher/index";
import expressServer from "../server/index";
import { setGlobalOptions } from "../shared/utils/set-global-options";

export function fileExplorer(userOptions: FileExplorerOptions = {}): Plugin {
  setGlobalOptions(userOptions);

  return {
    name: "@brickly/file-explorer",
    apply: "serve",
    async configureServer(server) {
      await initializeFileTree();
      server.middlewares.use(expressServer);
      rootDirectoryWatcher(server);
    },
  };
};
