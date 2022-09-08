const express = require("express");
const router = express.Router();
const postController = require("./postController");
// 게시물 생성
router.post("", postController.createPost);

// 게시물 리스트 조회
router.get("", postController.readPosts);

// 게시물 삭제
router.delete("/:postId", postController.deletePost);

module.exports = router;
