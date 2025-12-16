import type { ServerRouteHandler } from "../../types";

export const getFileTreeHandler: ServerRouteHandler = (req, res) => {
  console.log({
    req,
    res,
  });
};
