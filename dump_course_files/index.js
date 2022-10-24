const Id = require("../src/helpers/Id");

const buildMakeCourse = require('./course')
const buildMakeSection = require('../src/courses/domain/section')

const makeSection = buildMakeSection({ Id })
const makeCourse = buildMakeCourse({ Id, makeSection })

module.exports = { makeCourse }