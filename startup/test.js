const nursesRouter = require("../api/routes/nurses");
module.exports = function (app) {
  app.use("/api/v1/nurses", nursesRouter);
};
