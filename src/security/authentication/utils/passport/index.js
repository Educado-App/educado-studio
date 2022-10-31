const passport = require("passport");
const { userList } = require('../../../../users/gateways')

// Strategies
const { googleStrategy, googleRestrictedStrategy } = require('./usingGoogle')
const { jwtStrategy } = require('./usingJWT')


passport.use("JWT", jwtStrategy)
passport.use("google", googleStrategy)
passport.use("google-restricted", googleRestrictedStrategy)


// ** SERIALIZATION & DESERIALIZATION ** //

passport.serializeUser((user, done) => {
  // Serialize user with user.id. This is sent TO the client FROM the server.
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // When client contacts server with cookie, desearilise extracts the ID, Find user in Database with that ID, and return user.
  userList.findById(id)
    .then((user) => done(null, user))
});

module.exports = passport





