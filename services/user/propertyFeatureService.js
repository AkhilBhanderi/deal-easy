const { property_features } = require("../../sequelize/models");
const createError = require("http-errors");

module.exports = {
  // ✅ ADD
  addPropertyFeature: async (data) => {
    try {
      const newData = await property_features.create(data);
      return newData;
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  },

  // ✅ GET ALL
  getAllPropertyFeatures: async (pagenumber = 1, limit = 10) => {
    try {
      const offset = (pagenumber - 1) * limit;

      const propertyRows = await property_features.findAll({
        where: {
          active: true,
        },
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });

      return { propertyData: propertyRows };
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  },

  // ✅ GET ONE
  getOnePropertyFeature: async (id) => {
    try {
      const data = await property_features.findOne({
        where: { id, active: true },
        attributes: { exclude: ["updatedAt"] },
      });

      if (!data) {
        throw createError.NotFound("Property feature not found.");
      }

      return data;
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  },

  // ✅ UPDATE
  updatePropertyFeature: async (id, newData) => {
    try {
      const existing = await property_features.findByPk(id);

      if (!existing) {
        throw createError.NotFound("Property feature not found.");
      }

      await existing.update(newData);

      return existing;
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  },
};
