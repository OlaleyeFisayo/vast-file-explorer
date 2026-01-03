import type { Plugin } from "vite";

import type { VastFileExplorerOptions } from "../shared/types";

import { getFileTree } from "../shared/core/get-file-tree";
import { rootDirectoryWatcher } from "../shared/core/root-directory-watcher";
import {
  uiTree,
  vastFileExplorerOptionsDefault,
} from "../shared/variables";

export function vastFileExplorer(userOptions?: VastFileExplorerOptions): Plugin {
  const options = {
    ...vastFileExplorerOptionsDefault,
    ...userOptions,
  };

  return {
    name: "vast-file-explorer",
    async buildStart() {
      const tree = await getFileTree(options.rootPath!, { hiddenFiles: options.hiddenFiles });

      uiTree.clear();
      for (const [key, value] of tree) {
        uiTree.set(key, value);
      }
      console.log(uiTree);
    },
    configureServer(server) {
      rootDirectoryWatcher(server, options);
    },
  };
};
