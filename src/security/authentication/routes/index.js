const router = require('express').Router()
const passport = require("../utils/passport")

const JWT = require('../utils/jwt')

const { restricted } = require('..');
const { makeExpressCallback } = require('../../../helpers/express')
const { authAuthController } = require('../controllers')


router.post('/auth/jwt', makeExpressCallback(authAuthController))

router.get('/auth/jwt/test', restricted, (req, res) => {
  res.status(200)
  res.send("Successfully authenticated using accessToken")
})


router.get('/auth/google/test', restricted, (req, res) => {
  res.status(200)
  res.send("Successfully authenticated using google")
})

// Route handler for login simulation
router.get("/auth/google",
  passport.authenticate('google', {
    scope: ["profile", "email"], // Specifies to google what access we request access to. Full list of possibilities can be seen on google.
  })
);

// Route handler for auth callback (Automatically gets 'code' from earlier call)
router.get("/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.status(200)
    res.send({
      success: true,
      data: {
        'accessToken': JWT.signAccessToken({ user: req.user.id }),
        'refreshToken': JWT.signRefreshToken({ user: req.user.id }),
      }
    })
  }
);

module.exports = router