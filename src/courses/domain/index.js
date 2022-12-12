const Id = require('../../helpers/id')

const buildMakeCategory = require('./category')
const buildMakeCourse = require('./course')
const buildMakeSection = require('./section')
const buildMakeExercise = require('./exercise')
const buildMakeAnswer = require('./answer')

const makeCategory = buildMakeCategory({ Id })
const makeAnswer = buildMakeAnswer()
const makeExercise = buildMakeExercise({ Id, makeAnswer })
const makeSection = buildMakeSection({ Id, makeExercise })
const makeCourse = buildMakeCourse({ Id, makeSection, makeCategory })

module.exports = {
    makeCourse,
    makeSection,
    makeExercise,
    makeAnswer,
    makeCategory
}
