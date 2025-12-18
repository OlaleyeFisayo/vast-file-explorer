import type { Plugin } from "vite";

import type {
  FileTreeNode,
  vastFileExplorerOptions,
} from "../shared/types";

import { FileSystemWatcher } from "../shared/core/file-system-watcher";
import { getFileTree } from "../shared/core/get-file-tree";
import { vastFileExplorerRoutes } from "../shared/server/routes";
import { vastFileExplorerOptionsDefault } from "../shared/variables";

export function vastFileExplorer(userOptions: vastFileExplorerOptions): Plugin {
  let fileTree: FileTreeNode[] = [];

  const options = {
    ...vastFileExplorerOptionsDefault,
    ...userOptions,
  };

  return {
    name: "vast-file-explorer",
    configureServer(server) {
      vastFileExplorerRoutes(server);

      // testing file system watcher
      FileSystemWatcher(server);
    },
    async buildStart() {
      fileTree = await getFileTree(options.rootPath!, { hiddenFiles: options.hiddenFiles });
      // console.log(fileTree);
    },
  };
};
