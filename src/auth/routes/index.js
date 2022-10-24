const router = require('express').Router()
const passport = require("passport"); // Import passport library module

const { makeExpressCallback } = require('../../helpers/express')
const { authAuthController } = require('../controllers')

// Services
require("../helpers");

router.post('/auth/jwt', makeExpressCallback(authAuthController))

router.get('/auth/jwt/test', passport.authenticate('JWT', { session: false }), (req, res, next) => {
  res.status(200)
  res.send("Successfully logged into an authenticated route!!")
})

// Route handler for login simulation
router.get("/auth/google",
  passport.authenticate("google-restricted", {
    // 'google' identifies a GoogleStrategy
    scope: ["profile", "email"], // Specifies to google what access we request access to. Full list of possibilities can be seen on google.
  })
);

// Route handler for auth callback (Automatically gets 'code' from earlier call)
router.get("/auth/google/callback",
  passport.authenticate("google-restricted"),
  (req, res) => {
    res.redirect("/");
  }
);

// Logout simulation
router.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Show current user simulation
router.get("/auth/current_user", (req, res) => {
  setTimeout(() => {
    res.send(req.user);
  }, 1500);
});

module.exports = router
