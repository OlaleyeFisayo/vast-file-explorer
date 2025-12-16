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

export type ServerRouteHandler = (req: Connect.IncomingMessage, res: ServerResponse<IncomingMessage>) => void;

export type ServerRoutes = {
  path: string;
  method: ServerRoutesMethod;
  handler: ServerRouteHandler;
};
