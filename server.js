import express from "express";
import mongoose from "mongoose";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as dotEnv from "dotenv";
dotEnv.config();

const { PORT = 3000 } = process.env;
const server = express();

server.listen(PORT);
