// Mongoose model class for Courses
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Routes are sorted into COURSE - SECTION - COMPONENT each with ASCII art, within each functions are in order of CRUD
// NOTE Files do NOT delete from the backend yet, on the TODO as of 03/2022

// Class description
const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
  coverImg: { type: String },
  category: { type: String },
  published: { type: Boolean },
  sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
});

const CourseModel = mongoose.model("Course", courseSchema); // Create new collection called courses, using the courseSchema

module.exports = { CourseModel }