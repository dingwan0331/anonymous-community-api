require("dotenv").config();

const env = process.env;

const development = {
  username: env.DEV_MYSQL_USERNAME,
  password: env.DEV_MYSQL_PASSWORD,
  database: env.DEV_MYSQL_NAME,
  host: env.DEV_MYSQL_HOST,
  dialect: "mysql",
  port: env.DEV_MYSQL_PORT,
  logging: false,
};

const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_NAME,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  port: env.MYSQL_PORT,
  logging: false,
};

const test = {
  username: env.TEST_MYSQL_USERNAME,
  password: env.TEST_MYSQL_PASSWORD,
  database: env.TEST_MYSQL_NAME,
  host: env.TEST_MYSQL_HOST,
  dialect: "mysql",
  port: env.TEST_MYSQL_PORT,
  logging: false,
};

module.exports = { development, production, test };
