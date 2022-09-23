const supertest = require("supertest");
const app = require("../src/app.js");
const { Post } = require("../src/models");
const db = require("./config/mongoDB.js");
const { createTestJson } = require("./config/moduels.js");

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.disconnect();
});

describe("GET /posts", () => {
  let nowDate = new Date();
  const insertDatas = [];
  let postRows = [];
  for (let i = 1; i < 51; i++) {
    // 현재날짜를 1일 더하는 로직
    nowDate.setDate(nowDate.getDate() + 1);
    const newDate = String(nowDate);

    const data = {
      title: `제목${i}`,
      content: `본문${i}`,
      userName: `유저${i}`,
      password: "password",
      createdAt: newDate,
      updatedAt: newDate,
    };

    insertDatas.push(data);
  }

  beforeAll(async () => {
    postRows = await Post.insertMany(insertDatas);
  });

  afterAll(async () => {
    await Post.deleteMany();
  });

  test("Success default", async () => {
    const response = await supertest(app).get("/posts");
    const testJson = createTestJson(postRows);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ posts: testJson });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Success ?order-key=latest", async () => {
    const response = await supertest(app).get("/posts?order-key=latest");
    const testJson = createTestJson(postRows, undefined, undefined, "latest");

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ posts: testJson });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Success ?order=old", async () => {
    const response = await supertest(app).get("/posts?order-key=old");
    const testJson = createTestJson(postRows, undefined, undefined, "old");

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ posts: testJson });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Success ?limit=5", async () => {
    const response = await supertest(app).get("/posts?limit=5");
    const testJson = createTestJson(postRows, undefined, 5);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ posts: testJson });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Success ?offset=5", async () => {
    const response = await supertest(app).get("/posts?offset=5");
    const testJson = createTestJson(postRows, 5);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ posts: testJson });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Success ?offest=5&limit=5", async () => {
    const response = await supertest(app).get("/posts?offset=5&limit=5");
    const testJson = createTestJson(postRows, 5, 5);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ posts: testJson });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Success ?offset=5&order-key=old", async () => {
    const response = await supertest(app).get("/posts?offset=5&order-key=old");
    const testJson = createTestJson(postRows, 5, undefined, "old");

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ posts: testJson });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Success ?limit=5&order-key=old", async () => {
    const response = await supertest(app).get("/posts?limit=5&order-key=old");
    const testJson = createTestJson(postRows, undefined, 5, "old");

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ posts: testJson });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Success ?offest=10&limit=10&order-key=old", async () => {
    const response = await supertest(app).get(
      "/posts?offset=10&limit=10&order-key=old"
    );
    const testJson = createTestJson(postRows, 10, 10, "old");

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ posts: testJson });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Success ?offest=20&limit=20&order-key=latest", async () => {
    const response = await supertest(app).get(
      "/posts?offset=20&limit=20&order-key=latest"
    );
    const testJson = createTestJson(postRows, 20, 20, "latest");

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ posts: testJson });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("orderKey validation error", async () => {
    const response = await supertest(app).get("/posts?order-key=agag");

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid order-key" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("limit validation error (문자형태)", async () => {
    const response = await supertest(app).get("/posts?limit=aa");

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid limit" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("limit validation error (특수문자형태)", async () => {
    const response = await supertest(app).get("/posts?limit=!");

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid limit" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("limit validation error (숫자 + 문자형태)", async () => {
    const response = await supertest(app).get("/posts?limit=1aa");

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid limit" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("limit validation error (숫자 + 특수문자형태)", async () => {
    const response = await supertest(app).get("/posts?limit=1!");

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid limit" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("limit validation error (숫자 + 문자 + 특수문자형태)", async () => {
    const response = await supertest(app).get("/posts?limit=1!aa");

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid limit" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  // aagg
  test("offset validation error (문자형태)", async () => {
    const response = await supertest(app).get("/posts?offset=aa");

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid offset" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("offset validation error (특수문자형태)", async () => {
    const response = await supertest(app).get("/posts?offset=!");

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid offset" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("offset validation error (숫자 + 문자형태)", async () => {
    const response = await supertest(app).get("/posts?offset=1aa");

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid offset" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("offset validation error (숫자 + 특수문자형태)", async () => {
    const response = await supertest(app).get("/posts?offset=1!");

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid offset" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("offset validation error (숫자 + 문자 + 특수문자형태)", async () => {
    const response = await supertest(app).get("/posts?offset=1!aa");

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid offset" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });
});
