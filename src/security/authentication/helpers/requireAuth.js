const passport = require("passport");

module.exports = passport.authenticate('JWT', { session: false })
