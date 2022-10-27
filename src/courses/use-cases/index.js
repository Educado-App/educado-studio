const { courseList } = require('../gateways')

const makeAddCourse = require('./addCourse')
const makeEditCourse = require('./editCourse')

const addCourse = makeAddCourse({ courseList })
const editCourse = makeEditCourse({ courseList })

module.exports = { 
    addCourse,
    editCourse
}