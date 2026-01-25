import {
  exec,
  spawn,
} from "node:child_process";

export async function openInFileManager(path: string): Promise<void> {
  switch (process.platform) {
    case "win32": {
      const child = spawn("explorer", ["/select,", path]);
      // eslint-disable-next-line no-console
      child.on("error", console.log);
      break;
    }
    case "darwin":
      exec(`open "${path}"`, (error) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      });
      break;
    case "linux":
      exec(`xdg-open "${path}"`, (error) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      });
      break;
    default:
      throw new Error("Unsupported Platform");
  }
}
