/**
 * Main entry point for every API endpoint
 * 
 * Uses express router for routing
 * @see https://expressjs.com/en/guide/routing.html
 */

const router = require('express').Router()


// Routers
const CourseRoutes = require('../courses/routes')
const OnBoardingRoutes = require('../onboarding/routes')

const AppUserRoutes = require('../mobile-application/appUserModifications/routes')
const ContentUserRoutes = require('../users/routes')

const AuthenticationRoutes = require('../security/authentication/routes')
const AuthorizationRoutes = require('../security/authorization/routes')
const AppAuthRoutes = require('../mobile-application/appSecurity/routes')

// Routes
router.use('/api', CourseRoutes)
router.use('', AuthenticationRoutes)
router.use('/api', AuthorizationRoutes)
router.use('/api', ContentUserRoutes)
router.use('/api', OnBoardingRoutes)
router.use('/api/eml', AppUserRoutes)
router.use('/api/eml', AppAuthRoutes)


module.exports = router