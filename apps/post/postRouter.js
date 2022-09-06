const express = require("express");
const router = express.Router();
const postController = require("./postController");

router.post("", postController.createPost);
router.get("", postController.readPosts);

module.exports = router;
