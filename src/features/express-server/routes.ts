import express from "express";

import { getFileTreeHandler } from "./handlers";

const expressRouter = express.Router();

expressRouter.get("/", getFileTreeHandler);

export { expressRouter };
