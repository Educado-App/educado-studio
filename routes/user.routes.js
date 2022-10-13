// File: ./routes/users.js
const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require("passport");

// User defined
const { UserModel, JwtUserModel } = require("../models/User");

// Utils
const { validPassword, genPassword } = require("../lib/utils");
const { issueJWT } = require("../lib/jwt");

// http://localhost:3000/api/jwt/login
router.post('/login', function (req, res, next) {
    console.log(req.body.email);
    
    JwtUserModel.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                res.status(401).json({ success: false, msg: "could not find user" });
            }

            // Function defined at bottom of app.js
            const isValid = validPassword(req.body.password, user.password, user.salt);

            if (isValid) {
                const tokenObject = issueJWT(user);
                res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
            } else {
                res.status(401).json({ success: false, msg: "you entered the wrong password" });
            }

        })
        .catch((err) => {
            next(err);
        });
});

// http://localhost:3000/api/jwt/register
router.post('/register', function (req, res, next) {

    // receive salt and hash from util function
    const { salt, hash } = genPassword(req.body.password);

    // Create new user instance in MongoDB
    const newUser = new JwtUserModel({
        googleID: "",
        email: req.body.email,
        password: hash,
        salt: salt,
        joinedAt: Date.now(),
        modifiedAt: Date.now()
    })

    // Save new user in MongoDB
    newUser.save()
        .then((user) => {
            res.json({ success: true, user: user });
        })
        .catch(err => next(err));
});

// demo route
router.get('/narnia', passport.authenticate('JWT', { session: false }), (req, res, next) => {
    res.status(200).json({
        success: true,
        orders: "Go to speak to Aslan right away, young warrior"
    })
})

module.exports = router;