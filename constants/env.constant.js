require("dotenv").config();

module.exports = {
  // ------------ server
  PORT: process.env.PORT,
  PROJECT_MODE: process.env.PROJECT_MODE,

  // ------------ server
  ADMIN_HOST: process.env.ADMIN_HOST,
  USER_HOST: process.env.USER_HOST,
  SERVER_HOST: process.env.SERVER_HOST,

  // ------------ postgres dev creds
  DEV_DB_USERNAME: process.env.DEV_DB_USERNAME,
  DEV_DB_PASSWORD: process.env.DEV_DB_PASSWORD,
  DEV_DB_NAME: process.env.DEV_DB_NAME,
  DEV_DB_HOSTNAME: process.env.DEV_DB_HOSTNAME,

  // ------------ postgres stage creds
  STAGE_DB_USERNAME: process.env.STAGE_DB_USERNAME,
  STAGE_DB_PASSWORD: process.env.STAGE_DB_PASSWORD,
  STAGE_DB_NAME: process.env.STAGE_DB_NAME,
  STAGE_DB_HOSTNAME: process.env.STAGE_DB_HOSTNAME,

  // ------------  postgres poduction creds
  PROD_DB_USERNAME: process.env.PROD_DB_USERNAME,
  PROD_DB_PASSWORD: process.env.PROD_DB_PASSWORD,
  PROD_DB_NAME: process.env.PROD_DB_NAME,
  PROD_DB_HOSTNAME: process.env.PROD_DB_HOSTNAME,

  // ------------ jwt And crypto-js secret key
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  NODE_APP_ENCRYPT_DECRYPT_SECRET_KEY:
    process.env.NODE_APP_ENCRYPT_DECRYPT_SECRET_KEY,

  // ------------ jwt And crypto-js secret key
  REQ_URLS: process.env.REQ_URLS,

  // ------------ email
  SEND_MAIL_WITH: process.env.SEND_MAIL_WITH,
  EMAIL_AUTH_USER: process.env.EMAIL_AUTH_USER,
  EMAIL_AUTH_PASS: process.env.EMAIL_AUTH_PASS,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_HOST: process.env.EMAIL_HOST,
};
