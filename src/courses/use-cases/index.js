const { courseList, sectionList } = require('../gateways')

const makeAddCourse = require('./addCourse')
const makeEditCourse = require('./editCourse')
const makeAddSection = require('./addSection')

const addCourse = makeAddCourse({ courseList })
const editCourse = makeEditCourse({ courseList })

const addSection = makeAddSection({ sectionList, courseList })

module.exports = {
    addCourse,
    editCourse,
    addSection
}