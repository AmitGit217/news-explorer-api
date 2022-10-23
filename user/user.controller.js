import User from "./user.schema.js";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import {
  CREATE,
  DATA_EXIST_MESSAGE,
  INVALID_DATA_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} from "../lib/constants.js";
import ValidationError from "../helpers/errors/Validation.js";
import { DataExist } from "../helpers/errors/DataExist.js";
import Unauthorize from "../helpers/errors/Unauthorize.js";
import NotFound from "../helpers/errors/NotFound.js";

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
      .catch((error) => {
        if (error.name === "ValidationError") {
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
  User.findUserByCredentials(email, password)
    .then((data) => {
      const token = jwt.sign(
        { id: data._id },
        process.env.NODE_ENV === "pro" ? process.env.JWT_SECRET : "secret"
      );
      const { password, ...user } = data._doc;
      res.send({ token, user });
    })
    .catch((error) => {
      throw new Unauthorize(error.message);
    })
    .catch(next);
};

const currentUser = (req, res, next) => {
  const { id } = req.user;
  User.findById(id)
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        throw new NotFound(USER_NOT_FOUND_MESSAGE);
      } else if (error.name === "CastError") {
        throw new ValidationError(INVALID_DATA_MESSAGE);
      }
    })
    .catch(next);
};

export { signup, signin, currentUser };
