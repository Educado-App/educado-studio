const Params = require('../../helpers/validation/params')
const ParamsSchema = require('../../helpers/validation/paramsSchema')
const Id = require('../../helpers/id')

const { CourseModel, SectionModel, ExerciseModel, CategoryModel } = require('../db-models')
require('../../users/db-models')

const makeCourseList = require('./courseList')
const makeSectionList = require('./sectionList')
const makeExerciseList = require('./exerciseList')
const makeCategoryList = require('./categoryList')


const courseList = makeCourseList({ dbModel: CourseModel, Params, ParamsSchema, Id })
const sectionList = makeSectionList({ dbModel: SectionModel, Id })
const exerciseList = makeExerciseList({ dbModel: ExerciseModel, Params, ParamsSchema })
const categoryList = makeCategoryList({ dbModel: CategoryModel, Id })

module.exports = {
    courseList,
    sectionList,
    exerciseList,
    categoryList
}
