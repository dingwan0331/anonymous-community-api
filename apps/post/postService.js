const { Validator } = require("../../utils/validators");
const postDao = require("./postDao");
const bcrypt = require("bcrypt");

const createPost = async (reqBody) => {
  const { title, content, userName, password } = reqBody;

  // 데이터 유효성 검사
  new Validator(reqBody);

  const hashedPassword = await bcrypt.hash(password, 10);

  const postData = {
    title: title,
    content: content,
    userName: userName,
    password: hashedPassword,
  };

  const postRow = await postDao.createPost(postData);

  return postRow;
};

const readPosts = async ({ offset = 0, limit = 20, orderKey = "latest" }) => {
  const orderSet = {
    old: ["createdAt", "ASC"],
    latest: ["createdAt", "DESC"],
  };

  const order = orderSet[orderKey];

  const postRows = await postDao.readPosts(offset, limit, order);

  const posts = postRows.map((row) => {
    const post = {
      title: row.title,
      content: row.content,
      userName: row.userName,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
    return post;
  });

  return posts;
};

module.exports = { createPost, readPosts };
