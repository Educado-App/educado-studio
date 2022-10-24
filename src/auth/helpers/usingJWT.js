const config = require('../../../env/config/keys')

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const { userList } = require('../../users')

// JWT Strategy options
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.TOKEN_SECRET,
    algorithms: ['HS256']
}

const jwtStrategy = new JwtStrategy(options, (payload, done) => {
    userList.findById(payload.user)
        .then(user => done(null, user))
        .catch(err => done(err, false))
})

module.exports = {
    jwtStrategy
}