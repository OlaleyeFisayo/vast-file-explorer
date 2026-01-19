import type {
  Request,
  Response,
} from "express";

import { getRootPathBasenameLogic } from "./logic";

export function getRootPathBasenameHandler(_: Request, res: Response): void {
  const result = getRootPathBasenameLogic();
  res.json(result).end();
}
