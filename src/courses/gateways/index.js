const { CourseModel } = require('../db-models/Course')
const Params = require('../../helpers/ajv/params')
const ParamsSchema = require('../../helpers/ajv/paramsSchema')

const makeCourseList = require('./courseList')
const courseList = makeCourseList({ dbModel: CourseModel, Params, ParamsSchema })

module.exports = { courseList }
