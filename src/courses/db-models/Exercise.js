const mongoose = require("mongoose");
const { Schema } = mongoose;
const { VideoField } = require('../../helpers/mongoose/fields/file')
const { StorageLink } = require('../../helpers/mongoose/fields')

const exerciseSchema = new Schema({
    title: { type: String },
    description: { type: String },
    parentSection: { type: Schema.Types.ObjectId, ref: "Section" },
    exerciseNumber: { type: Number },
    content: { type: String, get: StorageLink },
    onWrongFeedback: VideoField(),
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
