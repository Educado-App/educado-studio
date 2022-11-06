const mongoose = require("mongoose")
const { Schema } = mongoose

const sectionSchema = new Schema({
  parentCourse: { type: Schema.Types.ObjectId, ref: "Course" },
  title: { type: String },
  description: { type: String },
  sectionNumber: { type: Number },
  exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
  createdAt: { type: Date },
  modifiedAt: { type: Date },
})

const SectionModel = mongoose.model("Section", sectionSchema)

module.exports = { SectionModel }
