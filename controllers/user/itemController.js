const itemService = require("../../services/user/itemService");

module.exports = {
  addItem: async (req, res, next) => {
    try {
      const reqData = req.body;

      const addItem = await itemService.addItem(reqData);

      return res.status(200).send({
        status: true,
        data: {
          message: "Item Added SuceessFully!!",
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
