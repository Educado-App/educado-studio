const Id = require('../../helpers/id')
const Email = require('../../helpers/email')
const Password = require('../../helpers/password')

const buildMakeUser = require('./user')
const buildMakeProfile = require('./profile')

const makeUser = buildMakeUser({ Id, Email, Password })
const makeProfile = buildMakeProfile({ Id })

module.exports = { makeUser, makeProfile }
