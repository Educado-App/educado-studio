// Mongoose model class for Courses
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Class description
const sectionSchema = new Schema({
    title: String,
    position: Number,
    coverImg: String,
    _course: {type: Schema.Types.ObjectId,ref: 'Course'},
});

mongoose.model('sections',sectionSchema); // Create new collection called users, using the userSchema
