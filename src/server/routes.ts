import express from "express";

import { collapseDirectoryHandler } from "../features/collapse-directory/handler";
import { copyFileHandler } from "../features/copy-file/handler";
import { copyFolderHandler } from "../features/copy-folder/handler";
import { createFileHandler } from "../features/create-file/handler";
import { createFolderHandler } from "../features/create-folder/handler";
import { deleteFileHandler } from "../features/delete-file/handler";
import { deleteFolderHandler } from "../features/delete-folder/handler";
import { expandDirectoryHandler } from "../features/expand-directory/handler";
import { getFileTreeHandler } from "../features/get-file-tree/handler";
import { renameItemHandler } from "../features/rename/handler";

const expressRouter = express.Router();

expressRouter
  .get("/", getFileTreeHandler)
  .post("/", createFileHandler)
  .post("/folder", createFolderHandler)
  .post("/copy-file", copyFileHandler)
  .post("/copy-folder", copyFolderHandler)
  .post("/rename", renameItemHandler)
  .post("/delete-file", deleteFileHandler)
  .post("/delete-folder", deleteFolderHandler)
  .post("/expand", expandDirectoryHandler)
  .post("/collapse", collapseDirectoryHandler);

export { expressRouter };
