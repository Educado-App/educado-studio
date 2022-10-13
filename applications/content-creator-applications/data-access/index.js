const { ContentCreatorApplication } = require('../../../models/ContentCreatorApplication')

const makeContentCreatorApplicationList = require('./contentCreatorApplicationList')
const contentCreatorApplicationList = makeContentCreatorApplicationList(ContentCreatorApplication)

module.exports = { contentCreatorApplicationList }
