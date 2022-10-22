import User from "./user.schema.js";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { CREATE } from "../lib/constants.js";
const { NODE_ENV, JWT_SECRET } = process.env;

const signup = (req, res, next) => {
  const { password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      ...req.body,
      password: hash,
    }).then((data) => {
      const { password, ...user } = data._doc;
      res.status(CREATE).send(user);
    });
  });
};

export { signup };
