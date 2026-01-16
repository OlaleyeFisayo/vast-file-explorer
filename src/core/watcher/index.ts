import type { ViteDevServer } from "vite";

import path from "node:path";

import { onFileAndFolderAdd } from "./helpers/on-file-and-folder-add";
import { onFileAndFolderDelete } from "./helpers/on-file-and-folder-delete";

export function rootDirectoryWatcher(server: ViteDevServer): void {
  server.watcher.on("all", async (event, filePath) => {
    const absoluteFilePath = path.resolve(filePath);

    if (event === "add" || event === "addDir")
      await onFileAndFolderAdd(absoluteFilePath);
    if (event === "unlink" || event === "unlinkDir")
      await onFileAndFolderDelete(absoluteFilePath);

    server.ws.send("vast:file-tree-updated");
  });
}
