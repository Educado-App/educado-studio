const router = require('express').Router()

// Routes
const CourseRoutes = require('./courseRoutes')
const AWSRoutes = require('./bucketRoutes')
const AuthRoutes = require('./authRoutes')
const SignupRoutes = require('./signupRoutes')
const ApplicationRoutes = require('./applicationRoutes')
const MailRoutes = require('./mailRoutes')

// TODO: demo only routes
const UserRoutes = require('./user.routes');
const UserDemoRoutes = require('./user_demo.routes');

// Print all routes defined in app
router.get('/api', (req, res) => {
    res.send(router.stack)
})

router.use('/api', CourseRoutes)
router.use('', AWSRoutes)
router.use('/api', AuthRoutes)
router.use('/api/signup', SignupRoutes)
router.use('/api/applications', ApplicationRoutes)
router.use('/api/mail',MailRoutes)

// TODO: demo only routes
router.use('/api/jwt/', UserRoutes);
router.use('/api/jwt/demo', UserDemoRoutes);

module.exports = router