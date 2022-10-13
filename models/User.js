// Mongoose model class for User
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Class description
const userSchema = new Schema({
  googleID: String,
  email: String,
  password: String,
  joinedAt: Date,
  modifiedAt: Date
});

const UserModel = mongoose.model("users", userSchema);
module.exports.UserModel = UserModel

// JWT userSchema TODO: merge with org
const jwtUserSchema = new Schema({
  googleID: String,
  email: String,
  password: String,
  salt: String,
  joinedAt: Date,
  modifiedAt: Date
})

const JwtUserModel = mongoose.model("users2", jwtUserSchema);
module.exports.JwtUserModel = JwtUserModel;


