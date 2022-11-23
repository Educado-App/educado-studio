const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContentCreatorSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  motivation: { type: String },
  approved: { type: Boolean },
  rejectReason: { type: String },
  isRejected: { type: Boolean },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
}, {
  toJSON: { getters: true, setters: true },
  toObject: { getters: true, setters: true }
})

const ContentCreatorApplication = mongoose.model("Content-Creator-Application", ContentCreatorSchema);

module.exports = { ContentCreatorApplication };
