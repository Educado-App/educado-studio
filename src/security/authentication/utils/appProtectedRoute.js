const { ValidationError } = require('../../../helpers/error')

module.exports = function makeAppProtectedRoute({ passport }) {

    /* Protects a route, requiring authentication on request */
    return function restricted(req, res, next) {

        passport.authenticate('JWT', { session: false }, (err, appUser, info) => {
            if (info instanceof Error) {
                throw new ValidationError(info)
            }
            else if (err) {
                next(err)
            }
            else if (!appUser) {
                throw new Error("Could not find user from jwt payload")
            }


        })(req, res, next)
    }

}


