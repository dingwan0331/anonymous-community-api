import dotenv from "dotenv";

dotenv.config();

const { NODE_ENV, SERVER_PORT = 8000 } = process.env;

const mongoEnvSet = {
  development: "DEV",
  test: "TEST",
  production: "PRODUCTION",
};

const mongoEnv = mongoEnvSet[NODE_ENV];

const MONGO_URL = process.env[`${mongoEnv}_MONGO_URL`];

export { SERVER_PORT, MONGO_URL };
