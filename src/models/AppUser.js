// Mongoose model class for AppUser
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Class description
const AppUserSchema = new Schema({
  phone: { type: String },

  password: { type: String },

  loggedInAt: { type: Date },
});

const appUserModel = mongoose.model("appUsers", AppUserSchema);

module.exports = { appUserModel };
