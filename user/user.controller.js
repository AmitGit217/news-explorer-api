import User from "./user.schema.js";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import {
  CREATE,
  DATA_EXIST_MESSAGE,
  INVALID_DATA_MESSAGE,
} from "../lib/constants.js";
import ValidationError from "../helpers/errors/Validation.js";
import { DataExist } from "../helpers/errors/DataExist.js";
const { NODE_ENV, JWT_SECRET } = process.env;

const signup = (req, res, next) => {
  const { password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      ...req.body,
      password: hash,
    })
      .then((data) => {
        const { password, ...user } = data._doc;
        res.status(CREATE).send(user);
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          throw new ValidationError(INVALID_DATA_MESSAGE);
        } else {
          throw new DataExist(DATA_EXIST_MESSAGE);
        }
      })
      .catch(next);
  });
};

const signin = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password).then((data) => res.send(data));
};

export { signup, signin };
