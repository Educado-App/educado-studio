const Id = require('../../helpers/id')

const buildMakeContentCreatorApplication = require('./contentCreatorApplication')
const makeContentCreatorApplication = buildMakeContentCreatorApplication({ Id })

module.exports = { makeContentCreatorApplication }
