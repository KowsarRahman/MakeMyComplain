const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    //Info Related to Customers
    username: String, //For everyone
    email: String, //For Everyone
    password: String, //For Everyone
    fullAddress: String,
    phoneNumber: String, //For ACCC officers as well
    fullName: String, //For ACCC officers as well
    //Info Related to Store
    parentCompany: String,
    sotreBranchName: String,
    typeOfCompany: String,
    storeManager: String,
    storeAddress: String,
    storeABN: String,
    //Info Related to a ACCC officer
    acccOfficerID: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
