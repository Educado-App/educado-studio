const passport = require('./utils/passport')
const { profileList } = require('../../users/gateways')

const makeProtectedRoute = require('./utils/protectedRoute')

const restricted = makeProtectedRoute({ passport, profileList })

module.exports = {
    restricted
}

