require("dotenv").config();

const env = process.env;

const NODE_ENV = env.NODE_ENV;

const mysqlEnvSet = {
  development: "DEV",
  test: "TEST",
  production: "PRODUCTION",
};

const mysqlEnv = mysqlEnvSet[`${NODE_ENV}`];

const database = {
  username: env[`${mysqlEnv}_MYSQL_USERNAME`],
  password: env[`${mysqlEnv}_MYSQL_PASSWORD`],
  database: env[`${mysqlEnv}_MYSQL_NAME`],
  host: env[`${mysqlEnv}_MYSQL_HOST`],
  dialect: "mysql",
  port: env[`${mysqlEnv}_MYSQL_PORT`],
  logging: false,
  reconnect: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = database;
