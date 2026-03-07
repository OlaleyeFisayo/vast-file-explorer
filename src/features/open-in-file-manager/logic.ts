import {
  exec,
  spawn,
} from "node:child_process";

export async function openInFileManager(path: string): Promise<void> {
  switch (process.platform) {
    case "win32": {
      spawn("explorer", ["/select,", path]);
      break;
    }
    case "darwin":
      exec(`open "${path}"`);
      break;
    case "linux":
      exec(`xdg-open "${path}"`);
      break;
    default:
      throw new Error("Unsupported Platform");
  }
}
