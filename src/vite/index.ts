import type { Plugin } from "vite";

import type { VastFileExplorerOptions } from "../shared/types";

import { rootDirectoryWatcher } from "../features/directory-watcher";
import { getFileTree } from "../features/file-tree/helpers/get-file-tree";
import { uiTree } from "../features/file-tree/variables";
import { vastFileExplorerOptionsDefault } from "../shared/variables";

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
    },
    configureServer(server) {
      rootDirectoryWatcher(server, options);
    },
  };
};
