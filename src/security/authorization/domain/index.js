const Id = require('../../../helpers/id')

const buildMakeRole = require('./role')

const makeRole = buildMakeRole( Id )

module.exports = {
    makeRole
}