const cartService = require("../../services/user/cartService");

module.exports = {
  // ➕ Add item to cart
  addToCart: async (req, res, next) => {
    try {
      const reqData = req.body;
      (reqData.user_id = req.user.id), await cartService.addToCart(reqData);

      return res.status(200).send({
        status: true,
        data: {
          message: "Item added to cart successfully!!",
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // 📄 Get all cart items (user wise)
  getCartItems: async (req, res, next) => {
    try {
      const { pagenumber = 1, limit = 10 } = req.query;

      const { itemData } = await cartService.getCartItems(
        req.user.id,
        pagenumber,
        limit
      );

      return res.status(200).send({
        status: true,
        data: itemData,
      });
    } catch (error) {
      next(error);
    }
  },

  // ❌ Remove item from cart (soft delete)
  deleteCart: async (req, res, next) => {
    try {
      await cartService.deleteCart(req.user.id, req.body.item_id);

      return res.status(200).send({
        status: true,
        data: {
          message: "Item removed from cart successfully!",
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
