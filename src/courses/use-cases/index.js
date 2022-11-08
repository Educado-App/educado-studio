const { courseList, sectionList, exerciseList } = require('../gateways')

const makeAddCourse = require('./addCourse')
const makeEditCourse = require('./editCourse')

const makeAddSection = require('./addSection')
const makeRemoveSection = require('./removeSection')
const makeEditSection = require('./editSection')
const makeReorderSections = require('./reOrderSections')

const makeAddExercise = require('./addExercise')
const makeEditExercise = require('./editExercise')
const makeRemoveExercise = require('./removeExercise')



const addCourse = makeAddCourse({ courseList })
const editCourse = makeEditCourse({ courseList })

const addSection = makeAddSection({ sectionList, courseList })
const removeSection = makeRemoveSection({ sectionList, courseList })
const reorderSections = makeReorderSections({ sectionList, courseList })
const editSection = makeEditSection({ sectionList })

const addExercise = makeAddExercise({ exerciseList, sectionList })
const editExercise = makeEditExercise({ exerciseList })
const removeExercise = makeRemoveExercise({ exerciseList, sectionList })


module.exports = {
    addCourse,
    editCourse,
    addSection,
    removeSection,
    editSection,
    reorderSections,
    addExercise,
    editExercise,
    removeExercise,
}