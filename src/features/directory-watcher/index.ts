import type { ViteDevServer } from "vite";

import path from "node:path";

import type { VastFileExplorerOptions } from "../../shared/types";

import { FileTree } from "../file-explorer/variables";
import { onFileAndFolderAdd } from "./helpers/on-file-and-folder-add";
import { onFileAndFolderDelete } from "./helpers/on-file-and-folder-delete";

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
      case "unlink":
      case "unlinkDir":
        onFileAndFolderDelete(absoluteFilePath, userOptions);
        break;
    }

    console.log("Updated: ", FileTree);
  });
}
