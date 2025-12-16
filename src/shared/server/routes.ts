import type { ViteDevServer } from "vite";

import type { ServerRoutes } from "../types";

import { getFileTreeHandler } from "./handlers/get-file-tree-handler";

export function vastFileExplorerRoutes(server: ViteDevServer): void {
  const routes: ServerRoutes[] = [
    {
      path: "/vast-file-explorer/get-file-tree",
      method: "GET",
      handler: getFileTreeHandler,
    },
  ];

  routes.forEach((route) => {
    server.middlewares.use(route.path, (req, res) => {
      if (req.method === route.method) {
        route.handler(req, res);
      }
    });
  });
}
