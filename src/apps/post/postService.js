const { Validator } = require("../../utils/validators");
const postDao = require("./postDao");
const bcrypt = require("bcrypt");
const { BadRequestError, NotFoundError } = require("../../utils/errors");

/**
 * @description 게시판 데이터 생성에 대한 유효성검사와 비밀번호를 암호화합니다.
 * @param {Object} reqBody request요청의 body를 객체형태 그대로 받아옵니다.
 * @param {string} reqBody.title 게시글 제목
 * @param {string} reqBody.content 게시글 내용
 * @param {string} reqBody.userName 게시글 작성한 유저가 지정한 이름
 * @param {string} reqBody.password 게시글 패스워드
 * @returns {Object} DB에서 뽑아온 객체형태 그대로 반환합니다.
 */
const createPost = async (reqBody) => {
  const { title, content, userName, password } = reqBody;

  new Validator(reqBody);

  const hashedPassword = await bcrypt.hash(password, 10);

  const postData = {
    title: title,
    content: content,
    userName: userName,
    password: hashedPassword,
  };

  await postDao.createPost(postData);

  return;
};

/**
 * @description ORM사용시 필요한 offset, limit 과 order를 지정하며 DB에서 조회해온 데이터를 반환합니다.
 * @param {string || number} offset 페이지네이션에 필요한 offset값
 * @param {string || number} limit 페이지네이션에 필요한 limit 값
 * @param {string} orderKey postDao의 인자값으로 활용할 order와 1:1로 맵핑됩니다.
 * @returns {Array} posts 데이터 객체를 요소로 가진 Array를 반환합니다.
 */

const readPosts = async ({ offset = 0, limit = 20, orderKey = "latest" }) => {
  const orderSet = {
    old: ["createdAt", "ASC"],
    latest: ["createdAt", "DESC"],
  };

  const order = orderSet[orderKey];

  if (isNaN(+offset)) {
    throw new BadRequestError("Invalid offset");
  }

  if (isNaN(+limit)) {
    throw new BadRequestError("Invalid limit");
  }

  if (!order) {
    throw new BadRequestError("Invalid order-key");
  }

  const postRows = await postDao.readPosts(offset, limit, order);

  /**
   * @type {{
   *  title: string,
   *  content: string
   *  userName: number,
   *  password: string,
   *  createdAt: DateTime,
   *  updatedAt: DateTime
   * }}
   */
  const posts = postRows.map((row) => {
    const post = {
      _id: row._id,
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

/**
 * @description 게시물의 password와 pk를 받아 패스워드 검증후 데이터를 삭제합니다.
 * @param {string} postId 삭제할 게시물의 pk값입니다.
 * @param {string} password 게시물 삭제시 권한 검증을 위한 패스워드입니다. DB에 저장된 password와 일치하여야합니다.
 * @returns {number} 삭제한 데이터 갯수를 반환합니다.
 */

const deletePost = async (postId, password) => {
  const postRow = await postDao.readPost(postId);

  if (!postRow) {
    throw new NotFoundError();
  }

  const postRowPassword = postRow.password;

  const isSamePassword = await bcrypt.compare(password, postRowPassword);

  if (!isSamePassword) {
    throw new BadRequestError("Invalid password");
  }

  await postDao.deletePost(postId);

  return;
};

/**
 * @description 게시물의 password와 pk를 받아 패스워드 검증후 데이터를 수정합니다.
 * @param {string} postId 삭제할 게시물의 pk값입니다.
 * @param {Object} reqBody 요청받은 request의 body를 그대로 전달받습니다.
 * @param {string} reqBody.password 게시물 수정시 권한 검증을 위한 패스워드입니다. DB에 저장된 password와 일치하여야합니다.
 * @param {string} reqBody.title 게시물 제목에 해당합니다.
 * @param {string} reqBody.content 게시물 본문에 해당합니다.
 * @returns
 */
const updatePost = async (postId, reqBody) => {
  const { password, content, title } = reqBody;

  new Validator(reqBody);

  const postRow = await postDao.readPost(postId);

  if (!postRow) {
    throw new NotFoundError();
  }
  const postRowPassword = postRow.password;

  const isSamePassword = await bcrypt.compare(password, postRowPassword);

  if (!isSamePassword) {
    throw new BadRequestError("Invalid password");
  }

  const upadateData = { content: content, title: title };

  await postDao.updatePost(postId, upadateData);

  return;
};

/**
 * @description 게시물단일 조회기능
 * @param {string} postId 조회할 게시물의 _id 입니다.
 * @returns {object} 게시물 정보
 */
const readPost = async (postId) => {
  const postRow = await postDao.readPost(postId);

  if (!postRow) {
    throw new NotFoundError();
  }

  const post = {
    _id: postRow._id,
    title: postRow.title,
    content: postRow.content,
    userName: postRow.userName,
    createdAt: postRow.createdAt,
    updatedAt: postRow.updatedAt,
  };

  return post;
};
module.exports = { createPost, readPosts, deletePost, updatePost, readPost };
