const user = require("./user.routes");

module.exports = {
  // dealEasy routes
  dealEasyUserRoutes: (app) => {
    app.use("/api", user);
  },
 
};
