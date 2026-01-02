const express = require("express");
const { ValidateBody } = require("../validation/validation.methods");
const Schemas = require("../validation/validation.schemas");
const { userAuthentication } = require("../helpers/auth.helper");

const router = express.Router();

//------------------------------ user -------------------------//
const userController = require("../controllers/user/userController");
router.post(
  "/auth/user/sendotp",
  ValidateBody(Schemas.userSchema),
  userController.addUser
);

router.post(
  "/auth/user/verifyotp",
  ValidateBody(Schemas.verifyUserSchema),
  userController.checkUserExistence
);

//------------------------------ item -------------------------//
const itemController = require("../controllers/user/itemController");
router.post(
  "/user/additemdetails",
  userAuthentication,
  ValidateBody(Schemas.itemSchema),
  itemController.addItem
);
router.get("/user/getallitem", userAuthentication, itemController.getAllItems);
router.post(
  "/user/deleteitem",
  userAuthentication,
  ValidateBody(Schemas.deleteItemSchema),
  itemController.deleteItem
);

module.exports = router;
