const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  googleID: String,
  email: String,
  salt: String,
  hash: String,
  joinedAt: Date,
  modifiedAt: Date
});

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel }


