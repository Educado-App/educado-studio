// Mongoose model class for Courses
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Class description
const sectionSchema = new Schema({
    title: String,
    time: Date,
    position: Number,
    course: String,
});

mongoose.model('sections',sectionSchema); // Create new collection called users, using the userSchema
