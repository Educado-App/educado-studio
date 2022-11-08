const { makeHttpError, MultipleError } = require('../../../helpers/error')

module.exports = function makeProtectedRoute({ passport, profileList }) {

    /* Protects a route, requiring authentication on request */
    return function protected(req, res, next) {

        passport.authenticate('JWT', { session: false }, (err, user, info) => {
            if (info instanceof Error) {
                next(makeHttpError({
                    status: 400,
                    message: info
                }))
            }
            else if (err) {
                next(makeHttpError({
                    status: 500,
                    message: err
                }))
            }
            else if (!user) {
                next(makeHttpError({
                    status: 500,
                    message: "Could not find user from jwt payload"
                }))
            } else {
                // Successfull authentication
                // Adds the authenticated user to global context
                profileList.findByUserId(user.id)
                    .then(profile => {
                        req.context = req.context || {}
                        req.context.profile = profile

                        next()
                    })

                //next()
            }


        })(req, res, next)
    }

}


