const options = {
  disableLogs: false, // 로그를 활성화/비활성화합니다. 기본적으로 false입니다.
};

const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.0.0",
    title: "anomnymous community",
    description: "anonymous community api",
  },
  servers: [
    {
      url: "http://3.36.70.103:8000/",
    },
  ],
  basePath: "/",
  schemes: ["http"],
};

const outputFile = "./swagger/swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
