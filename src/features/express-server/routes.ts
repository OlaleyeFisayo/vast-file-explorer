import express from "express";

const expressRouter = express.Router();

expressRouter.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Vast File Explorer server is running",
  });
});

export { expressRouter };
