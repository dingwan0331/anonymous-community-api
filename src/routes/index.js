const express = require("express");
const router = express.Router();
const postRouter = require("../apps/post/postRouter");
const { NotFoundError } = require("../utils/errors");

router.get("/ping", (req, res) => {
  // #swagger.tags = ['Ping test']
  res.status(200).json({ message: "pong" });
});

router.use(
  // #swagger.tags = ['Posts']
  "/posts",
  postRouter
);

router.use((req, res, next) => {
  const err = new NotFoundError();
  next(err);
});
module.exports = router;
