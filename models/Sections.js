// Mongoose model class for Courses
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Class description
const sectionSchema = new Schema({
    title: String,
    dateCreated: Date,
    dateUpdated: Date,
    components: [{type: Schema.Types.ObjectId,ref: 'Component'}],
});

mongoose.model('sections',sectionSchema); // Create new collection called users, using the userSchema
