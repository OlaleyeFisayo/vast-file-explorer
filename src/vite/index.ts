import type { Plugin } from "vite";

import { vastFileExplorerRoutes } from "../shared/server/routes";

export function vastFileExplorer(): Plugin {
  return {
    name: "vast-file-explorer",
    configureServer(server) {
      vastFileExplorerRoutes(server);
    },
  };
};
