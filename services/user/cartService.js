const { carts, items } = require("../../sequelize/models");
const createError = require("http-errors");

module.exports = {
  // ➕ Add to cart (prevent duplicate item for same user)
  addToCart: async (data) => {
    try {
      const alreadyExists = await carts.findOne({
        where: {
          user_id: data.user_id,
          item_id: data.item_id,
        },
      });

      if (alreadyExists) {
        throw createError.BadRequest("Item already exists in cart.");
      }

      const existItem = await items.findOne({
        where: { id: data.item_id },
      });

      if (!existItem) {
        throw createError.BadRequest("Item id is invalid.");
      }
      const cartData = await carts.create(data);
      return cartData;
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  },

  // 📄 Get cart items (user wise)
  getCartItems: async (user_id, pagenumber = 1, limit = 10) => {
    try {
      const offset = (pagenumber - 1) * limit;

      const { rows: cartRows } = await carts.findAndCountAll({
        where: {
          user_id,
          active: true,
        },
        limit,
        offset,
        attributes: ["id"], // cart fields not needed in response
        include: [
          {
            model: items,
            required: true,
            where: {
              active: true,
            },
            attributes: { exclude: ["updatedAt"] },
          },
        ],
      });

      // 🔁 Extract item objects (same format as getAllItems)
      const itemData = cartRows.map((row) => row.item);

      return { itemData };
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  },

  // ❌ Soft delete cart item
  deleteCart: async (user_id, item_id) => {
    try {
      const cartItem = await carts.findOne({
        where: {
          user_id,
          item_id,
        },
      });

      if (!cartItem) {
        throw createError.BadRequest("Item not found in your cart.");
      }

      cartItem.active = false;
      await cartItem.save();

      return cartItem;
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  },
};
