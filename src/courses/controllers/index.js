const Params = require('../../helpers/validation/params')

const { courseList } = require('../gateways')
const { sectionList } = require('../gateways')
const { exerciseList } = require('../gateways')
const { categoryList } = require('../gateways')

const makeCourseController = require('./courseController')
const makePublicCourseController = require('./publicCourseController')
const makeSectionController = require('./sectionController')
const makeReorderSectionsController = require('./reOrderSectionsController')
const makeExerciseController = require('./exerciseController')
const makeCategoryController = require('./categoryController')

const courseController = makeCourseController({ courseList })
const publicCourseController = makePublicCourseController({ courseList })
const sectionController = makeSectionController({ sectionList })
const reorderSectionsController = makeReorderSectionsController({ Params })
const exerciseController = makeExerciseController({ exerciseList })
const categoryController = makeCategoryController({ categoryList })

module.exports = {
    publicCourseController,
    courseController,
    sectionController,
    reorderSectionsController,
    exerciseController,
    categoryController
}
