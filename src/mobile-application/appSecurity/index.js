/**
  * Index for app security
  * 
  * Last Modified: 28-11-2022
  **/

const passport = require('../../security/authentication/utils/passport')

const makeAppProtectedRoute = require('./utils/appProtectedRoute')

const restrictedApp = makeAppProtectedRoute({ passport })

module.exports = { restrictedApp }