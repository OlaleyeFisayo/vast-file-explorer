export function onFileTreeUpdate(callback: () => void): void {
  // @ts-expect-error - This is a client-side file that will be processed by Vite, where import.meta.hot exists.
  import.meta.hot.on("vast:file-tree-updated", () => {
    callback();
  });
}
