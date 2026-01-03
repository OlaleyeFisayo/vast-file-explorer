import type { ViteDevServer } from "vite";

import path from "node:path";

import type { VastFileExplorerOptions } from "../../types";

import { uiTree } from "../../variables";
import { onFileAndFolderAdd } from "./on-file-and-folder-add";

export function rootDirectoryWatcher(server: ViteDevServer, userOptions: VastFileExplorerOptions): void {
  const rootPath = userOptions.rootPath ? path.resolve(userOptions.rootPath) : process.cwd();

  server.watcher.on("all", (event, filePath) => {
    const absoluteFilePath = path.resolve(filePath);

    if (!absoluteFilePath.startsWith(rootPath)) {
      return;
    }

    switch (event) {
      case "add":
      case "addDir":
        onFileAndFolderAdd(absoluteFilePath, userOptions);
        break;
    }
    console.log(uiTree);
  });
}
