// Mongoose model class for Courses
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Class description
const courseSchema = new Schema({
  title: String,
  description: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateCreated: Date,
  dateUpdated: Date,
  coverImg: String,
  category: String,
  published: Boolean,
  sections: [{ type: Schema.Types.ObjectId, ref: "Component" }],
});

mongoose.model("courses", courseSchema); // Create new collection called courses, using the courseScema
