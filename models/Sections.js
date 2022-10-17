// Mongoose model class for Courses
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Class description
const sectionSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  dateCreated: Date,
  dateUpdated: Date,
  components: [{ type: Schema.Types.ObjectId, ref: "Component" }],
});

const SectionModel = mongoose.model("Section", sectionSchema);

module.exports = { SectionModel }
