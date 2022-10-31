const { CourseModel } = require('../db-models/Course')

const Params = require('../../helpers/validation/params')
const ParamsSchema = require('../../helpers/validation/paramsSchema')

const makeCourseList = require('./courseList')
const courseList = makeCourseList({ dbModel: CourseModel, Params, ParamsSchema })

module.exports = { courseList }
