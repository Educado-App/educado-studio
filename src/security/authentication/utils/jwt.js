const jwt = require('jsonwebtoken')
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require('../../../../env/config/keys')


module.exports = Object.freeze({
    generateTokenPair,
    signAccessToken,
    signRefreshToken,
    verify,
    extractFromRequest
})

function generateTokenPair(payload = {}) {
    return {
        accessToken: signAccessToken(payload),
        refreshToken: signRefreshToken(payload)
    }
}

function signAccessToken(payload = {}) {
    return jwt.sign(payload, config.TOKEN_SECRET, { expiresIn: config.ACCESS_TOKEN_MAX_AGE })
}

function signRefreshToken(payload = {}) {
    return jwt.sign(payload, config.TOKEN_SECRET, { expiresIn: config.REFRESH_TOKEN_MAX_AGE })
}

function verify(token) {
    return jwt.verify(token, config.TOKEN_SECRET)
}

function extractFromRequest(httpRequest) {
    return ExtractJwt.fromAuthHeaderAsBearerToken()(httpRequest)
}



