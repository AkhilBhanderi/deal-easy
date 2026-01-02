const { encryption } = require("./cryptoUtils");

module.exports = {
  response: async (req, res, next) => {
    try {
      // Here We Are Using Javascript "call" Method For Handle Every Routes Response Centrally
      // "call" Method Is Only Works With Object Datatype Which Is Store A Field With Function Value
      // In Express Js We Are Using "res" Parameter Which Is Object Datatype And "json" Is The Field Of "res" Parameter Which Is Store Function

      // When We Are Working With A Object And Inside That Object There Is A Field Which Is Store Function With Some Logics But When If We Needs To Add Or Modify Logic Of The Perticuler Function Then We Can Use "call" Method, "call" Simply Update Functionlity And Call The Function

      const originalResponse = res.json;

      res.json = async function (responseBody) {
        const encryptedResponse = await encryption(
          responseBody,
          req.protocol,
          req.get("host")
        );
        if (!encryptedResponse) {
          throw new Error("Something Went Wrong!, Failed To Encrypt Response");
        }
        originalResponse.call(res, encryptedResponse);
      };

      next();
    } catch (err) {
      next(err);
    }
  },
};
