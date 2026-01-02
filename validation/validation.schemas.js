const validate = require("./validation");
const Joi = require("joi");

module.exports = {
  userSchema: Joi.object().keys({
    mobile_no: validate.reqNumber,
  }),
  verifyUserSchema: Joi.object().keys({
    mobile_no: validate.reqNumber,
    otp: validate.reqNumber,
  }),
  itemSchema: Joi.object({
    owner_name: validate.reqString,
    country: validate.reqString,
    state: validate.reqString,
    city: validate.reqString,
    pincode: Joi.string()
      .pattern(/^[0-9]{6}$/)
      .required(),
    advance_money: validate.reqPositiveNumber,
    deal_type: Joi.string().valid("rent", "sale").required(),
    pet_type: validate.string,
    description_1: validate.string,
    description_2: validate.string,
    description_3: validate.string,
    description_4: validate.string,
    description_5: validate.string,
    latitude: validate.reqNumber,
    longitude: validate.reqNumber,
    main_price: validate.reqPositiveNumber,
    property_type: validate.reqString,
    location_url: Joi.string().uri().optional(),
    auction: validate.reqNumber,
    image: validate.string,
  }),
  deleteItemSchema: Joi.object({
    item_id: validate.reqString,
  }),
};
