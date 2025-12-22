import type { Plugin } from "vite";

import type { vastFileExplorerOptions } from "../shared/types";

import { getFileTree } from "../shared/core/get-file-tree";
import { addToFileTree } from "../shared/utils/add-to-file-tree";
import { vastFileExplorerOptionsDefault } from "../shared/variables";

export function vastFileExplorer(userOptions?: vastFileExplorerOptions): Plugin {
  const options = {
    ...vastFileExplorerOptionsDefault,
    ...userOptions,
  };

  return {
    name: "vast-file-explorer",
    async buildStart() {
      const nodes = await getFileTree(options.rootPath!, { hiddenFiles: options.hiddenFiles });
      addToFileTree(nodes);
    },
  };
};
