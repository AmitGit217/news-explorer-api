import { NOT_FOUND } from "../lib/constants.js";

const routeUndefined = (req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
};

export default routeUndefined;
