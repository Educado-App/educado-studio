const { courseList } = require('../data-access')

const makeCourseController = require('./courseController')
const courseController = makeCourseController({ courseList })

module.exports = { courseController }