export function onFileTreeUpdate(callback: () => void): void {
  if ((import.meta as any).env?.VITE_BRICKLY_STANDALONE) {
    const loc = globalThis as any;
    const wsPort: string = loc.location?.port || "5174";
    const wsHost: string = loc.location?.hostname || "localhost";
    const ws: { onmessage: ((e: { data: string }) => void) | null; onerror: (() => void) | null }
      = new (loc.WebSocket as any)(`ws://${wsHost}:${wsPort}/_brickly-ws`);
    ws.onmessage = (event) => {
      if (event.data === "brickly:file-tree-updated")
        callback();
    };
    ws.onerror = () => console.warn("[brickly] WebSocket connection failed");
  }
  else {
    // @ts-expect-error - This is a client-side file that will be processed by Vite, where import.meta.hot exists.
    import.meta.hot.on("brickly:file-tree-updated", () => {
      callback();
    });
  }
}
