const Id = require('../../helpers/Id')

const buildMakeCourse = require('./course')
const buildMakeSection = require('./section')
const buildMakeExercise = require('./exercise')
const buildMakeAnswer = require('./answer')

const makeAnswer = buildMakeAnswer()
const makeExercise = buildMakeExercise({ Id, makeAnswer })
const makeSection = buildMakeSection({ Id, makeExercise })
const makeCourse = buildMakeCourse({ Id, makeSection })

module.exports = { 
    makeCourse,
    makeExercise,
    makeSection,
    makeCourse
}