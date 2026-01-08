import express from "express";

import {
  collapseDirectoryHandler,
  createFileHandler,
  createFolderHandler,
  deleteFileHandler,
  deleteFolderHandler,
  expandDirectoryHandler,
  getFileTreeHandler,
  renameItemHandler,
} from "./handlers";

const expressRouter = express.Router();

expressRouter
  .get("/", getFileTreeHandler)
  .post("/", createFileHandler)
  .post("/folder", createFolderHandler)
  .post("/rename", renameItemHandler)
  .post("/delete-file", deleteFileHandler)
  .post("/delete-folder", deleteFolderHandler)
  .post("/expand", expandDirectoryHandler)
  .post("/collapse", collapseDirectoryHandler);

export { expressRouter };
