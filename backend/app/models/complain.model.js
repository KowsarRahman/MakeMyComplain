const mongoose = require("mongoose");

const Complain = mongoose.model(
  "Complain",
  new mongoose.Schema({
    //Info Related to Complain
    username: String,
    product: String,
    price: String,
    productBatchID: String,
    productInvoice: String,
    productType: String,
    productImage: String,
    expectedOutcome: String, //Could be refund, reinstallation, compensation, etc
    //Info Related to Store
    storeUserName: String, //Every Store has an unique username
    customerUserName: String
  })
);

module.exports = Complain;
