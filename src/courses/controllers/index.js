const { courseList } = require('../gateways')

const makeCourseController = require('./courseController')
const makePublicCourseController = require('./publicCourseController')

const courseController = makeCourseController({ courseList })
const publicCourseController = makePublicCourseController({ courseList })

module.exports = { courseController, publicCourseController }