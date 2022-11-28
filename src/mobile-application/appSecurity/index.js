const passport = require('../../security/authentication/utils/passport')

const makeAppProtectedRoute = require('./utils/appProtectedRoute')

const restrictedApp = makeAppProtectedRoute({ passport })

module.exports = { restrictedApp }