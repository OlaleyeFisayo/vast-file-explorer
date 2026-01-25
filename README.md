# VAST File Explorer

Core file system bridge for VAST. This tool provides secure, development-time access to project files and directories, enabling VAST's visual builder to read and write components directly to your local Vue project.

## Features

- **File Operations**: Create, Update, Delete (CUD) for files.
- **Directory Operations**: Create, Delete, Collapse, Expand directories.
- **Management**: Move, Copy, and Rename files and folders.
- **Navigation**: Open files and folders in the system's file manager.
- **Search**: Efficient file search functionality.
- **File Tree**: Generate and update file tree structures for UI visualization.

## Installation

```bash
npm install @vast/file-explorer
```

## Usage

### Vite Plugin

To use VAST File Explorer in your Vite project, add the `vastFileExplorer` plugin to your `vite.config.ts`:

```typescript
import { defineConfig } from "vite";

import { vastFileExplorer } from "@vast/file-explorer/vite";

export default defineConfig({
  plugins: [
    vastFileExplorer({
      // Optional configurations
      rootPath: "./",
      hiddenFiles: ["node_modules", ".git", "dist", ".husky", ".vscode"],
    })
  ]
});
```

### Options

| Option        | Type       | Default                                                 | Description                                                                                  |
| ------------- | ---------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `rootPath`    | `string`   | `'./'`                                                  | The root directory the plugin will watch and manage. Must be within the project's directory. |
| `hiddenFiles` | `string[]` | `['node_modules', '.git', 'dist', '.husky', '.vscode']` | A list of files or directories to exclude from the file tree.                                |

## API

The following functions are exported from `@vast/file-explorer` and can be used to interact with the file system.

| Function              | Signature                                                      | Description                                                                |
| --------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `collapseDirectory`   | `(path: string): Promise<FileTreeNode[]>`                      | Collapses a directory in the file tree.                                    |
| `copyFile`            | `(sourcePath: string, destinationDir?: string): Promise<void>` | Copies a file to a new location.                                           |
| `copyFolder`          | `(sourcePath: string, destinationDir?: string): Promise<void>` | Copies a folder to a new location.                                         |
| `createFile`          | `(name: string, dirPath?: string): Promise<void>`              | Creates a new file.                                                        |
| `createFolder`        | `(name: string, dirPath?: string): Promise<void>`              | Creates a new folder.                                                      |
| `deleteFile`          | `(path: string): Promise<void>`                                | Deletes a file.                                                            |
| `deleteFolder`        | `(path: string): Promise<void>`                                | Deletes a folder.                                                          |
| `expandDirectory`     | `(path: string): Promise<FileTreeNode[]>`                      | Expands a directory in the file tree.                                      |
| `onFileTreeUpdate`    | `(callback: () => void): void`                                 | Registers a callback to be called when the file tree is updated.           |
| `getFileTree`         | `(): Promise<FileTreeNode[]>`                                  | Retrieves the entire file tree.                                            |
| `getRootPathBasename` | `(): Promise<string>`                                          | Retrieves the basename of the root path.                                   |
| `moveFile`            | `(sourcePath: string, destinationDir?: string): Promise<void>` | Moves a file to a new location.                                            |
| `moveFolder`          | `(sourcePath: string, destinationDir?: string): Promise<void>` | Moves a folder to a new location.                                          |
| `openInFileManager`   | `(path: string): Promise<void>`                                | Opens a file or folder in the file manager (Windows, macOS, & Linux only). |
| `rename`              | `(path: string, newName: string): Promise<void>`               | Renames a file or folder.                                                  |
| `searchFiles`         | `(query: string): Promise<FileTreeNode[]>`                     | Searches for files based on a query.                                       |

## Client Data Handling

When using the client-side functions, it's important to handle the data correctly to ensure your UI stays in sync with the file system.

### File Tree State Management

Functions like `getFileTree`, `expandDirectory`, and `collapseDirectory` return the updated file tree structure. You should use this returned data to overwrite your local state.

Other functions such as `createFile`, `deleteFile`, `copyFile`, etc., trigger a file system watcher that uses Hot Module Replacement (HMR) to notify the client of changes. You can listen for these changes using the `onFileTreeUpdate` function and refetch the file tree.

Here's an example of how you might manage the file tree state in a Vue composable:

```typescript
import type { FileTreeNode } from " @vast/file-explorer";

import {
  collapseDirectory,
  expandDirectory,
  getFileTree,
  onFileTreeUpdate,
} from " @vast/file-explorer";
import {
  onBeforeMount,
  ref,
} from "vue";

export function useFileTree() {
  const TreeNodes = ref<FileTreeNode[]>([]);

  const fetchTree = async () => {
    const data = await getFileTree();
    TreeNodes.value = data;
  };

  const expand = async (path: string) => {
    const data = await expandDirectory(path);
    TreeNodes.value = data;
  };

  const collapse = async (path: string) => {
    const data = await collapseDirectory(path);
    TreeNodes.value = data;
  };

  onBeforeMount(async () => {
    await fetchTree();
    onFileTreeUpdate(async () => {
      await fetchTree();
    });
  });

  return {
    TreeNodes,
    collapse,
    expand,
  };
}
```
