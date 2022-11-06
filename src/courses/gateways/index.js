const Params = require('../../helpers/validation/params')
const ParamsSchema = require('../../helpers/validation/paramsSchema')
const Id = require('../../helpers/Id')


const { CourseModel, SectionModel, ExerciseModel } = require('../db-models')
require('../../users/db-models')

const makeCourseList = require('./courseList')
const makeSectionList = require('./sectionList')
const makeExerciseList = require('./exerciseList')

const courseList = makeCourseList({ dbModel: CourseModel, Params, ParamsSchema, Id })
const sectionList = makeSectionList({ dbModel: SectionModel, Id })
const exerciseList = makeExerciseList({ dbModel: ExerciseModel, Params, ParamsSchema })

module.exports = {
    courseList,
    sectionList,
    exerciseList
}
