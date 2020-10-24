// Mongoose model class for User
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Class description
const userSchema = new Schema({
    googleID: String,
});

mongoose.model('users',userSchema); // Create new collection called users, using the userSchema

