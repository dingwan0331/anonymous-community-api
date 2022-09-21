const supertest = require("supertest");
const app = require("../src/app.js");

describe("GET /ping", () => {
  test("Success", async () => {
    const response = await supertest(app).get("/ping");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "pong" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });
});