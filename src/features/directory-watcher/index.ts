import type { ViteDevServer } from "vite";

import path from "node:path";

import { onFileAndFolderAdd } from "./helpers/on-file-and-folder-add";
import { onFileAndFolderDelete } from "./helpers/on-file-and-folder-delete";

export function rootDirectoryWatcher(server: ViteDevServer): void {
  let debounceTimer: NodeJS.Timeout;

  server.watcher.on("all", async (event, filePath) => {
    const absoluteFilePath = path.resolve(filePath);

    switch (event) {
      case "add":
      case "addDir":
        await onFileAndFolderAdd(absoluteFilePath);
        break;
      case "unlink":
      case "unlinkDir":
        await onFileAndFolderDelete(absoluteFilePath);
        break;
      default:
        return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      server.ws.send("vast:file-tree-updated");
    }, 100);
  });
}
