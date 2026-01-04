import type { Plugin } from "vite";

import type { VastFileExplorerOptions } from "../shared/types";

import { rootDirectoryWatcher } from "../features/directory-watcher";
import { expandDirectory } from "../features/file-explorer/helpers/expand-directory";
import { initializeFileTree } from "../features/file-explorer/helpers/initialize-file-tree";
import { vastFileExplorerOptionsDefault } from "../shared/variables";

export function vastFileExplorer(userOptions?: VastFileExplorerOptions): Plugin {
  const options = {
    ...vastFileExplorerOptionsDefault,
    ...userOptions,
  };

  return {
    name: "vast-file-explorer",
    async buildStart() {
      await initializeFileTree(options);
      await expandDirectory("src");
    },
    configureServer(server) {
      rootDirectoryWatcher(server, options);
    },
  };
};
