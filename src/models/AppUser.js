// Mongoose model class for AppUser
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Class description
const AppUserSchema = new Schema({
  phone: {
    type: String,
    require: [true, "Please provide a phone number"],
  },

  password: {
    type: String,
    require: [true, "Please provide a password"],
    unique: false
  },

  loggedInAt: {
    type: Date
  },
});

module.exports = mongoose.model.Users || mongoose.model("appUsers", AppUserSchema);