const { BadRequestError, NotFoundError } = require("../../utils/errors");
const postService = require("./postService");

/**
 * @description 게시물 등록하기
 * @throws {BadRequestError} "Key Error" 메세지를 받아 400에러를 반환합니다.
 * */
const createPost = async (req, res, next) => {
  try {
    const { title, content, userName, password } = req.body;

    if (!title || !content || !userName || !password) {
      throw new BadRequestError("Key error");
    }

    await postService.createPost(req.body);

    res.status(201).json({ message: "Created" });
  } catch (err) {
    next(err);
  }
};

/**
 * @description 게시물 전체 조회하기
 * */
const readPosts = async (req, res, next) => {
  try {
    const result = await postService.readPosts(req.query);

    res.status(201).json({ posts: result });
  } catch (err) {
    next(err);
  }
};

/**
 * @description 게시물 단일 삭제 기능
 * */
const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { password } = req.body;

    if (!postId) {
      throw new NotFoundError("Invalid URL");
    }

    if (!password) {
      throw new BadRequestError("Key error");
    }

    await postService.deletePost(postId, password);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

/**
 * @description 게시물 단일 수정 기능
 * */
const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { password, title, content } = req.body;

    if (!postId) {
      throw new NotFoundError("Invalid URL");
    }

    if (!password || !title || !content) {
      throw new BadRequestError("Key error");
    }

    await postService.updatePost(postId, req.body);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

/**
 * @description 게시물 단일 조회 기능
 * */
const readPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await postService.readPost(postId);

    res.status(200).json({ post: post });
  } catch (err) {
    next(err);
  }
};
module.exports = { createPost, readPosts, deletePost, updatePost, readPost };
