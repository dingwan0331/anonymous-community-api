import express from "express";
import cors from "cors";
import logger from "morgan";
import ccqp from "ccqp";
import swaggerUi from "swagger-ui-express";
import { join } from "path";
import { readFileSync } from "fs";

import indexRouter from "./routes/index.js";
import { responseError } from "./middlewares/errorHandler.js";
import { NotFoundError } from "./utils/errors.js";

const registeReqMiddlewares = (app) => {
  const getLoggerOption = () => {
    const loggerSet = {
      production: "combined",
      development: "dev",
      test: "dev",
    };
    const loggerOption = loggerSet[process.env.NODE_ENV];

    return loggerOption;
  };

  app.use(cors());
  app.use(logger(getLoggerOption()));
  app.use(express.json());
  app.use(ccqp);

  return app;
};

const registeResMiddlewares = (app) => {
  app.use((req, res, next) => {
    const err = new NotFoundError();
    next(err);
  });
  app.use(responseError);

  return app;
};

const registeRouter = (app) => {
  const getSwaggerOutput = () => {
    const __dirname = process.env.PWD;

    const swaggerOutput = readFileSync(
      join(__dirname, "./src/swagger/swagger-output.json"),
      "utf-8"
    );

    return swaggerOutput;
  };

  app.use(indexRouter);
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(getSwaggerOutput(), { explorer: true })
  );

  return app;
};

const createApp = () => {
  const app = express();

  registeReqMiddlewares(app);

  registeRouter(app);

  registeResMiddlewares(app);

  return app;
};

export default createApp();
