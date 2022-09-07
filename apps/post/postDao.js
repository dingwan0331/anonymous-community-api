const { Post } = require("../../models");
/**
 * @description
 * @param {Object} inputValues 제목,내용,유저네임,패스워드
 * @param {string} inputValues.title 게시물 제목
 * @param {string} inputValues.content 게시물 내용
 * @param {string} inputValues.userName 게시물 작성자
 * @param {string} inputValues.password 암호화된 게시물 비밀번호
 * @returns {object}
 */
const createPost = async (inputValues) => {
  const postRow = await Post.create(inputValues);

  return postRow;
};
/**
 * @description
 * @param {string || number} offset ORM offset 값
 * @param {string || number} limit ORM limit 값
 * @param {Array} order 정렬 값 [field, 오름차순or내림차순] 형태로 받아옵니다.
 * @returns {Array}
 */
const readPosts = async (offset, limit, order) => {
  const postRows = await Post.findAll({
    offset: offset,
    limit: limit,
    order: [order],
  });
  return postRows;
};

module.exports = { createPost, readPosts };
