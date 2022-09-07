const { BadRequestError } = require("../../utils/errors");
const postService = require("./postService");

/**
 * @description 게시물 등록하기
 * @throws {BadRequestError} "Key Error" 메세지를 받아 400에러를 반환합니다.
 * */
const createPost = async (req, res, next) => {
  try {
    const { title, content, userName, password } = req.body;

    if (!title && !content && !userName && !password) {
      throw new BadRequestError("Key error");
    }

    const result = await postService.createPost(req.body);

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

module.exports = { createPost, readPosts };
