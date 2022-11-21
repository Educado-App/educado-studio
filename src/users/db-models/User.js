const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  googleID: String,
  email: {
    type: String,
    unique: [true, "User with given email already exists"]
  },
  salt: String,
  hash: String,
  joinedAt: Date,
  modifiedAt: Date
});

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel }


