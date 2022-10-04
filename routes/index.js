const router = require('express').Router()

// Routes
const CourseRoutes = require('./courseRoutes')
const AWSRoutes = require('./bucketRoutes')
const AuthRoutes = require('./authRoutes')

// Print all routes defined in app
router.get('/api', (req, res) => {
    res.send(router.stack)
})

router.use('/api', CourseRoutes)
router.use('', AWSRoutes)
router.use('/api', AuthRoutes)

module.exports = router