const passport = require("passport");
<<<<<<<< HEAD:src/security/authentication/helpers/index.js
const { userList } = require('../../../users')
========
const { userList } = require('../../../../users/gateways')

// Strategies
const { googleStrategy, googleRestrictedStrategy } = require('./usingGoogle')
const { jwtStrategy } = require('./usingJWT')


passport.use("JWT", jwtStrategy)
passport.use("google", googleStrategy)
passport.use("google-restricted", googleRestrictedStrategy)

>>>>>>>> Feature-courses:src/security/authentication/utils/passport/index.js

// ** SERIALIZATION & DESERIALIZATION ** //

passport.serializeUser((user, done) => {
  // Serialize user with user.id. This is sent TO the client FROM the server.
<<<<<<<< HEAD:src/security/authentication/helpers/index.js
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  // When client contacts server with cookie, desearilise extracts the ID, Find user in Database with that ID, and return user.
  userList.findById(id).then((user) => {
    done(null, user);
  })
})

// Strategies
const { googleStrategy, googleRestrictedStrategy } = require('./usingGoogle')
const { jwtStrategy } = require('./usingJWT')

passport.use("JWT", jwtStrategy)
passport.use("google", googleStrategy)
passport.use("google-restricted", googleRestrictedStrategy)





========
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // When client contacts server with cookie, desearilise extracts the ID, Find user in Database with that ID, and return user.
  userList.findById(id)
    .then((user) => done(null, user))
});
>>>>>>>> Feature-courses:src/security/authentication/utils/passport/index.js

module.exports = passport





