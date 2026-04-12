import express from "express";

import { collapseDirectoryHandler } from "../features/collapse-directory/handler";
import {
  batchCopyHandler,
  copyHandler,
} from "../features/copy/handler";
import { createFileHandler } from "../features/create-file/handler";
import { createFolderHandler } from "../features/create-folder/handler";
import {
  batchDeleteHandler,
  deleteHandler,
} from "../features/delete/handler";
import { expandDirectoryHandler } from "../features/expand-directory/handler";
import { getFileContentHandler } from "../features/get-file-content/handler";
import { getFileTreeHandler } from "../features/get-file-tree/handler";
import { getRootInfoHandler } from "../features/get-root-info/handler";
import {
  batchMoveHandler,
  moveHandler,
} from "../features/move/handler";
import { openInFileManagerHandler } from "../features/open-in-file-manager/handler";
import { openInIdeHandler } from "../features/open-in-ide/handler";
import { renameItemHandler } from "../features/rename/handler";
import { searchHandler } from "../features/search/handler";
import { setFileContentHandler } from "../features/set-file-content/handler";

const expressRouter = express.Router();

expressRouter
  .get("/", getFileTreeHandler)
  .get("/search", searchHandler)
  .get("/root-info", getRootInfoHandler)
  .post("/", createFileHandler)
  .post("/folder", createFolderHandler)
  .post("/copy", copyHandler)
  .post("/move", moveHandler)
  .post("/batch-delete", batchDeleteHandler)
  .post("/batch-copy", batchCopyHandler)
  .post("/batch-move", batchMoveHandler)
  .post("/rename", renameItemHandler)
  .post("/delete", deleteHandler)
  .post("/expand", expandDirectoryHandler)
  .post("/collapse", collapseDirectoryHandler)
  .post("/open-in-file-manager", openInFileManagerHandler)
  .post("/open-in-ide", openInIdeHandler)
  .get("/content", getFileContentHandler)
  .post("/content", setFileContentHandler);

export { expressRouter };
