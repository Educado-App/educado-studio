const { ValidationError } = require('../../../helpers/error')

module.exports = function makeProtectedRoute({ passport, profileList }) {

    /* Protects a route, requiring authentication on request */
    return function restricted(req, res, next) {

        passport.authenticate('JWT', { session: false }, (err, user, info) => {
            if (info instanceof Error) {
                if (info.name === 'Error') throw new ValidationError(info.message)
                else throw new ValidationError(info)
            }
            else if (err) {
                next(err)
            }
            else if (!user) {
                throw new Error("Could not find user from jwt payload")
            } else {
                // Successfull authentication
                // Adds the authenticated user to global context
                profileList.findByUserId(user.id)
                    .then(profile => {
                        req.context = req.context || {}
                        req.context.profile = profile

                        next()
                    })

            }


        })(req, res, next)
    }

}


