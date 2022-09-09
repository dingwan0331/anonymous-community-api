require("dotenv").config();

const env = process.env;

const SERVER_PORT = env.SERVER_PORT || 8000;

const SECRET_KEY = env.SECRET_KEY;

const NODE_ENV = env.NODE_ENV || "test";

module.exports = { SERVER_PORT, SECRET_KEY, NODE_ENV };
