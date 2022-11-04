const { courseList } = require('../gateways')
const { sectionList } = require('../gateways')
const { exerciseList } = require('../gateways')

const makeCourseController = require('./courseController')
const makePublicCourseController = require('./publicCourseController')
const makeSectionController = require('./sectionController')
const makeExerciseController = require('./exerciseController')

const courseController = makeCourseController({ courseList })
const publicCourseController = makePublicCourseController({ courseList })
const sectionController = makeSectionController({ sectionList })
const exerciseController = makeExerciseController({ exerciseList })

module.exports = { courseController, publicCourseController, sectionController, exerciseController }
