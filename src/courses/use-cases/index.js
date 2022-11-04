const { courseList, sectionList, exerciseList } = require('../gateways')

const makeAddCourse = require('./addCourse')
const makeEditCourse = require('./editCourse')
const makeAddSection = require('./addSection')
const makeEditSection = require('./editSection')
const makeAddExercise = require('./addExercise')
const makeEditExercise = require('./editExercise')

const addCourse = makeAddCourse({ courseList })
const editCourse = makeEditCourse({ courseList })
const addSection = makeAddSection({ sectionList, courseList })
const editSection = makeEditSection({ sectionList })
const addExercise = makeAddExercise({ exerciseList, sectionList })
const editExercise = makeEditExercise({ exerciseList })

module.exports = {
    addCourse,
    editCourse,
    addSection,
    editSection,
    addExercise,
    editExercise
}