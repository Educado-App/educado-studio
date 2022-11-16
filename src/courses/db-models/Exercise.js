const mongoose = require("mongoose");
const { Schema } = mongoose;

const exerciseSchema = new Schema({
    parentSection: { type: Schema.Types.ObjectId, ref: "Section" },
    exerciseNumber: { type: Number },
    content: {
        type: { enum: ['audio', 'video'] },
        url: { type: String }
    },
    onWrongFeedback: {
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
