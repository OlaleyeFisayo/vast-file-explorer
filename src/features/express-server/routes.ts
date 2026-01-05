import express from "express";

import {
  collapseDirectoryHandler,
  expandDirectoryHandler,
  getFileTreeHandler,
} from "./handlers";

const expressRouter = express.Router();

expressRouter.get("/", getFileTreeHandler);
expressRouter.post("/expand", expandDirectoryHandler);
expressRouter.post("/collapse", collapseDirectoryHandler);

export { expressRouter };
