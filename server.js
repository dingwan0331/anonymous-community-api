const http = require("http");
const app = require("./app");

const { SERVER_PORT } = require("./config");
const server = http.createServer(app);

const serverStart = () => {
  try {
    server.listen(SERVER_PORT, () => {
      console.log(`listening on ${SERVER_PORT}!`);
    });
  } catch (err) {
    console.error(err);
  }
};

serverStart();
