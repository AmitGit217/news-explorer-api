import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotEnv from "dotenv";
dotEnv.config();

import routeUndefined from "./helpers/routeUndefined.js";
import { errorHandler } from "./helpers/errorHandler.js";
import connection from "./helpers/dbConnector.js";
import router from "./routes/index.js";
import { signin, signup } from "./user/user.controller.js";
import { userValidation } from "./middlewares/celebrate.js";

mongoose.connect(connection, () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Database is connected successfully");
  }
});
const { PORT = 3000 } = process.env;
const server = express();

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.post("/signup", userValidation, signup);
server.post("/signin", signin);

server.use(router);
server.use("*", routeUndefined);
server.use(errorHandler);

server.listen(PORT);

export default server;
