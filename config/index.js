require("dotenv").config();

const env = process.env;

const SERVER_PORT = env.SERVER_PORT || 8000;

const SECRET_KEY = env.SECRET_KEY;

module.exports = { SERVER_PORT, SECRET_KEY };
