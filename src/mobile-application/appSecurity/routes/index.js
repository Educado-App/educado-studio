/**
  * Routers for an app user authentication
  * 
  * Last Modified: 28-11-2022
  **/

const router = require('express').Router()
const passport = require('../../../security/authentication/utils/passport')

const JWT = require('../../../security/authentication/utils/jwt')

const { restrictedApp } = require('..');
const { makeExpressCallback } = require('../../../helpers/express')
const { appAuthController } = require('../controllers')

// REST API for when user logs in
router.post('/login', makeExpressCallback(appAuthController))

// Used to test if user can login with valid token
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
      data: JWT.generateTokenPair({ appUser: req.appUser.id })
    })
  }
);

module.exports = router
