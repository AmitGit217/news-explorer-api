// Status code
const NOT_FOUND = 404;
const INVALID = 400;
const CREATE = 201;

// Messages
const INVALID_DATA_MESSAGE = "Input invalid";
const DATA_EXIST_MESSAGE = "Data already exist in the database";
const USER_NOT_FOUND_MESSAGE = "User with this ID has not been found";
const UNAUTHORIZE_MESSAGE = "Unauthorized";

// Database connections
const DB_PROD = "mongodb://localhost:27017/news-explorer";
const DB_DEV = "mongodb://localhost:27017/news-explorer-dev";
const DB_TEST = "mongodb://localhost:27017/news-explorer-test";

export {
  NOT_FOUND,
  DB_DEV,
  DB_TEST,
  DB_PROD,
  CREATE,
  INVALID_DATA_MESSAGE,
  DATA_EXIST_MESSAGE,
  UNAUTHORIZE_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INVALID,
};
