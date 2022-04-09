const { authJwt } = require("../middlewares");
const controller = require("../controllers/complain.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    //This ensures whether the token is valid and it is a customer or not, then registers the complains
    app.post(
    "/api/complain/postComplain",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.makeComplain
    );
};
