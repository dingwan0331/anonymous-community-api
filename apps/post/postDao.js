const { Post } = require("../../models");

const createPost = async (inputValues) => {
  const postRow = await Post.create(inputValues);

  return postRow;
};

const readPosts = async (offset, limit, order) => {
  const postRows = await Post.findAll({
    offset: offset,
    limit: limit,
    order: [order],
  });
  return postRows;
};

module.exports = { createPost, readPosts };
