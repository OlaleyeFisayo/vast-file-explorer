import express from "express";

import {
  collapseDirectoryHandler,
  createFileHandler,
  expandDirectoryHandler,
  getFileTreeHandler,
} from "./handlers";

const expressRouter = express.Router();

expressRouter
  .get("/", getFileTreeHandler)
  .post("/", createFileHandler)
  .post("/expand", expandDirectoryHandler)
  .post("/collapse", collapseDirectoryHandler);

export { expressRouter };
