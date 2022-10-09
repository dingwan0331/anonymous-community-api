import express from "express";
import * as postController from "./postController.js";

const router = express.Router();

router.post("", postController.createPost);

router.get("", postController.readPosts);
router.get("/:postId", postController.readPost);

router.delete("/:postId", postController.deletePost);

router.patch("/:postId", postController.updatePost);

export default router;
