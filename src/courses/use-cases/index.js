const { courseList } = require('../gateways')

const makeAddCourse = require('./addCourse')

const addCourse = makeAddCourse({ courseList })

module.exports = { addCourse }