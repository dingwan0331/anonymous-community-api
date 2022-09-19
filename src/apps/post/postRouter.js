const express = require("express");
const router = express.Router();
const postController = require("./postController");

router.post("", postController.createPost);

router.get("", postController.readPosts);

router.delete("/:postId", postController.deletePost);

router.patch("/:postId", postController.updatePost);

module.exports = router;
