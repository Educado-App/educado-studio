const passport = require("passport")

module.exports = function requireAuth(req, res, next) {
    passport.authenticate(['JWT'], { session: false })
}