import type { Plugin } from "vite";

import type { VastFileExplorerOptions } from "../shared/types";

import { rootDirectoryWatcher } from "../features/directory-watcher";
import { collapseDirectory } from "../features/file-explorer/helpers/collapse-directory";
import { expandDirectory } from "../features/file-explorer/helpers/expand-directory";
import { initializeFileTree } from "../features/file-explorer/helpers/initialize-file-tree";
import { FileTree } from "../features/file-explorer/variables";
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
      console.log("init filetree", FileTree);
      await expandDirectory("src");
      console.log("expand src", FileTree);
      collapseDirectory("src");
      console.log("collapse src", FileTree);
    },
    configureServer(server) {
      rootDirectoryWatcher(server, options);
    },
  };
};
