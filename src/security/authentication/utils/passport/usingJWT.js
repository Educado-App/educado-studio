<<<<<<<< HEAD:src/security/authentication/helpers/usingJWT.js
const config = require('../../../../env/config/keys')

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const { userList } = require('../../../users')
========
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const config = require('../../../../../env/config/keys')
const { userList } = require('../../../../users/gateways')
>>>>>>>> Feature-courses:src/security/authentication/utils/passport/usingJWT.js

// JWT Strategy options
const options = {
    secretOrKey: config.TOKEN_SECRET,
    algorithms: ['HS256'],
    ignoreExpiration: false,
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
    ])
}

const jwtStrategy = new JwtStrategy(options, (payload, done) => {
    userList.findById(payload.user)
        .then(user => done(null, user))
        .catch(err => done(err, false))
})

module.exports = {
    jwtStrategy
}