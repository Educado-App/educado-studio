
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const config = require('../../../../../env/config/keys')
const { userList } = require('../../../../users/gateways')

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