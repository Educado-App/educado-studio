const passport = require("passport")

module.exports = Object.freeze({
    requireAuth: authenticate
})


function authenticate({ strategy = ['JWT', 'google'], options, callback } = {}) {
    passport.authenticate(strategy, callback)
}