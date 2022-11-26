// const { appUserList } = require('../../../../mobile-application/appUserModifications/gateways')

// const phoneStrategy =
//     new LocalStrategy(
//         // function of username, password, done(callback)
//         function(phone, done) {
//             // look for the user data
//             appUserList.findPhone({ phone: phone }, function (err, appUser) {
//             // if there is an error
//             if (err) { return done(err) }
//             // if user doesn't exist
//             if (!appUser) { return done(null, false, { message: 'User not found.' }) }
//             // if the user is properly authenticated
//             return done(null, appUser)
//             })
//         }
//     )

// module.exports = {
//     phoneStrategy
// }