const passport = require("passport");
const { userList } = require('../../../../users/gateways')
const { appUserList } = require('../../../../mobile-application/appUserModifications/gateways')

// Strategies
const { googleStrategy, googleRestrictedStrategy } = require('./usingGoogle')
const { phoneStrategy } = require('./usingPhone')
const { jwtStrategy, jwtAppStrategy } = require('./usingJWT')


passport.use("JWT", jwtStrategy)
passport.use("google", googleStrategy)
passport.use("google-restricted", googleRestrictedStrategy)

passport.use("login", jwtAppStrategy)
//passport.use("login", phoneStrategy)

// ** SERIALIZATION & DESERIALIZATION ** //

passport.serializeUser((user, done) => {
  // Serialize user with user.id. This is sent TO the client FROM the server.
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  // When client contacts server with cookie, desearilise extracts the ID, Find user in Database with that ID, and return user.
  userList.findById(id).then((user) => {
    done(null, user);
  })
})

//**--------------------------------------AppUser--------------------------------------**//
passport.serializeUser((appUser, done) => {
  // Serialize user with user.id. This is send TO the client FROM the server.
  done(null, appUser.id);
});

passport.deserializeUser((id, done) => {
  // When client contacts server with cookie, desearilise extracts the ID, Find user in Database with that ID, and return user.
  appUserList.findById(id).then((appUser) => {
    done(null, appUser);
  });
});



module.exports = passport





