// Mongoose model class for Courses
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Class description
const courseSchema = new Schema({
  title: { type: String },
  description: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
  coverImg: { type: String },
  category: { type: String },
  published: { type: Boolean },
  sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
});

const CourseModel = mongoose.model("Course", courseSchema); // Create new collection called courses, using the courseSchema

module.exports = { CourseModel }