const Id = require('../../helpers/Id')
const Email = require('../../helpers/Email')
const Password = require('../../helpers/password')

const buildMakeUser = require('./user')
const buildMakeProfile = require('./profile')

const makeUser = buildMakeUser({ Id, Email, Password })
const makeProfile = buildMakeProfile({ Id, makeUser })

module.exports = { makeUser, makeProfile }