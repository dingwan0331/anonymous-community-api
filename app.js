const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const indexRouter = require("./routes");
const { errorLogger, errorResponder } = require("./middlewares/errorHandler");
const { sequelize } = require("./models");
const ccqp = require("ccqp");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger-output.json");
const { NODE_ENV } = require("./config");

const app = express();

if (NODE_ENV !== "test") {
  sequelize
    .sync({ force: false })
    .then(() => console.log("connected database"))
    .catch((err) =>
      console.error("occurred error in database connecting", err)
    );
}

app.use(cors());
app.use(logger("combined"));
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
