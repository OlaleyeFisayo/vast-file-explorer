import {
  exec,
  spawn,
} from "node:child_process";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { openInFileManager } from "./logic";

vi.mock("node:child_process", () => ({
  exec: vi.fn(),
  spawn: vi.fn(() => ({ on: vi.fn() })),
}));

describe("openInFileManager", () => {
  const originalPlatform = process.platform;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(process, "platform", {
      value: originalPlatform,
      writable: true,
    });
  });

  it("should call \"open\" on darwin (macOS)", async () => {
    Object.defineProperty(process, "platform", {
      value: "darwin",
      writable: true,
    });
    const testPath = "/path/to/file";
    await openInFileManager(testPath);
    expect(exec).toHaveBeenCalledWith(`open "${testPath}"`, expect.any(Function));
  });

  it("should call \"xdg-open\" on linux", async () => {
    Object.defineProperty(process, "platform", {
      value: "linux",
      writable: true,
    });
    const testPath = "/path/to/file";
    await openInFileManager(testPath);
    expect(exec).toHaveBeenCalledWith(`xdg-open "${testPath}"`, expect.any(Function));
  });

  it("should call \"explorer\" with \"/select\" on win32", async () => {
    Object.defineProperty(process, "platform", {
      value: "win32",
      writable: true,
    });
    const testPath = "C:\\path\\to\\file";
    await openInFileManager(testPath);
    expect(spawn).toHaveBeenCalledWith("explorer", ["/select,", testPath]);
  });

  it("should throw an error on an unsupported platform", async () => {
    Object.defineProperty(process, "platform", {
      value: "sunos",
      writable: true,
    });
    await expect(openInFileManager("/path/to/file")).rejects.toThrow("Unsupported Platform");
  });
});
