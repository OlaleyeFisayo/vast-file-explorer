import express from "express";

import { collapseDirectoryHandler } from "../features/collapse-directory/handler";
import { copyHandler } from "../features/copy/handler";
import { createFileHandler } from "../features/create-file/handler";
import { createFolderHandler } from "../features/create-folder/handler";
import { deleteHandler } from "../features/delete/handler";
import { expandDirectoryHandler } from "../features/expand-directory/handler";
import { getFileTreeHandler } from "../features/get-file-tree/handler";
import { getRootPathBasenameHandler } from "../features/get-root-path-basename/handler";
import { moveHandler } from "../features/move/handler";
import { openInFileManagerHandler } from "../features/open-in-file-manager/handler";
import { renameItemHandler } from "../features/rename/handler";
import { searchHandler } from "../features/search/handler";

const expressRouter = express.Router();

expressRouter
  .get("/", getFileTreeHandler)
  .get("/search", searchHandler)
  .get("/root-path-basename", getRootPathBasenameHandler)
  .post("/", createFileHandler)
  .post("/folder", createFolderHandler)
  .post("/copy", copyHandler)
  .post("/move", moveHandler)
  .post("/rename", renameItemHandler)
  .post("/delete", deleteHandler)
  .post("/expand", expandDirectoryHandler)
  .post("/collapse", collapseDirectoryHandler)
  .post("/open-in-file-manager", openInFileManagerHandler);

export { expressRouter };
