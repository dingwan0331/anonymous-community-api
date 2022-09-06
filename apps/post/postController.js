const { BadRequestError } = require("../../utils/errors");
const postService = require("./postService");

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

const readPosts = async (req, res, next) => {
  try {
    const result = await postService.readPosts(req.query);

    res.status(201).json({ posts: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { createPost, readPosts };
