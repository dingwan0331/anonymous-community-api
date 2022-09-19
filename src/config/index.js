require("dotenv").config();

const { NODE_ENV, SERVER_PORT = 8000, SECRET_KEY } = process.env;

const mongoEnvSet = {
  development: "DEV",
  test: "TEST",
  production: "PRODUCTION",
};

const mongoEnv = mongoEnvSet[NODE_ENV];

const MONGO_URL = process.env[`${mongoEnv}_MONGO_URL`];

module.exports = { SERVER_PORT, SECRET_KEY, MONGO_URL };
