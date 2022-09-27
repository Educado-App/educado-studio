// Mongoose model class for User
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Class description
const userSchema = new Schema({
  googleID: String,
  email: String,
});

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel }
