const express = require("express");
const router = express.Router();
const postController = require("./postController");

router.post("", postController.createPost);

module.exports = router;
