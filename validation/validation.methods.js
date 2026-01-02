const isset = require("isset");

// const ValidateBody = (schema) => {
//   return async (req, res, next) => {
//     try {
//       const requestData = req.body;
//       // console.log("reqBody: ", requestData);
//       if (isset(requestData)) {
//         // console.log("reqData: " + requestData);
//         console.log("requestData : ", requestData.data);
//         const data = await commonFunction.decode(requestData.data, 1);
//         console.log("data : ", data);
//         // const result =  joiValidation(method,data);
//         if (data?.status && data?.data) {
//           const result = await schema.validate(data.data);
//           if (result.error) {
//             return res.status(400).json({
//               status: false,
//               message: result.error.details,
//               data: [],
//             });
//           } else {
//             req.body.data = data.data;
//             return next();
//           }
//         } else {
//           return res.status(400).json({
//             status: false,
//             message: data.message,
//           });
//         }
//       } else {
//         return res.status(400).json({
//           status: false,
//           message: "Data must be required",
//         });
//       }
//     } catch (error) {
//       console.log("adminValidate error: ", error);
//       return res.status(400).json({
//         status: false,
//         message: "Server validation is fail.",
//         data: [],
//       });
//     }
//   };
// };

const ValidateBody = (schema) => {
  return (req, res, next) => {
    const reqData = req.body;

    const { error, value } = schema.validate(reqData);

    if (error) {
      return res.status(400).json({
        success: false,
        message: `validation error: ${error.details[0].message}`,
        data: [],
      });
    }

    // Set the validated query parameters in the request object
    req.body = value;
    // Pass control to the next middleware or route handler
    next();
  };
};

const ValidateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query);

    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message, data: [] });
    }

    // Set the validated query parameters in the request object
    req.query = value;

    next();
  };
};

const ValidateParams = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params);

    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message, data: [] });
    }

    // Set the validated query parameters in the request object
    req.query = value;

    next();
  };
};
module.exports = {
  ValidateBody,
  ValidateQuery,
  ValidateParams,
};
