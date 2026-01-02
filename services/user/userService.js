const { users } = require("../../sequelize/models");
const createError = require("http-errors");

module.exports = {
  addUser: async (data) => {
    try {
      const userData = await users.create(data);
      return userData;
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  },
  checkUserExistence: async (reqData) => {
    try {
      console.log(typeof reqData.mobile_no);
      // Query the database to find if user with the given mobile_no and otp exists
      const existingUser = await users.findOne({
        where: {
          mobile_no: String(reqData.mobile_no),
          otp: reqData.otp,
        },
      });

      if (!existingUser) {
        throw createError.BadRequest(
          "No user found with the provided mobile number and OTP."
        );
      } else {
        return existingUser;
      }
    } catch (error) {
      throw createError.InternalServerError(error.message);
    }
  },
};
