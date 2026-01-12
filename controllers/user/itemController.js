const { sequelize } = require("../../sequelize/models");
const auctionService = require("../../services/user/auctionService");
const itemService = require("../../services/user/itemService");
const upload = require("../common/uploadImage");

module.exports = {
  addItem: async (req, res, next) => {
    const t = await sequelize.transaction(); // start transaction
    try {
      const reqData = req.body;
      reqData.user_id = req.user.id;

      // Upload images
      const uploadLocal = await upload.multipleImageUpload(req.files?.images);

      if (uploadLocal?.status && uploadLocal?.data?.length) {
        const baseUrl =
          process.env.BASE_URL || "https://deal-easy.onrender.com";
        reqData.images = uploadLocal.data.map((imgPath) => ({
          image: `${baseUrl}/${imgPath.replace(/^\/+/, "")}`,
        }));
      }

      // Create item
      const itemData = await itemService.addItem(reqData, { transaction: t });

      // Create auction if needed
      if (reqData.auction === 1) {
        const auctionData = {
          user_id: req.user.id,
          item_id: itemData.id, // make sure this matches your PK
          owner_name: reqData.owner_name,
          price: reqData.main_price,
        };
        await auctionService.addAuction(auctionData, { transaction: t });
      }

      // Commit transaction
      await t.commit();

      return res.status(200).send({
        status: true,
        data: {
          message: "Item Added Successfully!!",
        },
      });
    } catch (error) {
      await t.rollback(); // rollback on error
      next(error);
    }
  },
  getAllItems: async (req, res, next) => {
    try {
      const { deal_type, pagenumber = 1, limit = 10 } = req.query;
      const { itemData } = await itemService.getAllItems(
        deal_type,
        pagenumber,
        limit
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
        pagenumber,
        limit,
        req.user.id
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
