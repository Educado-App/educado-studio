/**
 * Adds user id to the request context
 */

const Token = require('../../helpers/jwt')

module.exports = function addUserContext(req, context) {

    if (context.user) {
        return context
    }

    // Extract user info from access token into request
    try {
        const accessToken = req.headers.authorization.split("Bearer ")[1]
        const decoded = Token.verify(accessToken)

        return decoded.user
    } catch (error) {
        return null
    }

}