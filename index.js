const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// var expressFile = require("express-fileupload");
const http = require("http");
const path = require("path");
const router = require("./routes/index");
const { PORT } = require("./constants/env.constant");
// const { response } = require("./helpers/response.manage");

const app = express();

//postgres connection
require("./sequelize/models");

app.use(cors({ origin: "*" }));
app.use(cookieParser());
// app.use(expressFile());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 🔥 serve uploadImages folder
// app.use("/uploadImages", express.static(path.join(__dirname, "uploadImages")));
// app.use(response);

// route apis
router.dealEasyUserRoutes(app);

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,accept,access_token,X-Requested-With"
  );
  next();
});

app.all("/", (req, res) => {
  return res.status(200).send("DealEasy is running well.");
});

app.all("*", async (req, res) => {
  return res.status(404).send({
    status: false,
    message: `URL not found.`,
  });
});

//error handler middleware
app.use((err, req, res, next) => {
  //handling mongo validation error
  if (err.name === "SequelizeUniqueConstraintError") {
    console.log("Sequelize Duplication error: ", err);

    return res.status(400).send({
      status: false,
      status: err.status || 400,
      message: `Validation Failed, ${err.errors[0].message}`,
    });
  } else {
    console.log(err);
    return res.status(err?.status || 500).send({
      status: false,
      status: err?.status || 500,
      message: err.message,
    });
  }
});

const server = new http.createServer(app);

server.listen(PORT, () => {
  console.log("Server is running on", PORT);
});

module.exports = router;
