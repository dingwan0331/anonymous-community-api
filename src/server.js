const http = require("http");
const app = require("./app");

const { SERVER_PORT } = require("./config");
const server = http.createServer(app);
const { mongoose } = require("./models");
const { MONGO_URL } = require("./config");

const serverStart = () => {
  try {
    mongoose
      .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("Successfully connected to mongodb"))
      .catch((err) => console.error(err));

    server.listen(SERVER_PORT, () => {
      console.log(`listening on ${SERVER_PORT}!`);
    });
  } catch (err) {
    console.error(err);
  }
};

serverStart();
