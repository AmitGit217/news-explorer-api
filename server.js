import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotEnv from "dotenv";
dotEnv.config();

import routeUndefined from "./helpers/routeUndefined.js";
import connection from "./helpers/dbConnector.js";
import router from "./routes/index.js";

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

server.use(router);
server.use("*", routeUndefined);

server.listen(PORT);

export default server;
