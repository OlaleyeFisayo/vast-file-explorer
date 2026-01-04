import type { ViteDevServer } from "vite";

import path from "node:path";

import type { VastFileExplorerOptions } from "../../shared/types";

import { onFileAndFolderAdd } from "./helpers/on-file-and-folder-add";
import { onFileAndFolderDelete } from "./helpers/on-file-and-folder-delete";

export function rootDirectoryWatcher(server: ViteDevServer, userOptions: VastFileExplorerOptions): void {
  server.watcher.on("all", async (event, filePath) => {
    const absoluteFilePath = path.resolve(filePath);

    switch (event) {
      case "add":
      case "addDir":
        await onFileAndFolderAdd(absoluteFilePath, userOptions);
        break;
      case "unlink":
      case "unlinkDir":
        await onFileAndFolderDelete(absoluteFilePath, userOptions);
        break;
    }
  });
}
