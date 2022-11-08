const passport = require('./utils/passport')
const { profileList } = require('../../users/gateways')

const makeProtectedRoute = require('./utils/protectedRoute')

const protected = makeProtectedRoute({ passport, profileList })

module.exports = {
    protected
}

