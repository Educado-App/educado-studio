const mongoose = require("mongoose");

const { Schema } = mongoose;

const RoleSchema = new Schema({
  id: { type: Number, required: true},
  name: { type: String },
  permissions: [{ type: String }],
  createdAt: { type: Date },
  modifiedAt: { type: Date },

}, {
  toJSON: { getters: true, setters: true },
  toObject: { getters: true, setters: true }
})

const RoleModel = mongoose.model("Role", RoleSchema)

module.exports = { RoleModel }