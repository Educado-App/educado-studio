const mongoose = require("mongoose");
const { Schema } = mongoose;
const { StorageLink } = require('../../helpers/mongoose/fields')

const exerciseSchema = new Schema({
    parentSection: { type: Schema.Types.ObjectId, ref: "Section" },
    exerciseNumber: { type: Number },
    content: { type: String, get: StorageLink },
    onWrongFeedback: { type: String, get: StorageLink },
    answers: [{
        text: { type: String },
        correct: { type: Boolean },
        modifiedAt: { type: Date },
        _id: false
    }],
    modifiedAt: { type: Date },
});

const ExerciseModel = mongoose.model("Exercise", exerciseSchema);

module.exports = { ExerciseModel }
