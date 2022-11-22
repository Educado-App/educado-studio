const mongoose = require("mongoose");

const { Schema } = mongoose;

const RoleSchema = new Schema({
  _id: { type: String },
  name: { type: String },
  permissions: [{ type: String }],
}, {
  toJSON: { getters: true, setters: true },
  toObject: { getters: true, setters: true }
})

const RoleModel = mongoose.model("Role", RoleSchema)

module.exports = { RoleModel }