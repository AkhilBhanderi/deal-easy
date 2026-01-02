const isset = require(`isset`);

const AppValidate = (schema) => {
  return async (req, res, next) => {
    try {
      const requestData = req?.body;
      if (isset(requestData)) {
        const data = { data: requestData };
        const result = await schema.validate(data.data);

        if (result.error) {
          return res.status(200).json({
            status: false,
            message: result.error.details,
          });
        } else {
          req.body = data.data;
          return next();
        }
      } else {
        return res.status(200).json({
          status: false,
          message: `Data must be required`,
        });
      }
    } catch (error) {
      console.log(`adminValidate error: `, error);
      return res.status(200).json({
        status: false,
        message: `Server validation is fail.`,
      });
    }
  };
};

module.exports = {
  AppValidate,
};
