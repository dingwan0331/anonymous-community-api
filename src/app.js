import express from "express";
import cors from "cors";
import logger from "morgan";
import indexRouter from "./routes/index.js";
import { errorResponder } from "./middlewares/errorHandler.js";
import ccqp from "ccqp";
import swaggerUi from "swagger-ui-express";
import { join } from "path";
import { readFileSync } from "fs";
import { NotFoundError } from "./utils/errors.js";

const app = express();

const __dirname = process.env.PWD;

const swaggerDocument = readFileSync(
  join(__dirname, "./src/swagger/swagger-output.json"),
  "utf-8"
);

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
app.use((req, res, next) => {
  const err = new NotFoundError();
  next(err);
});

app.use(errorResponder);

export default app;
