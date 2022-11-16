const Id = require('../../helpers/id')
const { ValidationError } = require('../../helpers/error')

const buildMakeCourse = require('./course')
const buildMakeSection = require('./section')
const buildMakeExercise = require('./exercise')
const buildMakeAnswer = require('./answer')

const makeAnswer = buildMakeAnswer()
const makeExercise = buildMakeExercise({ Id, makeAnswer })
const makeSection = buildMakeSection({ Id, makeExercise })
const makeCourse = buildMakeCourse({ Id, makeSection, ValidationError })

module.exports = {
    makeCourse,
    makeSection,
    makeExercise,
    makeAnswer
}
