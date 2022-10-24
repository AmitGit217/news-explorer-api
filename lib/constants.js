// Status code
const NOT_FOUND = 404;
const INVALID = 400;
const CREATE = 201;
const UNAUTHORIZE_ACTION = 403;

// Messages
const INVALID_DATA_MESSAGE = 'Input invalid';
const DATA_EXIST_MESSAGE = 'Data already exist in the database';
const USER_NOT_FOUND_MESSAGE = 'User with this ID has not been found';
const UNAUTHORIZE_MESSAGE = 'Unauthorized';
const ARTICLE_NOT_FOUND_MESSAGE =
  'This user has no saved articles or no such an article';

// Database connections
const DB_PROD = 'mongodb://localhost:27017/news-explorer';
const DB_DEV = 'mongodb://localhost:27017/news-explorer-dev';
const DB_TEST = 'mongodb://localhost:27017/news-explorer-test';

// Regex
const URL_REGEX =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

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
  URL_REGEX,
  UNAUTHORIZE_ACTION,
  ARTICLE_NOT_FOUND_MESSAGE,
};
