const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const indexRouter = require("./routes");
const { errorLogger, errorResponder } = require("./middlewares/errorHandler");
const { sequelize } = require("./models");
const ccqp = require("ccqp");

const app = express();

sequelize
  .sync({ force: false })
  .then(() => console.log("connected database"))
  .catch((err) => console.error("occurred error in database connecting", err));

app.use(cors());
app.use(logger("combined"));
app.use(express.json());
app.use(ccqp);

app.use(indexRouter);

app.use(errorLogger);
app.use(errorResponder);

module.exports = app;
