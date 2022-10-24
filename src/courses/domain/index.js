const Id = require("../../helpers/Id");

const buildMakeCourse = require('./course')
const buildMakeSection = require('./section')

const makeSection = buildMakeSection({ Id })
const makeCourse = buildMakeCourse({ Id, makeSection })

module.exports = { makeCourse }