const Params = require('../../helpers/validation/params')
const ParamsSchema = require('../../helpers/validation/paramsSchema')

const { CourseModel, SectionModel, ExerciseModel } = require('../db-models')
require('../../users/db-models')

const makeCourseList = require('./courseList')
const makeSectionList = require('./sectionList')
const makeExerciseList = require('./exerciseList')

const courseList = makeCourseList({ dbModel: CourseModel, Params, ParamsSchema })
const sectionList = makeSectionList({ dbModel: SectionModel, Params, ParamsSchema })
const exerciseList = makeExerciseList({ dbModel: ExerciseModel, Params, ParamsSchema })

module.exports = { 
    courseList, 
    sectionList, 
    exerciseList 
}
