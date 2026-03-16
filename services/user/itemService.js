const { Op } = require("sequelize");
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
  // getAllItems: async (
  //   deal_type,
  //   price_sort,
  //   pet_sort,
  //   date_sort,
  //   property_type,
  //   budget,
  //   search,
  //   pagenumber = 1,
  //   limit = 10,
  //   user_id,
  // ) => {
  //   try {
  //     const offset = (pagenumber - 1) * limit;

  //     const whereCondition = {
  //       active: true,
  //       // ...(deal_type && { deal_type }),
  //       ...(user_id && { user_id }),
  //     };

  //     // Deal Type Filter
  //     if (deal_type) {
  //       whereCondition.deal_type = deal_type;
  //     }

  //     if (property_type) {
  //       whereCondition.property_type = property_type;
  //     }

  //     // Budget Filter
  //     if (budget) {
  //       whereCondition.main_price = {
  //         [Op.lte]: budget,
  //       };
  //     }

  //     // Search Filter
  //     if (search) {
  //       whereCondition[Op.or] = [
  //         { description_1: { [Op.iLike]: `%${search}%` } },
  //         { property_area_name: { [Op.iLike]: `%${search}%` } },
  //         { pincode: { [Op.iLike]: `%${search}%` } },
  //         { country: { [Op.iLike]: `%${search}%` } },
  //         { state: { [Op.iLike]: `%${search}%` } },
  //         { city: { [Op.iLike]: `%${search}%` } },
  //       ];
  //     }

  //     let order = [];

  //     // Newest / Oldest filter
  //     if (date_sort) {
  //       order.push(["createdAt", date_sort === "new" ? "DESC" : "ASC"]);
  //     }

  //     if (price_sort) {
  //       order.push(["main_price", price_sort === "lth" ? "ASC" : "DESC"]);
  //     }

  //     if (pet_sort) {
  //       order.push(["pet_type", pet_sort === "sqlth" ? "ASC" : "DESC"]);
  //     }

  //     const { rows: itemData } = await items.findAndCountAll({
  //       where: whereCondition,
  //       limit,
  //       offset,
  //       order,
  //       attributes: { exclude: ["updatedAt"] },
  //       include: [
  //         {
  //           model: users,
  //           as: "user",
  //           attributes: ["mobile_no"],
  //         },
  //         {
  //           model: auctions,
  //           as: "auctions",
  //           required: false,
  //           attributes: [
  //             "id",
  //             "item_id",
  //             "user_id",
  //             // "description",
  //             "price",
  //             "owner_name",
  //             "createdAt",
  //             "updatedAt",
  //           ],
  //           include: [
  //             {
  //               model: users,
  //               as: "user",
  //               attributes: ["id", "mobile_no", "otp", "active", "fcm_token"],
  //             },
  //           ],
  //         },
  //       ],
  //     });

  //     // Map auctions to the auction field
  //     const formattedItems = itemData.map((item) => {
  //       const itemJSON = item.toJSON();

  //       return {
  //         ...itemJSON,
  //         // auction: itemJSON.auctions.length
  //         //   ? itemJSON.auctions.map((a) => a.id) // you can store ids or latest auction id
  //         //   : null, // if no auction
  //       };
  //     });

  //     return { itemData: formattedItems };
  //   } catch (error) {
  //     throw createError.InternalServerError(error.message);
  //   }
  // },

  getAllItems: async (
    deal_type,
    price_sort,
    pet_sort,
    date_sort,
    property_type,
    budget,
    description_3,
    interior_data,
    bhk_data,
    search,
    pagenumber = 1,
    limit = 10,
    user_id,
  ) => {
    try {
      const offset = (pagenumber - 1) * limit;

      const whereCondition = {
        active: true,
        ...(user_id && { user_id }),
      };

      // Deal Type Filter
      if (deal_type) {
        whereCondition.deal_type = deal_type;
      }

      // Property Type Filter
      if (property_type) {
        whereCondition.property_type = property_type;
      }

      if (description_3) {
        whereCondition.description_3 = description_3;
      }

      if (interior_data) {
        whereCondition.interior_data = interior_data;
      }

      if (bhk_data) {
        whereCondition.bhk_data = bhk_data;
      }

      // Budget Filter
      if (budget) {
        whereCondition.main_price = {
          [Op.lte]: budget,
        };
      }

      // Search Filter
      if (search) {
        whereCondition[Op.or] = [
          { description_1: { [Op.iLike]: `%${search}%` } },
          { property_area_name: { [Op.iLike]: `%${search}%` } },
          { pincode: { [Op.iLike]: `%${search}%` } },
          { country: { [Op.iLike]: `%${search}%` } },
          { state: { [Op.iLike]: `%${search}%` } },
          { city: { [Op.iLike]: `%${search}%` } },
        ];
      }

      let order = [];

      // Date Sort
      if (date_sort) {
        order.push(["createdAt", date_sort === "new" ? "DESC" : "ASC"]);
      }

      // Price Sort
      if (price_sort) {
        order.push(["main_price", price_sort === "lth" ? "ASC" : "DESC"]);
      }

      // Pet Sort
      if (pet_sort) {
        order.push(["pet_type", pet_sort === "sqlth" ? "ASC" : "DESC"]);
      }

      const { rows: itemData } = await items.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        order,
        attributes: { exclude: ["updatedAt"] },
        include: [
          {
            model: users,
            as: "user",
            attributes: ["mobile_no"],
          },
          {
            model: auctions,
            as: "auctions",
            required: false,
            attributes: [
              "id",
              "item_id",
              "user_id",
              "price",
              "owner_name",
              "createdAt",
              "updatedAt",
            ],
            include: [
              {
                model: users,
                as: "user",
                attributes: ["id", "mobile_no", "otp", "active", "fcm_token"],
              },
            ],
          },
        ],
      });

      // Format response (move mobile_no outside user)
      const formattedItems = itemData.map((item) => {
        const itemJSON = item.toJSON();

        const { user, ...rest } = itemJSON;

        return {
          ...rest,
          mobile_no: user?.mobile_no || null,
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
