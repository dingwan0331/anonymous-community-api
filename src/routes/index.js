import express from "express";
import { default as postRouter } from "../apps/post/postRouter.js";

const router = express.Router();

router.get("/ping", (req, res) => {
  // #swagger.tags = ['Ping test']
  res.status(200).json({ message: "pong" });
});

router.use(
  // #swagger.tags = ['Posts']
  "/posts",
  postRouter
);

export default router;
