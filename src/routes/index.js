const router = require('express').Router()

// Routes
const CourseRoutes = require('../courses/routes')
const AuthorizationRoutes = require('../security/authorization/routes')
const OnBoardingRoutes = require('../onboarding/routes')
const appUserRoutes = require('../mobile-application/appUserModifications/routes')
//const AWSRoutes = require('./bucketRoutes')
const AuthenticationRoutes = require('../security/authentication/routes')
const UserRoutes = require('../users/routes')
const AppAuthRoutes = require('../mobile-application/appSecurity/routes')




router.use('/api', CourseRoutes)
//router.use('', AWSRoutes)
router.use('', AuthenticationRoutes)
router.use('/api',AuthorizationRoutes)
router.use('/api',UserRoutes)
router.use('/api', OnBoardingRoutes)
router.use('/api/eml', appUserRoutes)
router.use('/api/eml', AppAuthRoutes)


module.exports = router