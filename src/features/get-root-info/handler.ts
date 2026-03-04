import type {
  Request,
  Response,
} from "express";

import { getRootInfoLogic } from "./logic";

export function getRootInfoHandler(_: Request, res: Response): void {
  const result = getRootInfoLogic();
  res.json(result).end();
}
