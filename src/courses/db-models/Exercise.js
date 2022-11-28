const mongoose = require("mongoose");
const { Schema } = mongoose;
const { StorageLink } = require('../../helpers/mongoose/fields')

const exerciseSchema = new Schema({
    title: { type: String },
    description: { type: String },
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
}, {
    toJSON: { getters: true, setters: true },
    toObject: { getters: true, setters: true }
});


const ExerciseModel = mongoose.model("Exercise", exerciseSchema);

module.exports = { ExerciseModel }
