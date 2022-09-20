const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const indexRouter = require("./routes");
const { errorResponder } = require("./middlewares/errorHandler");
const ccqp = require("ccqp");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger-output.json");

const app = express();

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

app.use(errorResponder);

module.exports = app;
