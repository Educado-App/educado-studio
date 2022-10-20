const router = require('express').Router()

// Routes
const CourseRoutes = require('./courseRoutes')
const AWSRoutes = require('./bucketRoutes')
const AuthRoutes = require('../auth/routes')
const SignupRoutes = require('./signupRoutes')
const ApplicationRoutes = require('../applications/content-creator-applications/routes')


// Print all routes defined in app
router.get('/api', (req, res) => {
    res.send(router.stack)
})

router.use('/api', CourseRoutes)
router.use('', AWSRoutes)
router.use('/api', AuthRoutes)
router.use('/api/signup', SignupRoutes)
router.use('/api/applications', ApplicationRoutes)


module.exports = router