const auctionService = require("../../services/user/auctionService");

module.exports = {
  // ➕ Create Auction
  addAuction: async (req, res, next) => {
    try {
      const reqData = req.body;
      reqData.user_id = req.user.id;

      await auctionService.addAuction(reqData);

      return res.status(200).send({
        status: true,
        data: {
          message: "Auction created successfully!",
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
