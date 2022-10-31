const { ContentCreatorApplication } = require('../db-models/ContentCreatorApplication')
const Params = require('../../helpers/validation/params')
const ParamsSchema = require('../../helpers/validation/paramsSchema')

const makeContentCreatorApplicationList = require('./contentCreatorApplicationList')
const contentCreatorApplicationList = makeContentCreatorApplicationList({ dbModel: ContentCreatorApplication, Params, ParamsSchema })

module.exports = { contentCreatorApplicationList }
