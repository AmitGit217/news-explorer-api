import { DB_DEV, DB_PROD, DB_TEST } from "../lib/constants.js";

let connection = "";

switch (process.env.NODE_ENV) {
  case "pro":
    connection = DB_PROD;
    break;
  case "dev":
    connection = DB_DEV;
    break;
  case "test":
    connection = DB_TEST;
    break;
}

export default connection;
