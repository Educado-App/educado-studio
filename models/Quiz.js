// Mongoose model class for Courses
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Class description
const quizSchema = new Schema({
    question: {
        textQuestion: String,
        audioQuestion: String,
    }, // First string is the question, second is AWS link if audio is uploaded
    answers: [{
        textAnswer: String, 
        audioAnswer: String, 
        correctAnswer: Boolean,
    }], // Array of answers. First string is the answer in plaintext, second is AWS link for audio and boolean for if correct or not
    dateCreated: Date,
    dateUpdated: Date,
  });
  
  mongoose.model("quizzes", quizSchema); // Create new collection called users, using the userSchema
  