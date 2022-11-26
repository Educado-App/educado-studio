const passport = require('./utils/passport')
const { profileList } = require('../../users/gateways')

const makeProtectedRoute = require('./utils/protectedRoute')
const makeAppProtectedRoute = require('./utils/appProtectedRoute')

const restricted = makeProtectedRoute({ passport, profileList })
const restrictedApp = makeAppProtectedRoute({ passport })

module.exports = {
    restricted,
    restrictedApp
}

