import type { Plugin } from "vite";

import type { vastFileExplorerOptions } from "../shared/types";

import fileTree from "..";
import { getFileTree } from "../shared/core/get-file-tree";
import { vastFileExplorerOptionsDefault } from "../shared/variables";

export function vastFileExplorer(userOptions?: vastFileExplorerOptions): Plugin {
  const options = {
    ...vastFileExplorerOptionsDefault,
    ...userOptions,
  };

  return {
    name: "vast-file-explorer",
    async buildStart() {
      const result = await getFileTree(options.rootPath!, { hiddenFiles: options.hiddenFiles });
      fileTree.push(...result);
    },
  };
};
