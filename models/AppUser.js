// Mongoose model class for AppUser
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Class description
const AppUserSchema = new Schema({
  phone: {
    type: String,
    require: [true, "Please provide a phone number"],
    //unique: [true, "Phone number already exists"],
    //match: [+[0-9]]
  },

  password: {
    type: String,
    require: [true, "Please provide a password"],
    unique: false
  },
  timeOfLogin: {
    type: Date},
});

module.exports = mongoose.model.Users || mongoose.model("appUsers", AppUserSchema);