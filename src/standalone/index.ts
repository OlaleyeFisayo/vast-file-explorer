import chokidar from "chokidar";
import { EventEmitter } from "node:events";
import path from "node:path";

import type { FileExplorerOptions } from "../shared/types";

import { initializeFileTree } from "../core/initialize";
import { onFileAndFolderAdd } from "../core/watcher/helpers/on-file-and-folder-add";
import { onFileAndFolderDelete } from "../core/watcher/helpers/on-file-and-folder-delete";
import expressServer from "../server/index";
import { setGlobalOptions } from "../shared/utils/set-global-options";
import { globalOptions } from "../shared/variables";

// eslint-disable-next-line ts/explicit-function-return-type
export async function createBricklyServer(options: FileExplorerOptions) {
  setGlobalOptions(options);
  await initializeFileTree();

  const events = new EventEmitter();
  const watchPath = path.resolve(process.cwd(), globalOptions.rootPath ?? "./");

  chokidar.watch(watchPath, { ignoreInitial: true }).on("all", async (event, filePath) => {
    const absoluteFilePath = path.resolve(filePath);

    if (event === "add" || event === "addDir")
      await onFileAndFolderAdd(absoluteFilePath);
    if (event === "unlink" || event === "unlinkDir")
      await onFileAndFolderDelete(absoluteFilePath);

    events.emit("file-changed");
  });

  return {
    app: expressServer,
    events,
  };
}
