const { items } = require("../../sequelize/models");
const createError = require("http-errors");

module.exports = {
  addItem: async (data) => {
    try {
      const itemData = await items.create(data);
      return itemData;
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  },
  getAllItems: async (deal_type, pagenumber = 1, limit = 10) => {
    try {
      const offset = (pagenumber - 1) * limit;
      const whereCondition = {
        ...(deal_type && { deal_type }), // If deal_type is provided, add it to the filter
        active: true, // Always include the condition to fetch only active items
      };
      const { rows: itemData } = await items.findAndCountAll({
        where: whereCondition,
        limit: limit,
        offset,
        attributes: { exclude: ["updatedAt"] },
      });

      return { itemData };
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  },
  deleteItem: async (id, newData) => {
    try {
      const deleteItem = await items.findByPk(id);
      if (!deleteItem) {
        throw createError.BadRequest("Invalid item id.");
      }

      Object.assign(deleteItem, newData);
      await deleteItem.save();

      return deleteItem;
    } catch (err) {
      throw createError.InternalServerError(err.message);
    }
  },
};
