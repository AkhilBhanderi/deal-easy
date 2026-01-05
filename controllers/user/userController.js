const userService = require("../../services/user/userService");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../constants/env.constant");

module.exports = {
  addUser: async (req, res, next) => {
    try {
      const reqData = req.body;

      // Function to generate a random OTP
      const genarateOtp = () => {
        return Math.floor(10000 + Math.random() * 90000);
      };

      // Call the function to generate the OTP and assign it to reqData.otp
      reqData.otp = genarateOtp(); // Add parentheses to invoke the function

      const user = await userService.addUser(reqData);

      return res.status(200).send({
        status: true,
        otp: user.otp,
      });
    } catch (error) {
      next(error);
    }
  },
  checkUserExistence: async (req, res, next) => {
    try {
      const reqData = req.body;
      console.log("reqData:", reqData);

      // Call the service to check if user exists
      const existingUser = await userService.checkUserExistence(reqData);
      console.log("existingUser:", existingUser);

      const payload = {
        mobile_no: existingUser.mobile_no,
        otp: existingUser.otp,
      };

      var token = jwt.sign(payload, JWT_SECRET_KEY);
      console.log("🚀 ~ checkUserExistence: ~ token:", token);

      return res.status(200).send({
        status: true,
        0: {
          headers: {},
          original: {
            access_token: token,
            token_type: "bearer",
            user: {
              id: existingUser.id,
              otp: existingUser.otp,
              mobile_no: existingUser.mobile_no,
              status: existingUser.active ? "1" : "0",
              fcm_token: reqData.fcm_token || "",
            },
          },
          exception: null, // Assuming there's no exception
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
