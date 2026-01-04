import express from "express";

import { expressRouter } from "./routes";

const expressServer = express();

expressServer.use(express.json());

expressServer.use("/_vast-file-explorer", expressRouter);

export { expressServer };
