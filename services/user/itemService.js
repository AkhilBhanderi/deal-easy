const { items, auctions, users } = require("../../sequelize/models");
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
  getAllItems: async (deal_type, pagenumber = 1, limit = 10, user_id) => {
    try {
      const offset = (pagenumber - 1) * limit;

      const whereCondition = {
        active: true,
        ...(deal_type && { deal_type }),
        ...(user_id && { user_id }),
      };

      const { rows: itemData } = await items.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        attributes: { exclude: ["updatedAt"] },
        include: [
          {
            model: auctions,
            as: "auctions",
            required: false,
            attributes: [
              "id",
              "item_id",
              "user_id",
              // "description",
              "price",
              "owner_name",
              "createdAt",
              "updatedAt",
            ],
            include: [
              {
                model: users,
                as: "user",
                attributes: ["id", "mobile_no", "otp", ],
              },
            ],
          },
        ],
      });

      // Map auctions to the auction field
      const formattedItems = itemData.map((item) => {
        const itemJSON = item.toJSON();

        return {
          ...itemJSON,
          // auction: itemJSON.auctions.length
          //   ? itemJSON.auctions.map((a) => a.id) // you can store ids or latest auction id
          //   : null, // if no auction
        };
      });

      return { itemData: formattedItems };
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
