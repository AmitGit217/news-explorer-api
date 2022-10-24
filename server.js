import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotEnv from "dotenv";
import { errors } from "celebrate";
import helmet from "helmet";
dotEnv.config();

import routeUndefined from "./helpers/routeUndefined.js";
import { errorHandler } from "./helpers/errorHandler.js";
import { signin, signup } from "./entities/user/user.controller.js";
import { userValidation } from "./middlewares/celebrate.js";
import auth from "./middlewares/auth.js";
import router from "./routes/index.js";
import { errorLogger, requestLogger } from "./middlewares/logger.js";
import limiter from "./middlewares/limit.js";

mongoose.connect(
  process.env.NODE_ENV === "production"
    ? process.env.DB_PRO
    : "mongodb://localhost:27017/news-explorer-test"
);

const { PORT = 3000 } = process.env;
const server = express();

server.use(requestLogger);
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());
server.options("*", cors());
server.use(helmet());
server.use(limiter);
server.post("/signup", userValidation, signup);
server.post("/signin", signin);
server.use(auth);
server.use(router);
server.use("*", routeUndefined);
server.use(errorHandler);
server.use(errorLogger);
server.use(errors());

server.listen(PORT);

export default server;
