const mongoose = require("mongoose")
const { Schema } = mongoose

const sectionSchema = new Schema({
  title: { type: String },
  description: { type: String },
  sectionNumber: { type: Number },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
  exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
})

const SectionModel = mongoose.model("Section", sectionSchema)

module.exports = { SectionModel }
