// Status code
const NOT_FOUND = 404;
const CREATE = 201;

// Database connections
const DB_PROD = "mongodb://localhost:27017/news-explorer";
const DB_DEV = "mongodb://localhost:27017/news-explorer-dev";
const DB_TEST = "mongodb://localhost:27017/news-explorer-test";

export { NOT_FOUND, DB_DEV, DB_TEST, DB_PROD, CREATE };
