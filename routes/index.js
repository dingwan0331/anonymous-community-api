const express = require("express");
const router = express.Router();
const postRouter = require("../apps/post/postRouter");

router.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

router.use("/posts", postRouter);

module.exports = router;
