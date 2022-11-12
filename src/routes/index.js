const router = require('express').Router()

// Routes
const CourseRoutes = require('./courseRoutes')
const AWSRoutes = require('./bucketRoutes')
const appUserRoutes = require('../mobile-applications/appUserModification/routes')
const AuthRoutes = require('../security/authentication/routes')
const ApplicationRoutes = require('../applications/content-creator-applications/routes')


// Print all routes defined in app
router.get('/api', (req, res) => {
    res.send(router.stack)
})

router.use('/api', CourseRoutes)
router.use('', AWSRoutes)
router.use('/api', AuthRoutes)
router.use('/api', ApplicationRoutes)
router.use('/api/eml', appUserRoutes)


module.exports = router