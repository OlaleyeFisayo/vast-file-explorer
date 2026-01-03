import type {
  IncomingMessage,
  ServerResponse,
} from "node:http";
import type { Connect } from "vite";

export type vastFileExplorerOptions = {
  rootPath?: string;
  hiddenFiles?: Array<string>;
};

export type ServerRoutesMethod = NonNullable<IncomingMessage["method"]>;

export type ServerRouteHandler<T = void> = (req: Connect.IncomingMessage, res: ServerResponse<IncomingMessage>) => T;

export type ServerRoutes = {
  path: string;
  method: ServerRoutesMethod;
  handler: ServerRouteHandler;
};

export type FileType = {
  type: "file";
};

export type DirectoryType = {
  type: "directory";
  expanded: boolean;
  children: Map<string, FileTreeNode>;
};

export type FileTreeNode = {
  name: string;
  path: string;
} & (FileType | DirectoryType);
