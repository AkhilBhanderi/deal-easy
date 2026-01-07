const itemService = require("../../services/user/itemService");
const upload = require("../common/uploadImage");

module.exports = {
  addItem: async (req, res, next) => {
    try {
      const reqData = req.body;
      reqData.user_id = req.user.id;

      const uploadLocal = await upload.multipleImageUpload(req.files?.images);

      // ✅ Convert array of strings → array of objects
      if (uploadLocal?.status && uploadLocal?.data?.length) {
        const baseUrl =
          process.env.BASE_URL || "https://deal-easy.onrender.com";

        reqData.images = uploadLocal.data.map((imgPath) => ({
          image: `${baseUrl}/${imgPath.replace(/^\/+/, "")}`,
        }));
      }

      await itemService.addItem(reqData);

      return res.status(200).send({
        status: true,
        data: {
          message: "Item Added Successfully!!",
        },
      });
    } catch (error) {
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
