const {
  DEV_DB_USERNAME,
  DEV_DB_PASSWORD,
  DEV_DB_NAME,
  DEV_DB_HOSTNAME,
  PROD_DB_USERNAME,
  PROD_DB_PASSWORD,
  PROD_DB_NAME,
  PROD_DB_HOSTNAME,
  STAGE_DB_USERNAME,
  STAGE_DB_PASSWORD,
  STAGE_DB_NAME,
  STAGE_DB_HOSTNAME,
} = require("../constants/env.constant");

require("dotenv").config();
module.exports = {
  development: {
    username: DEV_DB_USERNAME,
    password: DEV_DB_PASSWORD,
    database: DEV_DB_NAME,
    host: DEV_DB_HOSTNAME,
    dialect: "postgres",
    logging: false,
    options: { json: true },
  },
  production: {
    username: PROD_DB_USERNAME,
    password: PROD_DB_PASSWORD,
    database: PROD_DB_NAME,
    host: PROD_DB_HOSTNAME,
    dialect: "postgres",
    logging: false,
    options: { json: true },
  },
  stage: {
    username: STAGE_DB_USERNAME,
    password: STAGE_DB_PASSWORD,
    database: STAGE_DB_NAME,
    host: STAGE_DB_HOSTNAME,
    dialect: "postgres",
    logging: false,
    options: { json: true },
  },
};
