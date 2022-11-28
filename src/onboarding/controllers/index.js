const Params = require('../../helpers/validation/params')
const Id = require('../../helpers/id')

const { contentCreatorApplicationList } = require('../gateways')

const makeContentCreatorApplicationController = require('./contentCreatorApplicationController')
const contentCreatorApplicationController = makeContentCreatorApplicationController({ contentCreatorApplicationList, Params, Id })

module.exports = { contentCreatorApplicationController }
