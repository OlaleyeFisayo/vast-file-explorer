import type { ViteDevServer } from "vite";

// TODO: write actual code to watch file
export function FileSystemWatcher(server: ViteDevServer): void {
  server.watcher.on("change", () => {
    // console.log(path);
  });
}
