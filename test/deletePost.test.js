const supertest = require("supertest");
const app = require("../src/app.js");
const { Post } = require("../src/models");
const db = require("./config/mongoDB.js");
const bcrypt = require("bcrypt");

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.disconnect();
});

describe("DELETE /posts/:postId", () => {
  let nowDate = new Date();
  const insertDatas = [];
  let postRows = [];
  const password = "123123a";
  const hashedPassword = bcrypt.hashSync("123123a", 10);
  for (let i = 1; i < 20; i++) {
    // 현재날짜를 1일 더하는 로직
    nowDate.setDate(nowDate.getDate() + 1);
    const newDate = String(nowDate);

    const data = {
      title: `제목${i}`,
      content: `본문${i}`,
      userName: `유저${i}`,
      password: hashedPassword,
      createdAt: newDate,
      updatedAt: newDate,
    };

    insertDatas.push(data);
  }

  const randomIndex = Math.floor(Math.random() * postRows.length);

  beforeEach(async () => {
    postRows = await Post.insertMany(insertDatas);
  });

  afterEach(async () => {
    await db.drop();
  });

  test("Success Many Case", async () => {
    for (let i = postRows.length; 0 < i; i--) {
      const postId = String(postRows.pop()._id);
      const response = await supertest(app)
        .delete(`/posts/${postId}`)
        .send({ password: password });

      expect(response.statusCode).toBe(204);
      expect(response.body).toStrictEqual({});
      expect(response.headers["content-type"]).toBe(undefined);

      const checkResponse = await supertest(app)
        .delete(`/posts/${postId}`)
        .send({ password: password });

      expect(checkResponse.statusCode).toBe(404);
      expect(checkResponse.body).toStrictEqual({ message: "Not Found url" });
      expect(checkResponse.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    }
  });

  test("Key error", async () => {
    const postId = String(postRows[randomIndex]._id);
    const response = await supertest(app).delete(`/posts/${postId}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Key error" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Not Found url (Invalid postId)", async () => {
    const response = await supertest(app)
      .delete(`/posts/agdsf`)
      .send({ password: "agag" });

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({ message: "Not Found url" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Invalid password", async () => {
    const postId = String(postRows[randomIndex]._id);
    const response = await supertest(app)
      .delete(`/posts/${postId}`)
      .send({ password: "agag" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid password" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });
});
