// Mongoose model class for Courses
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Class description
const courseSchema = new Schema({
    title: String,
    description: String,
    _user: {type: Schema.Types.ObjectId,ref: 'User'},
    dateCreated: Date,
    lastUpdated: Date,
});

mongoose.model('courses',courseSchema); // Create new collection called users, using the userSchema
