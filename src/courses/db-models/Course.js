const mongoose = require("mongoose");

const { StorageLink } = require("../../helpers/mongoose/fields");
const { Schema } = mongoose;

const CourseSchema = new Schema({
  title: { type: String },
  description: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "Profile" },
  coverImg: { type: String, get: StorageLink },
  published: { type: Boolean },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
  createdAt: { type: Date },
  modifiedAt: { type: Date },

}, {
  toJSON: { getters: true, setters: true },
  toObject: { getters: true, setters: true }
})

const CourseModel = mongoose.model("Course", CourseSchema)

module.exports = { CourseModel }