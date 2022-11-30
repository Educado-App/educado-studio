// /**
//   * data-access for an app user
//   * 
//   * Last Modified: 10-11-2022
//   **/

// Mongoose model class for User
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Class description
const AppUserSchema = new Schema({
    phone: { 
        type: String,
    },
    salt: { type: String },
    hash: { type: String },
    loggedInAt: { type: String },
})

const appUserModel = mongoose.model(
  "appUser",
  AppUserSchema
)

module.exports = { appUserModel };