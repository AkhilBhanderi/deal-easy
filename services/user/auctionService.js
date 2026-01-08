const { auctions, items } = require("../../sequelize/models");
const createError = require("http-errors");

module.exports = {
  // ➕ Create auction
  addAuction: async (data) => {
    try {
      const alreadyExists = await auctions.findOne({
        where: {
          user_id: data.user_id,
          item_id: data.item_id,
        },
      });

      if (alreadyExists) {
        throw createError.BadRequest("Item already exists in action.");
      }

      const itemExists = await items.findOne({
        where: { id: data.item_id, active: true },
      });

      if (!itemExists) {
        throw createError.BadRequest("Invalid item id.");
      }

      const auction = await auctions.create(data);
      return auction;
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  },
};
