// Mongoose model class for User
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Class description
const ContentCreatorSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  motivation: { type: String },
  approved: { type: Boolean },
  rejectReason: { type: String },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
});

const ContentCreatorApplication = mongoose.model(
  "Content-Creator-Application",
  ContentCreatorSchema
);

module.exports = { ContentCreatorApplication };
