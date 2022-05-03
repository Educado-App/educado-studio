// Mongoose model class for Courses
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Class description
const componentsSchema = new Schema({
  type: String, // Image / Video / Audio / Text / Quiz
  file: String, // AWS URL, if video, audio or image
  text: String, // IF component is text
  quizzes: [{ type: Schema.Types.ObjectId, ref: "Quizzes" }], // if component is quiz
  dateCreated: Date, // For all components
  dateUpdated: Date, // If its a text component
});

mongoose.model("components", componentsSchema); // Create new collection called users, using the userSchema
