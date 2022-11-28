const router = require('express').Router()
const passport = require('../../../security/authentication/utils/passport')

const JWT = require('../../../security/authentication/utils/jwt')

const { restrictedApp } = require('..');
const { makeExpressCallback } = require('../../../helpers/express')
const { appAuthController } = require('../controllers')

router.post('/login', makeExpressCallback(appAuthController))

router.get('/login/test', restrictedApp,
  (req, res) => {
    res.status(200)
    res.send("Successfully authenticated using accessToken")
  })

// Route handler for auth callback
router.get("/login/callback",
  passport.authenticate("login", { failureRedirect: '/login' }),
  (req, res) => {
    res.status(200)
    res.send({
      success: true,
      data: {
        'accessToken': JWT.signAccessToken({ appUser: req.appUser.id }),
        'refreshToken': JWT.signRefreshToken({ appUser: req.appUser.id }),
      }
    })
  }
);

module.exports = router
