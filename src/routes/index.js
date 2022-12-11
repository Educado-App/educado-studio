/**
 * Main entry point for every API endpoint
 * 
 * Uses express router for routing
 * @see https://expressjs.com/en/guide/routing.html
 */

const router = require('express').Router()


// Routers
const CourseRoutes = require('../courses/routes')
const AuthorizationRoutes = require('../security/authorization/routes')
const OnBoardingRoutes = require('../onboarding/routes')
const appUserRoutes = require('../mobile-application/appUserModifications/routes')
const AuthenticationRoutes = require('../security/authentication/routes')
const UserRoutes = require('../users/routes')
const AppAuthRoutes = require('../mobile-application/appSecurity/routes')


// Routes
router.use('/api', CourseRoutes)
router.use('', AuthenticationRoutes)
router.use('/api', AuthorizationRoutes)
router.use('/api', UserRoutes)
router.use('/api', OnBoardingRoutes)
router.use('/api/eml', appUserRoutes)
router.use('/api/eml', AppAuthRoutes)


module.exports = router