const { ValidationError } = require('../../../helpers/error')

module.exports = function makeAppProtectedRoute({ passport }) {

    /* Protects a route, requiring authentication on request */
    return function restricted(req, res, next) {

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


// const { ValidationError } = require('../../../helpers/error')

// module.exports = function makeAppProtectedRoute({ passport, appUserList }) {

//     /* Protects a route, requiring authentication on request */
//     return function restrictedApp(req, res, next) {

//         passport.authenticate('login', { session: false }, (err, appUser, info) => {
//             if (info instanceof Error) {
//                 throw new ValidationError(info)
//             }
//             else if (err) {
//                 next(err)
//             }
//             else if (!appUser) {
//                 throw new Error("Could not find user from jwt payload")
//             } else {
//                 next()
//             }             

//         })(req, res, next)
//     }

// }


