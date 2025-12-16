import type {
  IncomingMessage,
  ServerResponse,
} from "node:http";
import type { Connect } from "vite";

export type vastFileExplorerOptions = {
  rootPath?: string;
};

export type ServerRoutesMethod = "GET" | "POST";

export type ServerRouteHandler = (req: Connect.IncomingMessage, res: ServerResponse<IncomingMessage>) => void;

export type ServerRoutes = {
  path: string;
  method: ServerRoutesMethod;
  handler: ServerRouteHandler;
};
