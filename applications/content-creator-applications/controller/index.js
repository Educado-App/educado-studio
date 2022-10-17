const { contentCreatorApplicationList } = require('../data-access')
const Email = require('../../../helpers/email')

const makeContentCreatorApplicationController = require('./contentCreatorApplicationController')
const contentCreatorApplicationController = makeContentCreatorApplicationController({ contentCreatorApplicationList, Email })

module.exports = { contentCreatorApplicationController }