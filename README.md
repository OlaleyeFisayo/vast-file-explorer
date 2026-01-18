# VAST File Explorer

Core file system bridge for VAST. This tool provides secure, development-time access to project files and directories, enabling VAST's visual builder to read and write components directly to your local Vue project.

## Features

- **File Operations**: Create, Update, Delete (CUD) for files.
- **Directory Operations**: Create, Delete, Collapse, Expand directories.
- **Management**: Move, Copy, and Rename files and folders.
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
      hiddenFiles: ["node_modules", ".git", "dist"]
    })
  ]
});
```

### Options

| Option        | Type       | Default                            | Description                                                   |
| ------------- | ---------- | ---------------------------------- | ------------------------------------------------------------- |
| `rootPath`    | `string`   | `'./'`                             | The root directory the plugin will watch and manage.          |
| `hiddenFiles` | `string[]` | `['node_modules', '.git', 'dist']` | A list of files or directories to exclude from the file tree. |
