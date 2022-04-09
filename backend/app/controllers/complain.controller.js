const config = require("../config/auth.config");
const db = require("../models");
const { complain: Complain, role: Role, refreshToken: RefreshToken } = db;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.makeComplain = (req, res) => {
    const complain = new Complain({
      storeUserName: req.body.storeUserName,
      price: req.body.price,
      product: req.body.product,
      productBatchID: req.body.productBatchID,
      productImage: req.body.productImage,
      productType: req.body.productType,
      productInvoice: req.body.productInvoice,
      expectedOutcome: req.body.expectedOutcome,
      customerUserName: req.body.customerUserName
    });
  
    complain.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
          res.send("Complain successfully registered");
      }
    });
  };

  exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
  
    if (requestToken == null) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }
  
    try {
      let refreshToken = await RefreshToken.findOne({ token: requestToken });
  
      if (!refreshToken) {
        res.status(403).json({ message: "Refresh token is not in database!" });
        return;
      }
  
      if (RefreshToken.verifyExpiration(refreshToken)) {
        RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
        
        res.status(403).json({
          message: "Refresh token was expired. Please make a new signin request",
        });
        return;
      }
  
      let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
  
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  };