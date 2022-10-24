const { contentCreatorApplicationList } = require('../gateways')
const Email = require('../../../helpers/email')
const Params = require('../../../helpers/ajv/params')
const Id = require('../../../helpers/Id')
const { userList } = require('../../../users')

const makeContentCreatorApplicationController = require('./contentCreatorApplicationController')
const contentCreatorApplicationController = makeContentCreatorApplicationController({ contentCreatorApplicationList, UserList: userList, Email, Params, Id })

module.exports = { contentCreatorApplicationController }