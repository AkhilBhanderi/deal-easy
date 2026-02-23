const propertyFeatureService = require("../../services/user/propertyFeatureService");

module.exports = {
  // ✅ ADD
  addPropertyFeature: async (req, res, next) => {
    try {
      const reqData = req.body;

      const data = await propertyFeatureService.addPropertyFeature(reqData);

      return res.status(200).send({
        status: true,
        message: "Property Feature Added Successfully!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  // ✅ GET ALL
  // controllers/propertyFeatureController.js

  getAllPropertyFeatures: async (req, res, next) => {
    try {
      const { pagenumber = 1, limit = 10 } = req.query;

      const { propertyData } =
        await propertyFeatureService.getAllPropertyFeatures(pagenumber, limit);

      return res.status(200).send({
        status: true,
        data: propertyData,
      });
    } catch (error) {
      next(error);
    }
  },

  // ✅ GET ONE
  getOnePropertyFeature: async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await propertyFeatureService.getOnePropertyFeature(id);

      return res.status(200).send({
        status: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  // ✅ UPDATE
  updatePropertyFeature: async (req, res, next) => {
    try {
      const { id } = req.params;
      const reqData = req.body;

      const data = await propertyFeatureService.updatePropertyFeature(
        id,
        reqData,
      );

      return res.status(200).send({
        status: true,
        message: "Property Feature Updated Successfully!",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
