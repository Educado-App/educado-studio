const { courseList } = require('../gateways')

const makeCourseController = require('./courseController')
const courseController = makeCourseController({ courseList })

module.exports = { courseController }