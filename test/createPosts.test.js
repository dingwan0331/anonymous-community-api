const supertest = require("supertest");
const app = require("../src/app.js");
const { Post } = require("../src/models");
const db = require("./config/mongoDB.js");

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.disconnect();
});

describe("Post /posts", () => {
  afterEach(async () => {
    await db.drop();
  });

  test("Success", async () => {
    const reqJson = {
      title: "제목입니다",
      content: "내용입니다",
      userName: "userName",
      password: "1231231a",
    };
    const response = await supertest(app).post("/posts").send(reqJson);
    const post = await Post.find({
      title: "제목입니다",
      content: "내용입니다",
      userName: "userName",
    })
      .sort({ $natural: -1 })
      .limit(1);

    const postId = post[0]._id;

    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual({ message: "Created" });
    expect(response.headers.location).toStrictEqual(`/posts/${postId}`);
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Key Error (password)", async () => {
    const reqJson = {
      title: "제목입니다",
      content: "내용입니다",
      userName: "userName",
    };
    const response = await supertest(app).post("/posts").send(reqJson);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Key error" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Key Error (userName)", async () => {
    const reqJson = {
      title: "제목입니다",
      content: "내용입니다",
      password: "1231231a",
    };
    const response = await supertest(app).post("/posts").send(reqJson);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Key error" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Key Error (content)", async () => {
    const reqJson = {
      title: "제목입니다",
      userName: "userName",
      password: "1231231a",
    };
    const response = await supertest(app).post("/posts").send(reqJson);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Key error" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Key Error (title)", async () => {
    const reqJson = {
      content: "내용입니다",
      userName: "userName",
      password: "1231231a",
    };
    const response = await supertest(app).post("/posts").send(reqJson);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Key error" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("password validation error (비밀번호 길이가 6자 미만인 경우)", async () => {
    const reqJson = {
      title: "제목입니다",
      content: "내용입니다",
      userName: "userName",
      password: "11111",
    };
    const response = await supertest(app).post("/posts").send(reqJson);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid password" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("password validation error (비밀번호에 숫자를 포함하지 않았을 경우)", async () => {
    const reqJson = {
      title: "제목입니다",
      content: "내용입니다",
      userName: "userName",
      password: "aaaaaaaa",
    };
    const response = await supertest(app).post("/posts").send(reqJson);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid password" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("password validation error (비밀번호에 특수문자를 포함한 경우)", async () => {
    const reqJson = {
      title: "제목입니다",
      content: "내용입니다",
      userName: "userName",
      password: "123aaa!!!",
    };
    const response = await supertest(app).post("/posts").send(reqJson);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid password" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("title validation error (제목이 20글자 이상인 경우)", async () => {
    const reqJson = {
      title:
        "20글자이상의제목입니다20글자이상의제목입니다20글자이상의제목입니다20글자이상의제목입니다",
      content: "내용입니다",
      userName: "userName",
      password: "123aaa!!!",
    };
    const response = await supertest(app).post("/posts").send(reqJson);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid title" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("content validation error (본문이 200글자를 초과한 경우)", async () => {
    let content = "";
    for (let i = 0; i < 201; i++) {
      content += "a";
    }
    const reqJson = {
      title: "제목입니다.",
      content: content,
      userName: "userName",
      password: "123123aa",
    };
    const response = await supertest(app).post("/posts").send(reqJson);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid content" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("userName validation error (userName이 10글자를 초과한 경우)", async () => {
    const reqJson = {
      title: "제목입니다.",
      content: "본문입니다",
      userName: "10글자이상의유저이름입니다",
      password: "123123aa",
    };
    const response = await supertest(app).post("/posts").send(reqJson);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid userName" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });
});
