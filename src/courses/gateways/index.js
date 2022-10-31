const Params = require('../../helpers/validation/params')
const ParamsSchema = require('../../helpers/validation/paramsSchema')

const { CourseModel } = require('../db-models')

const makeCourseList = require('./courseList')
const courseList = makeCourseList({ dbModel: CourseModel, Params, ParamsSchema })

module.exports = { courseList }
