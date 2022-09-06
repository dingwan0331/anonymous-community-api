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

module.exports = { createPost };
