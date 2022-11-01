const Params = require('../../helpers/validation/params')
const ParamsSchema = require('../../helpers/validation/paramsSchema')

const { CourseModel, SectionModel } = require('../db-models')
require('../../users/db-models')

const makeCourseList = require('./courseList')
const makeSectionList = require('./sectionList')

const courseList = makeCourseList({ dbModel: CourseModel, Params, ParamsSchema })
const sectionList = makeSectionList({ dbModel: SectionModel })

module.exports = { 
    courseList,
    sectionList
}
