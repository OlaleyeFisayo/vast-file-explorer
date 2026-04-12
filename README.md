# Brickly File Explorer

A Vite plugin that provides secure, development-time access to your project's file system. Enables tools and UIs to read, write, and explore local project files and directories via a built-in Express server.

## Features

- **File Operations**: Create, Read, Update, Delete (CRUD) for files.
- **Directory Operations**: Create, Delete, Collapse, Expand directories.
- **Management**: Move, Copy, and Rename files and folders (unified operations for both).
- **Navigation**: Open files and folders in the system's file manager, or in an IDE.
- **Search**: Efficient file search functionality.
- **File Tree**: Generate and update file tree structures for UI visualization.

## Installation

```bash
npm install @brickly/file-explorer
```

## Usage

### Vite Plugin

To use Brickly File Explorer in your Vite project, add the `fileExplorer` plugin to your `vite.config.ts`:

```typescript
import { defineConfig } from "vite";

import { fileExplorer } from "@brickly/file-explorer/vite";

export default defineConfig({
  plugins: [
    fileExplorer({
      // Optional configurations
      rootPath: "./",
      respectGitIgnore: true, // automatically excludes entries from .gitignore
      hiddenFiles: [".git", ".vscode"], // any additional files/folders to hide
    })
  ]
});
```

### Options

| Option             | Type                                                                                                                                 | Default               | Description                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ---------------------------------------------------------------------------------------------------- |
| `rootPath`         | `string`                                                                                                                             | `'./'`                | The root directory the plugin will watch and manage. Must be within the project's directory.         |
| `hiddenFiles`      | `string[]`                                                                                                                           | `['.git', '.vscode']` | Additional files or directories to exclude from the file tree. Merged with any `.gitignore` entries. |
| `respectGitIgnore` | `boolean`                                                                                                                            | `true`                | When enabled, reads `.gitignore` in the root directory and excludes its entries from the file tree.  |
| `defaultIde`       | `"vscode" \| "vscode-insiders" \| "cursor" \| "webstorm" \| "intellij-idea" \| "sublime-text" \| "zed" \| "atom" \| "vim" \| "nvim"` | `undefined`           | The IDE to open files in. Must be set to use `openInIde`.                                            |

## Types

### `FileTreeNode`

```ts
type FileTreeNode = {
  name: string; // File or folder name
  path: string; // Absolute path
  parentPath: string; // Absolute path of the parent directory
  absolutePath: string;
  key: string; // Path relative to the root (used as a unique identifier)
} & (
  | {
    type: "file";
    extension: string; // e.g. "vue", "ts", "" for no extension
  }
  | {
    type: "directory";
    expanded: boolean;
    childExpanded: boolean;
    children: FileTreeNode[];
  }
);
```

## API

The following functions are exported from `@brickly/file-explorer` and can be used to interact with the file system.

| Function            | Signature                                                                   | Description                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `getRootInfo`       | `(): Promise<{ basename: string; rootPath: string }>`                       | Retrieves the basename and absolute path of the root directory.                                                                       |
| `getFileTree`       | `(): Promise<FileTreeNode[]>`                                               | Retrieves the entire file tree.                                                                                                       |
| `collapseDirectory` | `(path: string): Promise<FileTreeNode[]>`                                   | Collapses a directory in the file tree.                                                                                               |
| `expandDirectory`   | `(path: string): Promise<FileTreeNode[]>`                                   | Expands a directory in the file tree.                                                                                                 |
| `getFileContent`    | `(path: string): Promise<string>`                                           | Retrieves the content of a file as a string.                                                                                          |
| `setFileContent`    | `(path: string, content: string): Promise<void>`                            | Writes content to a file, overwriting its current content.                                                                            |
| `createFile`        | `(name: string, dirPath?: string): Promise<void>`                           | Creates a new file.                                                                                                                   |
| `createFolder`      | `(name: string, dirPath?: string): Promise<void>`                           | Creates a new folder.                                                                                                                 |
| `deleteItem`        | `(path: string): Promise<void>`                                             | Deletes a file or folder.                                                                                                             |
| `deleteItems`       | `(paths: string[]): Promise<void>`                                          | Deletes multiple files or folders.                                                                                                    |
| `rename`            | `(path: string, newName: string): Promise<void>`                            | Renames a file or folder.                                                                                                             |
| `move`              | `(sourcePath: string, destinationDir?: string): Promise<void>`              | Moves a file or folder to a new location.                                                                                             |
| `moveItems`         | `(items: { sourcePath: string; destinationDir?: string }[]): Promise<void>` | Moves multiple files or folders.                                                                                                      |
| `copy`              | `(sourcePath: string, destinationDir?: string): Promise<void>`              | Copies a file or folder to a new location.                                                                                            |
| `copyItems`         | `(items: { sourcePath: string; destinationDir?: string }[]): Promise<void>` | Copies multiple files or folders.                                                                                                     |
| `openInFileManager` | `(path: string): Promise<void>`                                             | Opens a file or folder in the file manager (Windows, macOS, & Linux only).                                                            |
| `openInIde`         | `(path: string): Promise<void>`                                             | Opens a file in the configured IDE. To use this feature, make sure you set a default IDE in the brickly/file-explorer plugin options. |
| `onFileTreeUpdate`  | `(callback: () => void): void`                                              | Registers a callback to be called when the file tree is updated.                                                                      |
| `searchFiles`       | `(query: string): Promise<FileTreeNode[]>`                                  | Searches for files based on a query.                                                                                                  |

## Client Data Handling

When using the client-side functions, it's important to handle the data correctly to ensure your UI stays in sync with the file system.

### File Tree State Management

Functions like `getFileTree`, `expandDirectory`, and `collapseDirectory` return the updated file tree structure. You should use this returned data to overwrite your local state.

Other functions such as `createFile`, `createFolder`, `deleteItem`, `copy`, etc., trigger a file system watcher that uses Hot Module Replacement (HMR) to notify the client of changes. You can listen for these changes using the `onFileTreeUpdate` function and refetch the file tree.

Here's an example of how you might manage the file tree state in TypeScript:

```typescript
import type { FileTreeNode } from "@brickly/file-explorer";

import {
  collapseDirectory,
  expandDirectory,
  getFileTree,
  onFileTreeUpdate,
} from "@brickly/file-explorer";

let treeNodes: FileTreeNode[] = [];

async function fetchTree() {
  treeNodes = await getFileTree();
}

async function expand(path: string) {
  treeNodes = await expandDirectory(path);
}

async function collapse(path: string) {
  treeNodes = await collapseDirectory(path);
}

await fetchTree();

onFileTreeUpdate(async () => {
  await fetchTree();
});
```
