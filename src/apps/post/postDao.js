import { Post } from "../../models/index.js";

/**
 * @description
 * @param {Object} inputValues 제목,내용,유저네임,패스워드
 * @param {string} inputValues.title 게시물 제목
 * @param {string} inputValues.content 게시물 내용
 * @param {string} inputValues.userName 게시물 작성자
 * @param {string} inputValues.password 암호화된 게시물 비밀번호
 */
const createPost = async (inputValues) => {
  const post = new Post(inputValues);
  const postRow = await post.save();

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
  const postRows = await Post.find().sort([order]).skip(offset).limit(limit);
  return postRows;
};

/**
 * @description posts 테이블의 자원을 pk값으로 조회합니다.
 * @param {number} postId 조회할 데이터 pk 값
 * @returns {Object}
 */
const readPost = async (postId) => {
  const postRow = await Post.findById(postId);
  return postRow;
};

/**
 * @description posts 테이블의 자원을 삭제합니다.
 * @param {number} postId 조회할 데이터 pk 값
 */
const deletePost = async (postId) => {
  await Post.deleteById(postId);
  return;
};

/**
 * @description posts 테이블의 자원을 수정 합니다.
 * @param {number} postId 조회할 데이터 pk 값
 */
const updatePost = async (postId, upadateData) => {
  await Post.update({ _id: postId }, { $set: upadateData });

  return;
};

export { createPost, readPosts, readPost, deletePost, updatePost };
