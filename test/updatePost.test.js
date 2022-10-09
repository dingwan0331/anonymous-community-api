import supertest from "supertest";
import app from "../src/app.js";
import { Post } from "../src/models/index.js";
import * as db from "./config/mongoDB.js";
import bcrypt from "bcrypt";

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
  const hashedPassword = bcrypt.hashSync(password, 10);
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
    const postRow = postRows.pop();
    const postId = postRow._id;

    for (let i = 1; i < 20; i++) {
      const reqJson = {
        title: `변경 제목 ${i}`,
        content: `변경 본문 ${i}`,
        password: password,
      };

      const response = await supertest(app)
        .patch(`/posts/${postId}`)
        .send(reqJson);

      expect(response.statusCode).toBe(204);
      expect(response.body).toStrictEqual({});
      expect(response.headers["content-type"]).toBe(undefined);

      const updatePostRow = await Post.findById(postId);
      let getTestJson = {
        _id: postId,
        title: `변경 제목 ${i}`,
        content: `변경 본문 ${i}`,
        userName: postRow.userName,
        createdAt: postRow.createdAt,
        updatedAt: updatePostRow.updatedAt,
      };

      getTestJson = JSON.stringify(getTestJson);
      getTestJson = JSON.parse(getTestJson);

      const checkResponse = await supertest(app).get(`/posts/${postId}`);

      expect(checkResponse.statusCode).toBe(200);
      expect(checkResponse.body).toStrictEqual({ post: getTestJson });
      expect(checkResponse.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    }
  });

  test("Not Found url (PostId null)", async () => {
    const response = await supertest(app).patch(`/posts/`).send({});

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({ message: "Not Found url" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Key error (title)", async () => {
    const postRow = postRows[randomIndex];
    const postId = postRow._id;

    const reqJson = { content: "본문", password: "비밀번호" };

    const response = await supertest(app)
      .patch(`/posts/${postId}`)
      .send(reqJson);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Key error" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Key error (content)", async () => {
    const postRow = postRows[randomIndex];
    const postId = postRow._id;

    const reqJson = { title: "제목", password: "비밀번호" };

    const response = await supertest(app)
      .patch(`/posts/${postId}`)
      .send(reqJson);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Key error" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Key error (password)", async () => {
    const postRow = postRows[randomIndex];
    const postId = postRow._id;

    const reqJson = { title: "제목", content: "본문" };

    const response = await supertest(app)
      .patch(`/posts/${postId}`)
      .send(reqJson);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Key error" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Invalid password (비밀번호 기본조건이 안맞을때)", async () => {
    const reqJson = { title: "제목", content: "본문", password: "비밀번호" };

    const response = await supertest(app)
      .patch(`/posts/agagagagaaa`)
      .send(reqJson);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid password" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Invalid password (비밀번호가 일치하지 않을때)", async () => {
    const postRow = postRows[randomIndex];
    const postId = postRow._id;
    const reqJson = { title: "제목", content: "본문", password: "123123aaaa" };

    const response = await supertest(app)
      .patch(`/posts/${postId}`)
      .send(reqJson);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: "Invalid password" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("Not Found url (Invalid PostId)", async () => {
    const reqJson = { title: "제목", content: "본문", password: "123123aa" };

    const response = await supertest(app)
      .patch(`/posts/123aaasg`)
      .send(reqJson);

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({ message: "Not Found url" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });
});
