const { sequelize } = require("../../sequelize/models");
const auctionService = require("../../services/user/auctionService");
const itemService = require("../../services/user/itemService");
const upload = require("../common/uploadImage");

module.exports = {
  addItem: async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const reqData = req.body;
      reqData.user_id = req.user.id;

      reqData.facilities = JSON.parse(reqData.facilities);

      // Upload images to Cloudinary
      const uploadCloud = await upload.multipleImageUploadOnCloudinary(
        req.files,
      );

      if (uploadCloud?.status && uploadCloud?.data?.length) {
        // Save Cloudinary URLs directly
        reqData.images = uploadCloud.data.map((url) => ({ image: url }));
      }

      // Create item
      const itemData = await itemService.addItem(reqData, { transaction: t });

      // Create auction if needed
      if (reqData.auction == 1) {
        const auctionData = {
          user_id: req.user.id,
          item_id: itemData.id,
          owner_name: reqData.owner_name,
          price: reqData.main_price,
        };
        await auctionService.addAuction(auctionData, { transaction: t });
      }

      await t.commit();

      return res.status(200).send({
        status: true,
        data: { message: "Item Added Successfully!!" },
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  },
  // getAllItems: async (req, res, next) => {
  //   try {
  //     const { deal_type, pagenumber = 1, limit = 10 } = req.query;
  //     const { itemData } = await itemService.getAllItems(
  //       deal_type,
  //       pagenumber,
  //       limit,
  //     );
  //     return res.status(200).send({
  //       status: true,
  //       data: itemData,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  getAllItems: async (req, res, next) => {
    try {
      const {
        deal_type,
        price_sort,
        pet_sort,
        date_sort,
        property_type,
        search,
        pagenumber = 1,
        limit = 10,
      } = req.query;

      const { itemData } = await itemService.getAllItems(
        deal_type,
        price_sort,
        pet_sort,
        date_sort,
        property_type,
        search,
        pagenumber,
        limit,
      );

      return res.status(200).send({
        status: true,
        data: itemData,
      });
    } catch (err) {
      next(err);
    }
  },
  getPerticularItems: async (req, res, next) => {
    try {
      const { deal_type, pagenumber = 1, limit = 10 } = req.query;
      const { itemData } = await itemService.getAllItems(
        deal_type,
        null,
        null,
        null,
        null,
        pagenumber,
        limit,
        req.user.id,
      );
      return res.status(200).send({
        status: true,
        data: itemData,
      });
    } catch (err) {
      next(err);
    }
  },
  deleteItem: async (req, res, next) => {
    try {
      const deleteItem = await itemService.deleteItem(req.body.item_id, {
        active: false,
      });

      return res.status(200).send({
        status: true,
        data: {
          message: "Item Deleted SuccessFully!!",
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
