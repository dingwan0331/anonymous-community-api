const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const indexRouter = require("./routes");
const { errorLogger, errorResponder } = require("./middlewares/errorHandler");
const ccqp = require("ccqp");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger-output.json");
const { mongoose } = require("./models");
const { MONGO_URL } = require("./config");

const app = express();

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((err) => console.error(err));

const loggerSet = {
  production: "combined",
  development: "dev",
  test: "dev",
};
const loggerOption = loggerSet[process.env.NODE_ENV];

app.use(cors());
app.use(logger(loggerOption));
app.use(express.json());
app.use(ccqp);

app.use(indexRouter);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);

app.use(errorLogger);
app.use(errorResponder);

module.exports = app;
