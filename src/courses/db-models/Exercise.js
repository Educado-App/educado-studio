const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Link } = require('../../helpers/fields')

const exerciseSchema = new Schema({
    parentSection: { type: Schema.Types.ObjectId, ref: "Section" },
    exerciseNumber: { type: Number },
    content: { type: String, get: Link },
    onWrongFeedback: { type: String, get: Link },
    answers: [{
        text: { type: String },
        correct: { type: Boolean },
        modifiedAt: { type: Date },
    }],
    modifiedAt: { type: Date },
}, {
    toJSON: { getters: true, setters: true },
    toObject: { getters: true, setters: true }
});


const ExerciseModel = mongoose.model("Exercise", exerciseSchema);

module.exports = { ExerciseModel }
