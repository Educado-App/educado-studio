/**
  * Restricting app user routes
  * 
  * Last Modified: 28-11-2022
  **/

const { ValidationError } = require('../../../helpers/error')

module.exports = function makeAppProtectedRoute({ passport }) {

    /* Protects a route, requiring authentication on request */
    return function appRestricted(req, res, next) {

        passport.authenticate('login', { session: false }, (err, user, info) => {
            if (info instanceof Error) {
                throw new ValidationError(info)
            }
            else if (err) {
                next(err)
            }
            else if (!user) {
                throw new Error("Could not find user from jwt payload")
            } else {
                next()

            }


        })(req, res, next)
    }

}


