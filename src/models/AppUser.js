// Mongoose model class for AppUser
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Class description
const AppUserSchema = new Schema({
  phone: {
    type: String,
    require: [true, "Please provide a phone number"],
    unique: [true, "Phone number already exists"],
    minLength: [8, 'Must be at least 8, got {VALUE}'], // For Brazil it needs to be 10
    maxLength: [11, 'Must not be longer than 11, got {VALUE}']
    //match: +[0-9]
  },

  password: {
    type: String,
    require: [true, "Please provide a password"],
    unique: false
  },

  timeOfLogin: {
    type: Date
  },
});

module.exports = mongoose.model("appUsers", AppUserSchema);