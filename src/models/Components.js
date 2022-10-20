// Mongoose model class for Courses
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Class description
const componentsSchema = new Schema({
  type: { type: String }, // Image / Video / Audio / Text
  file: { type: String }, // AWS URL, if video, audio or image
  text: { type: String }, // IF component is text
  createdAt: { type: Date }, // For all components
  modifiedAt: { type: Date }, // If its a text component
});

const ComponentModel = mongoose.model("Component", componentsSchema);

module.exports = { ComponentModel }
