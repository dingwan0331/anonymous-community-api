import supertest from "supertest";
import app from "../src/app.js";
import { Post } from "../src/models/index.js";
import * as db from "./config/mongoDB.js";

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

  test("Success Many case", async () => {
    for (let i = postRows.length; 0 < i; i--) {
      const postRow = postRows.pop();
      const postId = postRow._id;
      const response = await supertest(app).get(`/posts/${postId}`);

      let testJson = {
        _id: postRow._id,
        title: postRow.title,
        content: postRow.content,
        userName: postRow.userName,
        createdAt: postRow.createdAt,
        updatedAt: postRow.updatedAt,
      };

      testJson = JSON.stringify(testJson);
      testJson = JSON.parse(testJson);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({ post: testJson });
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    }
  });

  test("Not Found url (Invalid postId)", async () => {
    const response = await supertest(app).get(`/posts/abc`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({ message: "Not Found url" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });
});
