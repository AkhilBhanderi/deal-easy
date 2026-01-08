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
router.get(
  "/user/getitem",
  userAuthentication,
  itemController.getPerticularItems
);
router.post(
  "/user/deleteitem",
  userAuthentication,
  ValidateBody(Schemas.deleteItemSchema),
  itemController.deleteItem
);

//------------------------------ cart -------------------------//
const cartController = require("../controllers/user/cartController");
router.post(
  "/user/addtocart",
  userAuthentication,
  ValidateBody(Schemas.cartSchema),
  cartController.addToCart
);
router.get(
  "/user/getcartitem",
  userAuthentication,
  cartController.getCartItems
);
router.post(
  "/user/deletecartitem",
  userAuthentication,
  ValidateBody(Schemas.cartSchema),
  cartController.deleteCart
);

//------------------------------ auction -------------------------//
const auctionController = require("../controllers/user/auctionController");
router.post(
  "/user/addauction",
  userAuthentication,
  ValidateBody(Schemas.auctionSchema),
  auctionController.addAuction
);

module.exports = router;
