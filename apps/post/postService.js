const { Validator } = require("../../utils/validators");
const postDao = require("./postDao");
const bcrypt = require("bcrypt");

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
