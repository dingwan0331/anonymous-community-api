const { Post } = require("../../models");

const createPost = async (inputValues) => {
  const postRow = await Post.create(inputValues);

  return postRow;
};

module.exports = { createPost };
