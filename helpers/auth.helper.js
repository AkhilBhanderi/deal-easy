const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants/env.constant");
const { users } = require("../sequelize/models");
const createError = require("http-errors");
module.exports = {
  // generate token
  signAccessToken: (userId, userRole, email, time) => {
    return new Promise((resolve, reject) => {
      const payload = { userId, email, userRole };
      const secret = JWT_SECRET_KEY;
      const options = {
        expiresIn: time,
        issuer: "dealeasy",
        audience: [userId],
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) return reject(err);
        resolve(token);
      });
    });
  },
  userAuthentication: async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token)
      return next(createError.Unauthorized("Authorization Token Required"));

    token = token.split(" ")[1];
    jwt.verify(token, JWT_SECRET_KEY, async (err, result) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          status: 401,
          message: "Invalid Token or Expired" + err.message,
          isAuth: false,
          data: [],
        });
      }
      try {
        if (result && result.mobile_no) {
          const getUserData = await users.findOne({
            where: {
              mobile_no: String(result.mobile_no),
              otp: result.otp,
            },
          });
          if (!getUserData)
            return res.json({
              success: false,
              status: 401,
              message: "Invalid Token or Expired",
              isAuth: false,
              data: [],
            });

          // ✅ Attach logged-in user to request
          req.user = {
            id: getUserData.id,
            mobile_no: getUserData.mobile_no,
          };

          return next();
        }
      } catch (error) {
        console.error(
          "Database Query Error:",
          error.stack || error.message || error
        );
        return res.status(500).json({
          success: false,
          status: 500,
          message: "Internal Server Error",
          isAuth: false,
          data: [],
        });
      }
      return res.json({
        success: false,
        status: 401,
        message: "Invalid Token or Expired",
        isAuth: false,
        data: [],
      });
    });
  },
};
