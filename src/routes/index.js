const router = require('express').Router()

// Routes
const CourseRoutes = require('../courses/routes')
const OnBoardingRoutes = require('../onboarding/routes')
const appUserRoutes = require('../mobile-application/appUserModifications/routes')
//const AWSRoutes = require('./bucketRoutes')
const AuthRoutes = require('../security/authentication/routes')
const AppAuthRoutes = require('../mobile-application/appSecurity/routes')




router.use('/api', CourseRoutes)
//router.use('', AWSRoutes)
router.use('', AuthRoutes)
router.use('/api', OnBoardingRoutes)
router.use('/api/eml', appUserRoutes)
router.use('/api/eml', AppAuthRoutes)


module.exports = router