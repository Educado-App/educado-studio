const jsonwebtoken = require('jsonwebtoken');

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
const issueJWT = (user) => {

    const payload = {
        sub: user._id,
        iat: Date.now()
    };

    const options = {
        expiresIn: '1d',
        algorithm: 'HS256'
    };

    // FIXME: replace with .env 
    const signedToken = jsonwebtoken.sign(payload, "secret", options);

    return {
        token: "Bearer " + signedToken,
        expires: signedToken.expiresIn
    }
}

module.exports.issueJWT = issueJWT;