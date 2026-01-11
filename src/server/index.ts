import express from "express";

import { serverBaseURL } from "../shared/variables";
import { expressRouter } from "./routes";

const expressServer = express();

expressServer.use(express.json());

expressServer.use(serverBaseURL, expressRouter);

export default expressServer;
