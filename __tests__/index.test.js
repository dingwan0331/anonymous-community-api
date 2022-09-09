const app = require("../app.js");
const request = require("supertest");

describe("GET /ping", () => {
  test("Success", async () => {
    const response = await request(app).get("/ping");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "pong" });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });
});
