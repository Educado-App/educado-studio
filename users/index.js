const Email = require('../helpers/Email')

const buildMakeUser = require('../users/user')

const makeUser = buildMakeUser({ Email })

module.exports = makeUser