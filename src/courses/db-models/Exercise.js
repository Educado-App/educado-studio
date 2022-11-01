const mongoose = require("mongoose");
const { Schema } = mongoose;

const exerciseSchema = new Schema({
    exerciseNumber: { type: Number },
    content: {
        type: { enum: ['audio', 'video'] },
        url: { type: String }
    },
    on_wrong_feedback: {
        type: { enum: ['audio', 'video'] },
        url: { type: String }
    },
    answers: [{
        text: { type: String },
        correct: { type: Boolean },
        modifiedAt: { type: Date },
    }],
    modifiedAt: { type: Date },
});

const ExerciseModel = mongoose.model("Exercise", exerciseSchema);

module.exports = { ExerciseModel }
